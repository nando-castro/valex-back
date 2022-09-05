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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCard = exports.activationCard = exports.unblockedCard = exports.blockedCard = exports.getBalanceCard = exports.viewCards = void 0;
const cardRepository = __importStar(require("./../repositories/cardRepository"));
const companyRepository = __importStar(require("../repositories/companyRepository"));
const employeeRepository = __importStar(require("../repositories/employeeRepository"));
const purchaseRepository = __importStar(require("../repositories/paymentRepository"));
const rechargeRepository = __importStar(require("../repositories/rechargeRepository"));
const faker_1 = require("@faker-js/faker");
const dayjs_1 = __importDefault(require("dayjs"));
const cryptr_1 = __importDefault(require("cryptr"));
const purchaseService_1 = require("./purchaseService");
const cryptr = new cryptr_1.default("SecretKey");
//const cryptr = new Cryptr(process.env.SECRET_KEY);
function viewCards(employeeId, cardtype, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const employee = yield employeeRepository.findById(employeeId);
        if (!employee) {
            throw { type: "not_found", message: "employee no data in the database" };
        }
        const card = yield cardRepository.findByTypeAndEmployeeId(cardtype, employeeId);
        if (!card) {
            throw { type: "not_found", message: "no data in the database" };
        }
        const dateToday = (0, dayjs_1.default)().format("MM/YY");
        if ((0, dayjs_1.default)(dateToday).isAfter((0, dayjs_1.default)(card.expirationDate))) {
            throw { type: "bad_request", message: "expired card" };
        }
        if (card.isBlocked) {
            throw { type: "not_found", message: "no data in the database" };
        }
        const decryptPassword = cryptr.decrypt(`${card.password}`);
        if (decryptPassword !== password) {
            throw { type: "unauthorized", message: "incorrect card password" };
        }
        const decryptCode = cryptr.decrypt(card.securityCode);
        const formatNumberCard = card.number.replace(/-/g, " ");
        const cardInfos = {
            number: formatNumberCard,
            cardholderName: card.cardholderName,
            expirationDate: card.expirationDate,
            securityCode: decryptCode,
        };
        return {
            cards: cardInfos,
        };
    });
}
exports.viewCards = viewCards;
function getBalanceCard(cardId) {
    return __awaiter(this, void 0, void 0, function* () {
        const card = yield cardRepository.findById(cardId);
        if (!card) {
            throw { type: "not_found", message: "no data in the database" };
        }
        const amountPurchase = yield purchaseRepository.findByCardId(cardId);
        const amountBalance = yield rechargeRepository.findByCardId(cardId);
        const balanceCard = yield (0, purchaseService_1.checkBalance)(amountPurchase, amountBalance);
        return {
            balance: balanceCard,
            transactions: amountPurchase,
            recharges: amountBalance,
        };
    });
}
exports.getBalanceCard = getBalanceCard;
function blockedCard(id, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const card = yield cardRepository.findById(id);
        if (!card) {
            throw { type: "not_found", message: "no data in the database" };
        }
        const dateToday = (0, dayjs_1.default)().format("MM/YY");
        if ((0, dayjs_1.default)(dateToday).isAfter((0, dayjs_1.default)(card.expirationDate))) {
            throw { type: "bad_request", message: "expired card" };
        }
        if (card.isBlocked) {
            throw { type: "not_found", message: "no data in the database" };
        }
        const decryptPassword = cryptr.decrypt(`${card.password}`);
        if (decryptPassword !== password) {
            throw { type: "unauthorized", message: "incorrect card password" };
        }
        yield cardRepository.update(id, { isBlocked: true });
    });
}
exports.blockedCard = blockedCard;
function unblockedCard(id, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const card = yield cardRepository.findById(id);
        if (!card) {
            throw { type: "not_found", message: "no data in the database" };
        }
        const dateToday = (0, dayjs_1.default)().format("MM/YY");
        if ((0, dayjs_1.default)(dateToday).isAfter((0, dayjs_1.default)(card.expirationDate))) {
            throw { type: "bad_request", message: "expired card" };
        }
        if (!card.isBlocked) {
            throw { type: "not_found", message: "no data in the database" };
        }
        const decryptPassword = cryptr.decrypt(`${card.password}`);
        if (decryptPassword !== password) {
            throw { type: "unauthorized", message: "incorrect card password" };
        }
        yield cardRepository.update(id, { isBlocked: false });
    });
}
exports.unblockedCard = unblockedCard;
function activationCard(id, cvc, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const card = yield cardRepository.findById(id);
        if (!card) {
            throw { type: "not_found", message: "no data in the database" };
        }
        const dateToday = (0, dayjs_1.default)().format("MM/YY");
        if ((0, dayjs_1.default)(dateToday).isAfter((0, dayjs_1.default)(card.expirationDate))) {
            throw { type: "bad_request", message: "expired card" };
        }
        if (card.password) {
            throw { type: "conflict", message: "card already has password" };
        }
        const checkCVC = cryptr.decrypt(card.securityCode);
        if (checkCVC !== cvc) {
            throw { type: "unauthorized", message: "unauthorized" };
        }
        if (!Number(password) || password.length != 4) {
            throw { type: "bad_request", message: "password in wrong format" };
        }
        const encryptPassword = cryptr.encrypt(password);
        yield cardRepository.update(id, {
            password: encryptPassword,
            isBlocked: false,
        });
    });
}
exports.activationCard = activationCard;
function createCard(apiKey, employeeId, cardType) {
    return __awaiter(this, void 0, void 0, function* () {
        const company = yield validateApiKey(apiKey);
        const employee = yield validateEmployee(employeeId);
        const cardExists = yield validateCardType(cardType, employeeId);
        const numberCard = faker_1.faker.finance.creditCardNumber("mastercard");
        const cardholderName = formatNameCard(employee.fullName);
        const expirationDate = (0, dayjs_1.default)().add(5, "year").format("MM/YY");
        const securityCode = faker_1.faker.finance.creditCardCVV();
        const encryptedCVV = cryptr.encrypt(securityCode);
        const card = {
            employeeId,
            number: numberCard,
            cardholderName,
            securityCode: encryptedCVV,
            expirationDate,
            isVirtual: false,
            originalCardId: undefined,
            isBlocked: true,
            type: cardType,
        };
        yield cardRepository.insert(card);
        console.log(securityCode);
        return { card, securityCode };
    });
}
exports.createCard = createCard;
function validateCardType(cardType, employeeId) {
    return __awaiter(this, void 0, void 0, function* () {
        const card = yield cardRepository.findByTypeAndEmployeeId(cardType, employeeId);
        if (card) {
            throw {
                type: "conflict",
                message: "employee already have a card with this type",
            };
        }
        return card;
    });
}
function validateEmployee(employeeId) {
    return __awaiter(this, void 0, void 0, function* () {
        const employee = yield employeeRepository.findById(employeeId);
        if (!employee) {
            throw { type: "not_found", message: "no data in the database" };
        }
        return employee;
    });
}
function validateApiKey(apiKey) {
    return __awaiter(this, void 0, void 0, function* () {
        const validApiKey = yield companyRepository.findByApiKey(apiKey);
        if (!validApiKey)
            throw {
                type: "unauthorized",
                message: "api key invalid",
            };
        return validApiKey;
    });
}
function formatNameCard(nameEmployee) {
    const nameArray = nameEmployee.split(" ");
    const name = [nameArray[0]];
    for (let i = 0; i < nameArray.length - 1; i++) {
        if (nameArray[i].length >= 3) {
            name.push(name[i][0]);
        }
    }
    name.push(nameArray[nameArray.length - 1]);
    return name.join(" ").toUpperCase();
}
