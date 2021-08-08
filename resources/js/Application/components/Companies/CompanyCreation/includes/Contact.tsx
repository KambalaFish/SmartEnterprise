import React from "react";
import {Grid, TextField} from "@material-ui/core";
import {Controller} from "react-hook-form";
import {ContactProps} from "../../../../utils/Interfaces/PropsInterfaces";

export function Contact({who, control, phoneError, phoneErrorMessage, emailError, emailErrorMessage, firstNameError, firstNameMessage, lastNameError, lastNameMessage}: ContactProps): JSX.Element{
    return (
        <>
            <Grid item container>
                <Grid item xs={3}>
                    <Controller
                        control={control}
                        name={(who+'.firstName') as 'admin.firstName' | 'itHead.firstName' | 'customerManager.firstName'}
                        render={
                            ({field}) =>
                                <TextField
                                    {...field}
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
                        name={(who+'.lastName') as 'admin.lastName' | 'itHead.lastName' | 'customerManager.lastName'}
                        render={
                            ({field}) =>
                                <TextField
                                    {...field}
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
                        name={(who+'.email') as 'admin.email' | 'itHead.email' | 'customerManager.email'}
                        render={
                            ({field}) =>
                                <TextField
                                    {...field}
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
                        name={(who+'.phone') as 'admin.phone' | 'itHead.phone' | 'customerManager.phone'}
                        render={
                            ({field}) =>
                                <TextField
                                    {...field}
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
