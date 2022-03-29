const JWT = require('jsonwebtoken');

const generarJWT = (uid, name) => {


    return new Promise((resolve, reject) => {

        const payload = { uid, name };

        //generar token
        //argumento 1:payload
        //argumento 2: llave secreta o semilla del token(se genera en el .env)
        //argumento 3: las opciones del token
        JWT.sign(payload, process.env.SECRET_JWT_SEED, {
            //expira en 2 horaas
            expiresIn: '2h'
            //una vez que se firma se llama al callback
        }, (err, token) => {

            //si no se pudo generar el token se muestra el error
            if (err) {
                console.log(err);
                reject('No se pudo generar el token')
            }

            //si todo va bien pues se resuelve
            resolve(token);
        });

    })


}

module.exports = {
    generarJWT
}