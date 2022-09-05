import { Request, Response } from "express";
import * as purchaseService from "../services/purchaseService";

export async function purchase(req: Request, res: Response) {
  const { cardId, password, businessId, amount } = req.body;

  await purchaseService.purchase(cardId, password, businessId, amount);

  return res.sendStatus(200);
}
