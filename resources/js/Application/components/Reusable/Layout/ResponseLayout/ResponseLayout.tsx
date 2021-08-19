import React, {useState} from "react";
import {Grid} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

export interface ResponseLayoutProps{
    render:
        (
            renderProps: {
                alert: string|null,
                setAlert: React.Dispatch<React.SetStateAction<string | null>>,
                success: string|null,
                setSuccess: React.Dispatch<React.SetStateAction<string | null>>
            }
        ) => JSX.Element;
}

export function ResponseLayout({render}: ResponseLayoutProps): JSX.Element{
    const [alert, setAlert] = useState<string|null>(null);
    const [success, setSuccess] = useState<string|null>(null);
    function onAlertClose(){
        setAlert(null);
    }
    function onSuccessClose(){
        setSuccess(null);
    }

    return <>
        {alert &&
        <Grid container direction={'row'} item>
            <Grid item xs={12}>
                <Alert variant={'filled'} severity={'warning'} onClose={onAlertClose}>
                    {alert}
                </Alert>
            </Grid>
        </Grid>
        }
        {success &&
        <Grid container direction={'row'} item>
            <Grid item xs={12}>
                <Alert variant={'filled'} severity={'success'} onClose={onSuccessClose}>
                    {success}
                </Alert>
            </Grid>
        </Grid>
        }
        {
            render({alert, setAlert, success, setSuccess})
        }
    </>
}
