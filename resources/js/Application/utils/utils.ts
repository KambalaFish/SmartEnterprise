export function getBaseUrl(): string{
    return process.env.MIX_APP_URL as string;
}

export function getApiBaseUrl(): string {
    return `${process.env.MIX_APP_URL}/api`
}

export const spaPaths = {
    home: "/home",
    signIn: '/sign-in',
    systemAdminPaths:{
        allCompanies: '/company/all',
        companyCreation: '/company/create',
        companyUpdatePath: `/company/:id/update/`,
        companyUpdate: (id: number): string => `/company/${id}/update/`,
        selectedCompanyAdminCreationPath: '/company/:id/admin/creation',
        selectedCompanyAdminCreation: (companyId: number): string => `/company/${companyId}/admin/creation`,
        companyAdminCreation: '/company/admin/creation',
        allCompanyAdmins: '/company/admin/all',
        companyAdminUpdatePath: `/company/admin/:id/update`,
        companyAdminUpdate: (id: number): string => `/company/admin/${id}/update`,
    },
    companyAdminPaths: {
        allRoles: '/roles'
    },
    companyInfoPath: `/company/:id/about/`,
    companyInfo: (id: number): string => `/company/${id}/about/`,
    profile: '/profile',
}

export const apiPaths = {
    XSRFCookie: '/sanctum/csrf-cookie',
    login: "/login",
    logout: "/logout",
    createCompany: '/companies',
    updateCompany: '/companies/',
    getCompanies: '/companies',
    getCompany: '/companies/',
    getCompanyInfo: (id: number): string => `/company/${id}/info`,
    getCompanyMainAdmin: (companyId: number): string => `/company/${companyId}/mainAdmin/`,
    getCompanyItHead: (companyId: number): string => `/company/${companyId}/itHead`,
    getCompanyCustomerManager: (companyId: number): string => `/company/${companyId}/customerManager/`,
    removeCompany: '/companies/',
    getCompanyDepartments: (companyId: number): string => `/company/${companyId}/departments/`,
    getCompanyRoles: (companyId: number): string => `/company/${companyId}/roles/`,
    getCompanyTeams: (companyId: number): string => `/company/${companyId}/teams/`,
    createCompanyAdmin: '/staff/companyAdmin/create',
    getAllCompanies: '/company/all',
    getPaginatedCompanyAdmins: '/staff/companyAdmins',
    removeStaff: (staffId: number): string => `/staff/${staffId}`,
    getCompanyAdmin: (id: number): string => `/staff/${id}`,
    updateStaff: (id: number): string => `/staff/${id}`,
    createRole: (companyId: number): string => `/company/${companyId}/role`
}
