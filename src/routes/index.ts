import { Router } from "express";
import * as routes from "./cardRouter";
import { purchaseRouter } from "./purchaseRouter";
import { rechageRouter } from "./rechargeRouter";

const router = Router();

router.use(routes.cardRouter);
router.use(rechageRouter);
router.use(purchaseRouter);

export default router;
