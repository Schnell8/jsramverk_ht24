const isLocalHost = window.location.hostname === 'localhost';

const backendUrl = isLocalHost ? 'http://localhost:1337' : 'https://jsramverk-chsc22-ace2bxdsdxfnavfc.northeurope-01.azurewebsites.net/';

export default backendUrl;
