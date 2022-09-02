import { Request, Response } from "express";
import * as testeService from "../services/teste";

export function testeController(req: Request, res: Response) {
  try {
    console.log(testeService.teste());
    res.status(200).send("OK tudo funfando de boas")
  } catch (error) {
    console.log("erro");
    res.sendStatus(500);
  }
}
