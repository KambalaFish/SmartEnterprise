import {AxiosError, AxiosResponse} from "axios";
import {ApiResponse, ErrorBody} from "./Interfaces/InterfacesApi";

export function confirmationHandler<T>(result: AxiosResponse<T>): ApiResponse<T> {
    return {
        code: result.status,
        response: result.data
    } as ApiResponse<T>;
}

export function errorHandler(error: AxiosError): Promise<ApiResponse<ErrorBody>> {
    const result: AxiosResponse = error.response as AxiosResponse;
    console.log('errorHandler below:');
    console.log(result);
    if (result !== undefined) {
        return Promise.reject({
            code: result.status,
            response: {
                error:
                    result.data.message === null ? result.statusText : result.data.message,
            },
        } as ApiResponse<ErrorBody>);
    } else {
        return Promise.reject({
            code: parseInt(error.code as string),
            response: {
                error: error.message,
            },
        } as ApiResponse<ErrorBody>);
    }
}

export function logginErrorHandler(error: AxiosError): Promise<ApiResponse<ErrorBody>> {
    const result: AxiosResponse = error.response as AxiosResponse;
    console.log('logginErrorHandler below:');
    console.log(result);
    if (result !== undefined) {
        return Promise.reject({
            code: result.status,
            response: {
                error:
                    result.data.message == undefined ? result.data : result.data.message,
            },
        } as ApiResponse<ErrorBody>);
    } else {
        return Promise.reject({
            code: parseInt(error.code as string),
            response: {
                error: error.message,
            },
        } as ApiResponse<ErrorBody>);
    }
}
