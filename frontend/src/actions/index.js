import { ApiTwoTone } from '@mui/icons-material';
import axios from 'axios';
const api = axios.create({baseURL : 'http://localhost:5000'});

api.interceptors.request.use((req)=>{
    if (localStorage.getItem('token')){
        req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    }
    return req;
})



export default api;


// api.interceptors.response.use(
//     response => response,
//     error => {
//       if (!error.response) {
//         alert('Network error: Please check your internet connection or try again later.');
//         return Promise.resolve({});
//       }
  
//       if (error.response) {
//         if (error.response.status === 401 && error.response.data === 'Not Authorized') {
//           localStorage.removeItem('token');
//           window.location.href = '/';
//         }
//       }
  
//       return Promise.reject(error);
//     }
//   );
