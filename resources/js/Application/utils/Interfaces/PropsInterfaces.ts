import {ErrorBody, ICompanyCreation, PaginatedTableFetcher} from "./InterfacesApi";
import {Control, FieldErrors, SubmitHandler, UseFormRegister} from "react-hook-form";
import {Action} from "./ComponentInterfaces";
import {ICompanyFilter} from "./InterfacesApi";
import React from "react";
import {UseFormHandleSubmit} from "react-hook-form/dist/types/form";

export interface Column{
    name: string;
    property: string;
    percent: number;
}

export interface ActionColumn{
    name: string;
    actions: Action[];
    percent: number;
}

export interface PaginatedTableTestProps{
    data: any;
    children: JSX.Element;
    perPage: number;
    emptyRowsNumber: number;
    pageCount: number;
    columns: Column[];
    actionColumns?: ActionColumn[];
    tableCellHeight: number;
}



type message = string | undefined;
export interface ContactPropsOld {
    who: string;
    register: UseFormRegister<ICompanyCreation>;
    phoneError: boolean;
    phoneErrorMessage: message;
    emailError: boolean;
    emailErrorMessage: message;
    firstNameError: boolean;
    firstNameMessage: message;
    lastNameError: boolean;
    lastNameMessage: message;
}

export interface CompanyFilterProps {
    setFilter: React.Dispatch<React.SetStateAction<ICompanyFilter>>;
    companyFilter: ICompanyFilter;
}

export interface CompanyFormProps{
    handleSubmit: UseFormHandleSubmit<ICompanyCreation>;
    errors: FieldErrors<ICompanyCreation>;
    control: Control<ICompanyCreation>;
    onSubmit: SubmitHandler<ICompanyCreation>;
    buttonName: string;
}

export interface ContactProps{
    who: string;
    control: Control<ICompanyCreation>;
    phoneError: boolean;
    phoneErrorMessage: message;
    emailError: boolean;
    emailErrorMessage: message;
    firstNameError: boolean;
    firstNameMessage: message;
    lastNameError: boolean;
    lastNameMessage: message;
}

export interface HeaderProps {
    headerText: string;
}

export interface UpdateFormProps {
    id: number,
    company: ICompanyCreation;
}

export interface ContactInfoProps{
    role: string;
    firstName: string|undefined;
    lastName: string|undefined;
    email: string|undefined;
    phone: string|undefined;
}

export interface CustomPaginationProps{
    pageCount: number;
    currentPage: number;
    setPageNumber:  React.Dispatch<React.SetStateAction<number>>;
}

export interface CompanyAdminCreationFormProps {
    setAlert: React.Dispatch<React.SetStateAction<string | null>>;
    alert: string|null;
    setSuccess: React.Dispatch<React.SetStateAction<string | null>>;
    companyId: number|undefined;
}
