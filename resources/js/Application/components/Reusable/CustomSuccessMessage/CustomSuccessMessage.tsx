import React from "react";
import {Grid} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

interface CustomAlertProps {
    message: string | null;
    onClose: () => void;
}

function CustomSuccessMessage({message, onClose}: CustomAlertProps): JSX.Element{
    return <>
        {message &&
        <Grid container direction={'row'} item>
            <Grid item xs={12}>
                <Alert variant={'filled'} severity={'success'} onClose={onClose}>
                    {message}
                </Alert>
            </Grid>
        </Grid>
        }
    </>
}

export default CustomSuccessMessage;
