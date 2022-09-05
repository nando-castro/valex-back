import { Request, Response } from "express";
import * as rechargeService from "../services/rechargeService";

export async function rechargeCard(req: Request, res: Response) {
  const apiKey = req.headers["x-api-key"] as string;
  const { cardId } = req.params;
  const { amount }: { amount: number } = req.body;
  if (!apiKey) return res.sendStatus(401);
  await rechargeService.rechargeCard(Number(cardId), amount);

  return res.sendStatus(200);
}
