"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardRouter = void 0;
const express_1 = require("express");
const blockedSchema_1 = require("./../schemas/blockedSchema");
const activationSchema_1 = require("./../schemas/activationSchema");
const cardSchema_1 = require("./../schemas/cardSchema");
const cardController = __importStar(require("../controllers/cardController"));
const schemaValidateMiddleware_1 = require("../middlewares/schemaValidateMiddleware");
const viewCardSchema_1 = require("../schemas/viewCardSchema");
const cardRouter = (0, express_1.Router)();
exports.cardRouter = cardRouter;
cardRouter.post("/card", (0, schemaValidateMiddleware_1.schemaValidateMiddleware)(cardSchema_1.createCardSchema), cardController.createCard);
cardRouter.post("/card/:id/activate", (0, schemaValidateMiddleware_1.schemaValidateMiddleware)(activationSchema_1.activationSchema), cardController.activateCard);
cardRouter.get("/card", (0, schemaValidateMiddleware_1.schemaValidateMiddleware)(viewCardSchema_1.viewCardSchema), cardController.viewCards);
cardRouter.get("/balance/:cardId", cardController.getBalanceCard);
cardRouter.put("/card/:id/blocked", (0, schemaValidateMiddleware_1.schemaValidateMiddleware)(blockedSchema_1.blockedSchema), cardController.blockedCard);
cardRouter.put("/card/:id/unblocked", (0, schemaValidateMiddleware_1.schemaValidateMiddleware)(blockedSchema_1.blockedSchema), cardController.unblockedCard);
