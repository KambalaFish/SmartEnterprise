import React, {useContext, useEffect, useState} from "react";
import {Button, Grid, Paper, TextField, Typography} from "@material-ui/core";
import {Alert, Autocomplete} from "@material-ui/lab";
import {SubmitHandler, useForm} from "react-hook-form";
import {ResponseLayout} from "../../../../Layout/ResponseLayout/ResponseLayout";
import CompanyAdminCreationForm from "../includes/CompanyAdminCreationForm";
import {ParagraphHeader} from "../../../../Headers/ParagraphHeader/ParagraphHeader";
import {ICompanyWithId, ResourceCollectionResponse} from "../../../../../utils/Interfaces/InterfacesApi";
import api from "../../../../../utils/Api";
import {CircularProgress} from "@material-ui/core";
import PageHeader from "../../../../Headers/PageHeader/PageHeader";
import FormLayout from "../../../../Layout/FormLayout/FormLayout";

function CompanyAdminCreation(): JSX.Element {
    const [selectedCompany, setSelectedCompany] = useState<ICompanyWithId | null>(null);
    const [companies, setCompanies] = useState<ICompanyWithId[]>([]);
    const [alert, setAlert] = useState<string|null>(null);
    const [success, setSuccess] = useState<string|null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(()=>{
        setLoading(true);
        api()
            .getAllCompanies()
            .then((result) => {
                const {response, code} = result;
                console.log('response: ', result);
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
                <>
                    <PageHeader headerText={`Choose company and create administrator for the company`}/>
                    <FormLayout xs={6}>
                            <ParagraphHeader headerText={'Choose company'}/>
                            <Grid item xs={12} container direction={'row'} spacing={2} justifyContent={'center'}>
                                <Grid item xs={5}>
                                    <Autocomplete
                                        value={selectedCompany}
                                        onChange={
                                            (event: any, newValue) => {
                                                setSelectedCompany(newValue);
                                            }
                                        }
                                        options={companies}
                                        loading={loading}
                                        size={'small'}
                                        getOptionLabel={option => option.name}
                                        renderInput={
                                            (params) =>
                                                <TextField
                                                    {...params}
                                                    margin={'normal'}
                                                    InputLabelProps={{shrink: true}}
                                                    fullWidth
                                                    label={'Company'}
                                                    variant={'outlined'}
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        endAdornment: (
                                                            <React.Fragment>
                                                                {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                                                {params.InputProps.endAdornment}
                                                            </React.Fragment>
                                                        ),
                                                    }}
                                                />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={5}/>
                            </Grid>
                            <CompanyAdminCreationForm
                                alert={alert}
                                setAlert={setAlert}
                                setSuccess={setSuccess}
                                companyId={selectedCompany?.id}
                            />
                    </FormLayout>
                </>
            </>
        );
}
export default CompanyAdminCreation;
