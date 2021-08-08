import {Control, Controller} from "react-hook-form";
import {Grid, TextField} from "@material-ui/core";
import React from "react";
import {ICompanyFilter} from "../../../../../utils/Interfaces/InterfacesApi";

interface CompanyFilterFieldProps{
    control: Control<ICompanyFilter>;
    name: "name" | "country" | "city" | "address" | "zipCode" | "status";
    label: string;
    placeholder: string;
}
export function CompanyFilterField({control, name, label, placeholder}: CompanyFilterFieldProps): JSX.Element{

    return <Grid item xs={2}>
        <Controller
            control={control}
            name={name}
            render={
                ({field}) =>
                    <TextField
                        {...field}
                        label={label}
                        variant={'outlined'}
                        placeholder={placeholder}
                        size={'small'}
                        margin={'none'}
                        InputLabelProps={{shrink: true}}
                    />
            }
        />
    </Grid>
}
