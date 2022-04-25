const { response } = require("express")
const Evento = require('../models/Evento')

// listado de todos los eventos
const getEventos = async (req, res) => {

    //mustra los datos de los eventos, y como solo sale el user la id con populate eliges que mas mostrar, en mi caso el nombre, ya que esto se mostrara en el front
    const eventos = await Evento.find().populate('user', 'name');

    res.json({
        ok: true,
        eventos
    })
}

// crear evento
const crearEvento = async (req, res) => {

    //guardar evento en la base de datos
    // Recordar que el req.body son todos los datos que recojo (de los cuales se guardan los que yo elegi en models, asi que cualquier otra informacion sera ignorada)
    const evento = new Evento(req.body);

    try {

        //recoger el id del usuario
        evento.user = req.uid;

        const GuardarEvento = await evento.save();

        res.json({
            ok: true,
            evento: GuardarEvento
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'UPS algo ha salido mal'
        })

    }

}

//actualizar
const actualizarEvento = async (req, res) => {

    //recoger el id
    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        //verificar si el vento existe
        const evento = await Evento.findById(eventoId);

        //si el evento existe
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un evento con ese id'
            })
        }

        // si el usuario es diferente al uid, basicamente una persona intentando editar el evento de otra
        if (evento.user.toString() !== uid) {

            return res.status(401).json({
                ok: false,
                msg: 'No tiene los permisos para editar este evento'
            })

        }

        //este es el evento actualizado
        const nuevoEvento = {
            //desestructuro todo lo que me manda (title,start,end,notes)
            ...req.body,
            //y al parecer no me envia el uid por lo que se lo agrego
            user: uid
        }

        //actualizar el evento
        //findByIdAndUpdate(id del evento a actualizar, los datos nuevos, evento con los datos que acabo de introducir(si no me envia los anteriores))
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });

        res.json({
            ok: true,
            evento: eventoActualizado
        });

    } catch (error) {
        console.log(error);
        // 500 problema interno
        res.status(500).json({
            ok: false,
            msg: 'UPS algo ha salido mal'
        })
    }

}

//eliminar evento
const eliminarEvento = async (req, res) => {

    //recoger el id
    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        //verificar si el vento existe
        const evento = await Evento.findById(eventoId);

        //si el evento existe
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un evento con ese id'
            })
        }

        // si el usuario es diferente al uid, basicamente una persona intentando editar el evento de otra
        if (evento.user.toString() !== uid) {

            return res.status(401).json({
                ok: false,
                msg: 'No tiene los permisos para eliminar este evento'
            })

        }

        //actualizar el evento
        //findByIdAndDelete(id elemento a borrar)
        await Evento.findByIdAndDelete(eventoId);

        res.json({
            ok: true
        });

    } catch (error) {
        console.log(error);
        // 500 problema interno
        res.status(500).json({
            ok: false,
            msg: 'UPS algo ha salido mal'
        })
    }
}

module.exports = {
    getEventos,
    crearEvento,
    eliminarEvento,
    actualizarEvento
}







