import moment from 'moment'
import { types } from '../types/types';

//esto es temporal, mas adelante se cambiara y se leera directamente desde la base de datos
const initialState = {
    //eventos del calendaririo
    events: [{
        id: new Date().getTime(),
        title: 'estoy currando',
        start: moment().toDate(),// es lo mismo que usar new Date() pero con moment
        end: moment().add(2, 'hours').toDate(),
        bgcolor: '#fafafa',
        user: {
            _id: '123',
            name: 'kilian'
        }
    }],
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
        default:
            return state;
    }
}