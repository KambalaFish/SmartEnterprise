import {Control, Controller} from "react-hook-form";
import {ICompanyFilter} from "../../../../../utils/Interfaces/InterfacesApi";
import {Grid, MenuItem, TextField} from "@material-ui/core";
import React from "react";

interface StatusFilterFieldProps{
    control: Control<ICompanyFilter>;
    defaultValue: string;
}
export function StatusFilterField({control, defaultValue}: StatusFilterFieldProps): JSX.Element{
    return (
        <Grid item xs={2}>
            <Controller
                name={'status'}
                control={control}
                render={
                    ({field}) =>
                        <TextField
                            {...field}
                            id={'status'}
                            select
                            label={'Status'}
                            variant={'outlined'}
                            size={'small'}
                            defaultValue={defaultValue}
                            fullWidth
                        >
                            <MenuItem value={'any'}>any</MenuItem>
                            <MenuItem value={'served'}>served</MenuItem>
                            <MenuItem value={'not served'}>not served</MenuItem>
                        </TextField>
                }
            />
        </Grid>
    );
}
