import Joi from "joi";

export const rechargeSchema = Joi.object({
    amount: Joi.number().greater(0).required()
})
