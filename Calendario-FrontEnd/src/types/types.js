//este archivo es simplemente para tener centralizado todos los tipos 
export const types = {

    uiOpenModal: '[ui] Open modal',
    uiCloseModal: '[ui] Close modal',

    //parte de eventos de calendario
    eventSetActive: '[event] Set Active',
    eventLogout: '[event] Logout event',

    eventStartAddNew: '[event] Start add new',
    eventAddNew: '[event] Add new',
    eventClearActiveEvent: '[event] Clear active event',
    eventUpdated: '[event] Event updated',
    eventDeleted: '[event] Event deleted',
    eventLoaded: '[event] Event Loaded',

    //parte de autentificacion
    authCheckingFinish: '[auth] Finish checking login state',
    authStartLogin: '[auth] Start login',
    authStartRegister: '[auth] Start register',
    authStartStartTokenRenew: '[auth] Start token renew',
    authLogin: '[auth] Login',
    authLogout: '[auth] Logout',
    userLoaded: '[auth] User Loaded',

    //perfil
    eventUpdatedProfile: '[auth] Profile updated',
}