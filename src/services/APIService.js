import axios from 'axios';
import Utility from './UtilityService'; 
 
const serverUrl = 'https://api.youarecaptured.com/';
// const serverUrl = 'https://office-manager-server.herokuapp.com/api/';
// const serverUrl = 'http://localhost:8000/api/';
export const  backend = axios.create({
  baseURL: serverUrl,
  headers: {
    common: {
      Authorization: `Bearer ${Utility.get('staff_token')}`
    }
  }
}); 

backend.interceptors.request.use(function (config) {
  var token = Utility.get('staff_token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});