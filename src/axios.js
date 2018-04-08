import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN 2 - FROM INSTANCE';
// instance.defaults.headers.post['Content-Type'] = 'application/json';

// //to add interceptors
// instance.interceptors.request.use(request => {
//   console.log('From requestInterceptor: ' + request);
//   //you can edit the request here before returning it
//   return request;
// }, error => {
//   console.log('From requestInterceptor (error): ' + error);
//   return Promise.reject(error);
// });

// instance.defaults.responseType.use(response => {
//   console.log('From responseInterceptor: ' + response);
//   return response;
// }, error => {
//   console.log('From responseInterceptor (error): ' + error);
//   return Promise.reject(error);
// });

// //to remove interceptors
// axios.interceptors.request.eject(requestInterceptor);
// axios.interceptors.response.eject(responseInterceptor);

export default instance;