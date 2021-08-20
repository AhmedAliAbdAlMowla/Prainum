const Joi = require("joi");

/**
 * @desc     Validate signup
 * @returns  Result after validate user
 */
module.exports.signupValidator = (user) => {
  const schema = Joi.object({
    firstName: Joi.string().max(50).min(2).required(),
    lastName: Joi.string().max(50).min(2).required(),
    email: Joi.string().max(100).min(5).email().required(),

    password: Joi.string()
      .max(15)
      .min(8)
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
      .required()
      .label("password")
      .messages({
        "string.min": "password must at least 8 characters",
        "object.regex": "password must have at least 8 characters",
        "string.pattern.base":
          "password must have at least 1 uppercase lowercase special character and number",
      }),

    phoneNumber: Joi.string().min(4).required(),
  });

  return schema.validate(user);
};

/**
 * @desc     Validate login
 * @returns  Result after validate user
 */
module.exports.loginValidator = (user) => {
  const schema = Joi.object({
    email: Joi.string().max(100).min(5).email().required(),
    password: Joi.string()
      .max(15)
      .min(8)
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
      .required()
      .label("password")
      .messages({
        "string.min": "password must at least 8 characters",
        "object.regex": "password must have at least 8 characters",
        "string.pattern.base":
          "password must have at least 1 uppercase lowercase special character and number",
      }),
  });
  return schema.validate(user);
};
