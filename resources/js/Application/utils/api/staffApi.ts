import {
    ApiResponse,
    ErrorBody,
    IStaff,
    IStaffFilter,
    IStaffWithCompanyName,
    PageResponse,
    StaffRequest
} from "../Interfaces/InterfacesApi";
import {apiInstance} from "../Instances";
import {apiPaths} from "../utils";
import {confirmationHandler, errorHandler} from "../Handlers";

export interface StaffApi{
    createCompanyAdmin(admin: StaffRequest): Promise<ApiResponse<IStaff|ErrorBody>>;
    getPaginatedCompanyAdmins(pageNumber: number, filter?: IStaffFilter): Promise<ApiResponse<PageResponse<IStaffWithCompanyName[]>|ErrorBody>>;
    deleteStaff(staffId: number): Promise<ApiResponse<string|ErrorBody>>;
    getStaff(id: number): Promise<ApiResponse<IStaffWithCompanyName|ErrorBody>>;
    updateStaff(staff: StaffRequest, staffId: number): Promise<ApiResponse<IStaffWithCompanyName|ErrorBody>>;
}

export class StaffApiImpl implements StaffApi {
    createCompanyAdmin(admin: StaffRequest): Promise<ApiResponse<IStaff|ErrorBody>>{
        return apiInstance
            .post<IStaff>(apiPaths.createCompanyAdmin, admin)
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
