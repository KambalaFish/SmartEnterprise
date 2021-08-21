import React, {useState} from "react";
import {Grid, Typography} from "@material-ui/core";
import {ICompanyFilter} from "../../../utils/Interfaces/InterfacesApi";
import {CompanyTable} from "./CompanyTable";
import {useStyles} from "./includes/styles";
import {SelectFilterField, TableFilter, TextFilterField} from "../../Reusable/TableFilter/TableFilter";
import {SubmitHandler, useForm} from "react-hook-form";
export function CompanyTableLayout(): JSX.Element{
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
    const classes = useStyles();

    return (
        <>
            <Grid item container direction={'row'} justifyContent={'center'} className={`${classes.mt} ${classes.mb}`}>
                <Grid item xs={10}>
                    <Typography variant={'h4'} color='primary'>
                        Registered companies:
                    </Typography>
                </Grid>
            </Grid>
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
                    <CompanyTable
                        filter={companyFilter}
                        tableCellHeight={75}
                    />
                </Grid>
            </Grid>
        </>
    );
}
