import {
    IStaffForm,
    ICompanyInfo,
} from "./InterfacesApi";
import {Control, FieldErrors, SubmitHandler} from "react-hook-form";
import {Action, CompanyAdminFormDefaultValues} from "./ComponentInterfaces";
import React from "react";
import {UseFormHandleSubmit} from "react-hook-form/dist/types/form";

export interface Column {
    name: string;
    property: string;
    percent: number;
}

export interface ActionColumn {
    name: string;
    actions: Action[];
    percent: number;
}

export interface PaginatedTableTestProps {
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

export interface CompanyFormProps {
    handleSubmit: UseFormHandleSubmit<ICompanyInfo>;
    errors: FieldErrors<ICompanyInfo>;
    control: Control<ICompanyInfo>;
    onSubmit: SubmitHandler<ICompanyInfo>;
    buttonName: string;
}

export interface ContactProps {
    who: string;
    control: Control<ICompanyInfo>;
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


export interface ContactInfoProps {
    role: string;
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
    phone: string | undefined;
}

export interface CustomPaginationProps {
    pageCount: number;
    currentPage: number;
    setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}

export interface CompanyAdminFormProps {
    onSubmit: SubmitHandler<IStaffForm>;
    buttonName: string;
    defaultValues: CompanyAdminFormDefaultValues;
    passwordFieldLabel?: string;
}

export interface TablePageHeaderProps{
    header: string;
}
