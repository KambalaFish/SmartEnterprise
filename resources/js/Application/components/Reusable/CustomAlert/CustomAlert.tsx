import React from "react";
import {Grid} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

interface CustomAlertProps {
    alert: string | null;
    onAlertClose: () => void;
}

function CustomAlert({alert, onAlertClose}: CustomAlertProps): JSX.Element {

    return <>
        {alert &&
        <Grid container direction={'row'} item>
            <Grid item xs={12}>
                <Alert variant={'filled'} severity={'warning'} onClose={onAlertClose}>
                    {alert}
                </Alert>
            </Grid>
        </Grid>}
    </>
}
export default CustomAlert;
