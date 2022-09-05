import { Router } from "express";
import * as cardController from "../controllers/cardController";

const cardRouter = Router();

cardRouter.post("/card", cardController.createCard);
cardRouter.post("/card/:id/activate", cardController.activateCard);

export { cardRouter };
