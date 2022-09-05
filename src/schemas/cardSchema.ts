import Joi from "joi";

export const createCardSchema = Joi.object({
    employeeId: Joi.number().required(),
    cardType: Joi.string().valid("groceries", "restaurants", "transport", "education", "health").required()
})