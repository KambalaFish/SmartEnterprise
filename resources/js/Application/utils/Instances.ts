import axios from "axios";
import {getApiBaseUrl, getBaseUrl} from "./utils";

export const apiInstance = axios.create({
    baseURL: getApiBaseUrl()
});

export const instace = axios.create({
    baseURL: getBaseUrl()
});
