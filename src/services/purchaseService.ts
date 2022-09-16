import * as cardRepository from "./../repositories/cardRepository";
import * as purchaseRepository from "../repositories/paymentRepository";
import * as businessRepository from "../repositories/businessRepository";
import * as rechargeRepository from "../repositories/rechargeRepository";
import dayjs from "dayjs";
import Cryptr from "cryptr";
const cryptr = new Cryptr("SecretKey");
//const cryptr = new Cryptr(process.env.SECRET_KEY);

export async function purchase(
  cardId: number,
  password: string,
  businessId: number,
  amount: number
) {
  const card = await cardRepository.findById(cardId);
  if (!card) {
    throw { type: "not_found", message: "no data in the database" };
  }
  if (!card.password) {
    throw { type: "not_found", message: "no data in the database" };
  }
  if (card.isBlocked) {
    throw { type: "not_found", message: "no data in the database" };
  }
  const dateToday = dayjs().format("MM/YY");
  if (dayjs(dateToday).isAfter(dayjs(card.expirationDate))) {
    throw { type: "bad_request", message: "expired card" };
  }
  const decryptPassword = cryptr.decrypt(card.password);
  if (decryptPassword !== password) {
    throw { type: "unauthorized", message: "incorrect card password" };
  }
  const checkBusinessId = await businessRepository.findById(businessId);
  if (!checkBusinessId) {
    throw { type: "not_found", message: "unregistered establishment" };
  }
  if (checkBusinessId.type !== card.type) {
    throw {
      type: "unauthorized",
      message: "not authorized for this type of establishment",
    };
  }
  const amountPurchase = await purchaseRepository.findByCardId(cardId);
  const amountBalance = await rechargeRepository.findByCardId(cardId);

  const balanceCard = await checkBalance(amountPurchase, amountBalance);
  if (balanceCard < amount) {
    throw {
      type: "unauthorized",
      message: "insufficient balance",
    };
  }

  await purchaseRepository.insert({ cardId, businessId, amount });
}

export async function checkBalance(
  amountPurchase: purchaseRepository.Payment[],
  amountBalance: rechargeRepository.Recharge[]
) {
  let balanceTotal = 0;
  if (amountBalance.length > 0) {
    balanceTotal = amountBalance
      .map((item) => item.amount)
      .reduce((a, b) => a + b);
  }
  let outlay = 0;
  if (amountPurchase.length > 0) {
    outlay = amountPurchase.map((item) => item.amount).reduce((a, b) => a + b);
  }
  const resultBalance = balanceTotal - outlay;
  return resultBalance;
}
