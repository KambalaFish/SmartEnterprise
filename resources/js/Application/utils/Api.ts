import {apiPaths} from "./utils";
import {
    ApiResponse,
    AuthenticatedUser,
    StaffRequest,
    ContactResponse,
    Credentials,
    ErrorBody,
    ICompany,
    ICompanyWithId,
    IDepartment,
    IRole,
    ITeam,
    ResourceCollectionResponse,
    IStaff,
    IStaffWithCompanyName, IStaffFilter, ICompanyInfo,
} from "./Interfaces/InterfacesApi";
import {PageResponse} from "./Interfaces/InterfacesApi";
import {ICompanyFilter} from "./Interfaces/InterfacesApi";
import {confirmationHandler, errorHandler, logginErrorHandler} from "./Handlers";
import {apiInstance, instance} from "./Instances";

interface ClientApi {
    login(credentials: Credentials) : Promise<ApiResponse<AuthenticatedUser|ErrorBody>>;
    logout(): Promise<ApiResponse<never|ErrorBody>>;
    createCompany(company: ICompanyInfo): Promise<ApiResponse<ICompanyWithId|ErrorBody>>;
    updateCompany(id: number, company: ICompanyInfo): Promise<ApiResponse<ICompanyWithId|ErrorBody>>;
    getPaginatedCompaniesOld(pageNumber: number, filter?: ICompanyFilter): Promise<ApiResponse<PageResponse<ICompany[]> | ErrorBody>>;
    getPaginatedCompanies(pageNumber: number, filter?: ICompanyFilter): Promise<ApiResponse<PageResponse<ICompanyWithId[]> | ErrorBody>>;
    getCompany(id: number): Promise<ApiResponse<ICompany | ErrorBody>>;
    getCompanyInfo(id: number): Promise<ApiResponse<ICompanyInfo | ErrorBody>>;
    getCompanyMainAdminContact(companyId: number): Promise<ApiResponse<ContactResponse | ErrorBody>>;
    getCompanyItHeadContact(companyId: number): Promise<ApiResponse<ContactResponse | ErrorBody>>;
    getCompanyCustomerManagerContact(companyId: number): Promise<ApiResponse<ContactResponse | ErrorBody>>;
    deleteCompany(companyId: number): Promise<ApiResponse<string|ErrorBody>>;
    getPaginatedCompanyDepartments(companyId: number, pageNumber: number): Promise<ApiResponse<PageResponse<IDepartment[]> | ErrorBody>>;
    getPaginatedCompanyRoles(companyId: number, pageNumber: number): Promise<ApiResponse<PageResponse<IRole[]> | ErrorBody>>;
    getPaginatedCompanyTeams(companyId: number, pageNumber: number): Promise<ApiResponse<PageResponse<ITeam[]> | ErrorBody>>;
    getAllCompanies(): Promise<ApiResponse<ResourceCollectionResponse<ICompanyWithId[]>|ErrorBody>>;
    createCompanyAdmin(admin: StaffRequest): Promise<ApiResponse<IStaff|ErrorBody>>;
    getPaginatedCompanyAdmins(pageNumber: number, filter?: IStaffFilter): Promise<ApiResponse<PageResponse<IStaffWithCompanyName[]>|ErrorBody>>;
    deleteStaff(staffId: number): Promise<ApiResponse<string|ErrorBody>>;
    getStaff(id: number): Promise<ApiResponse<IStaffWithCompanyName|ErrorBody>>;
    updateStaff(staff: StaffRequest, staffId: number): Promise<ApiResponse<IStaffWithCompanyName|ErrorBody>>;
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

    getCompanyInfo(id: number): Promise<ApiResponse<ICompanyInfo | ErrorBody>>{
        return apiInstance
            .get<ICompanyInfo>(apiPaths.getCompanyInfo(id))
            .then(confirmationHandler)
            .catch(errorHandler);
    }

    getCompanyMainAdminContact(companyId: number): Promise<ApiResponse<ContactResponse | ErrorBody>>{
        return apiInstance
            .get<ContactResponse>(apiPaths.getCompanyMainAdmin(companyId))
            .then(confirmationHandler)
            .catch(errorHandler);
    }
    getCompanyItHeadContact(companyId: number): Promise<ApiResponse<ContactResponse | ErrorBody>>{
        return apiInstance
            .get<ContactResponse>(apiPaths.getCompanyItHead(companyId))
            .then(confirmationHandler)
            .catch(errorHandler);
    }
    getCompanyCustomerManagerContact(companyId: number): Promise<ApiResponse<ContactResponse | ErrorBody>>{
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

    createCompanyAdmin(admin: StaffRequest): Promise<ApiResponse<IStaff|ErrorBody>>{
        return apiInstance
            .post<IStaff>(apiPaths.createCompanyAdmin, admin)
            .then(confirmationHandler)
            .catch(errorHandler);
    }

    getAllCompanies(): Promise<ApiResponse<ResourceCollectionResponse<ICompanyWithId[]>|ErrorBody>>{
        return apiInstance
            .get<ResourceCollectionResponse<ICompanyWithId[]>>(apiPaths.getAllCompanies)
            .then(confirmationHandler)
            .catch(errorHandler);
    }

    getPaginatedCompanyAdmins(pageNumber: number, filter?: IStaffFilter): Promise<ApiResponse<PageResponse<IStaffWithCompanyName[]>|ErrorBody>>{
        return apiInstance
            .get<PageResponse<IStaffWithCompanyName[]>>(apiPaths.getPaginatedCompanyAdmins, {
                params: {
                    page: pageNumber,
                    name: filter?.name,
                    phoneNumber: filter?.phoneNumber,
                    email: filter?.email,
                    status: filter?.status,
                    companyId: filter?.companyId
                }
            })
            .then(confirmationHandler)
            .catch(errorHandler);
    }

    deleteStaff(staffId: number): Promise<ApiResponse<string|ErrorBody>>{
        return apiInstance
            .delete<string>(apiPaths.removeStaff(staffId))
            .then(confirmationHandler)
            .catch(errorHandler);
    }

    getStaff(id: number): Promise<ApiResponse<IStaffWithCompanyName|ErrorBody>>{
        return apiInstance
            .get<IStaffWithCompanyName>(apiPaths.getCompanyAdmin(id))
            .then(confirmationHandler)
            .catch(errorHandler);
    }

    updateStaff(staff: StaffRequest, staffId: number): Promise<ApiResponse<IStaffWithCompanyName|ErrorBody>>{
        return apiInstance
            .put<IStaffWithCompanyName>(apiPaths.updateStaff(staffId), staff)
            .then(confirmationHandler)
            .catch(errorHandler);
    }

}

export default function api(): ClientApi {
    return ClientApiImpl.getInstance();
}

//as a workaround I try to transform api into useApi hook
