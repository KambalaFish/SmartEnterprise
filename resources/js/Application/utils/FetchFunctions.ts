import {
    ApiResponse,
    ErrorBody,
    PaginatedTableFetcher,
    PageResponse,
    ICompany, IDepartment, IRole, ITeam
} from "./Interfaces/InterfacesApi";
import api from "./Api";
import {ICompanyFilter} from "./Interfaces/InterfacesApi";

export function getCompanies(pageNumber: number, filter?: ICompanyFilter): Promise<PaginatedTableFetcher | ErrorBody> {
    return api()
        .getPaginatedCompaniesOld(pageNumber, filter)
        .then((res) => {
            const {response} = res as ApiResponse<PageResponse<ICompany[]>>;
            return {
                data: response.data,
                perPage: response.meta.perPage,
                lastPage: response.meta.lastPage
            } as PaginatedTableFetcher;
        })
        .catch((reason: ApiResponse<ErrorBody>) => {
            let {error} = reason.response;
            error = reason.code ? `HTTP error code: ${reason.code} \nError message: ${error}` : `Error message: ${error}`;
            return Promise.reject({error: error} as ErrorBody);
        });
}

export function getCompanyDepartments(companyId: number, pageNumber: number): Promise<PaginatedTableFetcher | ErrorBody> {
    return api()
        .getPaginatedCompanyDepartments(companyId, pageNumber)
        .then((res) => {
            const {response} = res as ApiResponse<PageResponse<IDepartment[]>>;
            return {
                data: response.data,
                perPage: response.meta.perPage,
                lastPage: response.meta.lastPage
            } as PaginatedTableFetcher;
        })
        .catch((reason: ApiResponse<ErrorBody>) => {
            let {error} = reason.response;
            error = reason.code ? `HTTP error code: ${reason.code} \nError message: ${error}` : `Error message: ${error}`;
            return Promise.reject({error: error} as ErrorBody);
        });
}

export function getCompanyRoles(companyId: number, pageNumber: number): Promise<PaginatedTableFetcher | ErrorBody> {
    return api()
        .getPaginatedCompanyRoles(companyId, pageNumber)
        .then((res) => {
            const {response} = res as ApiResponse<PageResponse<IRole[]>>;
            return {
                data: response.data,
                perPage: response.meta.perPage,
                lastPage: response.meta.lastPage
            } as PaginatedTableFetcher;
        })
        .catch((reason: ApiResponse<ErrorBody>) => {
            let {error} = reason.response;
            error = reason.code ? `HTTP error code: ${reason.code} \nError message: ${error}` : `Error message: ${error}`;
            return Promise.reject({error: error} as ErrorBody);
        });
}

export function getCompanyTeams(companyId: number, pageNumber: number): Promise<PaginatedTableFetcher | ErrorBody> {
    return api()
        .getPaginatedCompanyTeams(companyId, pageNumber)
        .then((res) => {
            const {response} = res as ApiResponse<PageResponse<ITeam[]>>;
            return {
                data: response.data,
                perPage: response.meta.perPage,
                lastPage: response.meta.lastPage
            } as PaginatedTableFetcher;
        })
        .catch((reason: ApiResponse<ErrorBody>) => {
            let {error} = reason.response;
            error = reason.code ? `HTTP error code: ${reason.code} \nError message: ${error}` : `Error message: ${error}`;
            return Promise.reject({error: error} as ErrorBody);
        });
}

// export function getCompanies(pageNumber: number, filter?: ICompanyFilter): Promise<PaginatedTableFetcher<ICompany[]> | ErrorBody> {
//     return api()
//         .getPaginatedCompanies(pageNumber, filter)
//         .then((res) => {
//             const {response} = res as ApiResponse<PageResponse<ICompany[]>>;
//             return {
//                 data: response.data,
//                 perPage: response.meta.perPage,
//                 lastPage: response.meta.lastPage
//             } as PaginatedTableFetcher<ICompany[]>;
//         })
//         .catch( (reason: ApiResponse<ErrorBody>) => {
//             let {error} = reason.response;
//             error = reason.code? `HTTP error code: ${reason.code} \nError message: ${error}`: `Error message: ${error}`;
//             return Promise.reject({error: error} as ErrorBody);
//         });
// }
//
// export function getCompanyDepartments(companyId: number, pageNumber: number): Promise<PaginatedTableFetcher<IDepartment[]> | ErrorBody> {
//     return api()
//         .getPaginatedCompanyDepartments(companyId, pageNumber)
//         .then((res) => {
//             const {response} = res as ApiResponse<PageResponse<IDepartment[]>>;
//             return {
//                 data: response.data,
//                 perPage: response.meta.perPage,
//                 lastPage: response.meta.lastPage
//             } as PaginatedTableFetcher<IDepartment[]>;
//         })
//         .catch( (reason: ApiResponse<ErrorBody>) => {
//             let {error} = reason.response;
//             error = reason.code? `HTTP error code: ${reason.code} \nError message: ${error}`: `Error message: ${error}`;
//             return Promise.reject({error: error} as ErrorBody);
//         });
// }
