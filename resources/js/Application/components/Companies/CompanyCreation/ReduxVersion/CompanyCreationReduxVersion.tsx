import React from "react";
import {Grid} from "@material-ui/core";
import {useForm, SubmitHandler} from "react-hook-form";
import {ICompanyInfo, ICompanyWithId} from "../../../../utils/Interfaces/InterfacesApi";
import {yupResolver} from '@hookform/resolvers/yup';
import {companyFormValidationSchema} from "../../../../utils/ValidationSchemas/CompanyValidations/companyFormValidationSchema";
import api from '../../../../utils/api/api';
import {CompanyForm} from "../../CompanyForm/CompanyForm";
import {useAppDispatch} from "../../../../redux/reduxHooks";
import {removeLastPage} from "../../../../redux/slices/companyTableSlice";
import PageHeader from "../../../Reusable/Headers/PageHeader/PageHeader";
import FormLayout from "../../../Reusable/Layout/FormLayout/FormLayout";

function CompanyCreationReduxVersion(): JSX.Element{
    const {handleSubmit, control, formState: {errors} } = useForm<ICompanyInfo>({
        resolver: yupResolver(companyFormValidationSchema),
        defaultValues: {
            name: '',
            status: 'served',
            country: '',
            city: '',
            address: '',
            zipCode: '',
            mainAdminContact:{
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
            },
            itDepartmentContact:{
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
            },
            customerManagerContact:{
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
            },
        }
    });
    const dispatch = useAppDispatch();
    const onSubmit: SubmitHandler<ICompanyInfo> = (data: ICompanyInfo) => {
        console.log('data: ',data);
        api().getCompanyApi()
            .createCompany(data)
            .then( (value) => {
                const company = value.response as ICompanyWithId;
                console.log('company: ',company);
                dispatch(removeLastPage());
                alert(`Created ${company.name} company`);
            })
            .catch((reason) => alert('Error message: '+reason.response.error));
    }

    return(
        <Grid container direction='column' justifyContent='flex-end' alignItems='center'>
            <PageHeader headerText={`Create new company`}/>
            <FormLayout xs={6}>
                <CompanyForm handleSubmit={handleSubmit} control={control} errors={errors} onSubmit={onSubmit} buttonName={'create'}/>
            </FormLayout>
        </Grid>
    )
}

export default CompanyCreationReduxVersion;
