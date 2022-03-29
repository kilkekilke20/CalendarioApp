const mongoose = require('mongoose');

//conectarse a la base de datos
const dbConnection = async () => {

    try {
        //en la ultima version de mongoose solo hace falta la direccion
        await mongoose.connect(
            process.env.DB_CNN
        );

    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la base de datos');
    }

}

module.exports = {
    dbConnection
}