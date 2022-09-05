import { Request, Response, NextFunction } from "express";

export default function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  /* res
    .status(error.status || 500)
    .send(error.message || "Internal server error"); */

  if (error.type === "unauthorized") {
    return res.sendStatus(401);
  } else if (error.type === "conflict") {
    return res.sendStatus(409);
  } else if (error.type === "not_found") {
    return res.sendStatus(404);
  } else if (error.type === "bad_request") {
    return res.sendStatus(400);
  }

  return res.sendStatus(500);
}
