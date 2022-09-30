import React, {useState} from "react";
import {Grid} from "@material-ui/core";
import {ICompanyFilter} from "../../../../../utils/Interfaces/InterfacesApi";
import {CompanyTableReduxVersion} from "./CompanyTableReduxVersion";
import {SelectFilterField, TableFilter, TextFilterField} from "../../../../Reusable/TableFilter/TableFilter";
import {SubmitHandler, useForm} from "react-hook-form";
import TablePageHeader from "../../../../Reusable/Headers/TablePageHeader/TablePageHeader";
export function CompanyTableLayoutReduxVersion(): JSX.Element{
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

    return (
        <>
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
                    <CompanyTableReduxVersion
                        filter={companyFilter}
                        tableCellHeight={75}
                    />
                </Grid>
            </Grid>
        </>
    );
}
