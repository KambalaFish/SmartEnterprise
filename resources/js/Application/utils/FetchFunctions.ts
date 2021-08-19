import {
    ApiResponse,
    ErrorBody,
    PaginatedTableFetcher,
    PageResponse,
    ICompany, IDepartment, IRole, ITeam, IStaffWithCompanyName, ICompanyAdminFilter
} from "./Interfaces/InterfacesApi";
import api from "./Api";
import {ICompanyFilter} from "./Interfaces/InterfacesApi";
import {result} from "lodash";

function errorHandler(reason: ApiResponse<ErrorBody>): Promise<ErrorBody>{
    let {error} = reason.response;
    error = reason.code ? `HTTP error code: ${reason.code} \nError message: ${error}` : `Error message: ${error}`;
    return Promise.reject<ErrorBody>({error: error} as ErrorBody);
}

function confirmationHandler<T>(result: ApiResponse<PageResponse<T[]>|ErrorBody>): PaginatedTableFetcher<T>{
    const {response} = result as ApiResponse<PageResponse<T[]>>;
    const {perPage, lastPage} = response.meta;
    return {
        data: response.data,
        perPage: perPage,
        lastPage: lastPage
    } as PaginatedTableFetcher<T>;
}

export function getCompanies(pageNumber: number, filter?: ICompanyFilter): Promise<PaginatedTableFetcher<ICompany> | ErrorBody> {
    return api()
        .getPaginatedCompaniesOld(pageNumber, filter)
        .then((res) => confirmationHandler(res))
        .catch(errorHandler);
}

export function getCompanyDepartments(companyId: number, pageNumber: number): Promise<PaginatedTableFetcher<IDepartment> | ErrorBody> {
    return api()
        .getPaginatedCompanyDepartments(companyId, pageNumber)
        .then((res) => confirmationHandler(res))
        .catch(errorHandler);
}

export function getCompanyRoles(companyId: number, pageNumber: number): Promise<PaginatedTableFetcher<IRole> | ErrorBody> {
    return api()
        .getPaginatedCompanyRoles(companyId, pageNumber)
        .then((res) => confirmationHandler(res))
        .catch(errorHandler);
}

export function getCompanyTeams(companyId: number, pageNumber: number): Promise<PaginatedTableFetcher<ITeam> | ErrorBody> {
    return api()
        .getPaginatedCompanyTeams(companyId, pageNumber)
        .then((res) => confirmationHandler(res))
        .catch(errorHandler);
}

export function getCompanyAdmins(pageNumber: number, filter?: ICompanyAdminFilter): Promise<PaginatedTableFetcher<IStaffWithCompanyName> | ErrorBody> {
    return api()
        .getPaginatedCompanyAdmins(pageNumber, filter)
        .then((res) => confirmationHandler(res))
        .catch(errorHandler);
}
