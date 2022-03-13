//aqui seguire la guia de mongoose
const {Schema, model} = require('mongoose');

//la tabla de usuario(una vez que se lanza mongodb crea la tabla automaticamente)
const UsuarioSchema = Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

});

//lo siguiente hara que se exporte el UsuarioSchema con el nombre Usuario a la base de datos, por lo que alli saldra Usuarios, siempre en plural
module.exports = model('Usuario', UsuarioSchema);