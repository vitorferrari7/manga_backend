const Joi = require('joi');

const FAN = Joi.object({
  id: Joi.number().required(),
  nome: Joi.string().required().min(2)
});

const validateGenero = (req, res, next) => {
  const { error } = FAN.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

module.exports = validateGenero;
