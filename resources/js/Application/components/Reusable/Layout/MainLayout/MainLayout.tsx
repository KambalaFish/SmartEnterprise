import React from "react";
import {Grid} from "@material-ui/core";
import SystemAdminNavBar from "../../../SystemAdmin/NavBar/SystemAdminNavBar";
import {makeStyles} from "@material-ui/core/styles";
import {useAuth} from "../../../Auth/Authentication";
import {UserType} from "../../../../utils/Interfaces/InterfacesApi";
import CompanyAdminNavBar from "../../../CompanyAdmin/NavBar/CompanyAdminNavBar";

export function MainLayout({children, ...props}: {children: JSX.Element[]|JSX.Element}): JSX.Element{
    const useStyles = makeStyles({
        border: {
            // border: '3px solid red',
            // paddingRight: 40,
            // paddingLeft: 40
        }
    });
    const classes = useStyles();

    const {user: {usertype}} = useAuth();
    let navbar;

    switch (usertype){
        case UserType.SystemAdmin:
            navbar = <SystemAdminNavBar/>;
            break;
        case UserType.CompanyAdmin:
            navbar = <CompanyAdminNavBar/>;
            break;
        default:
            navbar = <SystemAdminNavBar/>;
    }
    return (
        <React.Fragment>
            {navbar}
            <Grid container direction={'column'} alignItems={'center'} justifyContent={'center'} className={classes.border}>
                {children}
            </Grid>
        </React.Fragment>
    );

}
