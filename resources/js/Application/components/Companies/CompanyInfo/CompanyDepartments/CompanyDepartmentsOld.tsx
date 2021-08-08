import React, {useEffect, useState} from "react";
import {Typography} from "@material-ui/core";
import {ErrorBody, PaginatedTableFetcher} from "../../../../utils/Interfaces/InterfacesApi";
import {getCompanyDepartments} from "../../../../utils/FetchFunctions";
import ReactDOM from "react-dom";
import {Column} from "../../../../utils/Interfaces/PropsInterfaces";
import {PaginatedTable} from "../../../PaginatedTable/PaginatedTable";
import {CustomPagination} from "../../../PaginatedTable/CustomPagination/CustomPagination";

interface CompanyDepartmentsProps{
    id: number;
}

export function CompanyDepartmentsOld({id}: CompanyDepartmentsProps): JSX.Element{
    const [data, setData] = useState<unknown[]>();
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageCount, setPageCount] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(1);
    const [emptyRowsNumber, setEmptyRowsN] = useState<number>(0);

    const columns: Column[] = [
        {name: 'ID', property: 'id', percent: 10},
        {name: 'Name', property: 'name', percent: 70},
        {name: 'Number of users', property: 'usersNumber', percent: 20},
    ]

    useEffect(() => {
        getCompanyDepartments(id, pageNumber)
            .then((res) => {
                const {data, perPage: perPageResponse, lastPage} = res as PaginatedTableFetcher;
                const dif = perPageResponse - data.length;
                ReactDOM.unstable_batchedUpdates(
                    ()=>{
                        setData(data);
                        if (lastPage != pageCount) {
                            setPageCount(lastPage);
                            setPageNumber(1);
                        }
                        if (perPageResponse != perPage)
                            setPerPage(perPageResponse);
                        if (dif!=emptyRowsNumber)
                            setEmptyRowsN(dif)
                    }
                );
            })
            .catch( (reason: ErrorBody) => {
                alert('reason: ' + reason.error);
            });
    }, [pageNumber]);

    return (
        data?
            <PaginatedTable
                data={data}
                perPage={perPage}
                emptyRowsNumber={emptyRowsNumber}
                pageCount={pageCount}
                columns={columns}
                tableCellHeight={50}
            >
                <CustomPagination
                    pageCount={pageCount}
                    currentPage={pageNumber - 1}
                    setPageNumber={setPageNumber}
                />
            </PaginatedTable>
            :
            <Typography variant={'h4'}>Loading...</Typography>
    )
}
