// rutas de usuarios /Auth
// host + /api/auth

const { Router } = require('express');
const {check} = require('express-validator');

//importar las funciones
const { crearUsuario,iniciarSesion, revalidarToken  } =require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();



//crear usuario
router.post('/new',
//[] colleccion de middlewares
    [
        //('lo que quiero que haga check', 'el mensage de error')
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña es demasiado corta').isLength({min: 6}),
        validarCampos
    ],
    crearUsuario 
);

// login
router.post('/',
[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es demasiado corta').isLength({min: 6}),
    validarCampos
],
 iniciarSesion);

//generar token
router.get('/renew', validarJWT, revalidarToken);

module.exports = router;