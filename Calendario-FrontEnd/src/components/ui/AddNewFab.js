import React from 'react'
import { useDispatch } from 'react-redux'
import { uiOpenModal } from '../../actions/ui';

export const AddNewFab = () => {

  const dispatch = useDispatch();

  //esta funcion lo unico que hace es llamar a otra funcion para abrir el evento del modal, 
  //pude ponerlo dentro del onclick pero asi queda todo mas limpio
  const handleClickNew = () => {
    dispatch(uiOpenModal());
  }

  return (
    <button
      className="btn btn-primary fab"
      onClick={handleClickNew}
    >
      <i className="fas fa-plus"></i>
    </button>
  )
}
