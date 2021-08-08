import React, {useEffect, useState} from "react";
import {Divider, Grid, makeStyles, Paper, Typography} from "@material-ui/core";
import {RouteComponentProps} from "react-router-dom";
import {ApiResponse, Contact, ErrorBody, ICompany, ICompanyCreation} from "../../../utils/Interfaces/InterfacesApi";
import api from "../../../utils/Api";
import {ContactInfo} from "./includes/ContactInfo";
import {CompanyTabs} from "./CompanyTabs/CompanyTabs";
import {CircularProgress} from "@material-ui/core";

export default function CompanyInfo({match}: RouteComponentProps<Record<'id', string>>): JSX.Element{
    const id: number = parseInt(match.params.id);

    const [company, setCompany] = useState<ICompanyCreation|null>(null);

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
            .catch((reason: ApiResponse<ErrorBody>) => {
                alert(`reason: ${reason.response.error as string}`);
            });
    }, [id]);

    const useStyles = makeStyles((theme)=>({
        divider: {
            background: theme.palette.divider
        },
        status: {
            color: theme.palette.secondary.main
        }
    })
    );
    const classes = useStyles();
    return company? (
        <Grid container item xs={9} direction={'column'} alignItems={'flex-start'} style={{marginTop: 25, padding: 20}} component={Paper} elevation={5}>
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
                    <Typography variant={'h6'}>Status: <span className={classes.status}>{company.status}</span></Typography>
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
                    firstName={company.itHead?.firstName}
                    lastName={company.itHead?.lastName}
                    email={company.itHead?.email}
                    phone={company.itHead?.phone}
                />
                <ContactInfo
                    role={'Customer manager contact'}
                    firstName={company.customerManager?.firstName}
                    lastName={company.customerManager?.lastName}
                    email={company.customerManager?.email}
                    phone={company.customerManager?.phone}
                />
                <ContactInfo
                    role={'Administrator contact'}
                    firstName={company.admin?.firstName}
                    lastName={company.admin?.lastName}
                    email={company.admin?.email}
                    phone={company.admin?.phone}
                />
            </Grid>
            <CompanyTabs
                id={id}
            />
        </Grid>
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
//Too many requests error handling
//Too many requests issue?
