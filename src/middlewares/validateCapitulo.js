const joi = require('joi');

const FAN = joi.object({
    id: joi.number().required(),
    numero: joi.string().required().min(2),
    paginas: joi.string().required(),
    titulo: joi.string().required()
});

function validateCapitulo(req, res, next) {
    const { id, numero, paginas, titulo } = req.body;

    const { error } = FAN.validate({ id, numero, paginas, titulo });
    if (error) {
        return next({ status: 400, message: error.details[0].message });
    }

    return next();
}

module.exports = validateCapitulo;