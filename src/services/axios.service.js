import axios from 'axios';

axios.defaults.baseURL = 'https://www.toggl.com/api/v8';
axios.defaults.auth = {
  username: window.localStorage.getItem('api:token'),
  password: 'api_token'
};