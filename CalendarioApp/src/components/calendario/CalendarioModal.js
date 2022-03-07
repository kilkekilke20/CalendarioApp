import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import moment from 'moment';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';

import { uiCloseModal } from '../../actions/ui';
import { eventAddNew, eventClearActiveEvent, eventSetActive, eventUpdated } from '../../actions/events';

//para el siguiente codigo voy a estar siguiendo la documentacion del modal, el enlace esta en README, 
//tambien para la parte del formulario del modal usare datetime-picket, documentacion en README
//basicamente el modal sirve para que me aparezcan a grandes rasgos eventos o ventanas emergentes, parecidos al alert, pero sera mucho mas sensillo para mi 
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
Modal.setAppElement('#root');

//la fecha iniciar sera siempre x+1:00:00 siendo x una hora mas a la que tienes ahora al igual que la de fin
const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');

//esto esta fuera de la funcion ya que cada vez que se hace un cambio no se vuelva a crear en una nueva constante
const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate()
}

export const CalendarioModal = () => {

    //aqui esta todo el estado de la aplicacion
    const { modalOpen } = useSelector(state => state.ui);
    const { activeEvent } = useSelector(state => state.calendar);
    const dispatch = useDispatch();

    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());
    const [titleValid, setTitleValid] = useState(true);

    //estado por defecto que va a tener la fecha
    const [formValues, setFormValues] = useState(initEvent);

    const { notes, title, start, end } = formValues;

    //muestro la informacion del evento en el modal cuando se abre
    useEffect(() => {
        if (activeEvent) {
            setFormValues(activeEvent);
        } else {
            setFormValues(initEvent);
        }
        //lo que esta entre[] basicamente hace que si algo cambia de eso, se vuelve a ejecturar el codigo anterior, viene bien porque la primera vez el activeEvent es null,
        //por lo que la segunda vez ya tendra un valor y se volvera a ejecutar
    }, [activeEvent, setFormValues]);


    //obtener la informacion del formulario, la funcion set la usare tanto en el start y end de la fecha como en el evento y notas, todo ello para recoger los valores
    //por eso se usa el ...formValues ya que recoge los datos de todo lo anterior y le añade algo nuevo(que tu pones)
    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    //funcion que cierra el modal
    const closeModal = () => {
        //cerrar el modal
        dispatch(uiCloseModal());
        
        //limpiar el modal
        //dispatch(eventSetActive(null))
        dispatch(eventClearActiveEvent());

        //cuando se cierra el modal y se vuelve a abrir los valores que coge son por defecto (antes tenia puesto un formaulario temporal como ejemplo)
        setFormValues(initEvent);
    }

    //set de fecha de inicio
    const handleStartDateChange = (e) => {
        setDateStart(e);
        setFormValues({
            ...formValues,
            start: e
        })
    }

    //set de fecha de fin
    const handleEndDateChange = (e) => {
        setDateEnd(e);
        setFormValues({
            ...formValues,
            end: e
        })
    }

    //guardar el formulario, si se hace un log se vera en la consola los datos guardados, se usa el preventDefault para que no se realice otra ejecucion
    const handleSubmitForm = (e) => {
        e.preventDefault();

        const momentStart = moment(start);
        const momentEnd = moment(end);

        //validacion para que no deje meter la misma fecha y hora
        //La fecha inicial no puede ser mayor o igual a la final
        if (momentStart.isSameOrAfter(momentEnd)) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'La fecha inicial no puede ser mayor o igual a la final',
            });
        }

        //hacer que el titulo tenga mas de dos letras
        if (title.trim().length < 2) {
            return setTitleValid(false);
        }

        //actualizar evento
        if (activeEvent) {
            dispatch(eventUpdated(formValues))
        } else {
            //crear uno nuevo
            //realizar el guardado del evento, tambien genera un id temporalmente, mas tarde lo hare con base de datos
            dispatch(eventAddNew({
                ...formValues,
                id: new Date().getTime(),
                user: {
                    _id: '123',
                    name: 'kilian'
                }
            }));
        }


        //Realizar el guardado en base de datos

        setTitleValid(true);
        closeModal();

    }

    return (
        <Modal
            //propiedad que se encarga de mostrar el modal
            isOpen={modalOpen}
            //lo siguiente sirve para ahcer animaciones cuando se cierra, etc
            //onAfterOpen={afterOpenModal}
            //tiempo para que se cierre en ms, recordatorio, esos 200ms se cambian tambien en el css
            closeTimeoutMS={200}
            onRequestClose={closeModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"

        //lo siguiente es el formulario para la hora, fecha, titulo etc... solo es html
        >
            <h1> {(activeEvent) ? 'Editar Evento' : 'Nuevo evento'} </h1>
            <hr />
            <form
                className="container"
                onSubmit={handleSubmitForm}
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={handleStartDateChange}
                        value={dateStart}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={handleEndDateChange}
                        value={dateEnd}
                        //la fecha minima va a ser la de dateStart
                        minDate={dateStart}
                        className="form-control"
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        //aqui hago uso de la funcion que se muestra en la linea 31 y 93 donde si el titulo es valido sale en verde si no sale en rojo (si es true o false)
                        className={`form-control ${!titleValid && 'is-invalid'}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
