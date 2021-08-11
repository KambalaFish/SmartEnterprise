import React, {useEffect, useState} from "react";
import {RouteComponentProps} from "react-router-dom";
import {Grid, Paper, Typography} from "@material-ui/core";
import api from "../../../utils/Api";
import {ICompany} from "../../../utils/Interfaces/InterfacesApi";
import {useStyles} from "./includes/styles";
import CompanyAdminCreationForm from "./includes/CompanyAdminCreationForm";
import {Alert} from "@material-ui/lab";

function CompanyAdminCreation({match}: RouteComponentProps<Record<'id', string>>): JSX.Element{
    const id: number = parseInt(match.params.id);
    const [company, setCompany] = useState<ICompany|null>(null);
    const [alert, setAlert] = useState<string|null>(null);
    const [success, setSuccess] = useState<string|null>(null);

    function onAlertClose(){
        setAlert(null);
    }
    function onSuccessClose(){
        setSuccess(null);
    }
    useEffect(() => {
        api()
            .getCompany(id)
            .then((result) => {
                setCompany(result.response as ICompany);
            });
    },[id])
    const classes = useStyles();
    return (
        <>
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
            <Grid item xs={6}>
                <Typography variant={'h5'} align={'center'} className={classes.mt}>
                    Create administrator for {company?.name && `${company.name} company`}
                </Typography>
            </Grid>
            <Grid item container direction={'column'} xs={6} className={`${classes.mt} ${classes.adminForm}`} component={Paper} elevation={12}>
                <CompanyAdminCreationForm
                    alert={alert}
                    setAlert={setAlert}
                    setSuccessMessage={setSuccess}
                    companyId={id}
                />
            </Grid>
        </>
    )
    // return (
    //     <Grid container direction='column' alignItems='center'>
    //         {alert &&
    //         <Grid item xs={12} className={classes.border}>
    //             <Alert variant={'filled'} severity={'warning'} onClose={onAlertClose}>
    //                 {alert}
    //             </Alert>
    //         </Grid>
    //         }
    //         <Grid item xs={6}>
    //             <Typography variant={'h5'} align={'center'} className={classes.mt}>
    //                 Create administrator for {company?.name && `${company.name} company`}
    //             </Typography>
    //         </Grid>
    //         <Grid item container direction={'column'} xs={6} className={`${classes.mt} ${classes.adminForm}`} component={Paper} elevation={12}>
    //             <CompanyAdminCreationForm
    //                 setAlert={setAlert}
    //             />
    //         </Grid>
    //     </Grid>
    // )
}

export default CompanyAdminCreation;
