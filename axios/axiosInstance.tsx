import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: 'http://flavetechs.com/',
    // baseURL:'https://localhost:44357/',
    headers: {
        Authorization: '',
    },
    // timeout: 3000,
    // timeoutErrorMessage:'Request Timed out'
});

axiosInstance.interceptors.response.use((response: any) => response, (error: any) => { 
    throw error;
});

axiosInstance.interceptors.response.use(async (response: any) => response, (error: any) => { 
    if(error.response.status === 500){
        return error.response
    }
    if(error.response.status === 404){
        return error.response
    }
    throw error;
    // return error.response
});

axiosInstance.interceptors.request.use(
    async (config: any) => {
      
        const sessionToken = await AsyncStorage.getItem('token');
        if (sessionToken !== null) {
            config.headers.Authorization = 'Bearer ' + sessionToken
        }
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    },
);

export default axiosInstance;