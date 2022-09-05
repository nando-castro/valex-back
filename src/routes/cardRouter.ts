import { Router } from "express";
import { blockedSchema } from "./../schemas/blockedSchema";
import { activationSchema } from "./../schemas/activationSchema";
import { createCardSchema } from "./../schemas/cardSchema";
import * as cardController from "../controllers/cardController";
import { schemaValidateMiddleware } from "../middlewares/schemaValidateMiddleware";
import { balanceCardSchema } from "../schemas/balanceCardSchema";

const cardRouter = Router();

cardRouter.post(
  "/card",
  schemaValidateMiddleware(createCardSchema),
  cardController.createCard
);
cardRouter.post(
  "/card/:id/activate",
  schemaValidateMiddleware(activationSchema),
  cardController.activateCard
);
cardRouter.get(
  "/balance/:cardId",
  cardController.getBalanceCard
);
cardRouter.put(
  "/card/:id/blocked",
  schemaValidateMiddleware(blockedSchema),
  cardController.blockedCard
);
cardRouter.put(
  "/card/:id/unblocked",
  schemaValidateMiddleware(blockedSchema),
  cardController.unblockedCard
);

export { cardRouter };
