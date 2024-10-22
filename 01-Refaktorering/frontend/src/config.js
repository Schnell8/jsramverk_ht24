const isLocalHost = window.location.hostname === 'localhost';

const url = isLocalHost ? 'http://localhost:1337' : 'https://jsramverk-chsc22-ace2bxdsdxfnavfc.northeurope-01.azurewebsites.net/';

const basename = isLocalHost ? '/' : '/~chsc22/editor';

export { url, basename };
