import Joi from "joi";

export const blockedSchema = Joi.object({
    password: Joi.string().min(4).max(4).pattern(/^[0-9]+$/).required(),
})
