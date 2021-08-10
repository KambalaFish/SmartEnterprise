import React, {useEffect, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {Typography, Grid, makeStyles, CircularProgress} from "@material-ui/core";
import {Contact, ICompany, ICompanyCreation} from "../../../utils/Interfaces/InterfacesApi";
import api from "../../../utils/Api";
import {CompanyUpdateForm} from "./includes/CompanyUpdateForm";

export function CompanyUpdate({match, location, history}: RouteComponentProps<Record<'id', string>>):JSX.Element{
    const id: number = parseInt(match.params.id);
    const [company, setCompany] = useState<ICompanyCreation>();

    useEffect(() => {
        const companyPromise = api().getCompany(id);
        const mainAdminPromise = api().getCompanyMainAdmin(id);
        const itHeadPromise = api().getCompanyItHead(id);
        const customerManagerPromise = api().getCompanyCustomerManager(id);
        Promise
            .all([companyPromise, mainAdminPromise, itHeadPromise, customerManagerPromise])
            .then(
                values =>{
                    const companyInfo: ICompany = values[0].response as ICompany;
                    const mainAdminInfo: Contact = values[1].response as Contact;
                    const itHeadInfo: Contact = values[2].response as Contact;
                    const customerManagerInfo: Contact = values[3].response as Contact;
                    const result: ICompanyCreation = {
                        ...companyInfo,
                        admin: mainAdminInfo,
                        itHead: itHeadInfo,
                        customerManager: customerManagerInfo
                    }
                    setCompany(result);
                }
            )
    }, [id]);

    const useStyles = makeStyles( (theme) => ({
        t1:{
            marginTop: theme.spacing(2)
        }
    }));
    const classes = useStyles();

    return company?
        <Grid container direction={'column'} alignItems={'center'} justifyContent={'center'}>
            <Grid item xs={6} className={classes.t1}>
                <Typography variant={'h4'} align={'center'}>Update {company.name} company</Typography>
            </Grid>
            <CompanyUpdateForm id={id} company={company}/>
        </Grid>
        :
        <Grid container direction={'column'} alignItems={'center'} justifyContent={'center'}>
            <Grid item xs={6}>
                <CircularProgress/>
                {/*<Typography variant={'h4'}>Loading, please wait...</Typography>*/}
            </Grid>
        </Grid>
}
