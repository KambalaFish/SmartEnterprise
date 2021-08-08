export {};
// import React, {BaseSyntheticEvent, useEffect, useState} from "react";
// import {PaginatedTable} from "../../../PaginatedTable/PaginatedTable";
// import {getCompanies} from "../../../../utils/FetchFunctions";
// import {ActionColumn, Column} from "../../../../utils/Interfaces/PropsInterfaces";
// import {Button, FormControl, Grid, Typography} from "@material-ui/core";
// import {CompanyFilterOld} from "../CompanyFilter/backup/CompanyFilterOld";
// import {RouteComponentProps} from 'react-router-dom';
// import {spaPaths} from "../../../../utils/utils";
// import {CustomPagination} from "../../../PaginatedTable/CustomPagination/CustomPagination";
// import {ErrorBody, ICompany, ICompanyFilter, PaginatedTableFetcher} from "../../../../utils/Interfaces/InterfacesApi";
// import ReactDOM from "react-dom";
// import api from "../../../../utils/Api";
// import Menu from "@material-ui/core/Menu";
// import MenuItem from "@material-ui/core/MenuItem";
// import {ClickableButton} from "../../../../utils/Interfaces/ComponentInterfaces";
// import {Select} from "@material-ui/core";
//
// const columns: Column[] = [
//     {name: 'Name', property: 'name', percent: 20},
//     {name: 'Country', property: 'country', percent: 14},
//     {name: 'City', property: 'city', percent: 14},
//     {name: 'Address', property: 'address', percent: 30},
//     {name: 'ZIP code', property: 'zipCode', percent: 8},
//     {name: 'Status', property: 'status', percent: 8},
// ]
//
// export function CompanyTableOld({history}: RouteComponentProps): JSX.Element{
//
//     const [companyFilter, setFilter] = useState<ICompanyFilter>({});
//     // const [data, setData] = useState<ICompany[]>();
//     const [data, setData] = useState<unknown[]>();
//     const [pageNumber, setPageNumber] = useState<number>(1);
//     const [pageCount, setPageCount] = useState<number>(1);
//     const [perPage, setPerPage] = useState<number>(1);
//     const [emptyRowsNumber, setEmptyRowsN] = useState<number>(0);
//
//     function removeCompany(id: number){
//         console.log('remove id: ', id);
//         api()
//             .deleteCompany(id)
//             .then(result => {
//                 alert(result.response);
//                 return getCompanies(pageNumber, companyFilter);
//             })
//             .then((res) => {
//                 // const {data, perPage: perPageResponse, lastPage} = res as PaginatedTableFetcher<ICompany[]>;
//                 const {data, perPage: perPageResponse, lastPage} = res as PaginatedTableFetcher;
//                 const dif = perPageResponse - data.length;
//                 console.log(`dif: ${dif}  |  data.length: ${data.length} | pageNumber: ${pageNumber}`)
//                 if (dif==perPageResponse){
//                     ReactDOM.unstable_batchedUpdates(()=>{
//                         setPageNumber(pageNumber - 1);
//                         setPageCount(pageCount-1)
//                     });
//                 } else {
//                     ReactDOM.unstable_batchedUpdates(
//                         ()=>{
//                             setData(data);
//                             if (lastPage != pageCount) {
//                                 setPageCount(lastPage);
//                             }
//                             if (perPageResponse != perPage)
//                                 setPerPage(perPageResponse);
//                             if (dif!=emptyRowsNumber)
//                                 setEmptyRowsN(dif)
//                         }
//                     );
//                 }
//             })
//             .catch((reason: ErrorBody) => alert(reason.error));
//     }
//
//     const updateCompany = (id: number)=>{
//         console.log('handleUpdate id: ', id);
//         history.push(spaPaths.companyUpdate+id);
//     }
//
//     const CompanyTableMenu: ClickableButton = (id: number) =>{
//         function handleClick(event: BaseSyntheticEvent){
//             if (event.target.value==0){
//                 updateCompany(id);
//             }
//             if (event.target.value==1){
//                 removeCompany(id);
//             }
//         }
//         return (
//         <FormControl key={id} variant={'outlined'} size={'small'}>
//             <Select
//                 onClick={handleClick}
//                 defaultValue={0}
//             >
//                 <MenuItem value={0}>update</MenuItem>
//                 <MenuItem value={1}>remove</MenuItem>
//             </Select>
//         </FormControl>
//         )
//     };
//
//     // const clickableButton0: ClickableButton = (x : number) => <Button key={x} style={{minWidth: 25, minHeight:10}} variant={'contained'} size={'small'} color='primary' onClick={() => updateCompany(x)}>update</Button>;
//     // const clickableButton0: ClickableButton = (x : number) => <Button key={x} style={{minWidth: 25, minHeight:10}} variant={'contained'} size={'small'} color='primary' onClick={() => removeCompany(x)}>remove</Button>;
//     const actionColumns: ActionColumn[] = [
//         {name: 'Action', actions: [{clickableButton: CompanyTableMenu, targetProperty: 'id'}], percent: 6}
//     ]
//
//     useEffect(() => {
//         getCompanies(pageNumber, companyFilter)
//             .then((res) => {
//                 const {data, perPage: perPageResponse, lastPage} = res as PaginatedTableFetcher<ICompany[]>;
//                 const dif = perPageResponse - data.length;
//                 ReactDOM.unstable_batchedUpdates(
//                     ()=>{
//                         setData(data);
//                         if (lastPage != pageCount) {
//                             setPageCount(lastPage);
//                             setPageNumber(1);
//                         }
//                         if (perPageResponse != perPage)
//                             setPerPage(perPageResponse);
//                         if (dif!=emptyRowsNumber)
//                             setEmptyRowsN(dif)
//                     }
//                 );
//             })
//             .catch( (reason: ErrorBody) => {
//                 alert(reason.error);
//             });
//     }, [pageNumber, companyFilter]);
//
//     return (
//         data?
//             <Grid item container direction={'row'} justify={'center'}>
//                 <Grid item style={{margin: `30px 0px`}} justify={'flex-start'} xs={10}>
//                     <Typography variant={'h4'}  color='secondary'>Registered companies:</Typography>
//                 </Grid>
//                 <Grid item xs={10}>
//                     <CompanyFilterOld setFilter={setFilter}/>
//                 </Grid>
//                 <Grid item xs={10}>
//                     <PaginatedTable
//                         data={data}
//                         perPage={perPage}
//                         emptyRowsNumber={emptyRowsNumber}
//                         pageCount={pageCount}
//                         columns={columns}
//                         actionColumns={actionColumns}
//                         tableCellHeight={75}
//                     >
//                         <CustomPagination
//                             pageCount={pageCount}
//                             currentPage={pageNumber - 1}
//                             setPageNumber={setPageNumber}
//                         />
//                     </PaginatedTable>
//                 </Grid>
//             </Grid>
//             :
//             <Typography variant={'h4'}>Loading...</Typography>
//     )
// }
//
// // return (
// //             data?
// //                 <Grid container direction={'column'} justify={'center'} alignItems={'center'}>
// //                     <Grid item xs={10}>
// //                         <Typography variant={'h4'} style={{margin: 30, justifyContent: 'flex-start'}} color='secondary'>Registered companies:</Typography>
// //                         <CompanyFilterOld
// //                             setFilter={setFilter}
// //                         />
// //                         <PaginatedTable
// //                             data={data}
// //                             perPage={perPage}
// //                             emptyRowsNumber={emptyRowsNumber}
// //                             pageCount={pageCount}
// //                             columns={columns}
// //                             actionColumns={actionColumns}
// //                             tableCellHeight={75}
// //                         >
// //                             <CustomPagination
// //                                 pageCount={pageCount}
// //                                 currentPage={pageNumber - 1}
// //                                 setPageNumber={setPageNumber}
// //                             />
// //                         </PaginatedTable>
// //                     </Grid>
// //                 </Grid>
// //                 :
// //                 <Typography variant={'h4'}>Loading...</Typography>
// // )
