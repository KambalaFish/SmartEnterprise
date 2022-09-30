import {
    ApiResponse,
    ErrorBody, ICompany,
    ICompanyFilter,
    ICompanyInfo,
    ICompanyWithId, IDepartment, IRole, ITeam,
    PageResponse, ResourceCollectionResponse
} from "../Interfaces/InterfacesApi";
import {apiInstance} from "../Instances";
import {apiPaths} from "../utils";
import {confirmationHandler, errorHandler} from "../Handlers";

export interface CompanyApi{
    createCompany(company: ICompanyInfo): Promise<ApiResponse<ICompanyWithId|ErrorBody>>;
    updateCompany(id: number, company: ICompanyInfo): Promise<ApiResponse<ICompanyWithId|ErrorBody>>;
    getPaginatedCompanies(pageNumber: number, filter?: ICompanyFilter): Promise<ApiResponse<PageResponse<ICompanyWithId[]> | ErrorBody>>;
    getCompany(id: number): Promise<ApiResponse<ICompany | ErrorBody>>;
    getCompanyInfo(id: number): Promise<ApiResponse<ICompanyInfo | ErrorBody>>;
    deleteCompany(companyId: number): Promise<ApiResponse<string|ErrorBody>>;
    getPaginatedCompanyDepartments(companyId: number, pageNumber: number): Promise<ApiResponse<PageResponse<IDepartment[]> | ErrorBody>>;
    getPaginatedCompanyRoles(companyId: number, pageNumber: number): Promise<ApiResponse<PageResponse<IRole[]> | ErrorBody>>;
    getPaginatedCompanyTeams(companyId: number, pageNumber: number): Promise<ApiResponse<PageResponse<ITeam[]> | ErrorBody>>;
    getAllCompanies(): Promise<ApiResponse<ResourceCollectionResponse<ICompanyWithId[]>|ErrorBody>>;
}

export class CompanyApiImpl implements CompanyApi {

    createCompany(company: ICompanyInfo): Promise<ApiResponse<ICompanyWithId|ErrorBody>>{
        return apiInstance
            .post<ICompanyWithId>(apiPaths.createCompany, company)
            .then(confirmationHandler)
            .catch(errorHandler);
    }

    updateCompany(id: number, company: ICompanyInfo): Promise<ApiResponse<ICompanyWithId | ErrorBody>> {
        return apiInstance
            .put<ICompanyWithId>(apiPaths.updateCompany+id, company)
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

    getCompanyInfo(id: number): Promise<ApiResponse<ICompanyInfo | ErrorBody>>{
        return apiInstance
            .get<ICompanyInfo>(apiPaths.getCompanyInfo(id))
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

    getAllCompanies(): Promise<ApiResponse<ResourceCollectionResponse<ICompanyWithId[]>|ErrorBody>>{
        return apiInstance
            .get<ResourceCollectionResponse<ICompanyWithId[]>>(apiPaths.getAllCompanies)
            .then(confirmationHandler)
            .catch(errorHandler);
    }

}
