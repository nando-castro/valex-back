import { TransactionTypes } from "./../repositories/cardRepository";
import * as cardRepository from "./../repositories/cardRepository";
import * as companyRepository from "../repositories/companyRepository";
import * as employeeRepository from "../repositories/employeeRepository";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import Cryptr from "cryptr";

//import unauthorizedError from "../utils/error";

export async function createCard(
  apiKey: string,
  employeeId: number,
  cardType: TransactionTypes
) {
  //const cryptr = new Cryptr(process.env.SECRET_KEY);
  const cryptr = new Cryptr("SecretKey");
  const company = await validateApiKey(apiKey);
  const employee = await validateEmployee(employeeId);
  const cardExists = await validateCardType(cardType, employeeId);

  /* if (!company || !employee) {
    throw { type: "not_found", message: "no data in the database" };
  }
  if (cardExists) {
    throw {
      type: "conflict",
      message: "employee already have a card with this type",
    };
  } */

  const numberCard = faker.finance.creditCardNumber("visa");

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
    password: undefined,
    isVirtual: false,
    originalCardId: undefined,
    isBlocked: true,
    type: cardType,
  };

  await cardRepository.insert(card);

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
