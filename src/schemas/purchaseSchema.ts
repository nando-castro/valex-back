import Joi from "joi";

export const purchaseSchema = Joi.object({
    cardId: Joi.number().integer().required(),
    password: Joi.string().min(4).max(4).pattern(/^[0-9]+$/).required(),
    businessId: Joi.number().integer().required(),
    amount: Joi.number().greater(0).required()
})