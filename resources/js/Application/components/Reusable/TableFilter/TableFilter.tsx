import React, {useEffect, useState} from "react";
import {
    IStaffFilter,
    ICompanyWithId,
    ResourceCollectionResponse
} from "../../../utils/Interfaces/InterfacesApi";
import {Control, Controller, Path, SubmitHandler, useForm, UseFormRegister} from "react-hook-form";
import {Button, Grid, GridSize, MenuItem, Paper, TextField, Typography} from "@material-ui/core";
import useStyles from "./includes/styles";
import api from "../../../utils/Api";
import CustomAutocomplete from "../CustomAutocomplete/CustomAutocomplete";
import {UseFormHandleSubmit} from "react-hook-form/dist/types/form";

export interface SelectFilterField<T> {
    // name: keyof T;
    name: Path<T>;
    label: string;
    defaultValue: string;
    options: { value: string; optionName: string; }[];
    xs?: GridSize;
}

export interface TextFilterField<T> {
    // name: keyof T;
    name: Path<T>;
    label: string;
    placeholder: string;
    xs?:GridSize;
}

export interface CustomAutocompleteFilterField<T> {
    value: T | null;
    setValue: React.Dispatch<React.SetStateAction<T | null>>;
    options: T[];
    getOption: (option: T) => string;
    label: string;
    placeholder: string;
    loading: boolean;
    xs?: GridSize;
}

export interface CompanyAdminFilterProps<T, K> {
    handleSubmit: UseFormHandleSubmit<T>;
    control: Control<T>;
    onSubmit: SubmitHandler<T>;
    textFields: TextFilterField<T>[];
    selectFields: SelectFilterField<T>[];
    customAutocompleteFields: CustomAutocompleteFilterField<K>[];
}

export function TableFilter<T, K>(
    {
        handleSubmit,
        control,
        onSubmit,
        textFields,
        selectFields,
        customAutocompleteFields
    }: CompanyAdminFilterProps<T, K>): JSX.Element {
    const classes = useStyles();

    function mapTextFields(): JSX.Element[] {
        return textFields.map(
            value => (
                <Grid item xs={value.xs? value.xs:2} key={value.name}>
                    <Controller
                        name={value.name}
                        control={control}
                        render={
                            ({field}) =>
                                <TextField
                                    {...field}
                                    fullWidth
                                    label={value.label}
                                    placeholder={value.placeholder}
                                    variant={'outlined'}
                                    size={'small'}
                                    margin={'none'}
                                    InputLabelProps={{shrink: true}}
                                />
                        }
                    />
                </Grid>
            )
        );
    }

    function mapSelectFields(): JSX.Element[] {
        return selectFields.map(
            value => (
                <Grid item xs={value.xs? value.xs:2} key={value.name}>
                    <Controller
                        name={value.name}
                        control={control}
                        render={
                            ({field}) =>
                                <TextField
                                    {...field}
                                    fullWidth
                                    select
                                    label={value.label}
                                    variant={'outlined'}
                                    size={'small'}
                                    defaultValue={value.defaultValue}
                                >
                                    {value.options.map(
                                        option => (
                                            <MenuItem key={option.value}
                                                      value={option.value}>{option.optionName}</MenuItem>
                                        )
                                    )}
                                </TextField>
                        }
                    />
                </Grid>
            )
        );
    }

    function mapAutocompleteFields(): JSX.Element[] {
        return customAutocompleteFields.map(
            ({label, value, setValue, options, getOption, loading, placeholder, xs}) => (
                <Grid key={label} item xs={xs? xs:2}>
                    <CustomAutocomplete
                        value={value}
                        setValue={setValue}
                        options={options}
                        getOption={getOption}
                        label={label}
                        placeholder={placeholder}
                        loading={loading}
                        margin={'none'}
                    />
                </Grid>
            )
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container direction={'row'} justifyContent={'flex-start'}>
                <Grid item container direction={'row'} xs={10} spacing={1}
                      wrap={'wrap'}
                      alignItems={'center'}
                      justifyContent={'flex-start'}
                      // justifyContent={'space-evenly'}
                      className={classes.container}
                      component={Paper} elevation={11}
                >
                    {mapTextFields()}
                    {mapSelectFields()}
                    {mapAutocompleteFields()}
                </Grid>
                <Grid item container direction={'row'} xs={1} className={classes.buttonContainer}
                      justifyContent={'flex-start'} alignItems={'center'}>
                    <Grid item>
                        <Button size='large' variant="contained" color='secondary' type='submit'
                                className={classes.button}>
                            search
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    )
}
