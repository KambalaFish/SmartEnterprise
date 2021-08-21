import React from "react";
import {CircularProgress, TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";

interface CustomAutocompleteProps<T>{
    value: T|null;
    setValue:  React.Dispatch<React.SetStateAction<T | null>>;
    options: T[];
    getOption: (option: T) => string;
    label: string;
    loading: boolean;
    margin?: 'none' | 'dense' | 'normal';
    placeholder?: string;
    defaultValue?: T|null;
}

function CustomAutocomplete<T>({value, setValue, options, getOption, label, loading, margin, placeholder, defaultValue}: CustomAutocompleteProps<T>): JSX.Element{
    return (
        <Autocomplete
            value={value}
            onChange={
                (event: any, newValue) => {
                    setValue(newValue);
                }
            }
            options={options}
            loading={loading}
            size={'small'}
            getOptionLabel={getOption}
            defaultValue={defaultValue}
            renderInput={
                (params) =>
                    <TextField
                        {...params}
                        fullWidth
                        margin={margin? margin:'normal'}
                        InputLabelProps={{shrink: true}}
                        label={label}
                        variant={'outlined'}
                        placeholder={placeholder}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                    />
            }
        />
    );
}

export default CustomAutocomplete;
