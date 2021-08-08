import React from "react";
import {useAuth} from "../Auth/Authentication";
import {Grid} from "@material-ui/core";
import {UserType} from "../../utils/Interfaces/InterfacesApi";

export default function Profile(): JSX.Element {
    const {user} = useAuth();

    let usertype;
    switch (user.usertype) {
        case UserType.CompanyAdmin:
            usertype = 'Company administrator';
            break;
        case UserType.SystemAdmin:
            usertype = 'System administrator';
            break;
        default:
            usertype = 'Undefined usertype';
    }

    return <Grid container direction={'column'} justifyContent={'center'} alignItems={'flex-start'} spacing={1}>
        <Grid item xs={4}>ID: {user.id}</Grid>
        <Grid item xs={4}>Name: {`${user.firstName} ${user.lastName}`}</Grid>
        <Grid item xs={4}>Phone: {user.phoneNumber}</Grid>
        <Grid item xs={4}>Email: {user.email}</Grid>
        {usertype &&
        <Grid item xs={4}>Usertype: {usertype}</Grid>
        }
        {user.roles.length > 0 &&
        <Grid item xs={4}>Roles: {user.roles.join(', ')}</Grid>
        }
    </Grid>
}
