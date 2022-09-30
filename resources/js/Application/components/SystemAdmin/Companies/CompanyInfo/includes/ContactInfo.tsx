import React from "react";
import {ContactInfoProps} from "../../../../../utils/Interfaces/PropsInterfaces";
import {Grid, Typography} from "@material-ui/core";
import PhoneEnabledIcon from '@material-ui/icons/PhoneEnabled';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

export function ContactInfo({role, firstName, lastName, email, phone}: ContactInfoProps): JSX.Element{

    return (
        <Grid container direction={'column'} item xs={3}>
            <Grid item>
                <Typography variant={'h6'} style={{fontWeight: 600}}>{role}</Typography>
            </Grid>
            <Grid item>
                <Typography variant={'subtitle1'} style={{fontWeight: 600}}>{firstName} {lastName}</Typography>
            </Grid>
            <Grid container direction={'row'} item spacing={1}>
                <Grid item>
                    <MailOutlineIcon fontSize={'small'}/>
                </Grid>
                <Grid item>
                    <Typography variant={'body1'}>{email}</Typography>
                </Grid>
            </Grid>
            <Grid container direction={'row'} item spacing={1}>
                <Grid item>
                    <PhoneEnabledIcon fontSize={'small'}/>
                </Grid>
                <Grid item>
                    <Typography variant={'body1'}>{phone}</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}
