import React, {useEffect, useState} from "react";
import {Divider, Grid, makeStyles, Paper, Typography} from "@material-ui/core";
import {RouteComponentProps} from "react-router-dom";
import {
    ApiResponse,
    ErrorBody,
    ICompanyInfo
} from "../../../utils/Interfaces/InterfacesApi";
import api from "../../../utils/Api";
import {ContactInfo} from "./includes/ContactInfo";
import {CompanyTabs} from "./CompanyTabs/CompanyTabs";
import {CircularProgress} from "@material-ui/core";
import CustomAlert from "../../Reusable/CustomAlert/CustomAlert";

export default function CompanyInfo({match}: RouteComponentProps<Record<'id', string>>): JSX.Element {
    const id: number = parseInt(match.params.id);
    const [company, setCompany] = useState<ICompanyInfo | null>(null);
    const [alert, setAlert] = useState<string|null>(null);
    function onAlertClose(){
        setAlert(null);
    }
    useEffect(() => {
        api()
            .getCompanyInfo(id)
            .then((result) => {
                const {response} = result as ApiResponse<ICompanyInfo>;
                console.log('result: ', result);
                setCompany(response);
            })
            .catch((reason: ApiResponse<ErrorBody>) => {
                setAlert(reason.response.error as string)
            })
    }, [id]);

    const useStyles = makeStyles((theme) => ({
            divider: {
                background: theme.palette.divider
            },
            status: {
                color: theme.palette.secondary.main
            }
        })
    );
    const classes = useStyles();
    return company ? (
            <>
                <CustomAlert alert={alert} onAlertClose={onAlertClose}/>
                <Grid container item xs={9} direction={'column'} alignItems={'flex-start'} style={{marginTop: 25, padding: 20}}
                      component={Paper} elevation={5}>
                    <Grid item xs={12}>
                        <Typography variant={"h4"}>{company.name}</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography variant={"h5"}>{company.address}. {company.city}. {company.country}.</Typography>
                    </Grid>
                    <Grid item container direction={'row'} spacing={6} justifyContent={'flex-start'}>
                        <Grid item>
                            <Typography variant={'h6'}>ID: {id}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={'h6'}>Status: <span
                                className={classes.status}>{company.status}</span></Typography>
                        </Grid>
                    </Grid>
                    <Grid container direction={'row'} item>
                        <Grid item xs={12}>
                            {/*<Divider/>*/}
                            <Divider classes={{root: classes.divider}}/>
                            {/*<hr/>*/}
                        </Grid>
                    </Grid>
                    <Grid item container direction={'row'}>
                        <ContactInfo
                            role={'IT head contact'}
                            firstName={company.itDepartmentContact.firstName}
                            lastName={company.itDepartmentContact.lastName}
                            email={company.itDepartmentContact.email}
                            phone={company.itDepartmentContact.phoneNumber}
                        />
                        <ContactInfo
                            role={'Customer manager contact'}
                            firstName={company.customerManagerContact.firstName}
                            lastName={company.customerManagerContact.lastName}
                            email={company.customerManagerContact.email}
                            phone={company.customerManagerContact.phoneNumber}
                        />
                        <ContactInfo
                            role={'Administrator contact'}
                            firstName={company.mainAdminContact.firstName}
                            lastName={company.mainAdminContact.lastName}
                            email={company.mainAdminContact.email}
                            phone={company.mainAdminContact.phoneNumber}
                        />
                    </Grid>
                    <CompanyTabs
                        id={id}
                    />
                </Grid>
            </>
        )
        :
        (
            <Grid container direction={'column'} alignItems={'center'} justifyContent={'center'}>
                <Grid item xs={6}>
                    <CircularProgress/>
                </Grid>
            </Grid>
        )
}
