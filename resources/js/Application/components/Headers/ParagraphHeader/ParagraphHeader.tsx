import React from "react";
import {Divider, Grid, Typography} from "@material-ui/core";
import useStyles from "./includes/styles";
import {HeaderProps} from "../../../utils/Interfaces/PropsInterfaces";

export function ParagraphHeader({headerText}: HeaderProps): JSX.Element{
    const classes = useStyles();
    return (
        <Grid item xs={11} className={`${classes.mt} ${classes.mb}`}>
            <Typography variant={'h6'} align={'left'} className={classes.formHeader}>
                {headerText}
            </Typography>
            <Divider variant='middle' className={classes.divider}/>
        </Grid>
    );
}
