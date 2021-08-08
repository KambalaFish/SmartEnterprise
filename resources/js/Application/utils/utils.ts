export function getBaseUrl(): string{
    return process.env.MIX_APP_URL as string;
}

export function getApiBaseUrl(): string {
    return `${process.env.MIX_APP_URL}/api`
}

export const spaPaths = {
    home: "/home",
    signIn: '/sign-in',
    allCompanies: '/allCompanies',
    companyCreation: '/createCompany',
    companyUpdate: '/updateCompany/',
    companyInfo: '/aboutCompany/',
    profile: '/profile'
}

export const apiPaths = {
    XSRFCookie: '/sanctum/csrf-cookie',
    login: "/login",
    logout: "/logout",
    createCompany: '/companies',
    updateCompany: '/companies/',
    getCompanies: '/companies',
    getCompany: '/companies/',
    getCompanyMainAdmin: (companyId: number): string => `/company/${companyId}/mainAdmin/`,
    getCompanyItHead: (companyId: number): string => `/company/${companyId}/itHead`,
    getCompanyCustomerManager: (companyId: number): string => `/company/${companyId}/customerManager/`,
    removeCompany: '/companies/',
    getCompanyDepartments: (companyId: number): string => `/company/${companyId}/departments/`,
    getCompanyRoles: (companyId: number): string => `/company/${companyId}/roles/`,
    getCompanyTeams: (companyId: number): string => `/company/${companyId}/teams/`,
}
