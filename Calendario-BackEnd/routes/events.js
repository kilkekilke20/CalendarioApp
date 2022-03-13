// Cuando yo haga la llamada de uno de estos eventos va a retornar lo que este en controllers/events.js del dicho evento
// Todas tienen que pasar por la validacion del JWT
// Obtener los eventos

const {Router} = require('express');
const { check } = require('express-validator');

const { getEventos, crearEvento, eliminarEvento, actualizarEvento } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');

//al ser eso un middleware tengo que colocarselo a cada una de las siguientes peticiones
const {validarJWT} = require('../middlewares/validar-jwt');
const router = Router();

// Recordatorio: al hacerlo en postam acordarse de hacer el login y copiar el token en el evento que vaya a probar
// al poner el middleware de validarJWT siempre se necesitara tener un inicio de sesion activo, por lo que se hace practicamente solo ya que la funcion sirve para todo
// al hacer esto le digo que cualquie peticion que se encuetre justo debajo va a tener que pasar por el validarJWT, por lo que no tengo que copiar y pegar la misma funcion en cada una de las lineas
// Recordatorio: si llego a hacer paginas publicas o privadas basta con mover el validarJWT a una linea o nivel mas bajo ya que los que necesitan token son privados y el resto no
router.use ( validarJWT );


// obtener Eventos
router.get('/', getEventos);


// crear un nuevo eventos
router.post(
    '/', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),

        //express validator no tiene para validar fechas por lo que las hare personalizada
        // el custom esta esperando una funcion para validar el campo
        check('start', 'Fecha de inicio es obligatorio').custom( isDate ),
        check('end', 'Fecha de fin es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento
);


// Actualizar eventos
router.put(
    '/:id', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatorio').custom( isDate ),
        check('end', 'Fecha de fin es obligatoria').custom( isDate ),
        validarCampos
    ],
    actualizarEvento);


// Borrar evento
router.delete('/:id', eliminarEvento);



module.exports= router;