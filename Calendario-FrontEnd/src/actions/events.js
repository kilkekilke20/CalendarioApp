import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { modificarEventos } from "../helpers/modificarEventos";
import { types } from "../types/types";

//guardar el evento en la base de datos
//tanto en el crear, editar,borrar y mostrar se hacen practicamente iguales, solo cambia algunos detalles como el tipo de peticion 
//o algun detalle como el cambio de tipo de dato String>Date
export const eventStartAddNew = (event) => {

    return async (dispatch, getState) =>{
        
        const {uid, name} = getState().auth;

        try {
            //1: donde se envia la informacion (/events), 2 lo que quiero enviar, 3 el tipo de peticion
            const resp = await fetchConToken('events', event, 'POST');
            const body = await resp.json();

            if (body.ok) {
                //hay que añadirle el id
                event.id = body.evento.id;
                event.user = {
                    _id: uid,
                    name: name
                };

                dispatch(eventAddNew(event) );
            }
        } catch (error) {
            
            console.log(error);
        }  
    }
}

//recibe el evento que quiero guardar
export const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

//limpia la nota activa
export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvent
});

//editar el evento en la base de datos
export const eventStartUpdate = (event) => {
    return async(dispatch) => {

        try {
            
            //1: donde se envia la informacion (/events/id), 2 lo que quiero enviar, 3 el tipo de peticion
            const resp = await fetchConToken(`events/${event.id}`,event,'PUT');
            const body = await resp.json();

            //si todo esta ok se dispara la accion
            if (body.ok) {
                dispatch(eventUpdated(event));
            } else {
                Swal.fire('Error',body.msg, 'error');
            }


        } catch (error) {
            console.log(error);
        }

    }
}

//editar evento
const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
});

//eliminar  el vento de la base de datos
export const eventStartDelete = (event) => {
    return async(dispatch, getState) => {

        const {id} = getState().calendar.activeEvent;

        try {
            
            //1: donde se envia la informacion (/events/id), 2 lo que quiero enviar(en mi caso nada pero se podria enviar algo como un mensage), 3 el tipo de peticion
            const resp = await fetchConToken(`events/${id}`,{},'DELETE');
            const body = await resp.json();

            if (body.ok) {
                dispatch(eventDeleted(event));
                return Swal.fire('Eliminado!', 'El evento se ha eliminado', 'success');
            } else {
                Swal.fire('Error',body.msg, 'error');
            }


        } catch (error) {
            console.log(error);
        }
    }
}

//eliminar evento
const eventDeleted = () => ({
    type: types.eventDeleted
});


//mostrar los eventos de la base de datos
export const eventStartLoading = () => {
    return async(dispatch) => {

        try {
            
            const resp = await fetchConToken('events');
            const body = await resp.json();

            //la fecha no esta en el formato adecuado por lo que hay que ponerlo, la siguiente funcion hara eso y en caso de que se necesite de alguna modificacion 
            //de los eventos tambien se hara ahi, en este caso los valores se guardaba como String y hay que pasarlo a tipo Date
            const events = modificarEventos(body.eventos);

            dispatch(eventLoaded(events))

        } catch (error) {
            console.log(error);
        }

    }
}

//cargar los eventos en el calendarioScreen
const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
})

//limpio el store cuando cierra sesion
export const eventLogout = () =>({
    type: types.eventLogout
})