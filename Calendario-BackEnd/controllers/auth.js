const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');
const asyncHandler = require('express-async-handler');

//parte logica de crear usuario(ruta)
//req es lo que la persona solicita y el resp es lo que respondemos
const crearUsuario = async (req, res = response) => {

    const { name, email, password } = req.body;

    try {

        //const usuario = new Usuario(req.body);
        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            })
        }

        usuario = new Usuario(req.body);

        //encriptar contraseña
        //en genSaltSync se puede indicar el numero de vueltas, enrte mas vueltas mas encriptada y compleja es la contraseña pero mas pesado se hace, 10 por defecto
        const salt = bcrypt.genSaltSync();
        //le añado la contraseña encriptada, primer argumento la contraseña que quiero encriptar y el segundo la contraseña encriptada
        usuario.password = bcrypt.hashSync(password, salt);

        //guarda el usuario en base de datos
        await usuario.save();

        //generar JWT(Json Web Token)
        const token = await generarJWT(usuario.id, usuario.name);

        //muestra el objeto
        //status 201 es que se creo correctamente
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        console.log(error);
        //lo siguiente solo lo vera el usuario, sin embargo el log anterior lo podra ver el administrador
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }



}

//parte logica de iniciarSesion (ruta)
const iniciarSesion = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        //voy a buscar un usuario por el email y lo voy a devolver
        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Email incorrecto'
            })
        }

        //confirmar contraseña
        //primer argumento: la contraseña que recibe, segundo argumento: la contraseña con la que lo quiere comparar
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            })
        }

        //generar JWT
        const token = await generarJWT(usuario.id, usuario.name);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })


    } catch (error) {
        console.log(error);
        //lo siguiente solo lo vera el usuario, sin embargo el log anterior lo podra ver el administrador
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }



}

//parte logica de revalidarToken(ruta), tambien sirve para saber si el token del usuario es valido
const revalidarToken = async (req, res = response) => {

    const { uid, name } = req;

    //generar un nuevo JWT y retornarlo en esta misma peticion
    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        token,
        name,
        uid
    })

}

//editar usuario
const updateUserProfile = async (req, res = response) => {

    //recoger el id y la contraseña
    const usuarioID = req.params.id;
    const { password } = req.body;

    try {

        //buscar un usuario por el id
        const usuario = await Usuario.findById(usuarioID);

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            })
        }

        //encriptar la contraseña y darle el valor a la contraseña del usuario
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //este es el usuario actualizado
        const nuevoUsuario = {
            //desestructuro todo lo que me manda (name,email,password)
            ...req.body,
            //pasarle la contraseña encriptada al usuario
            password: usuario.password
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate(usuarioID, nuevoUsuario, { new: true });

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });

    } catch (error) {
        console.log(error);
    }


};

// listado de los usuarios
const getUsuarios = async (req, res = response) => {

    //recoger el id y la contraseña
    const usuarioID = req.params.id;

    try {

        //buscar un usuario por el id
        const usuarios = await Usuario.findById({ _id: usuarioID });

        res.json({
            ok: true,
            usuarios
        });
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    crearUsuario,
    iniciarSesion,
    revalidarToken,
    updateUserProfile,
    getUsuarios
}