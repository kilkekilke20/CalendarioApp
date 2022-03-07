const { response } = require('express');
const { validationResult } =require('express-validator');

//validar los campos para por ejemplo iniciar sesion
const validarCampos = (req, res = response, next) => {

    //manejo de errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //respuesta es un 400 por que es un bad request
        //recordatorio, mirar la pagina para los status
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    next();
}

module.exports = {
    validarCampos
}