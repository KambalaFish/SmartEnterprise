import React, {useEffect, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {Grid, CircularProgress, Paper} from "@material-ui/core";
import {ApiResponse, ICompanyInfo} from "../../../../utils/Interfaces/InterfacesApi";
import api from "../../../../utils/api/api";
import PageHeader from "../../../Reusable/Headers/PageHeader/PageHeader";
import CompanyUpdateFormRedux from "./includes/CompanyUpdateFormRedux";

export function CompanyUpdateReduxVersion({match, location, history}: RouteComponentProps<Record<'id', string>>): JSX.Element {
    const id: number = parseInt(match.params.id);
    const [company, setCompany] = useState<ICompanyInfo>();

    useEffect(() => {
        api().getCompanyApi()
            .getCompanyInfo(id)
            .then((result) => {
                const {response} = result as ApiResponse<ICompanyInfo>;
                setCompany(response)
            })
            .catch();
    }, [id]);

    return company ?
        <Grid container direction={'column'} alignItems={'center'} justifyContent={'center'}>
            <PageHeader headerText={`Update ${company.name} company`}/>
            <CompanyUpdateFormRedux id={id} company={company}/>
        </Grid>
        :
        <Grid container direction={'column'} alignItems={'center'} justifyContent={'center'}>
            <Grid item xs={6}>
                <CircularProgress/>
            </Grid>
        </Grid>
}
