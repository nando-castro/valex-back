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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unblockedCard = exports.blockedCard = exports.activateCard = exports.getBalanceCard = exports.viewCards = exports.createCard = void 0;
const cardService = __importStar(require("../services/cardService"));
function createCard(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiKey = req.headers["x-api-key"];
        const { employeeId, cardType, } = req.body;
        if (!apiKey)
            return res.sendStatus(401);
        const newCard = yield cardService.createCard(apiKey, employeeId, cardType);
        res.status(201).send(newCard);
    });
}
exports.createCard = createCard;
function viewCards(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { employeeId, cardType, password } = req.body;
        const cardInfo = yield cardService.viewCards(employeeId, cardType, password);
        return res.status(200).send(cardInfo);
    });
}
exports.viewCards = viewCards;
function getBalanceCard(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { cardId } = req.params;
        const cardBalance = yield cardService.getBalanceCard(Number(cardId));
        return res.status(200).send(cardBalance);
    });
}
exports.getBalanceCard = getBalanceCard;
function activateCard(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const { cvc, password } = req.body;
        yield cardService.activationCard(Number(id), cvc, password);
        return res.sendStatus(200);
    });
}
exports.activateCard = activateCard;
function blockedCard(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const { password } = req.body;
        yield cardService.blockedCard(Number(id), password);
        return res.sendStatus(200);
    });
}
exports.blockedCard = blockedCard;
function unblockedCard(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const { password } = req.body;
        yield cardService.unblockedCard(Number(id), password);
        return res.sendStatus(200);
    });
}
exports.unblockedCard = unblockedCard;
