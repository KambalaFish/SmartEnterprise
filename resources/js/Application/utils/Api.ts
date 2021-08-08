import axios, {AxiosError, AxiosResponse} from "axios";
import {getBaseUrl, apiPaths, getApiBaseUrl} from "./utils";
import {
    ApiResponse, AuthenticatedUser,
    ContactResponse,
    Credentials,
    ErrorBody,
    ICompany,
    ICompanyCreation, ICompanyWithId, IDepartment, IRole, ITeam,
} from "./Interfaces/InterfacesApi";
import {PageResponse} from "./Interfaces/InterfacesApi";
import {ICompanyFilter} from "./Interfaces/InterfacesApi";
import {confirmationHandler, errorHandler, logginErrorHandler} from "./Handlers";
import {apiInstance, instace} from "./Instances";

interface ClientApi {
    login(credentials: Credentials) : Promise<ApiResponse<AuthenticatedUser|ErrorBody>>;
    logout(): Promise<ApiResponse<never|ErrorBody>>;
    // createCompany(company: ICompanyCreation): Promise<ApiResponse<string|ErrorBody>>;
    createCompany(company: ICompanyCreation): Promise<ApiResponse<ICompanyWithId|ErrorBody>>;
    updateCompany(id: number, company: ICompanyCreation): Promise<ApiResponse<ICompanyWithId|ErrorBody>>;
    getPaginatedCompaniesOld(pageNumber: number, filter?: ICompanyFilter): Promise<ApiResponse<PageResponse<ICompany[]> | ErrorBody>>;
    getPaginatedCompanies(pageNumber: number, filter?: ICompanyFilter): Promise<ApiResponse<PageResponse<ICompanyWithId[]> | ErrorBody>>;
    getCompany(id: number): Promise<ApiResponse<ICompany | ErrorBody>>;
    getCompanyMainAdmin(companyId: number): Promise<ApiResponse<ContactResponse | ErrorBody>>;
    getCompanyItHead(companyId: number): Promise<ApiResponse<ContactResponse | ErrorBody>>;
    getCompanyCustomerManager(companyId: number): Promise<ApiResponse<ContactResponse | ErrorBody>>;
    deleteCompany(companyId: number): Promise<ApiResponse<string|ErrorBody>>;
    getPaginatedCompanyDepartments(companyId: number, pageNumber: number): Promise<ApiResponse<PageResponse<IDepartment[]> | ErrorBody>>;
    getPaginatedCompanyRoles(companyId: number, pageNumber: number): Promise<ApiResponse<PageResponse<IRole[]> | ErrorBody>>;
    getPaginatedCompanyTeams(companyId: number, pageNumber: number): Promise<ApiResponse<PageResponse<ITeam[]> | ErrorBody>>;
}

class ClientApiImpl implements ClientApi {

    private static api: ClientApi;

    public static getInstance(): ClientApi{
        if (ClientApiImpl.api == null){
            ClientApiImpl.api = new ClientApiImpl();
        }
        return ClientApiImpl.api;
    }

    login(credentials: Credentials): Promise<ApiResponse<AuthenticatedUser | ErrorBody>> {
        return instace
            .get<never>(apiPaths.XSRFCookie)
            .then(response => {
                return apiInstance.post<AuthenticatedUser>(apiPaths.login, {...credentials})
            })
            .then(confirmationHandler)
            .catch(logginErrorHandler);
            // .catch(errorHandler);
    }

    logout(): Promise<ApiResponse<never|ErrorBody>> {
        return instace
            .get(apiPaths.XSRFCookie)
            .then(response => {
                return apiInstance.post(apiPaths.logout);
            })
            .then(confirmationHandler)
            .catch(errorHandler);
    }

    createCompany(company: ICompanyCreation): Promise<ApiResponse<ICompanyWithId|ErrorBody>>{
        return apiInstance
            .post<ICompanyWithId>(apiPaths.createCompany, company)
            .then(confirmationHandler)
            .catch(errorHandler);
    }

