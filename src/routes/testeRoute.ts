import { Router } from "express";
import * as testeController from "../controllers/teste";

const testeRouter = Router();

testeRouter.get("/teste", testeController.testeController);

export { testeRouter };
