import React, {BaseSyntheticEvent, useEffect, useState} from "react";
import {getCompanies} from "../../../../utils/FetchFunctions";
import {ActionColumn, Column} from "../../../../utils/Interfaces/PropsInterfaces";
import {FormControl, Grid, Select, Typography} from "@material-ui/core";
import {RouteComponentProps} from 'react-router-dom';
import {spaPaths} from "../../../../utils/utils";
import api from "../../../../utils/Api";
import MenuItem from "@material-ui/core/MenuItem";
import {ClickableButton} from "../../../../utils/Interfaces/ComponentInterfaces";
import {AdvancedReusableTable} from "../../../Reusable/Tables/ReusableTable/AdvancedReusableTable";
import {ICompanyFilter} from "../../../../utils/Interfaces/InterfacesApi";
import {useAppDispatch, useAppSelector} from "../../../../redux/reduxHooks";
import {initializeFilter} from "../../../../redux/slices/filterSlice";

export function CompanyTableOld({history}: RouteComponentProps): JSX.Element{
    const [activateFilterEffect, setFilterEffectActivation] = useState<boolean>(false);
    const [activateRemovalEffect, setActivateRemovalEffect] = useState<boolean>(false);
    const [companyFilter, setCompanyFilter] = useState<ICompanyFilter>({
        name: '',
        country: '',
        city: '',
        address: '',
        zipCode: '',
        status: 'any'
    });

    // const companyFilter: ICompanyFilter = useAppSelector(state => state.filter);
    // const dispatch = useAppDispatch();
    // useEffect( () => {
    //     return function (){
    //         dispatch(initializeFilter());
    //     }
    // }, []);

    useEffect(() => {
        setFilterEffectActivation(!activateFilterEffect);
    }, [companyFilter]);

    function removeCompany(id: number){
        api()
            .deleteCompany(id)
            .then(result => {
                alert(result.response);
                setActivateRemovalEffect(!activateRemovalEffect);
            })
    }

    const updateCompany = (id: number)=>{
        history.push(spaPaths.companyUpdate(id));
    }

    const CompanyTableMenu: ClickableButton = (id: number) =>{
        function handleClick(event: BaseSyntheticEvent){
            if (event.target.value==0){
                updateCompany(id);
            }
            if (event.target.value==1){
                removeCompany(id);
            }
        }
        return (
            <FormControl key={id} variant={'outlined'} size={'small'}>
                <Select
                    onClick={handleClick}
                    defaultValue={0}
                >
                    <MenuItem value={0}>update</MenuItem>
                    <MenuItem value={1}>remove</MenuItem>
                </Select>
            </FormControl>
        )
    };

    const actionColumns: ActionColumn[] = [
        {name: 'Action', actions: [{clickableButton: CompanyTableMenu, targetProperty: 'id'}], percent: 6}
    ]

    function fetcher(pageNumber: number){
        return getCompanies(pageNumber, companyFilter);
    }

    const columns: Column[] = [
        {name: 'Name', property: 'name', percent: 20},
        {name: 'Country', property: 'country', percent: 14},
        {name: 'City', property: 'city', percent: 14},
        {name: 'Address', property: 'address', percent: 30},
        {name: 'ZIP code', property: 'zipCode', percent: 8},
        {name: 'Status', property: 'status', percent: 8},
    ]

    return (
        <Grid item container direction={'row'} justify={'center'}>
            <Grid item style={{margin: `30px 0px`}} xs={10}>
                <Typography variant={'h4'}  color='secondary'>Registered companies:</Typography>
            </Grid>
            <Grid item xs={10}>
                {/*<CompanyFilter*/}
                {/*    setFilter={setCompanyFilter}*/}
                {/*    companyFilter={companyFilter}*/}
                {/*/>*/}
            </Grid>
            <Grid item xs={10}>
                <AdvancedReusableTable
                    fetcher={fetcher}
                    tableCellHeight={75}
                    columns={columns}
                    actionColumns={actionColumns}
                    activateFilterEffect={activateFilterEffect}
                    activateRowRemovalEffect={activateRemovalEffect}
                />
            </Grid>
        </Grid>
    );
}








// import React, {BaseSyntheticEvent, useEffect, useState} from "react";
// import {getCompanies} from "../../../utils/FetchFunctions";
// import {ActionColumn, Column} from "../../../utils/Interfaces/PropsInterfaces";
// import {FormControl, Grid, Typography} from "@material-ui/core";
// import {CompanyFilter} from "./CompanyFilter/CompanyFilter";
// import {RouteComponentProps} from 'react-router-dom';
// import {spaPaths} from "../../../utils/utils";
// import {ICompanyFilter} from "../../../utils/Interfaces/InterfacesApi";
// import api from "../../../utils/Api";
// import MenuItem from "@material-ui/core/MenuItem";
// import {ClickableButton} from "../../../utils/Interfaces/ComponentInterfaces";
// import {Select} from "@material-ui/core";
// import {AdvancedReusableTable} from "../../ReusableTable/AdvancedReusableTable";
//
// export function CompanyTableOld({history}: RouteComponentProps): JSX.Element{
//
//     const [companyFilter, setFilter] = useState<ICompanyFilter>({});
//     const [activateFilterEffect, setFilterEffectActivation] = useState<boolean>(false);
//     const [activateRemovalEffect, setActivateRemovalEffect] = useState<boolean>(false);
//
//     useEffect(() => {
//         setFilterEffectActivation(!activateFilterEffect);
//     }, [companyFilter]);
//
//     function removeCompany(id: number){
//         api()
//             .deleteCompany(id)
//             .then(result => {
//                 alert(result.response);
//                 setActivateRemovalEffect(!activateRemovalEffect);
//             })
//     }
//
//     const updateCompany = (id: number)=>{
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
//             <FormControl key={id} variant={'outlined'} size={'small'}>
//                 <Select
//                     onClick={handleClick}
//                     defaultValue={0}
//                 >
//                     <MenuItem value={0}>update</MenuItem>
//                     <MenuItem value={1}>remove</MenuItem>
//                 </Select>
//             </FormControl>
//         )
//     };
//
//     const actionColumns: ActionColumn[] = [
//         {name: 'Action', actions: [{clickableButton: CompanyTableMenu, targetProperty: 'id'}], percent: 6}
//     ]
//
//     function fetcher(pageNumber: number){
//         return getCompanies(pageNumber, companyFilter);
//     }
//
//     const columns: Column[] = [
//         {name: 'Name', property: 'name', percent: 20},
//         {name: 'Country', property: 'country', percent: 14},
//         {name: 'City', property: 'city', percent: 14},
//         {name: 'Address', property: 'address', percent: 30},
//         {name: 'ZIP code', property: 'zipCode', percent: 8},
//         {name: 'Status', property: 'status', percent: 8},
//     ]
//
//     return (
//         <Grid item container direction={'row'} justify={'center'}>
//             <Grid item style={{margin: `30px 0px`}} xs={10}>
//                 <Typography variant={'h4'}  color='secondary'>Registered companies:</Typography>
//             </Grid>
//             <Grid item xs={10}>
//                 <CompanyFilter setFilter={setFilter}/>
//             </Grid>
//             <Grid item xs={10}>
//                 <AdvancedReusableTable
//                     fetcher={fetcher}
//                     tableCellHeight={75}
//                     columns={columns}
//                     actionColumns={actionColumns}
//                     activateFilterEffect={activateFilterEffect}
//                     activateRowRemovalEffect={activateRemovalEffect}
//                 />
//             </Grid>
//         </Grid>
//     );
// }
