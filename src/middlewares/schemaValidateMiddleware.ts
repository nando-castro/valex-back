import { ObjectSchema } from "joi";
import { NextFunction, Request, Response } from "express";

export function schemaValidateMiddleware(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error)
      return res.status(422).send(error.details.map(({ message }) => message));
    next();
  };
}
