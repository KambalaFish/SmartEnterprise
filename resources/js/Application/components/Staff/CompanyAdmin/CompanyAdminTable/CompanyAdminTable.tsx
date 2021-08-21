import React, {BaseSyntheticEvent, useEffect, useState} from "react";
import {getCompanyAdmins} from "../../../../utils/FetchFunctions";
import {ActionColumn, Column} from "../../../../utils/Interfaces/PropsInterfaces";
import {FormControl, Grid, Typography, Select, MenuItem} from "@material-ui/core";
import {AdvancedReusableTable} from "../../../Reusable/Tables/ReusableTable/AdvancedReusableTable";
import {useStyles} from "./includes/styles";
import {
    TableFilter,
    CustomAutocompleteFilterField,
    SelectFilterField,
    TextFilterField
} from "../../../Reusable/TableFilter/TableFilter";
import {
    IStaffFilter,
    ICompanyWithId,
    ResourceCollectionResponse,
} from "../../../../utils/Interfaces/InterfacesApi";
import useUpdateEffect from "../../../../utils/useUpdateEffect";
import {SubmitHandler, useForm} from "react-hook-form";
import api from "../../../../utils/Api";
import CustomAlert from "../../../Reusable/CustomAlert/CustomAlert";
import {ClickableButton} from "../../../../utils/Interfaces/ComponentInterfaces";
import CustomSuccessMessage from "../../../Reusable/CustomSuccessMessage/CustomSuccessMessage";
import ReactDOM from "react-dom";
import {useHistory} from "react-router-dom";
import {spaPaths} from "../../../../utils/utils";

function CompanyAdminTable(): JSX.Element {
    const [activateFilterEffect, setFilterEffectActivation] = useState<boolean>(false);
    const [activateRemovalEffect, setActivateRemovalEffect] = useState<boolean>(false);
    const [alert, setAlert] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [companies, setCompanies] = useState<ICompanyWithId[]>([]);
    const [loadingCompanies, setLoadingCompanies] = useState<boolean>(true);
    const [selectedCompany, setSelectedCompany] = useState<ICompanyWithId | null>(null);
    const [filter, setFilter] = useState<IStaffFilter>({
        name: '',
        phoneNumber: '',
        email: '',
        companyId: null,
        status: 'any'
    });
    const {handleSubmit, control} = useForm<IStaffFilter>({
        defaultValues: {
            ...filter
        }
    });
    const history = useHistory();

    useUpdateEffect(() => {
        setFilterEffectActivation(!activateFilterEffect);
    }, [filter]);

    function fetcher(pageNumber: number) {
        return getCompanyAdmins(pageNumber, filter);
    }

    const onSubmit: SubmitHandler<IStaffFilter> = data => {
        setFilter({
            ...data,
            companyId: !selectedCompany ? null : selectedCompany.id,
        });
    }
    useEffect(() => {
        api()
            .getAllCompanies()
            .then((result) => {
                const {response, code} = result;
                if (code == 200) {
                    setCompanies((response as ResourceCollectionResponse<ICompanyWithId[]>).data);
                } else {
                    Promise.reject({error: `error code: ${code}`});
                }
            })
            .catch(reason => {
                console.log('reason: ', reason);
                setAlert(reason.response.error);
            })
        setLoadingCompanies(false);
    }, []);

    const CompanyAdminTableMenu: ClickableButton = (id: number) => {
        function removeCompany(){
            console.log('remove company id: ', id);
            api()
                .deleteStaff(id)
                .then( ({response}) => {
                    ReactDOM.unstable_batchedUpdates(
                        ()=>{
                            setSuccessMessage(response as string);
                            setActivateRemovalEffect(!activateRemovalEffect);
                        }
                    );
                })
                .catch((reason) => setAlert(reason.response.error));
        }
        function updateCompany(){
            history.push(spaPaths.companyAdminUpdate(id));
        }
        function handleClick(event: BaseSyntheticEvent) {
            if (event.target.value == 0) {
                updateCompany();
                return;
            }
            if (event.target.value == 1) {
                removeCompany();
                return;
            }
        }
        return (
            <FormControl key={id} variant={'outlined'} size={'small'}>
                <Select
                    onClick={(event) => handleClick(event)}
                    defaultValue={0}
                >
                    <MenuItem value={0}>update</MenuItem>
                    <MenuItem value={1}>remove</MenuItem>
                </Select>
            </FormControl>
        )
    }

    const textFields: TextFilterField<IStaffFilter>[] = [
        {name: 'name', label: 'Name', placeholder: 'Name filter', xs: 3},
        {name: 'email', label: 'Email', placeholder: 'Email filter', xs: 3},
        {name: 'phoneNumber', label: 'Phone', placeholder: 'Phone filter'},
    ];

    const selectFields: SelectFilterField<IStaffFilter>[] = [
        {
            name: 'status', label: 'Status', defaultValue: 'any', options:
                [
                    {value: 'any', optionName: 'any'},
                    {value: 'works', optionName: 'works'},
                    {value: 'illness', optionName: 'illness'},
                    {value: 'on_vacation', optionName: 'on vacation'}
                ]
        }
    ];

    const customAutocompleteFields: CustomAutocompleteFilterField<ICompanyWithId>[] = [
        {
            value: selectedCompany,
            setValue: setSelectedCompany,
            options: companies,
            getOption: option => option.name,
            label: 'Company',
            placeholder: 'Company filter',
            loading: loadingCompanies
        }
    ];
    const columns: Column[] = [
        {name: 'Name', property: 'name', percent: 20},
        {name: 'Phone', property: 'phoneNumber', percent: 15},
        {name: 'Email', property: 'email', percent: 25},
        {name: 'Company', property: 'companyName', percent: 25},
        {name: 'Status', property: 'status', percent: 8},
    ]

    const actionColumns: ActionColumn[] = [
        {name: 'Action', actions: [{clickableButton: CompanyAdminTableMenu, targetProperty: 'id'}], percent: 7}
    ]

    const classes = useStyles();

    return <>
        <CustomAlert alert={alert} onAlertClose={() => setAlert(null)}/>
        <CustomSuccessMessage message={successMessage} onClose={() => setSuccessMessage(null)}/>
        <Grid item container direction={'row'} justifyContent={'center'} className={`${classes.mt} ${classes.mb}`}>
            <Grid item xs={10}>
                <Typography variant={'h4'} color={'primary'}>
                    Company administrators:
                </Typography>
            </Grid>
        </Grid>
        <Grid item container direction={'row'} justifyContent={'center'}>
            <Grid item xs={10}>
                <TableFilter
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    control={control}
                    textFields={textFields}
                    selectFields={selectFields}
                    customAutocompleteFields={customAutocompleteFields}
                />
            </Grid>
        </Grid>
        <Grid item container direction={'row'} justifyContent={'center'}>
            <Grid item xs={10}>
                <AdvancedReusableTable
                    fetcher={fetcher}
                    tableCellHeight={60}
                    columns={columns}
                    actionColumns={actionColumns}
                    activateFilterEffect={activateFilterEffect}
                    activateRowRemovalEffect={activateRemovalEffect}
                />
            </Grid>
        </Grid>
    </>
}

export default CompanyAdminTable;
