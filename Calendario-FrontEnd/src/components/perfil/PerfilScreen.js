import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavBar } from '../ui/NavBar';
import { eventStartUpdateProfile, userStartLoading } from '../../actions/auth';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
//import "./PerfilScreen.css";

//creo un init event para el formulario vacio
const initEvent = {
  name: '',
  email: '',
  password: ''
}
//creo un init event para la validacion de contraseña vacia
const initEvent1 = {
  password1: ''
}

export const PerfilScreen = () => {

  const dispatch = useDispatch();

  //extraer los valores del usuario
  const [formValues, setFormValues] = useState(initEvent);
  const usuario = useSelector(state => state.auth);
  const { name, email, password } = formValues;

  //necesito crear un formvalues auxiliar para poner la validacion de contraseña
  const [formValues1, setFormValues1] = useState(initEvent1);
  const {password1} = formValues1;

  //recojo el valor del usuario, me devuelve una promesa
  const PromesaUsuarios = dispatch(userStartLoading(usuario.uid));

  //si existe la promesa con los datos del usuario pues se pone los valores, si no pues se pone el formulario vacio
  useEffect(() => {
    if (PromesaUsuarios) {
      const password1 = '';
      //introduzco los valores de la promesa en el formvalues
      PromesaUsuarios.then((value) => {
        let name = value.name;
        let email = value.email;
        let password = '';

        setFormValues({
          name,
          email,
          password
        });
        setFormValues1({password1});
      });

    } else {
      //evento sin datos
      setFormValues(initEvent);
    }
  }, [usuario, setFormValues]);


  const handleEditInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    });
    setFormValues1({
      ...formValues1,
      [target.name]: target.value
    });
  }

  const handleEdit = (e) => {
    e.preventDefault();
    Swal.fire({ title: '¿Quieres guardar los cambios?', showDenyButton: true, showCancelButton: true, confirmButtonText: 'Save', denyButtonText: `Don't save`, })
      .then((result) => {
        //si el usuario confirme el guardado, se guardaran los cambios, si no no
        if (result.isConfirmed) {
          if (password===password1) {
            dispatch(eventStartUpdateProfile(usuario.uid, formValues));
          }else{
            Swal.fire('Las contraseñas son distintas', '', 'info')
          }
        } else if (result.isDenied) {
          Swal.fire('No se han cambiado los cambios', '', 'info')
        }
      })
  };

  return (

    <div>
      <NavBar />
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row TemaOscuroClaro">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <span className="font-weight-bold">
                {name}
              </span>
              <span>
                {email}
              </span>
            </div>
          </div>
          <div className="col-md-5 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Perfil</h4>
              </div>
              <form onSubmit={handleEdit}>
                <div className="row mt-2">
                  <div className="col-md-6"><label className="labels">
                    Name
                  </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="nombre"
                      name='name'
                      value={name}
                      onChange={handleEditInputChange}></input>
                  </div>

                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="labels">
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="email"
                      name='email'
                      value={email}
                      onChange={handleEditInputChange} >
                    </input>
                  </div>
                  <div className="col-md-12">
                    <label className="labels">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Contraseña"
                      name='password'
                      value={password}
                      onChange={handleEditInputChange}>
                    </input>
                  </div>
                  <div className="col-md-12">
                    <label className="labels">
                      Repita la contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Repita la contraseña"
                      name='password1'
                      value={password1}
                      onChange={handleEditInputChange}>
                    </input>
                  </div>
                </div>
                <div className="mt-5 text-center">
                  <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                  >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
