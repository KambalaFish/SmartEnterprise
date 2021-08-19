import React, {useEffect, useState} from "react";
import {getCompanyAdmins} from "../../../../utils/FetchFunctions";
import {Column} from "../../../../utils/Interfaces/PropsInterfaces";
import {Grid, Typography} from "@material-ui/core";
import {AdvancedReusableTable} from "../../../Reusable/Tables/ReusableTable/AdvancedReusableTable";
import {useStyles} from "./includes/styles";
import {
    TableFilter,
    CustomAutocompleteFilterField,
    SelectFilterField,
    TextFilterField
} from "../../../Reusable/TableFilter/TableFilter";
import {
    ICompanyAdminFilter,
    ICompanyWithId,
    ResourceCollectionResponse,
    UserStatus
} from "../../../../utils/Interfaces/InterfacesApi";
import useUpdateEffect from "../../../../utils/useUpdateEffect";
import {SubmitHandler, useForm} from "react-hook-form";
import api from "../../../../utils/Api";
import CustomAlert from "../../../Reusable/CustomAlert/CustomAlert";

function CompanyAdminTable(): JSX.Element{
    console.log('page render');
    const [activateFilterEffect, setFilterEffectActivation] = useState<boolean>(false);
    const [activateRemovalEffect, setActivateRemovalEffect] = useState<boolean>(false);
    const [alert, setAlert] = useState<string|null>(null);
    const [companies, setCompanies] = useState<ICompanyWithId[]>([]);
    const [loadingCompanies, setLoadingCompanies] = useState<boolean>(true);
    const [selectedCompany, setSelectedCompany] = useState<ICompanyWithId | null>(null);
    const [filter, setFilter] = useState<ICompanyAdminFilter>({
        name: '',
        phoneNumber: '',
        email: '',
        companyId: null,
        status: 'any'
    });
    const {handleSubmit, control} = useForm<ICompanyAdminFilter>({
        defaultValues: {
            ...filter
        }
    });

    useUpdateEffect(() => {
        setFilterEffectActivation(!activateFilterEffect);
    }, [filter]);

    function fetcher(pageNumber: number){
        return getCompanyAdmins(pageNumber, filter);
    }

    const onSubmit: SubmitHandler<ICompanyAdminFilter> = data => {
        // console.log('selectedCompany.id: ', selectedCompany?.id);
        // data.companyId = !selectedCompany?.id? null : selectedCompany.id;
        console.log('data: ',data);
        setFilter({
            ...data,
            companyId: !selectedCompany? null : selectedCompany.id,
        });
    }
    useEffect(()=>{
        api()
            .getAllCompanies()
            .then((result) => {
                const {response, code} = result;
                if (code==200){
                    setCompanies((response as ResourceCollectionResponse<ICompanyWithId[]>).data);
                } else {
                    Promise.reject({error: `error code: ${code}`});
                }
            })
            .catch(reason => {
                console.log('reason: ',reason);
                setAlert(reason.response.error);
            })
        setLoadingCompanies(false);
    }, []);

    const columns: Column[] = [
        {name: 'Name', property: 'name', percent: 20},
        {name: 'Phone', property: 'phoneNumber', percent: 15},
        {name: 'Email', property: 'email', percent: 30},
        {name: 'Company', property: 'companyName', percent: 25},
        {name: 'Status', property: 'status', percent: 10},
    ]

    const textFields: TextFilterField<ICompanyAdminFilter>[] = [
        {name: 'name', label: 'Name', placeholder: 'Name filter', xs: 3},
        {name: 'email', label: 'Email', placeholder: 'Email filter', xs: 3},
        {name: 'phoneNumber', label: 'Phone', placeholder: 'Phone filter'},
    ];

    const selectFields: SelectFilterField<ICompanyAdminFilter>[] = [
        {name: 'status', label: 'Status', defaultValue: 'any', options:
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

    const classes = useStyles();

    return <>
        <CustomAlert alert={alert} onAlertClose={()=>setAlert(null)}/>
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
                    actionColumns={[]}
                    activateFilterEffect={activateFilterEffect}
                />
            </Grid>
        </Grid>
    </>
}

export default CompanyAdminTable;
