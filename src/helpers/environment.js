let APIURL = '';

switch (window.location.hostname) {
  case 'localhost' || '127.0.0.1':
    APIURL = 'http://localhost:3000';
    break;
  case 'tdo-booknook-client.herokuapp.com':
    APIURL = 'https://tdo-booknook.herokuapp.com';
}

export default APIURL;