    updateCompany(id: number, company: ICompanyCreation): Promise<ApiResponse<ICompanyWithId | ErrorBody>> {
        return apiInstance
            .put<ICompanyWithId>(apiPaths.updateCompany+id, company)
            .then(confirmationHandler)
            .catch(errorHandler);
    }

    getPaginatedCompaniesOld(pageNumber: number, filter?: ICompanyFilter): Promise<ApiResponse<PageResponse<ICompany[]> | ErrorBody>>{
        return apiInstance
            .get<PageResponse<ICompany[]>>(apiPaths.getCompanies, {
                params: {
                    page: pageNumber,
                    name: filter?.name,
                    country: filter?.country,
                    city: filter?.city,
                    address: filter?.address,
                    status: filter?.status,
                    zipCode: filter?.zipCode
                }
            })
            .then(confirmationHandler)
            .catch(errorHandler);
    }

    getPaginatedCompanies(pageNumber: number, filter?: ICompanyFilter): Promise<ApiResponse<PageResponse<ICompanyWithId[]> | ErrorBody>>{
        return apiInstance
            .get<PageResponse<ICompanyWithId[]>>(apiPaths.getCompanies, {
                params: {
                    page: pageNumber,
                    name: filter?.name,
                    country: filter?.country,
                    city: filter?.city,
                    address: filter?.address,
                    status: filter?.status,
                    zipCode: filter?.zipCode
                }
            })
            .then(confirmationHandler)
            .catch(errorHandler);
    }

    getCompany(id: number): Promise<ApiResponse<ICompany | ErrorBody>>{
        return apiInstance
            .get<ICompany>(apiPaths.getCompany+id)
            .then(confirmationHandler)
            .catch(errorHandler);
    }

    getCompanyMainAdmin(companyId: number): Promise<ApiResponse<ContactResponse | ErrorBody>>{
        return apiInstance
            .get<ContactResponse>(apiPaths.getCompanyMainAdmin(companyId))
            .then(confirmationHandler)
            .catch(errorHandler);
    }
    getCompanyItHead(companyId: number): Promise<ApiResponse<ContactResponse | ErrorBody>>{
        return apiInstance
            .get<ContactResponse>(apiPaths.getCompanyItHead(companyId))
            .then(confirmationHandler)
            .catch(errorHandler);
    }
    getCompanyCustomerManager(companyId: number): Promise<ApiResponse<ContactResponse | ErrorBody>>{
        return apiInstance
            .get<ContactResponse>(apiPaths.getCompanyCustomerManager(companyId))
            .then(confirmationHandler)
            .catch(errorHandler);
    }

    deleteCompany(companyId: number): Promise<ApiResponse<string|ErrorBody>>{
        return apiInstance
            .delete<string>(apiPaths.removeCompany+companyId)
            .then(confirmationHandler)
            .catch(errorHandler);
    }

    getPaginatedCompanyDepartments(companyId: number, pageNumber: number): Promise<ApiResponse<PageResponse<IDepartment[]> | ErrorBody>>{
        return apiInstance
            .get<PageResponse<IDepartment[]>>(apiPaths.getCompanyDepartments(companyId),{
                params: {
                    page: pageNumber
                }
            })
            .then(confirmationHandler)
            .catch(errorHandler);
    }

    getPaginatedCompanyRoles(companyId: number, pageNumber: number): Promise<ApiResponse<PageResponse<IRole[]> | ErrorBody>>{
        return apiInstance
            .get<PageResponse<IRole[]>>(apiPaths.getCompanyRoles(companyId),{
                params: {
                    page: pageNumber
                }
            })
            .then(confirmationHandler)
            .catch(errorHandler);
    }

    getPaginatedCompanyTeams(companyId: number, pageNumber: number): Promise<ApiResponse<PageResponse<ITeam[]> | ErrorBody>>{
        return apiInstance
            .get<PageResponse<ITeam[]>>(apiPaths.getCompanyTeams(companyId),{
                params: {
                    page: pageNumber
                }
            })
            .then(confirmationHandler)
            .catch(errorHandler);
    }

}

export default function api(): ClientApi {
    return ClientApiImpl.getInstance();
}
