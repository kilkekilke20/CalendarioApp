import { fetchSinToken, fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";
import Swal from 'sweetalert2';
import { useDispatch } from "react-redux";
import { eventLogout } from "./events";

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
            }))
        } else {
            //utilizo el swal para mostrar el error de inicio, el cual viene de la propia base de datos
            Swal.fire('Error', body.msg, 'error');
        }

    }
}

//registrarse
export const startRegister = (email, password, name) => {

    //es esactamente igual que el login pero llamando a un argumento mas (name)
    return async (dispatch) => {

        //aqui llamo el auth/new para crear al usuario
        const resp = await fetchSinToken('auth/new', { email, password, name }, 'POST');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

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

//aqui hare el logout de la cuenta
export const startLogout = () => {
    return (dispatch) => {

        //limpio el localstorage, para borrar asi el token y poder sacarlo del calendarioScreen al login
        localStorage.clear();
        dispatch(eventLogout());
        dispatch(logout());

    }
}

//cerrar sesion
const logout = () => ({ type: types.authLogout })