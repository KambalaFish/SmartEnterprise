import React from "react";
import {Grid, Paper} from "@material-ui/core";
import useStyles from "./includes/styles";

export interface FormLayoutProps{
    xs: 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    children: JSX.Element[]|JSX.Element;
}
function FormLayout({children, xs}: FormLayoutProps):JSX.Element{

    const classes = useStyles();
    return <Grid item container direction={'column'} xs={xs} className={`${classes.mt} ${classes.container}`}
                 component={Paper} elevation={12}>
        {children}
    </Grid>
}

export default FormLayout;
