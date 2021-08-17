import React from "react";
import {ICompanyAdminFilter, ICompanyFilter} from "../../../../../utils/Interfaces/InterfacesApi";
import {SubmitHandler, useForm} from "react-hook-form";
import {Button, Grid, Paper, TextField, Typography} from "@material-ui/core";
import {CompanyAdminFilterProps, CompanyFilterProps, FilterProps} from "../../../../../utils/Interfaces/PropsInterfaces";
import useStyles from "./includes/styles";

export function CompanyAdminFilter({setFilter, filter}: CompanyAdminFilterProps): JSX.Element {
    const {handleSubmit, control, register, formState: {errors}} = useForm<ICompanyAdminFilter>({
        defaultValues: {
            ...filter
        }
    });
    const onSubmit: SubmitHandler<ICompanyAdminFilter> = data => {
        setFilter(data);
    }
    const classes = useStyles();

    type Field = { name: "name" | "phone" | "email" | "company" | "status", label: string; placeholder: string; };
    const fields: Field[] = [
        {name: 'name', label: 'Name', placeholder: 'Name filter'},
        {name: 'phone', label: 'Phone', placeholder: 'Phone filter'},
        {name: 'email', label: 'Email', placeholder: 'Email filter'},
        {name: 'company', label: 'Company', placeholder: 'Company filter'},
        {name: 'status', label: 'Status', placeholder: 'Status filter'},
    ];

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container direction={'row'} justifyContent={'flex-end'}>
                <Grid item container direction={'row'} xs={9} spacing={1} alignItems={'center'} wrap={'nowrap'}
                      justifyContent={'flex-end'} className={classes.container} component={Paper} elevation={11}>
                    <Grid item xs={1}>
                        <Typography variant={'body1'} align={'center'}>Filter:</Typography>
                    </Grid>
                    {
                        fields.map(
                            value => (
                                <Grid item xs={2} key={value.name}>
                                    <TextField
                                        defaultValue={""}
                                        {...register(value.name)}
                                        fullWidth
                                        label={value.label}
                                        placeholder={value.placeholder}
                                        margin={'none'}
                                        InputLabelProps={{shrink: true}}
                                        variant="outlined"
                                        size={'small'}
                                    />
                                </Grid>
                            )
                        )
                    }
                    {/*<StatusFilterField control={control} defaultValue={companyFilter.status}/>*/}
                    <Grid item xs={1}>
                        <Button size='small' variant="contained" color='secondary' type='submit'>
                            search
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    )
}
