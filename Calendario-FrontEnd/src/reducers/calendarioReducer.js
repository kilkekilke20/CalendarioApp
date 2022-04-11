import { types } from '../types/types';

//estado inicial de los eventos del calendario
const initialState = {
    //eventos del calendaririo
    events: [],
    //objeto con todas las propiedades del evento
    activeEvent: null
};

export const calendarReducer = (state = initialState, action) => {

    switch (action.type) {

        //cuando se reciba una accion de este tipo, quiero una copia del state
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }

        //una vez que se envie la accion del calendarioModal (dispatch(eventAddNew({}) se maneja aqui
        case types.eventAddNew:
            return {
                //siempre se tiene que mandar el operador anterior como una copia
                ...state,
                //manejo los eventos
                events: [
                    ...state.events,
                    action.payload
                ]
            }

        //limpiar el evento
        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvent: null
            }

        //editar evento
        case types.eventUpdated:
            return {
                ...state,
                //necesito usar map para buscar el evento que quiero editar
                events: state.events.map(
                    e => (e.id === action.payload.id) ? action.payload : e
                )
            }
        //eliminar evento
        case types.eventDeleted:
            return {
                ...state,
                //uso filter para evitar devolver el que se esta borrando
                events: state.events.filter(
                    e => (e.id !== state.activeEvent.id)
                ),
                activeEvent: null
            }

        //cargar o mostrar los eventos en el calendario
        case types.eventLoaded:
            return {
                ...state,
                events: [...action.payload]
            }

        //limpiar el storage cuando cierro sesion
        case types.eventLogout:
            return {
                ...initialState
            }
        default:
            return state;
    }
}