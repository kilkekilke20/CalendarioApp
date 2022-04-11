import { types } from '../types/types';

const initialState = {
  checking: true
}



export const authReducer = (state = initialState, action) => {
  switch (action.type) {

    //lo que quiero retornar del login
    case types.authLogin:
      return {
        ...state,
        checking: false,
        ...action.payload
      }

    //lo que hara el check en actions/auth
    case types.authCheckingFinish:
      return {
        ...state,
        checking: false
      }

    case types.authLogout:
      return {
        checking: false
      }
    //cargar o mostrar el usuario en el perfil
    case types.userLoaded:
      return {
        ...state,
        body: [...action.payload]
      }
    default:
      return state;
  }
}
