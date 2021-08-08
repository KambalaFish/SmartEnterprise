import React from "react";
import {ICompanyFilter} from "../../../../utils/Interfaces/InterfacesApi";
import {SubmitHandler, useForm} from "react-hook-form";
import {Button, Grid, Paper, Typography} from "@material-ui/core";
import useStyles from "./includes/style";
import {CompanyFilterField} from "./includes/CompanyFilterField";
import {StatusFilterField} from "./includes/StatusFilterField";
import {useAppDispatch, useAppSelector} from "../../../../redux/reduxHooks";
import {setFilter} from "../../../../redux/slices/filterSlice";
import {CompanyFilterProps} from "../../../../utils/Interfaces/PropsInterfaces";

export function CompanyFilter({setFilter, companyFilter}: CompanyFilterProps): JSX.Element {
    // const dispatch = useAppDispatch();
    // const companyFilter: ICompanyFilter = useAppSelector(state => state.filter);
    const {control, handleSubmit} = useForm<ICompanyFilter>({
        defaultValues: {
            ...companyFilter
        }
    });
    const onSubmit: SubmitHandler<ICompanyFilter> = data => {
        setFilter(data);
        // dispatch(setFilter(data));
    }
    const classes = useStyles();

    type Field = {name: "name" | "country" | "city" | "address" | "zipCode" | "status", label: string; placeholder: string;};
    const fields: Field[] = [
        {name: 'name', label: 'Name', placeholder:'Name filter'},
        {name: 'country', label: 'Country', placeholder:'Country filter'},
        {name: 'city', label: 'City', placeholder:'City filter'},
        {name: 'address', label: 'Address', placeholder:'Address filter'},
        {name: 'zipCode', label: 'Zip code', placeholder:'Zip code filter'},
    ];
    return (
        <Grid container direction={'row'} justifyContent={'flex-end'}>
            <Grid container item xs={9} className={classes.container} component={Paper} elevation={11}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container item spacing={1} alignItems={'center'} wrap={'nowrap'} justifyContent={'flex-end'}>
                        <Grid item xs={1}>
                            <Typography variant={'body1'} align={'center'}>Filter:</Typography>
                        </Grid>
                        {
                            fields.map(
                                value => (
                                    <CompanyFilterField key={value.name} control={control} name={value.name} label={value.label} placeholder={value.placeholder}/>
                                )
                            )
                        }
                        <StatusFilterField control={control} defaultValue={companyFilter.status}/>
                        <Grid item xs={1}>
                            <Button size='small' variant="contained" color='secondary' type='submit'>
                                search
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    )
}
