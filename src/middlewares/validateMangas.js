const joi = require('joi');

const FAN = joi.object({
    id: joi.number().required(),
    nome: joi.string().required(),
    capitulos: joi.number().required(),
    paginas: joi.number().required(),
});

function validateMangas(req, res, next) {
    const { id,nome, capitulos, paginas, } = req.body;

    const { error } = FAN.validate({ id,nome, capitulos, paginas });
    if (error) {
        return next({ status: 400, message: error.details[0].message });
    }

    return next();
}

module.exports = validateMangas;