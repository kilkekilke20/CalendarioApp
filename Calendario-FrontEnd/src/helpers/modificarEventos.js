import moment from 'moment';


//modifica los tipos de datos de los eventos
export const modificarEventos = (events = [] ) => {
  
    return events.map(
        (e)=>({
            //recoge todos los valores del evento
            ...e,
            //lo siguiente son los valores que quiero modificar
            end: moment(e.end).toDate(),
            start: moment(e.start).toDate()
        })
    );

}
