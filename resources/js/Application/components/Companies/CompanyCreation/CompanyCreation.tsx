import React, {useState} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import {ICompanyInfo, ICompanyWithId} from "../../../utils/Interfaces/InterfacesApi";
import {yupResolver} from '@hookform/resolvers/yup';
import {companyFormValidationSchema} from "../../../utils/ValidationSchemas/CompanyValidations/companyFormValidationSchema";
import api from "../../../utils/Api";
import {CompanyForm} from "../CompanyForm/CompanyForm";
import PageHeader from "../../Reusable/Headers/PageHeader/PageHeader";
import FormLayout from "../../Reusable/Layout/FormLayout/FormLayout";
import CustomAlert from "../../Reusable/CustomAlert/CustomAlert";
import CustomSuccessMessage from "../../Reusable/CustomSuccessMessage/CustomSuccessMessage";

function CompanyCreation(): JSX.Element {
    const {handleSubmit, control, formState: {errors}} = useForm<ICompanyInfo>({
        resolver: yupResolver(companyFormValidationSchema),
        defaultValues: {
            name: '',
            status: 'served',
            country: '',
            city: '',
            address: '',
            zipCode: '',
            mainAdminContact: {
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
            },
            itDepartmentContact: {
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
            },
            customerManagerContact: {
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
            },
        }
    });
    const [success, setSuccess] = useState<string | null>(null);
    const [alert, setAlert] = useState<string | null>(null);

    function onSuccessClose(): void {
        setSuccess(null);
    }

    function onAlertClose(): void {
        setAlert(null);
    }

    const onSubmit: SubmitHandler<ICompanyInfo> = (data: ICompanyInfo) => {
        console.log('data: ', data);
        api()
            .createCompany(data)
            .then((value) => {
                const company = value.response as ICompanyWithId;
                console.log('company: ', company);
                setSuccess(`${company.name} company was created successfully`);
            })
            .catch((reason) => setAlert(`Error message: ${reason.response.error}`));
    }

    return (
        <>
            <CustomAlert alert={alert} onAlertClose={onAlertClose}/>
            <CustomSuccessMessage message={success} onClose={onSuccessClose}/>
            <PageHeader headerText={'Create new company'}/>
            <FormLayout xs={8}>
                <CompanyForm handleSubmit={handleSubmit} control={control} errors={errors} onSubmit={onSubmit}
                             buttonName={'create'}/>
            </FormLayout>
        </>
    )
}

export default CompanyCreation;
