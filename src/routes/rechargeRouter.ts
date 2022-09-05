import { Router } from "express";
import { rechargeCard } from "../controllers/rechargeController";
import { schemaValidateMiddleware } from "../middlewares/schemaValidateMiddleware";
import { rechargeSchema } from "../schemas/rechargeSchema";

const rechageRouter = Router();

rechageRouter.post(
  "/recharge/:cardId",
  schemaValidateMiddleware(rechargeSchema),
  rechargeCard
);

export { rechageRouter };
