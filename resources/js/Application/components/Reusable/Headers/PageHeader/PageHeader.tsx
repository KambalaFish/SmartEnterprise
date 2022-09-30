import React from "react";
import {Grid, Typography} from "@material-ui/core";
import useStyles from "./includes/styles";
import {HeaderProps} from "../../../../utils/Interfaces/PropsInterfaces";

function PageHeader({headerText}: HeaderProps): JSX.Element{
    const classes = useStyles();
    return <Grid item xs={6}>
        <Typography variant={'h4'} align={'center'} className={classes.mt}>
            {headerText}
        </Typography>
    </Grid>
}

export default PageHeader;
