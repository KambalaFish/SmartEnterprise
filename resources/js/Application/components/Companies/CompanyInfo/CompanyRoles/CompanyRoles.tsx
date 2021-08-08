import React from "react";
import {getCompanyRoles} from "../../../../utils/FetchFunctions";
import {ErrorBody, PaginatedTableFetcher} from "../../../../utils/Interfaces/InterfacesApi";
import {ReusableTable} from "../../../ReusableTable/ReusableTable";
import {Column} from "../../../../utils/Interfaces/PropsInterfaces";

interface CompanyRolesProps{
    id: number;
}
export function CompanyRoles({id}: CompanyRolesProps): JSX.Element{

    function fetcher(pageNumber: number): Promise<PaginatedTableFetcher | ErrorBody>{
        return getCompanyRoles(id, pageNumber);
    }
    const columns: Column[] = [
        {name: 'ID', property: 'id', percent: 10},
        {name: 'Name', property: 'name', percent: 70},
        {name: 'Number of users', property: 'usersNumber', percent: 20},
    ]
    return <ReusableTable fetcher={fetcher} tableCellHeight={50} columns={columns}/>
}
