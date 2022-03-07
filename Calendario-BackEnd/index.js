const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();

//crear el servidor de express
const app = express();

// coneccion a DB
dbConnection();

//CORS
app.use(cors());

//Carpeta publica
app.use( express.static('public') );

//lectura del body, las peticiones que vengan en formato json las proceso y extraigo su contenido
//fallo que tuve, hay orden en cuanto a las rutas, por lo que hay que mirar cual va primero
app.use(express.json());

//rutas
app.use('/api/auth', require('./routes/auth'));

// escuchar peticiones, no poner el puerto 3000 porque ese es del react
app.listen( process.env.PORT, () => {
    console.log(`Servidor en ${process.env.PORT}`);
} );