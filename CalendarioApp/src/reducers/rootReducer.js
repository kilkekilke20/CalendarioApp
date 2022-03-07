import { combineReducers } from 'redux'
import { calendarReducer } from './calendarioReducer'
import { uiReducer } from './uiReducer'

//este archivo va a ser mi combinacion de todos los reducers
//autentificacion, ui, calendario
export const rootReducer = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer
    //AuthReducer
    
})

