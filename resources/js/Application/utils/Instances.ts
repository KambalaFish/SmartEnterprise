import axios from "axios";
import {getApiBaseUrl, getBaseUrl} from "./utils";
import {removeUserFromLocalStorage, setSessionWasExpired} from "../components/Auth/Authentication";


export const apiInstance = axios.create({
    baseURL: getApiBaseUrl()
});

export const instance = axios.create({
    baseURL: getBaseUrl()
});

instance.interceptors.response.use(function (response){return response}, function (error){
    const originalConfig = error.config;
    // console.log('config: ', originalConfig);
    // console.log('url: ', originalConfig.url);
    if (originalConfig.url != '/api/login' && error.response){
        if(error.response.status === 401 && !originalConfig._retry){
            originalConfig._retry = true;
            removeUserFromLocalStorage();
            setSessionWasExpired();
            window.location.reload();
            return instance(originalConfig);
        }
    }
    return Promise.reject(error);
});

apiInstance.interceptors.response.use(function (response){return response}, function (error){
    const originalConfig = error.config;
    // console.log('config: ', originalConfig);
    // console.log('url: ', originalConfig.url);
    if (originalConfig.url != '/api/login' && error.response){
        if(error.response.status === 401 && !originalConfig._retry){
            originalConfig._retry = true;
            removeUserFromLocalStorage();
            setSessionWasExpired();
            window.location.reload();
            return apiInstance(originalConfig);
        }
    }
    return Promise.reject(error);
});
