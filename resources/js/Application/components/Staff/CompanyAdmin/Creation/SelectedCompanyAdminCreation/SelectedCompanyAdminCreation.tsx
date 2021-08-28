import React, {useEffect, useState} from "react";
import {RouteComponentProps} from "react-router-dom";
import {CircularProgress} from "@material-ui/core";
import api from "../../../../../utils/api/api";
import {
    IStaffForm,
    ErrorBody,
    ICompany,
    IStaff,
    UserStatus
} from "../../../../../utils/Interfaces/InterfacesApi";
import CompanyAdminForm from "../includes/CompanyAdminForm";
import {ResponseLayout} from "../../../../Reusable/Layout/ResponseLayout/ResponseLayout";
import PageHeader from "../../../../Reusable/Headers/PageHeader/PageHeader";
import FormLayout from "../../../../Reusable/Layout/FormLayout/FormLayout";
import {SubmitHandler} from "react-hook-form";
import CustomAlert from "../../../../Reusable/CustomAlert/CustomAlert";
import CustomSuccessMessage from "../../../../Reusable/CustomSuccessMessage/CustomSuccessMessage";

function SelectedCompanyAdminCreation({match}: RouteComponentProps<Record<'id', string>>): JSX.Element {
    const id: number = parseInt(match.params.id);
    const [company, setCompany] = useState<ICompany | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const [alert, setAlert] = useState<string|null>(null);
    const [success, setSuccess] = useState<string|null>(null);

    function onAlertClose(){
        setAlert(null);
    }

    function onSuccessClose(){
        setSuccess(null);
    }

    useEffect(() => {
        api().getCompanyApi()
            .getCompany(id)
            .then((result) => {
                setCompany(result.response as ICompany);
            });
        setLoading(false);
    }, [id]);

    const onSubmit: SubmitHandler<IStaffForm> = (data: IStaffForm) => {
        if (alert){
            setAlert(null);
        }

        api().getStaffApi()
            .createCompanyAdmin({...data, companyId: id})
            .then(({code, response}) => {
                console.log('code: ', code,' response: ', response);
                if (code==200){
                    setSuccess(`Company admin with ${(response as IStaff).email} email was created successfully`);
                } else {
                    setAlert((response as ErrorBody).error);
                }
            })
            .catch((reason) => {
                console.log('companyAdminCreation reason: ', reason);
                setAlert(reason.response.error);
            })
    }

    return (
        loading?
            <CircularProgress/>
            :
            <>
                <CustomAlert alert={alert} onAlertClose={onAlertClose}/>
                <CustomSuccessMessage message={success} onClose={onSuccessClose}/>
                <PageHeader headerText={`Create administrator for ${company?.name} company`}/>
                <FormLayout xs={6}>
                    <CompanyAdminForm
                        onSubmit={onSubmit}
                        buttonName={'create'}
                        defaultValues={{
                            name: '',
                            phoneNumber: '',
                            status: UserStatus.works,
                            email: '',
                        }}
                    />
                </FormLayout>
            </>
    );
}

export default SelectedCompanyAdminCreation;
