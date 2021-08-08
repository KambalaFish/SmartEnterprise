import React from "react";
import {Grid, TextField} from "@material-ui/core";
import {ContactPropsOld} from "../../../../utils/Interfaces/PropsInterfaces";

export function ContactOld({who, register, phoneError, phoneErrorMessage, emailError, emailErrorMessage, firstNameError, firstNameMessage, lastNameError, lastNameMessage}: ContactPropsOld): JSX.Element{
    return (
        <>
            <Grid item container>
                <Grid item xs={3}>
                    <TextField
                        id={who+"FirstName"}
                        label="First name"
                        placeholder='Type first name'
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        {...register((who + '.firstName') as 'admin.firstName' | 'itHead.firstName' | 'customerManager.firstName')}
                        error={firstNameError}
                        helperText={firstNameMessage}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        id={who + "LastName"}
                        label="Last name"
                        placeholder='Type last name'
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        {...register((who + '.lastName') as 'admin.lastName' | 'itHead.lastName' | 'customerManager.lastName')}
                        error={lastNameError}
                        helperText={lastNameMessage}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        id={who + "Email"}
                        label="Email"
                        placeholder='Type email'
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        {...register((who + '.email') as 'admin.email' | 'itHead.email' | 'customerManager.email')}
                        error={emailError}
                        helperText={emailErrorMessage}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        id={who + "Phone"}
                        label="Phone number"
                        placeholder='Type phone number'
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        {...register((who + '.phone') as 'admin.phone' | 'itHead.phone' | 'customerManager.phone')}
                        helperText={phoneErrorMessage}
                        error={phoneError}
                    />
                </Grid>
            </Grid>
        </>
    );
}
