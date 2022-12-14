import { Request, Response, NextFunction } from "express";

export default function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(error)
    if (error.type === "unauthorized") {
      return res.status(401).send(error.message);
    } else if (error.type === "conflict") {
      return res.status(409).send(error.message);
    } else if (error.type === "not_found") {
      return res.status(404).send(error.message);
    } else if (error.type === "bad_request") {
      return res.status(400).send(error.message);
    }

  return res.sendStatus(500);
}
