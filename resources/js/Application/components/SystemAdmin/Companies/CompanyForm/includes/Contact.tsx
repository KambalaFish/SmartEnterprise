import React from "react";
import {Grid, TextField} from "@material-ui/core";
import {Controller} from "react-hook-form";
import {ContactProps} from "../../../../../utils/Interfaces/PropsInterfaces";

export function Contact({who, control, phoneError, phoneErrorMessage, emailError, emailErrorMessage, firstNameError, firstNameMessage, lastNameError, lastNameMessage}: ContactProps): JSX.Element{
    return (
        <>
            <Grid item container spacing={2}>
                <Grid item xs={3}>
                    <Controller
                        control={control}
                        name={(who+'.firstName') as 'mainAdminContact.firstName' | 'itDepartmentContact.firstName' | 'customerManagerContact.firstName'}
                        render={
                            ({field}) =>
                                <TextField
                                    {...field}
                                    variant={'outlined'}
                                    size={'small'}
                                    id={who+"FirstName"}
                                    label="First name"
                                    placeholder='Type first name'
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    error={firstNameError}
                                    helperText={firstNameMessage}
                                />
                        }
                    />
                </Grid>
                <Grid item xs={3}>
                    <Controller
                        control={control}
                        name={(who+'.lastName') as 'mainAdminContact.lastName' | 'itDepartmentContact.lastName' | 'customerManagerContact.lastName'}
                        render={
                            ({field}) =>
                                <TextField
                                    {...field}
                                    variant={'outlined'}
                                    size={'small'}
                                    id={who + "LastName"}
                                    label="Last name"
                                    placeholder='Type last name'
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    error={lastNameError}
                                    helperText={lastNameMessage}
                                />
                        }
                    />
                </Grid>
                <Grid item xs={3}>
                    <Controller
                        control={control}
                        name={(who+'.email') as 'mainAdminContact.email' | 'itDepartmentContact.email' | 'customerManagerContact.email'}
                        render={
                            ({field}) =>
                                <TextField
                                    {...field}
                                    variant={'outlined'}
                                    size={'small'}
                                    id={who + "Email"}
                                    label="Email"
                                    placeholder='Type email'
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    error={emailError}
                                    helperText={emailErrorMessage}
                                />
                        }
                    />
                </Grid>
                <Grid item xs={3}>
                    <Controller
                        control={control}
                        name={(who+'.phoneNumber') as 'mainAdminContact.phoneNumber' | 'itDepartmentContact.phoneNumber' | 'customerManagerContact.phoneNumber'}
                        render={
                            ({field}) =>
                                <TextField
                                    {...field}
                                    variant={'outlined'}
                                    size={'small'}
                                    id={who + "Phone"}
                                    label="Phone number"
                                    placeholder='Type phone number'
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    helperText={phoneErrorMessage}
                                    error={phoneError}
                                />
                        }
                    />
                </Grid>
            </Grid>
        </>
    );
}
