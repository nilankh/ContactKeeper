import Axios from 'axios';
import aixos from 'axios';

const setAuthToken = (token) => {
  if (token) {
    aixos.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete aixos.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
