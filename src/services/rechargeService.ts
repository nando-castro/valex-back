import * as cardRepository from "./../repositories/cardRepository";
import * as rechargeRepository from "../repositories/rechargeRepository";
import dayjs from "dayjs";

export async function rechargeCard(cardId: number, amount: number) {
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
  await rechargeRepository.insert({ cardId, amount });
}
