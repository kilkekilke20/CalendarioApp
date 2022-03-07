import { types } from "../types/types";


//recibe el evento que quiero grabar
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

//editar evento
export const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
});

//eliminar evento
export const eventDeleted = () => ({
    type: types.eventDeleted
});