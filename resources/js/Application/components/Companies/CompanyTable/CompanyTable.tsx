import React, {BaseSyntheticEvent, useEffect, useState} from "react";
import {ICompanyFilter} from "../../../utils/Interfaces/InterfacesApi";
import {ActionColumn, Column} from "../../../utils/Interfaces/PropsInterfaces";
import {PaginatedTable} from "../../Reusable/Tables/PaginatedTable/PaginatedTable";
import {CustomPagination} from "../../Reusable/Tables/PaginatedTable/CustomPagination/CustomPagination";
import {CircularProgress, FormControl, Select, Typography} from "@material-ui/core";
import {useAppDispatch, useAppSelector} from "../../../redux/reduxHooks";
import {
    fetchCompanyPage,
    removeFrom,
    selectData,
    selectLastPage,
    selectPerPage,
    selectStatus,
} from "../../../redux/slices/companyTableSlice";
import useUpdateEffect from "../../../utils/useUpdateEffect";
import {useHistory} from "react-router-dom";
import {spaPaths} from "../../../utils/utils";
import api from "../../../utils/Api";
import {ClickableButton} from "../../../utils/Interfaces/ComponentInterfaces";
import MenuItem from "@material-ui/core/MenuItem";
import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "../../../redux/configureStore";
import {removeCompany as removeCompanyFromStore} from "../../../redux/slices/companySlice";

interface CompanyTableReduxProps {
    filter: ICompanyFilter;
    tableCellHeight: number;
}

export function CompanyTable({
                                      filter,
                                      tableCellHeight, /*actionColumns, activateRowRemovalEffect*/
                                  }: CompanyTableReduxProps): JSX.Element {
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [error, setError] = useState<string | null>(null);
    const history = useHistory();
    const dispatch = useAppDispatch();
    const perPage = useAppSelector(selectPerPage);
    const pageCount = useAppSelector(selectLastPage);
    const companyIds = useAppSelector(state => selectData(state, pageNumber));

    // https://redux.js.org/tutorials/essentials/part-6-performance-normalization#showing-new-notifications
    // We know that useSelector will re-run every time an action is dispatched, and that it forces the component to re-render if we return a new reference value.
    // We're calling filter() inside of our useSelector hook, so that we only return the list of posts that belong to this user.
    // Unfortunately, this means that useSelector always returns a new array reference, and so our component will re-render after every action even if the posts data hasn't changed!.
    const selectCompanies = createSelector(
        [(state: RootState, pageNumber: number) => selectData(state, pageNumber), (state: RootState) => state.companies.entities],
        (compIds, companies) => (compIds?.map(item => companies[item]? companies[item] : null) )
    );
    const companies = useAppSelector(state => selectCompanies(state, pageNumber));
    // const companies = useAppSelector(state => {
    //     return companyIds?.map(item => {
    //         if (state.companies.entities[item])
    //             return state.companies.entities[item];
    //         return;
    //     });
    // });
    const status = useAppSelector(selectStatus);
    const emptyRowsNumber = companyIds ? perPage - companyIds.length : perPage;



    function fetchData(pageNumber: number) {
        dispatch(fetchCompanyPage({pageNumber, filter}))
            .unwrap()
            .catch((reason) => {
                setError(reason.message);
            })
    }

    useEffect(() => {
        if (!companyIds && status!='loading') {
            fetchData(pageNumber);
        }
    }, [pageNumber, companyIds]);
    // }, [pageNumber]);

    useUpdateEffect(() => {
        dispatch(removeFrom(1));
        // dispatch(fetchCompanyPage({pageNumber: 1, filter}));
        fetchData(1);
        setPageNumber(1);
    }, [filter]);


    const columns: Column[] = [
        {name: 'Name', property: 'name', percent: 20},
        {name: 'Country', property: 'country', percent: 14},
        {name: 'City', property: 'city', percent: 14},
        {name: 'Address', property: 'address', percent: 30},
        {name: 'ZIP code', property: 'zipCode', percent: 8},
        {name: 'Status', property: 'status', percent: 8},
    ]

    const CompanyTableMenu: ClickableButton = (id: number) => {
        function updateCompany(id: number) {
            history.push(spaPaths.companyUpdate + id);
        }

        function removeCompany(id: number) {
            api()
                .deleteCompany(id)
                .then(result => {
                    alert(result.response);
                    dispatch(removeFrom(pageNumber));
                    dispatch(removeCompanyFromStore(id));
                    if (companyIds?.length===1 && pageNumber!=1){
                        setPageNumber(value => value - 1);
                    }
                })
        }

        function createAdmin(id: number){
            history.push(spaPaths.selectedCompanyAdminCreation(id));
        }

        function handleClick(event: BaseSyntheticEvent, id: number) {
            if (event.target.value == 0) {
                updateCompany(id);
            }
            if (event.target.value == 1) {
                removeCompany(id);
            }
            if (event.target.value == 2) {
                createAdmin(id);
            }
        }

        return (
            <FormControl key={id} variant={'outlined'} size={'small'}>
                <Select
                    onClick={(event) => handleClick(event, id)}
                    defaultValue={0}
                >
                    <MenuItem value={0}>update</MenuItem>
                    <MenuItem value={1}>remove</MenuItem>
                    <MenuItem value={2}>create admin</MenuItem>
                </Select>
            </FormControl>
        )
    };

    const actionColumns: ActionColumn[] = [
        {name: 'Action', actions: [{clickableButton: CompanyTableMenu, targetProperty: 'id'}], percent: 6}
    ]

    let content;
    switch (status) {
        case "idle":
        case 'loading':
            content = <CircularProgress/>;
            break;
        case "succeeded":
            content = companyIds ?
                <PaginatedTable
                    // companyIds={companyIds}
                    data={companies}
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
                </PaginatedTable> : <Typography variant='h1'>Empty data</Typography>;
            break;
        case "failed":
            content = <Typography variant={'h5'} style={{color: 'red'}}>Error: {error}</Typography>
            break;
        default:
            content = <Typography variant={'h1'}>initial value...</Typography>;
    }

    return content;
}


// function fetchData(pageNumber: number){
//     dispatch(fetchCompanyPage({pageNumber, filter}))
//         .unwrap()
//         .then((result) =>{
//             const {perPage: perPageResponse, lastPage} = result.response.meta;
//             ReactDOM.unstable_batchedUpdates(
//                 () => {
//                     if (perPageResponse!=perPage)
//                         setPerPage(perPageResponse);
//                     if (lastPage!=pageCount)
//                         setPageCount(lastPage);
//                 })
//         })
//         .catch((reason) => {
//             setError(reason.message);
//         })
// }
