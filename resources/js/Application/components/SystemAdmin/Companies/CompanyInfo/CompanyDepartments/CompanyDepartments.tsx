import React from "react";
import {getCompanyDepartments} from "../../../../../utils/FetchFunctions";
import {ErrorBody, PaginatedTableFetcher} from "../../../../../utils/Interfaces/InterfacesApi";
import {ReusableTable} from "../../../../Reusable/Tables/ReusableTable/ReusableTable";
import {Column} from "../../../../../utils/Interfaces/PropsInterfaces";
import {Typography} from "@material-ui/core";

interface CompanyDepartmentsTestProps{
    id: number;
    onAlert(message: string): void;
}
export function CompanyDepartments({id, onAlert}: CompanyDepartmentsTestProps): JSX.Element{

    function fetcher(pageNumber: number): Promise<PaginatedTableFetcher | ErrorBody>{
        return getCompanyDepartments(id, pageNumber);
    }
    const columns: Column[] = [
        {name: 'ID', property: 'id', percent: 10},
        {name: 'Name', property: 'name', percent: 70},
        {name: 'Number of users', property: 'usersNumber', percent: 20},
    ]
    return <ReusableTable fetcher={fetcher} tableCellHeight={50} columns={columns} onAlert={onAlert}/>
}
