import React from 'react'
import { useDispatch } from 'react-redux'
import { eventStartDelete } from '../../actions/events';
import Swal from "sweetalert2";

export const DeleteEventFab = () => {

  const dispatch = useDispatch();

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  const handleDelete = () => {
    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro?',
      text: "No se podra revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      //si el usuario confirme el borrado, se borrara el evento, si no no
      if (result.isConfirmed) {
        dispatch(eventStartDelete());
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire('Cancelado','Se ha cancelado el borrado','error')
      }
    }
      )
  }

    
    

  return (
    <button
      className="btn btn-danger fab-danger"
      onClick={handleDelete}
    >
      <i className="fas fa-trash"></i>
      <span> Borrar evento </span>
    </button>
  )
}
