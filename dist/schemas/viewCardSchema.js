"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewCardSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.viewCardSchema = joi_1.default.object({
    employeeId: joi_1.default.number().required(),
    cardType: joi_1.default.string().valid("groceries", "restaurants", "transport", "education", "health").required(),
    password: joi_1.default.string().min(4).max(4).pattern(/^[0-9]+$/).required(),
});
