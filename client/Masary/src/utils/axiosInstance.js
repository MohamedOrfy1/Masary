import axios from 'axios';
import { BASE_URL } from './apiPaths';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

axiosInstance.interceptors.request.use((config) => {
    // Add any request interceptors here
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
},
(error) => {
    // Handle request error
    return Promise.reject(error);
}
);

axiosInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    // Handle response error
    if(error.response){
        if(error.response.status === 401){
            window.location.href = "/login";
        }
        else if(error.response.status === 500){
            alert("Internal server error");
        }
        else if(error.code === "ECONNABORTED"){
            alert("Request timed out");
        }
        return Promise.reject(error.response.data);
    }
}
);

export default axiosInstance;
