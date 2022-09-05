"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchaseRouter = void 0;
const express_1 = require("express");
const purchaseController_1 = require("../controllers/purchaseController");
const schemaValidateMiddleware_1 = require("../middlewares/schemaValidateMiddleware");
const purchaseSchema_1 = require("../schemas/purchaseSchema");
const purchaseRouter = (0, express_1.Router)();
exports.purchaseRouter = purchaseRouter;
purchaseRouter.post("/purchase", (0, schemaValidateMiddleware_1.schemaValidateMiddleware)(purchaseSchema_1.purchaseSchema), purchaseController_1.purchase);
