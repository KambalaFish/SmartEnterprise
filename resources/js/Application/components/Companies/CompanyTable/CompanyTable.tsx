import React, {BaseSyntheticEvent, useEffect, useState} from "react";
import {getCompanies} from "../../../utils/FetchFunctions";
import {ActionColumn, Column} from "../../../utils/Interfaces/PropsInterfaces";
import {FormControl, Grid, Select} from "@material-ui/core";
import {useHistory} from 'react-router-dom';
import {spaPaths} from "../../../utils/utils";
import api from "../../../utils/Api";
import MenuItem from "@material-ui/core/MenuItem";
import {ClickableButton} from "../../../utils/Interfaces/ComponentInterfaces";
import {AdvancedReusableTable} from "../../Reusable/Tables/ReusableTable/AdvancedReusableTable";
import {ICompanyFilter} from "../../../utils/Interfaces/InterfacesApi";
import {SelectFilterField, TableFilter, TextFilterField} from "../../Reusable/TableFilter/TableFilter";
import {SubmitHandler, useForm} from "react-hook-form";
import TablePageHeader from "../../Reusable/Headers/TablePageHeader/TablePageHeader";
import CustomAlert from "../../Reusable/CustomAlert/CustomAlert";
import CustomSuccessMessage from "../../Reusable/CustomSuccessMessage/CustomSuccessMessage";
import ReactDOM from "react-dom";

function CompanyTable(): JSX.Element{
    const history = useHistory();
    const [activateFilterEffect, setFilterEffectActivation] = useState<boolean>(false);
    const [activateRemovalEffect, setActivateRemovalEffect] = useState<boolean>(false);
    const [alert, setAlert] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [companyFilter, setCompanyFilter] = useState<ICompanyFilter>({
        name: '',
        country: '',
        city: '',
        address: '',
        zipCode: '',
        status: 'any'
    });
    const {handleSubmit, control} = useForm<ICompanyFilter>({
        defaultValues: {
            ...companyFilter
        }
    });
    const onSubmit: SubmitHandler<ICompanyFilter> = data => {
        setCompanyFilter(data);
    }
    const textFields: TextFilterField<ICompanyFilter>[] = [
        {name: 'name', label: 'Name', placeholder: 'Name filter'},
        {name: 'country', label: 'Country', placeholder: 'Country filter'},
        {name: 'city', label: 'City', placeholder: 'City filter'},
        {name: 'address', label: 'Address', placeholder: 'Address filter'},
        {name: 'zipCode', label: 'Zip code', placeholder: 'Zip code filter'},
    ]
    const selectFields: SelectFilterField<ICompanyFilter>[] = [
        {
            name: 'status', label: 'Status', defaultValue: 'any', options: [
                {value: 'any', optionName: 'any'},
                {value: 'served', optionName: 'served'},
                {value: 'not served', optionName: 'not served'},
            ]
        }
    ]

    useEffect(() => {
        setFilterEffectActivation(!activateFilterEffect);
    }, [companyFilter]);

    const CompanyTableMenu: ClickableButton = (id: number) =>{
        function handleClick(event: BaseSyntheticEvent){
            switch (event.target.value){
                case 0:
                    history.push(spaPaths.companyUpdate(id));
                    break
                case 1:
                    api()
                        .deleteCompany(id)
                        .then(result => {
                            ReactDOM.unstable_batchedUpdates(
                                ()=>{
                                    setSuccessMessage(result.response as string);
                                    setActivateRemovalEffect(!activateRemovalEffect);
                                }
                            );
                        })
                        .catch((reason) => setAlert(reason.response.error));
                    break;
                case 2:
                    history.push(spaPaths.selectedCompanyAdminCreation(id));
                    break;
                case 3:
                    history.push(spaPaths.companyInfo(id));
                    break;
                default:
                    return;
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
                    <MenuItem value={2}>create admin</MenuItem>
                    <MenuItem value={3}>info</MenuItem>
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

    function onRequestCatch(message: string): void{
        setAlert(message);
    }

    function onAlertClose(){
        setAlert(null);
    }

    function onSuccessMessageClose(){
        setSuccessMessage(null);
    }

    return (
        <>
            <CustomAlert alert={alert} onAlertClose={onAlertClose}/>
            <CustomSuccessMessage message={successMessage} onClose={onSuccessMessageClose}/>
            <TablePageHeader header={'Registered companies:'}/>
            <Grid item container direction={'row'} justifyContent={'center'}>
                <Grid item xs={10}>
                    <TableFilter
                        handleSubmit={handleSubmit}
                        control={control}
                        onSubmit={onSubmit}
                        textFields={textFields}
                        selectFields={selectFields}
                        customAutocompleteFields={[]}
                    />
                </Grid>
            </Grid>
            <Grid item container direction={'row'} justifyContent={'center'}>
                <Grid item xs={10}>
                    <AdvancedReusableTable
                        fetcher={fetcher}
                        tableCellHeight={75}
                        columns={columns}
                        actionColumns={actionColumns}
                        activateFilterEffect={activateFilterEffect}
                        activateRowRemovalEffect={activateRemovalEffect}
                        onCatch={onRequestCatch}
                    />
                </Grid>
            </Grid>
        </>
    );
}
export default CompanyTable;
