import { Request, Response } from "express";
import * as cardService from "../services/cardService";
import { TransactionTypes } from "../repositories/cardRepository";

export async function createCard(req: Request, res: Response) {
  const apiKey = req.headers["x-api-key"] as string;
  //const { employeeId } = req.params as any;
  const {
    employeeId,
    cardType,
  }: { employeeId: number; cardType: TransactionTypes } = req.body;
  if (!apiKey) return res.sendStatus(401);
  const newCard = await cardService.createCard(apiKey, employeeId, cardType);
  res.status(201).send(newCard);
}
/* 
{
  "card": {
    "employeeId": 1,
    "number": "4853798628416",
    "cardholderName": "FULANO F F SILVA",
    "securityCode": "238",
    "expirationDate": "09/27",
    "isVirtual": false,
    "isBlocked": true,
    "type": "education"
  },
  "securityCode": "238"
}
 */