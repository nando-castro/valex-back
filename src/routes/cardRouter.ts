import { Router } from "express";
import { blockedSchema } from "./../schemas/blockedSchema";
import { activationSchema } from "./../schemas/activationSchema";
import { createCardSchema } from "./../schemas/cardSchema";
import * as cardController from "../controllers/cardController";
import { schemaValidateMiddleware } from "../middlewares/schemaValidateMiddleware";
import { viewCardSchema } from "../schemas/viewCardSchema";

const cardRouter = Router();

cardRouter.post(
  "/card/create",
  schemaValidateMiddleware(createCardSchema),
  cardController.createCard
);
cardRouter.post(
  "/card/:id/activate",
  schemaValidateMiddleware(activationSchema),
  cardController.activateCard
);
cardRouter.get(
  "/card/view",
  schemaValidateMiddleware(viewCardSchema),
  cardController.viewCards
);
cardRouter.get("/card/balance/:cardId", cardController.getBalanceCard);
cardRouter.put(
  "/card/:id/block",
  schemaValidateMiddleware(blockedSchema),
  cardController.blockedCard
);
cardRouter.put(
  "/card/:id/unblock",
  schemaValidateMiddleware(blockedSchema),
  cardController.unblockedCard
);

export { cardRouter };
