"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchaseSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.purchaseSchema = joi_1.default.object({
    cardId: joi_1.default.number().integer().required(),
    password: joi_1.default.string().min(4).max(4).pattern(/^[0-9]+$/).required(),
    businessId: joi_1.default.number().integer().required(),
    amount: joi_1.default.number().greater(0).required()
});
