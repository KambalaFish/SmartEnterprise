import React from "react";
import {Grid} from "@material-ui/core";
import NavBar from "../../NavBar/NavBar";
import {makeStyles} from "@material-ui/core/styles";

export function MainLayout({children, ...props}: {children: JSX.Element[]}): JSX.Element{
    const useStyles = makeStyles({
        border: {
            // border: '2px solid blue',
            // paddingRight: 40,
            // paddingLeft: 40
        }
    });
    const classes = useStyles();
    return (
        <React.Fragment>
            <NavBar/>
            <Grid container direction={'column'} alignItems={'center'} justifyContent={'center'} className={classes.border}>
                {children}
            </Grid>
        </React.Fragment>
    );

}
