import { Router } from "express";
import * as routes from "./cardRouter";

const router = Router();

router.use(routes.cardRouter);

export default router;
