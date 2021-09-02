import * as React from 'react';
import {
    GridRowsProp,
    DataGrid,
    GridPageChangeParams,
} from '@material-ui/data-grid';
import {useEffect, useState} from "react";
import {getCompanies} from "../../../../../utils/FetchFunctions";
import {ICompany, PaginatedTableFetcher} from "../../../../../utils/Interfaces/InterfacesApi";
import {CustomPagination} from "../../../../Reusable/Tables/PaginatedTable/CustomPagination/CustomPagination";
import {bool} from "yup";
// import { useDemoData, GridData } from '@material-ui/x-grid-data-generator';

export function CompanyTableTestFailed(): JSX.Element {

    const [page, setPage] = React.useState(1);
    const [rows, setRows] = React.useState<GridRowsProp>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [pageCount, setPageCount] = useState<number>(1);
    const handlePageChange = (params: GridPageChangeParams) => {
        setPage(params.page+1);
    };

    const column = (name: string, header: string): {field: string, headerName: string, width?: number, resizable: boolean, editable?: boolean} => {
        if (name == 'address')
            return {field: name, headerName: header, width: 500, resizable: true, editable: true};
        return {field: name, headerName: header, width: 150, resizable: true};
    }
    const colNames = [{0: 'name', 1: 'Name'}, {0: 'city', 1: 'City'}, {0: 'country', 1: 'Country'}, {0: 'address', 1: 'Address'}, {0: 'status', 1: 'Status'}, {0: 'zipCode', 1: 'Zip code'}];
    // const columns: {field: string}[] = colNames.map(colName => column(colName));
    const [columns, setColumns] = useState<
        {
            field: string,
            headerName: string,
            width?: number,
            resizable?: boolean,
            editable?: boolean
        }[]>([]);

    useEffect(() => {
        setColumns(colNames.map(col => column(col[0], col[1])));
    },[])

    useEffect(
        () => {
            getCompanies(page)
                .then((result) => {
                    const {data, perPage, lastPage} = result as PaginatedTableFetcher<ICompany>;
                    setRows(data);
                    setPageCount(lastPage);
                })
                .catch(err => alert(err));
        }, [page]
    );

    return (
        <div style={{ height: 400, width: 1400 }}>
            <DataGrid
                showCellRightBorder={true}
                showColumnRightBorder={true}
                density={'standard'}
                autoPageSize={true}
                rows={rows}
                columns={columns}
                pagination
                pageSize={5}
                rowCount={100}
                // checkboxSelection={true}
                paginationMode="server"
                onPageChange={handlePageChange}
                loading={loading}
            />
        </div>
    );
}
