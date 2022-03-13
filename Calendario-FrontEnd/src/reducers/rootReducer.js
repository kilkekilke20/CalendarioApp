import { combineReducers } from 'redux'
import { authReducer } from './authReducer'
import { calendarReducer } from './calendarioReducer'
import { uiReducer } from './uiReducer'

//este archivo va a ser mi combinacion de todos los reducers
//autentificacion, ui, calendario, se ejecutara en store.js en store
export const rootReducer = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer,
    auth: authReducer
    
})

