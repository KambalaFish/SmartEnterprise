import React, {useEffect, useState} from "react";
import {Grid} from "@material-ui/core";
import {SubmitHandler} from "react-hook-form";
import CompanyAdminForm from "../includes/CompanyAdminForm";
import {ParagraphHeader} from "../../../../../Reusable/Headers/ParagraphHeader/ParagraphHeader";
import {
    IStaffForm, ErrorBody,
    ICompanyWithId, IStaff,
    ResourceCollectionResponse, UserStatus
} from "../../../../../../utils/Interfaces/InterfacesApi";
import api from "../../../../../../utils/api/api";
import PageHeader from "../../../../../Reusable/Headers/PageHeader/PageHeader";
import FormLayout from "../../../../../Reusable/Layout/FormLayout/FormLayout";
import CustomAutocomplete from "../../../../../Reusable/CustomAutocomplete/CustomAutocomplete";
import CustomAlert from "../../../../../Reusable/CustomAlert/CustomAlert";
import CustomSuccessMessage from "../../../../../Reusable/CustomSuccessMessage/CustomSuccessMessage";

function CompanyAdminCreation(): JSX.Element {
    const [selectedCompany, setSelectedCompany] = useState<ICompanyWithId | null>(null);
    const [companies, setCompanies] = useState<ICompanyWithId[]>([]);
    const [alert, setAlert] = useState<string|null>(null);
    const [success, setSuccess] = useState<string|null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(()=>{
        api().getCompanyApi()
            .getAllCompanies()
            .then((result) => {
                const {response, code} = result;
                if (code==200){
                    setCompanies((response as ResourceCollectionResponse<ICompanyWithId[]>).data);
                } else
                    Promise.reject({error: `error code: ${code}`});
            })
            .catch(reason => {
                console.log('reason: ',reason);
                setAlert(reason.response.error);
            })
        setLoading(false);
    }, []);

    function onAlertClose(){
        setAlert(null);
    }
    function onSuccessClose(){
        setSuccess(null);
    }

    console.log('page load');

    const onSubmit: SubmitHandler<IStaffForm> = (data: IStaffForm) => {
        if (alert){
            setAlert(null);
        }
        if (selectedCompany?.id == undefined){
            setAlert('You must choose company before creating company admin');
            return;
        }

        api().getStaffApi()
            .createCompanyAdmin({...data, companyId: selectedCompany.id})
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
            <>
                <CustomAlert alert={alert} onAlertClose={onAlertClose}/>
                <CustomSuccessMessage message={success} onClose={onSuccessClose}/>
                <>
                    <PageHeader headerText={`Choose company and create administrator for the company`}/>
                    <FormLayout xs={6}>
                            <ParagraphHeader headerText={'Choose company'}/>
                            <Grid item xs={12} container direction={'row'} spacing={2} justifyContent={'center'}>
                                <Grid item xs={5}>
                                    <CustomAutocomplete
                                        value={selectedCompany}
                                        setValue={setSelectedCompany}
                                        options={companies}
                                        getOption={(option) => option.name}
                                        label={'Company'}
                                        loading={loading}
                                    />
                                </Grid>
                                <Grid item xs={5}/>
                            </Grid>
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
            </>
        );
}
export default CompanyAdminCreation;
