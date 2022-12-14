import { TransactionTypes } from "./../repositories/cardRepository";
import * as cardRepository from "./../repositories/cardRepository";
import * as companyRepository from "../repositories/companyRepository";
import * as employeeRepository from "../repositories/employeeRepository";
import * as purchaseRepository from "../repositories/paymentRepository";
import * as rechargeRepository from "../repositories/rechargeRepository";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import Cryptr from "cryptr";
import { checkBalance } from "./purchaseService";
const cryptr = new Cryptr("SecretKey");
//const cryptr = new Cryptr(process.env.SECRET_KEY);

export async function viewCards(
  employeeId: number,
  cardtype: TransactionTypes,
  password: string
) {
  const employee = await employeeRepository.findById(employeeId);
  if (!employee) {
    throw { type: "not_found", message: "employee no data in the database" };
  }
  const card = await cardRepository.findByTypeAndEmployeeId(
    cardtype,
    employeeId
  );
  if (!card) {
    throw { type: "not_found", message: "no data in the database" };
  }
  const dateToday = dayjs().format("MM/YY");
  if (dayjs(dateToday).isAfter(dayjs(card.expirationDate))) {
    throw { type: "bad_request", message: "expired card" };
  }
  if (card.isBlocked) {
    throw { type: "not_found", message: "no data in the database" };
  }
  const decryptPassword = cryptr.decrypt(`${card.password}`);
  if (decryptPassword !== password) {
    throw { type: "unauthorized", message: "incorrect card password" };
  }

  const decryptCode = cryptr.decrypt(card.securityCode);
  const formatNumberCard = card.number.replace(/-/g," ");

  const cardInfos = {
    number: formatNumberCard,
    cardholderName: card.cardholderName,
    expirationDate: card.expirationDate,
    securityCode: decryptCode,
  };

  return {
    cards: cardInfos,
  };
}

export async function getBalanceCard(cardId: number) {
  const card = await cardRepository.findById(cardId);
  if (!card) {
    throw { type: "not_found", message: "no data in the database" };
  }
  const amountPurchase = await purchaseRepository.findByCardId(cardId);
  const amountBalance = await rechargeRepository.findByCardId(cardId);

  const balanceCard = await checkBalance(amountPurchase, amountBalance);

  return {
    balance: balanceCard,
    transactions: amountPurchase,
    recharges: amountBalance,
  };
}

export async function blockedCard(id: number, password: string) {
  const card = await cardRepository.findById(id);
  if (!card) {
    throw { type: "not_found", message: "no data in the database" };
  }
  const dateToday = dayjs().format("MM/YY");
  if (dayjs(dateToday).isAfter(dayjs(card.expirationDate))) {
    throw { type: "bad_request", message: "expired card" };
  }
  if (card.isBlocked) {
    throw { type: "not_found", message: "no data in the database" };
  }
  const decryptPassword = cryptr.decrypt(`${card.password}`);

  if (decryptPassword !== password) {
    throw { type: "unauthorized", message: "incorrect card password" };
  }

  await cardRepository.update(id, { isBlocked: true });
}

export async function unblockedCard(id: number, password: string) {
  const card = await cardRepository.findById(id);
  if (!card) {
    throw { type: "not_found", message: "no data in the database" };
  }
  const dateToday = dayjs().format("MM/YY");
  if (dayjs(dateToday).isAfter(dayjs(card.expirationDate))) {
    throw { type: "bad_request", message: "expired card" };
  }
  if (!card.isBlocked) {
    throw { type: "not_found", message: "no data in the database" };
  }

  const decryptPassword = cryptr.decrypt(`${card.password}`);

  if (decryptPassword !== password) {
    throw { type: "unauthorized", message: "incorrect card password" };
  }

  await cardRepository.update(id, { isBlocked: false });
}

export async function activationCard(
  id: number,
  cvc: string,
  password: string
) {
  const card = await cardRepository.findById(id);
  if (!card) {
    throw { type: "not_found", message: "no data in the database" };
  }
  const dateToday = dayjs().format("MM/YY");
  if (dayjs(dateToday).isAfter(dayjs(card.expirationDate))) {
    throw { type: "bad_request", message: "expired card" };
  }
  if (card.password) {
    throw { type: "conflict", message: "card already has password" };
  }
  const checkCVC = cryptr.decrypt(card.securityCode);
  if (checkCVC !== cvc) {
    throw { type: "unauthorized", message: "unauthorized" };
  }
  if (!Number(password) || password.length != 4) {
    throw { type: "bad_request", message: "password in wrong format" };
  }
  const encryptPassword = cryptr.encrypt(password);
  await cardRepository.update(id, {
    password: encryptPassword,
    isBlocked: false,
  });
}

export async function createCard(
  apiKey: string,
  employeeId: number,
  cardType: TransactionTypes
) {
  const company = await validateApiKey(apiKey);
  const employee = await validateEmployee(employeeId);
  const cardExists = await validateCardType(cardType, employeeId);

  const numberCard = faker.finance.creditCardNumber("mastercard");

  const cardholderName = formatNameCard(employee.fullName);

  const expirationDate = dayjs().add(5, "year").format("MM/YY");

  const securityCode = faker.finance.creditCardCVV();

  const encryptedCVV = cryptr.encrypt(securityCode);

  const card = {
    employeeId,
    number: numberCard,
    cardholderName,
    securityCode: encryptedCVV,
    expirationDate,
    isVirtual: false,
    originalCardId: undefined,
    isBlocked: true,
    type: cardType,
  };

  await cardRepository.insert(card);
  console.log(securityCode);

  return { card, securityCode };
}

async function validateCardType(
  cardType: TransactionTypes,
  employeeId: number
) {
  const card = await cardRepository.findByTypeAndEmployeeId(
    cardType,
    employeeId
  );

  if (card) {
    throw {
      type: "conflict",
      message: "employee already have a card with this type",
    };
  }
  return card;
}

async function validateEmployee(employeeId: number) {
  const employee = await employeeRepository.findById(employeeId);
  if (!employee) {
    throw { type: "not_found", message: "no data in the database" };
  }
  return employee;
}

async function validateApiKey(apiKey: string) {
  const validApiKey = await companyRepository.findByApiKey(apiKey);
  if (!validApiKey)
    throw {
      type: "unauthorized",
      message: "api key invalid",
    };
  return validApiKey;
}

function formatNameCard(nameEmployee: string) {
  const nameArray = nameEmployee.split(" ");
  const name = [nameArray[0]];
  for (let i = 0; i < nameArray.length - 1; i++) {
    if (nameArray[i].length >= 3) {
      name.push(name[i][0]);
    }
  }
  name.push(nameArray[nameArray.length - 1]);
  return name.join(" ").toUpperCase();
}
