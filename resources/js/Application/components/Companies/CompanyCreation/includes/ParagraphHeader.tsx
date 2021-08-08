import React from "react";
import {Divider, Grid, Typography} from "@material-ui/core";
import {useStyles} from "./styles";
import {ParagraphHeaderProps} from "../../../../utils/Interfaces/PropsInterfaces";

export function ParagraphHeader({headerText}: ParagraphHeaderProps): JSX.Element{
    const classes = useStyles();
    return (
        <Grid item className={classes.mt}>
            <Typography variant='h5' align='left' className={classes.formHeader}>
                {headerText}
            </Typography>
            <Divider variant='middle' className={classes.divider}/>
        </Grid>
    );
}
