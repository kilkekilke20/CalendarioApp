import { fetchSinToken, fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";
import Swal from 'sweetalert2';
import { eventLogout } from "./events";
import { googleAuthProvider } from "../firebase/firebase-config";
import { getAuth, signInWithPopup } from 'firebase/auth';

//login
export const startLogin = (email, password) => {
    //gracias al thunk, esto se vuelve a ejecutar

    return async (dispatch) => {

        const resp = await fetchSinToken('auth', { email, password }, 'POST');
        const body = await resp.json();

        //validar que se escribe bien la contraseña y el email
        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        } else {
            //utilizo el swal para mostrar el error de inicio, el cual viene de la propia base de datos
            Swal.fire('Error', body.msg, 'error');
        }

    }
}

//ejecuta el modal de google
//su principal utilidad es devolverme todos los datos cuando el usuario inicia sesion con google
export const StartGoogleModal = () => {

    return async (dispatch) => {

        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then(({ user }) => {     
                dispatch(StartGoogleLogin(user));
            });

    }
}

//inicio sesion con google
const StartGoogleLogin = (user) => {

    return async (dispatch) => {
        //aqui lo que hago para iniciar la sesion con google es usar el uid que me da google de su usuario como contraseña ya que esta no me la da
        //no es muy seguro pero para un proyecto de clase esta bien
        //ahora teniendo eso todo lo demas es igual que en startLogin
        const email = user.email;
        const password = user.uid;
        const name = user.displayName;

        const resp = await fetchSinToken('auth', { email, password }, 'POST');
        const body = await resp.json();
        
        //primero miro si existe el email de la cuenta del usuario de google, si existe iniciaria sesion
        // si no pues enviaria un error 400(bad request) "email incorrecto" por lo que crearia la cuenta del usuario de google en mi aplicacion
        //llamando a la funcion startRegister
        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            //auth.currentUser.providerId: "firebase", lo necesito por que los usuarios que han iniciado sesion con google no podran acceder al perfil
            localStorage.setItem('firebase', user.auth.currentUser.providerId);
            dispatch(login({
                uid: body.uid,
                name: name
            }));

            //basicamente si el email es incorrecto es que no existe ya que con el googleModal se hace la autentificacion de la cuenta de google
        } else if (body.msg === 'Email incorrecto') {
            
            dispatch(startRegister(user,email,password,name));

        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

//registrarse
export const startRegister = (email, password, name, user) => {

    //es esactamente igual que el login pero llamando a un argumento mas (name)
    return async (dispatch) => {

        //aqui llamo el auth/new para crear al usuario
        const resp = await fetchSinToken('auth/new', { email, password, name }, 'POST');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            if (user){
            localStorage.setItem('firebase', user.auth.currentUser.providerId);
            }
            
            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        } else {
            Swal.fire('Error', body.msg, 'error');
        }

    }
}

//revalida el token por si se acaba
export const startChecking = () => {
    return async (dispatch) => {

        const resp = await fetchConToken('auth/renew');
        const body = await resp.json();
        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        } else {
            dispatch(checkingFinish());
        }
    }
}

const checkingFinish = () => ({ type: types.authCheckingFinish })

const login = (user) => ({
    type: types.authLogin,
    payload: user
});

//editar usuario
export const eventStartUpdateProfile = (uid,user) => {
    return async () => {
        
        try {
            
            //1: donde se envia la informacion (/perfil/id), 2 lo que quiero enviar, 3 el tipo de peticion
            const resp = await fetchConToken(`auth/${uid}`, user, 'PUT');
            const body = await resp.json();
            

            
            //si todo esta ok se dispara la accion
            if (body.ok) {
                return Swal.fire('Guardado!', '', 'success');
            } else {
                return Swal.fire('Error', body.msg, 'error');
            }


        } catch (error) {
            console.log(error);
        }

    }
}

//aqui hare el logout de la cuenta
export const startLogout = () => {
    return (dispatch) => {

        //limpio el localstorage, para borrar asi el token y poder sacarlo del calendarioScreen al login
        //localStorage.clear();
        localStorage.removeItem('token');
        localStorage.removeItem('token-init-date');
        localStorage.removeItem('firebase');
        dispatch(eventLogout());
        dispatch(logout());

    }
}

//cerrar sesion
const logout = () => ({ type: types.authLogout });

//mostrar los usuarios de la base de datos
export const userStartLoading = (uid) => {
    return async() => {

        try {
            const resp = await fetchConToken(`auth/perfil/${uid}`);
            const body = await resp.json();

            const users = body.usuarios;

            return users;

        } catch (error) {
            console.log(error);
        }
    }
}