import {createStore, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import { rootReducer } from '../reducers/rootReducer'

//es una simple configuracion, si existe las herramientas las configura y si no no pasa nada (esto lo busque en la propia documentacio y lo copie tal cual)
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware( thunk )
    )
);