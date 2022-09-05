import Joi from "joi";

export const viewCardSchema = Joi.object({
    employeeId: Joi.number().required(),
    cardType: Joi.string().valid("groceries", "restaurants", "transport", "education", "health").required(),
    password: Joi.string().min(4).max(4).pattern(/^[0-9]+$/).required(),
})