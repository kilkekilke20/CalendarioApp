//clases del react
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

//mis propias clases
import { NavBar } from '../ui/NavBar';
import { messages } from '../../helpers/calendar-messages';
import { CalendarioEvent } from './CalendarioEvent';
import { CalendarioModal } from './CalendarioModal';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';


//css y varios
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';





moment.locale('es');

const localizer = momentLocalizer(moment);


//la parte visual del calendario
export const CalendarioScreen = () => {

  const dispatch = useDispatch();

  //mostrar el usuario que creo el evento en el calendario
  //del calendario me interesa sacar los eventos, el use selector selecciona todo los estados del calendario
  const { events, activeEvent } = useSelector(state => state.calendar);

  const { uid } = useSelector(state => state.auth);

  //es la continuacion del onViewChange, pero aqui recoges el valor 
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  useEffect(() => {
  
    dispatch(eventStartLoading());
  
  }, [dispatch]);
  

  //cuando se hace doble click en un evento, aparece la informacion, lo usare para editarlo
  const onDoubleClick = (e) => {
    // console.log(e);
    dispatch(uiOpenModal());

  }

  //cuando se hace click en un evento, lo usare para seleccionarlo
  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));
  }

  //cuando se hace un cambio, la informacion se guardara en el almacenamiento local, de manera que con la siguiente funcion, cuando abres la pagina
  //apareceras en la ultima que editaste, esto se ve mejor si vas a: F12>aplicacion>local storage> ahi veras que se esta guardando la ultima pagina visitada
  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem('lastView', e);
  }

  const onSelectSlot = (e) => {
    // console.log(e)
    dispatch(eventClearActiveEvent());
  }

  const eventStyleGetter = (event, start, end, isSelected) => {

    const style = {
      //un condicional, lo que hace es si una persona esta en el calendarioScreen, los eventos creados por el aparecera de un color, y los que no de otro
      backgroundColor: (uid===event.user._id) ? '#367CF7' : '#808080',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white'
    }

    return {
      style
    }
  };

  //toda esta parte sirve para que se muestre el calendario, es decir la parte visual en si
  return (
    <div className='calendar-screen'>
      <NavBar />


      <Calendar
        //todas las funciones de la api se ponen aqui
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        //style={{ height: 500 }}
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        onSelectSlot={onSelectSlot}
        selectable={true}
        view={lastView}
        components={{
          event: CalendarioEvent
        }}
      />

      <AddNewFab />

      {
        (activeEvent) && <DeleteEventFab />
      }

      <CalendarioModal />
    </div>
  )
}
