import React, {useEffect, useState} from "react";
import {RouteComponentProps} from "react-router-dom";
import {
    ErrorBody,
    ICompanyWithId,
    IStaff,
    IStaffForm,
    IStaffWithCompanyName,
    ResourceCollectionResponse,
    UserStatus
} from "../../../../utils/Interfaces/InterfacesApi";
import api from "../../../../utils/api/api";
import CustomAlert from "../../../Reusable/CustomAlert/CustomAlert";
import CompanyAdminForm from "../Creation/includes/CompanyAdminForm";
import {SubmitHandler} from "react-hook-form";
import {CircularProgress, Grid} from "@material-ui/core";
import CustomSuccessMessage from "../../../Reusable/CustomSuccessMessage/CustomSuccessMessage";
import FormLayout from "../../../Reusable/Layout/FormLayout/FormLayout";
import {ParagraphHeader} from "../../../Reusable/Headers/ParagraphHeader/ParagraphHeader";
import CustomAutocomplete from "../../../Reusable/CustomAutocomplete/CustomAutocomplete";
import PageHeader from "../../../Reusable/Headers/PageHeader/PageHeader";
import ReactDOM from "react-dom";

function CompanyAdminUpdate({match}: RouteComponentProps<Record<'id', string>>): JSX.Element{
    const id: number = parseInt(match.params.id);
    const [admin, setAdmin] = useState<IStaffWithCompanyName|null>(null);
    const [alert, setAlert] = useState<string|null>(null);
    const [success, setSuccess] = useState<string|null>(null);
    const [selectedCompany, setSelectedCompany] = useState<{id: number, name: string} | null>(null);
    const [companies, setCompanies] = useState<{id: number, name: string}[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    function onAlertClose(){
        setAlert(null);
    }
    function onSuccessClose(){
        setSuccess(null);
    }

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

    useEffect(() => {
        api().getStaffApi()
            .getStaff(id)
            .then((result) => {
                const val = result.response as IStaffWithCompanyName;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                if (val.status=='on vacation'){
                    val.status = UserStatus.onVacation;
                }
                ReactDOM.unstable_batchedUpdates(
                    () => {
                        setAdmin(val);
                        setSelectedCompany({id: val.companyId, name: val.companyName});
                    }
                );
            })
            .catch((reason) => setAlert(reason.response.error));
    }, []);

    const onSubmit: SubmitHandler<IStaffForm> = (data: IStaffForm) => {
        if (alert){
            setAlert(null);
        }
        if (selectedCompany?.id == undefined){
            setAlert('You must choose company before creating company admin');
            return;
        }
        api().getStaffApi()
            .updateStaff({...data, companyId: selectedCompany.id}, id)
            .then(({code, response}) => {
                if (code==200){
                    setSuccess(`Company admin with ${(response as IStaff).email} email was updated successfully`);
                } else {
                    setAlert((response as ErrorBody).error);
                }
            })
            .catch((reason) => {
                console.log('companyAdminUpdate reason: ', reason);
                setAlert(reason.response.error);
            })
    }

    return <>
        <CustomAlert alert={alert} onAlertClose={onAlertClose}/>
        <CustomSuccessMessage message={success} onClose={onSuccessClose}/>
        {
            admin?
                <>
                    <PageHeader headerText={`Update company administrator ${admin.name}`}/>
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
                                    defaultValue={{id: admin.id, name: admin.companyName}}
                                />
                            </Grid>
                            <Grid item xs={5}/>
                        </Grid>
                        <CompanyAdminForm
                            onSubmit={onSubmit}
                            buttonName={'update'}
                            defaultValues={
                                {...admin}
                            }
                            passwordFieldLabel={'New password'}
                        />
                    </FormLayout>
                </>
                :
                <CircularProgress/>
        }
    </>
}

export default CompanyAdminUpdate;
