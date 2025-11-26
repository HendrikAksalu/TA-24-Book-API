import Joi from "joi";

export const authorSchema = Joi.object({
    name: Joi.string().max(255).required(),
    bio: Joi.string().required(),
    avatar_url: Joi.string().uri().required(),
    birth_year: Joi.number().integer().positive().required()
});
