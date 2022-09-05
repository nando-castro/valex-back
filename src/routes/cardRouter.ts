import { Router } from "express";
import { blockedSchema } from './../schemas/blockedSchema';
import { activationSchema } from "./../schemas/activationSchema";
import { createCardSchema } from "./../schemas/cardSchema";
import * as cardController from "../controllers/cardController";
import { schemaValidateMiddleware } from "../middlewares/schemaValidateMiddleware";

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
cardRouter.put("/card/:id/blocked", schemaValidateMiddleware(blockedSchema), cardController.blockedCard)
cardRouter.put("/card/:id/unblocked", schemaValidateMiddleware(blockedSchema), cardController.unblockedCard)

export { cardRouter };
