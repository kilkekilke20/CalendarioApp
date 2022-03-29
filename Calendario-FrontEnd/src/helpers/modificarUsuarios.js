import moment from 'moment';


//modifica los tipos de datos de los eventos
export const modificarUsuarios = (events = [] ) => {
  
    return users.map(
        (e)=>({
            //recoge todos los valores del evento
            ...e,
            //lo siguiente son los valores que quiero modificar
            end: moment(e.end).toDate(),
            start: moment(e.start).toDate()
        })
    );

}
