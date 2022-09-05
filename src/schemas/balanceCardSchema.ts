import Joi from "joi";

export const balanceCardSchema = Joi.object({
    cardId: Joi.number().required(),
})