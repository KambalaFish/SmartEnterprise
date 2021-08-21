import React, {useEffect, useState} from "react";
import {ErrorBody, PaginatedTableFetcher} from "../../../../utils/Interfaces/InterfacesApi";
import ReactDOM from "react-dom";
import {ActionColumn, Column} from "../../../../utils/Interfaces/PropsInterfaces";
import {PaginatedTable} from "../PaginatedTable/PaginatedTable";
import {CustomPagination} from "../PaginatedTable/CustomPagination/CustomPagination";
import {CircularProgress} from "@material-ui/core";

interface AdvancedReusableTableProps{
    fetcher: (pageNumber: number) => Promise<PaginatedTableFetcher | ErrorBody>;
    tableCellHeight: number;
    columns: Column[];
    actionColumns: ActionColumn[];
    onCatch: (message: string) => void;
    activateFilterEffect?: boolean;
    activateRowRemovalEffect?: boolean;
}

export function AdvancedReusableTable({fetcher, tableCellHeight, columns, actionColumns, activateFilterEffect, activateRowRemovalEffect, onCatch}: AdvancedReusableTableProps): JSX.Element{
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
                        if (lastPage != pageCount)
                            setPageCount(lastPage);
                        if (perPageResponse != perPage)
                            setPerPage(perPageResponse);
                        if (dif!=emptyRowsNumber)
                            setEmptyRowsN(dif)
                    }
                );
            })
            .catch( (reason: ErrorBody) => {
                onCatch(reason.error);
            });
    }, [pageNumber]);

    useEffect(() => {
        fetcher(1)
            .then((result) => {
                const {data, perPage: perPageResponse, lastPage} = result as PaginatedTableFetcher;
                const dif = perPageResponse - data.length;
                ReactDOM.unstable_batchedUpdates(()=>{
                   setData(data);
                   setPageNumber(1);
                   if(lastPage!=pageCount)
                       setPageCount(lastPage);
                   if(perPageResponse!=perPage)
                       setPerPage(perPageResponse);
                   if (dif!=emptyRowsNumber)
                       setEmptyRowsN(dif);
                });
            })
            .catch((reason: ErrorBody) => onCatch(reason.error));
    }, [activateFilterEffect]);

    useEffect(() => {
        fetcher(pageNumber)
            .then((result)=>{
                const {data, perPage: perPageResponse, lastPage} = result as PaginatedTableFetcher;
                const dif = perPageResponse - data.length;
                if (lastPage==pageCount-1){
                    ReactDOM.unstable_batchedUpdates(() => {
                        if(pageNumber-1==lastPage)
                            setPageNumber(pageNumber-1);
                        else{
                            setData(data);
                            setPageCount(lastPage);
                            if(perPageResponse!=perPage)
                                setPerPage(perPageResponse);
                            if (dif!=emptyRowsNumber)
                                setEmptyRowsN(dif);
                        }
                    });
                } else if (lastPage==pageCount){
                    ReactDOM.unstable_batchedUpdates(() => {
                        setData(data);
                        setEmptyRowsN(dif);
                        if (perPageResponse!=perPage)
                            setPerPage(perPageResponse);
                    })
                } else {
                    if (pageNumber==1){
                        ReactDOM.unstable_batchedUpdates(() => {
                            setData(data);
                            setPageCount(lastPage);
                            if (perPageResponse != perPage)
                                setPerPage(perPageResponse);
                            if (dif!=emptyRowsNumber)
                                setEmptyRowsN(dif)
                        })
                    } else {
                        setPageNumber(1);
                    }
                }
            })
            .catch((reason: ErrorBody) => onCatch(reason.error));
    }, [activateRowRemovalEffect]);

    return (
        data?
            <PaginatedTable
                data={data}
                perPage={perPage}
                emptyRowsNumber={emptyRowsNumber}
                pageCount={pageCount}
                columns={columns}
                actionColumns={actionColumns}
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
