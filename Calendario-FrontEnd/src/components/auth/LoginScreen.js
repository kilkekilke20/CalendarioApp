import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { StartGoogleModal, startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import { NavBar } from '../ui/NavBar';
import '../../css/login.css';

//administrar usuarios, se guardara por el momento de forma local
export const LoginScreen = () => {

    const dispatch = useDispatch();

    //inicializar el custom hook, anotacion: mirar si poder usar coockies
    //formulario de login
    const [formLoginValues, handleLoginInputChange] = useForm({
        lEmail: '',
        lPassword: ''
    });

    //formulario de registro
    const [formRegisterValues, handleRegisteInputChange] = useForm({
        rName: '',
        rEmail: '',
        rPassword1: '',
        rPassword2: ''
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

    const handleGoogleLogin = () => {
        dispatch(StartGoogleModal());
    }

    return (
        <div className='TemaOscuroClaro'>
            <NavBar />

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

                        <div className="or-container">
                            <div className="line-separator"></div>
                            <div className="or-label">or</div>
                            <div className="line-separator"></div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <div
                                    className="btn btn-lg btn-google btn-block text-uppercase btn-outline"
                                    onClick={handleGoogleLogin}
                                >
                                    <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                                    <div className="btn-text">
                                        <b>Sign in with google</b>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br></br>

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
        </div >
    )
}