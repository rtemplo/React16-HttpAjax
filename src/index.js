import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

let removeInterceptors = false;

//below overrriden by instance config in /axios.js
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
//below is just for demonstraton - they may commented out
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

let requestInterceptor = axios.interceptors.request.use(request => {
  console.log('From requestInterceptor: ' + request);
  //you can edit the request here before returning it
  return request;
}, error => {
  console.log('From requestInterceptor (error): ' + error);
  return Promise.reject(error);
});

let responseInterceptor = axios.interceptors.response.use(response => {
  console.log('From responseInterceptor: ' + response);
  return response;
}, error => {
  console.log('From responseInterceptor (error): ' + error);
  return Promise.reject(error);
});

if (removeInterceptors) {
  axios.interceptors.request.eject(requestInterceptor);
  axios.interceptors.response.eject(responseInterceptor);
}

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
