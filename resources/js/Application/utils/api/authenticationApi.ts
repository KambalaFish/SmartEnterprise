import {ApiResponse, AuthenticatedUser, Credentials, ErrorBody} from "../Interfaces/InterfacesApi";
import {apiInstance, instance} from "../Instances";
import {apiPaths} from "../utils";
import {confirmationHandler, errorHandler, logginErrorHandler} from "../Handlers";

export interface AuthApi{
    login(credentials: Credentials) : Promise<ApiResponse<AuthenticatedUser|ErrorBody>>;
    logout(): Promise<ApiResponse<never|ErrorBody>>;
}

export class AuthApiImpl implements AuthApi{
    login(credentials: Credentials): Promise<ApiResponse<AuthenticatedUser | ErrorBody>> {
        return instance
            .get<never>(apiPaths.XSRFCookie)
            .then(response => {
                return apiInstance.post<AuthenticatedUser>(apiPaths.login, {...credentials})
            })
            .then(confirmationHandler)
            .catch(logginErrorHandler);
        // .catch(errorHandler);
    }

    logout(): Promise<ApiResponse<never|ErrorBody>> {
        return instance
            .get(apiPaths.XSRFCookie)
            .then(response => {
                return apiInstance.post(apiPaths.logout);
            })
            .then(confirmationHandler)
            .catch(errorHandler);
    }
}
