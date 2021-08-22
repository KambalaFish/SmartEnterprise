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

type Status = 'served' | 'not served';
export interface ICompany{
    name: string;
    country: string;
    city: string;
    address: string;
    zipCode: number|'';
    status: Status;
}

export interface ICompanyWithId extends ICompany{
    id: number;
}

export interface ICompanyInfo extends ICompanyWithId{
    mainAdminContact: ContactResponse;
    itDepartmentContact: ContactResponse;
    customerManagerContact: ContactResponse;
}

export interface Contact{
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}

export interface ContactResponse extends Contact{
    companyId: number;
}

interface PageMetaData{
    lastPage: number,
    perPage: number;
}

export interface ResourceCollectionResponse<T>{
    data: T;
}

export interface PageResponse<T> extends ResourceCollectionResponse<T>{
    meta: PageMetaData;
}

export interface ICompanyFilter {
    name: string;
    country: string;
    city: string;
    address: string;
    zipCode: number|string;
    status: 'any'|'served'|'not served';
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
    name: string;
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

export interface IStaffForm {
    name: string,
    phoneNumber: string,
    email: string,
    password: string,
    passwordConfirmation: string,
    status: UserStatus
}

export interface StaffRequest extends IStaffForm{
    companyId: number;
}

export interface IStaff {
    id: number;
    name: string,
    phoneNumber: string,
    email: string,
    status: UserStatus,
    companyId: number,
    usertype: UserType
}

export interface IStaffWithCompanyName extends IStaff{
    companyName: string;
}

export interface IStaffFilter {
    name: string;
    phoneNumber: string;
    email: string;
    companyId: number|null;
    status: UserStatus|'any';
}
