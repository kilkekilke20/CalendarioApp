const moment = require('moment')

//validar la fecha
const isDate = ( value ) => {

    //verificar si el value existe
    if( !value ) {
        return false
    }

    //le mando los valores a moment y el se encarga de decirme si es una fecha correcta
    const fecha = moment( value );
    if (fecha.isValid()){
        return true;
    }else {
        return false;
    }
}


module.exports = {
    isDate
}