import React from "react";
import {Grid, Typography} from "@material-ui/core";
import {useStyles} from "./includes/styles";
import {TablePageHeaderProps} from "../../../../utils/Interfaces/PropsInterfaces";

function TablePageHeader({header}: TablePageHeaderProps): JSX.Element{
    const classes = useStyles();
    return <Grid item container direction={'row'} justifyContent={'center'} className={`${classes.mt} ${classes.mb}`}>
        <Grid item xs={10}>
            <Typography variant={'h4'} color={'primary'}>
                {header}
            </Typography>
        </Grid>
    </Grid>;
}
export default TablePageHeader;
