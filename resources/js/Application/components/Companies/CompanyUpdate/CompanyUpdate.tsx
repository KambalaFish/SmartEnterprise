import React, {useEffect, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {Grid, CircularProgress, Paper} from "@material-ui/core";
import {Contact, ICompany, ICompanyCreation} from "../../../utils/Interfaces/InterfacesApi";
import api from "../../../utils/Api";
import PageHeader from "../../Headers/PageHeader/PageHeader";
import CompanyUpdateForm from "./includes/CompanyUpdateForm";

export function CompanyUpdate({match, location, history}: RouteComponentProps<Record<'id', string>>): JSX.Element {
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
                values => {
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

    return company ?
        <Grid container direction={'column'} alignItems={'center'} justifyContent={'center'}>
            <PageHeader headerText={`Update ${company.name} company`}/>
            <CompanyUpdateForm id={id} company={company}/>
        </Grid>
        :
        <Grid container direction={'column'} alignItems={'center'} justifyContent={'center'}>
            <Grid item xs={6}>
                <CircularProgress/>
            </Grid>
        </Grid>
}
