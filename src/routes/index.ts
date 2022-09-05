import { Router } from "express";
import * as routes from "./cardRouter";
import { rechageRouter } from "./rechargeRouter";

const router = Router();

router.use(routes.cardRouter);
router.use(rechageRouter);

export default router;
