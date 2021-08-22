import React, {useEffect, useState} from "react";
import api from "../../../utils/Api";
import {ApiResponse, ICompanyInfo} from "../../../utils/Interfaces/InterfacesApi";
import {RouteComponentProps} from "react-router-dom";
import {CircularProgress, Grid} from "@material-ui/core";
import FormLayout from "../../Reusable/Layout/FormLayout/FormLayout";
import PageHeader from "../../Reusable/Headers/PageHeader/PageHeader";
import CompanyUpdateForm from "./includes/CompanyUpdateForm";
import CustomAlert from "../../Reusable/CustomAlert/CustomAlert";
import CustomSuccessMessage from "../../Reusable/CustomSuccessMessage/CustomSuccessMessage";

function CompanyUpdate({match}: RouteComponentProps<Record<'id', string>>): JSX.Element{
    const id: number = parseInt(match.params.id);
    const [company, setCompany] = useState<ICompanyInfo>();
    const [success, setSuccess] = useState<string|null>(null);
    const [alert, setAlert] = useState<string|null>(null);
    function onSuccessClose() {
        setSuccess(null);
    }
    function onAlertClose(){
        setAlert(null);
    }

    useEffect(() => {
        api()
            .getCompanyInfo(id)
            .then((result) => {
                const {response} = result as ApiResponse<ICompanyInfo>;
                setCompany(response)
            })
            .catch(reason => setAlert(reason.response.error));
    }, [id]);

    function onSuccess(message: string): void{
        setSuccess(message);
    }
    function onFailure(message: string): void{
        setAlert(message);
    }

    return (
        company?
            <>
                <CustomSuccessMessage message={success} onClose={onSuccessClose}/>
                <CustomAlert alert={alert} onAlertClose={onAlertClose}/>
                <PageHeader headerText={`Update ${company.name} company`}/>
                <FormLayout xs={6}>
                    <CompanyUpdateForm
                        id={id}
                        company={company}
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                    />
                </FormLayout>
            </>
            :
            <Grid item container direction={'row'} justifyContent={'center'} alignContent={'center'}>
                <Grid item xs={6}>
                    <CircularProgress/>
                </Grid>
            </Grid>
    )
}

export default CompanyUpdate;
