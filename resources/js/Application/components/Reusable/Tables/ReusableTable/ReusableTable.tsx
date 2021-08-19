import React, {useEffect, useState} from "react";
import {Typography} from "@material-ui/core";
import {ErrorBody, PaginatedTableFetcher} from "../../../../utils/Interfaces/InterfacesApi";
import ReactDOM from "react-dom";
import {Column} from "../../../../utils/Interfaces/PropsInterfaces";
import {PaginatedTable} from "../PaginatedTable/PaginatedTable";
import {CustomPagination} from "../PaginatedTable/CustomPagination/CustomPagination";
import {CircularProgress} from "@material-ui/core";

interface ReusableTableProps{
    fetcher: (pageNumber: number) => Promise<PaginatedTableFetcher | ErrorBody>;
    tableCellHeight: number;
    columns: Column[];
}

export function ReusableTable({fetcher, tableCellHeight, columns}: ReusableTableProps): JSX.Element{
    const [data, setData] = useState<unknown[]>();
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageCount, setPageCount] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(1);
    const [emptyRowsNumber, setEmptyRowsN] = useState<number>(0);

    useEffect(() => {
        fetcher(pageNumber)
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
                tableCellHeight={tableCellHeight}
            >
                <CustomPagination
                    pageCount={pageCount}
                    currentPage={pageNumber - 1}
                    setPageNumber={setPageNumber}
                />
            </PaginatedTable>
            :
            <CircularProgress/>
    )
}
