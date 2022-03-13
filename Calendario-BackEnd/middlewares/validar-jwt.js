const { response } = require("express");
const JWT = require("jsonwebtoken");


//validar el JWT
const validarJWT = (req, res=response, next) => {

    // x-token headers
    const token = req.header('x-token');

    //mirar si el token existe
    if ( !token ) {
        // status(401) es si no esta autentificado
        return res.status(401).json({
            ok: false,
            msg: 'No estas autentificado'
        });
    }

    try {
        // en  process.env.SECRET_JWT_SEED llamo a la semilla del JWT en el .env
        const {uid, name} = JWT.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.uid = uid;
        req.name = name;


    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })


    }
    
    next();

}


module.exports = {
    validarJWT
}