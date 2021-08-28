import {CompanyApi, CompanyApiImpl} from "./companyApi";
import {StaffApi, StaffApiImpl} from "./staffApi";
import {AuthApi, AuthApiImpl} from "./authenticationApi";

interface ClientApi {
    getAuthApi(): AuthApi;
    getCompanyApi(): CompanyApi;
    getStaffApi(): StaffApi;
}

class ClientApiImpl implements ClientApi {

    private static api: ClientApi;

    constructor() {
        this.companyApi = new CompanyApiImpl();
        this.staffApi = new StaffApiImpl();
        this.authApi = new AuthApiImpl();
    }

    public static getInstance(): ClientApi{
        if (ClientApiImpl.api == null){
            ClientApiImpl.api = new ClientApiImpl();
        }
        return ClientApiImpl.api;
    }

    private readonly authApi: AuthApi;

    getAuthApi(): AuthApi{
        return this.authApi;
    }

    private readonly companyApi: CompanyApi;

    getCompanyApi(): CompanyApi {
        return this.companyApi;
    }

    private readonly staffApi: StaffApi;

    getStaffApi(): StaffApi {
        return this.staffApi;
    }

}

export default function api(): ClientApi {
    return ClientApiImpl.getInstance();
}
