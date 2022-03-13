import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

//administrar usuarios, se guardara por el momento de forma local
export const LoginScreen = () => {

    const dispatch = useDispatch();

    //inicializar el custom hook, anotacion: mirar si poder usar coockies
    const [formLoginValues, handleLoginInputChange] = useForm({
        lEmail: 'kilian@gmail.com',
        lPassword: '123456'
    });

    const [formRegisterValues, handleRegisteInputChange] = useForm({
        rName: 'Andy',
        rEmail: 'Andy@gmail.com',
        rPassword1: '123456',
        rPassword2: '123456'
    });

    const { lEmail, lPassword } = formLoginValues;
    const { rName, rEmail, rPassword1, rPassword2 } = formRegisterValues;

    //handleLogin y handleRegister se llaman en action/auth donde llamara a la base de datos
    //sirve para enviar los datos, se enviaran al back end
    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLogin(lEmail, lPassword));
    };

    //recibe los datos del registro y los envia a la base de datos    
    const handleRegister = (e) => {
        e.preventDefault();

        //validacion de contraseñas
        if (rPassword1 !== rPassword2) {
            return Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
        }
        dispatch(startRegister(rEmail, rPassword1, rName));
    };


    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Iniciar Sesion</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='lEmail'
                                value={lEmail}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='lPassword'
                                value={lPassword}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registrarse</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='rName'
                                value={rName}
                                onChange={handleRegisteInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='rEmail'
                                value={rEmail}
                                onChange={handleRegisteInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='rPassword1'
                                value={rPassword1}
                                onChange={handleRegisteInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name='rPassword2'
                                value={rPassword2}
                                onChange={handleRegisteInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}