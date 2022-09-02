import { Router } from "express";
import { testeRouter } from "./testeRoute";

const router = Router();

router.use(testeRouter);

export default router;