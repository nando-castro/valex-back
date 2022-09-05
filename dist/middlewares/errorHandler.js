"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(error, req, res, next) {
    console.log(error);
    if (error.type === "unauthorized") {
        return res.status(401).send(error.message);
    }
    else if (error.type === "conflict") {
        return res.status(409).send(error.message);
    }
    else if (error.type === "not_found") {
        return res.status(404).send(error.message);
    }
    else if (error.type === "bad_request") {
        return res.status(400).send(error.message);
    }
    return res.sendStatus(500);
}
exports.default = errorHandler;
