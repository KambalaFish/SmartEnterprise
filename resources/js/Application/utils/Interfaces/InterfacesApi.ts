export interface Credentials{
    email: string;
    password: string;
}

export interface ApiResponse<T> {
    code: number;
    response: T;
}

export interface ErrorBody {
    error: string;
}


export interface PaginatedTableFetcher<T = unknown> {
    data: T[],
    perPage: number,
    lastPage: number,
}

// export interface PaginatedTableFetcher<T> {
//     data: T,
//     perPage: number,
//     lastPage: number,
// }

type Status = 'served' | 'not served';
export interface ICompany{
    name: string;
    status: Status;
    country: string;
    city: string;
    address: string;
    zipCode: number;
}

export interface ICompanyWithId extends ICompany{
    id: number;
}

interface PageMetaData{
    lastPage: number,
    perPage: number;
}

export interface PageResponse<T> {
    data: T;
    meta: PageMetaData;
}
// export interface CompanyPageResponse {
//     data: ICompany[];
//     meta: PageMetaData;
// }



export interface Contact{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

export type ContactResponse = Contact & {companyId: number};

export interface ICompanyCreation {
    name: string;
    status: Status;
    country: string;
    city: string;
    address: string;
    zipCode: number|string;
    admin?: Contact;
    itHead?: Contact;
    customerManager?: Contact;
}

export interface ICompanyFilter {
    name: string;
    country: string;
    city: string;
    address: string;
    zipCode: number|string;
    status: 'any'|'served'|'not served';
    // status: string;
}

export interface IDepartment {
    id: number;
    name: string;
    usersNumber: number;
}

export interface IRole {
    id: number;
    name: string;
    usersNumber: number;
}

export interface ITeam {
    id: number;
    name: string;
    usersNumber: number;
}

export enum UserType {
    CompanyAdmin = 'companyAdmin',
    SystemAdmin = 'systemAdmin',
    Manager = 'manager',
    Unauthenticated = 'unauthenticated'
}

export interface AuthenticatedUser{
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    usertype: UserType;
    roles: string[];
}

export enum UserStatus {
    works = 'works',
    onVacation = 'on_vacation',
    illness = 'illness'
}

export interface CompanyAdminForm {
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    password: string,
    passwordConfirmation: string,
    status: UserStatus
}

export type CompanyAdminRequest = CompanyAdminForm & {companyId: number};
