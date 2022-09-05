import { Router } from "express";
import { purchase } from "../controllers/purchaseController";
import { schemaValidateMiddleware } from "../middlewares/schemaValidateMiddleware";
import { purchaseSchema } from "../schemas/purchaseSchema";

const purchaseRouter = Router();

purchaseRouter.post(
  "/purchase",
  schemaValidateMiddleware(purchaseSchema),
  purchase
);

export { purchaseRouter };
