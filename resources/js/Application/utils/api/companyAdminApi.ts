import {ApiResponse, ErrorBody, IRole, IRoleCreation} from "../Interfaces/InterfacesApi";
import {apiInstance} from "../Instances";
import {apiPaths} from "../utils";
import {confirmationHandler, errorHandler} from "../Handlers";

export interface CompanyAdminApi{
    createRole(role: IRoleCreation, companyId: number): Promise<ApiResponse<IRole|ErrorBody>>;
}

export class CompanyAdminApiImpl implements CompanyAdminApi{
    createRole(role: IRoleCreation, companyId: number): Promise<ApiResponse<IRole | ErrorBody>> {
        return apiInstance
            .post<IRole>(apiPaths.createRole(companyId), role)
            .then(confirmationHandler)
            .catch(errorHandler);
    }
}
