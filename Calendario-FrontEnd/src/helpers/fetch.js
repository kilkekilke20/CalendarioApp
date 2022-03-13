const baseUrl = process.env.REACT_APP_API_URL;

//este fetch va a ser el endpoint al que yo quiero llamar, por ejemplo /events
const fetchSinToken = (endpoint, data, method = 'GET') => {

    const url = `${baseUrl}/${ endpoint }`; //localhost:4000/api/events

    if ( method === 'GET' ) {
        return fetch( url );
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )
        });
    }

}

const fetchConToken = (endpoint, data, method = 'GET') => {
    const url = `${baseUrl}/${ endpoint }`; //localhost:4000/api/events
    const token = localStorage.getItem('token') || '';

    if ( method === 'GET' ) {
        return fetch( url, {
            method,
            headers: {
                //aqui enviare al x-token que cree en el postman por ejemplo el token del usuario de la pagina
                'x-token': token
            }
        } );
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify( data )
        });
    }
}

export {
    fetchConToken,
    fetchSinToken
}