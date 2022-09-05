import { Request, Response } from "express";
import * as cardService from "../services/cardService";
import { TransactionTypes } from "../repositories/cardRepository";

export async function createCard(req: Request, res: Response) {
  const apiKey = req.headers["x-api-key"] as string;
  const {
    employeeId,
    cardType,
  }: { employeeId: number; cardType: TransactionTypes } = req.body;
  if (!apiKey) return res.sendStatus(401);
  const newCard = await cardService.createCard(apiKey, employeeId, cardType);
  res.status(201).send(newCard);
}

export async function viewCards(req: Request, res: Response) {
  const { employeeId, cardType, password }: { employeeId: number; cardType: TransactionTypes; password: string } =
    req.body;
  const cardInfo = await cardService.viewCards(employeeId, cardType, password);
  return res.status(200).send(cardInfo);
}

export async function getBalanceCard(req: Request, res: Response) {
  const { cardId } = req.params;
  const cardBalance = await cardService.getBalanceCard(Number(cardId));
  return res.status(200).send(cardBalance);
}

export async function activateCard(req: Request, res: Response) {
  const { id } = req.params;
  const { cvc, password } = req.body;

  await cardService.activationCard(Number(id), cvc, password);

  return res.sendStatus(200);
}

export async function blockedCard(req: Request, res: Response) {
  const { id } = req.params;
  const { password } = req.body;

  await cardService.blockedCard(Number(id), password);

  return res.sendStatus(200);
}

export async function unblockedCard(req: Request, res: Response) {
  const { id } = req.params;
  const { password } = req.body;

  await cardService.unblockedCard(Number(id), password);

  return res.sendStatus(200);
}