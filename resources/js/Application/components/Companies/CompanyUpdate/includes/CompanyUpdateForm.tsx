import React from "react";
import {CompanyForm} from "../../CompanyForm/CompanyForm";
import {SubmitHandler, useForm} from "react-hook-form";
import {ICompanyInfo, ICompanyWithId} from "../../../../utils/Interfaces/InterfacesApi";
import api from "../../../../utils/api/api";
import {yupResolver} from "@hookform/resolvers/yup";
import {companyFormValidationSchema} from "../../../../utils/ValidationSchemas/CompanyValidations/companyFormValidationSchema";

interface CompanyUpdateFormProps {
    id: number,
    company: ICompanyInfo;
    onSuccess: (message: string) => void;
    onFailure: (message: string) => void;
}

function CompanyUpdateForm({id, company, onSuccess, onFailure}: CompanyUpdateFormProps): JSX.Element {

    const {handleSubmit, control, formState: {errors}} = useForm<ICompanyInfo>(
        {
            resolver: yupResolver(companyFormValidationSchema),
            defaultValues: company
        }
    );
    const onSubmit: SubmitHandler<ICompanyInfo> = (data: ICompanyInfo) => {
        api().getCompanyApi()
            .updateCompany(id, data)
            .then((value) => {
                const response = value.response as ICompanyWithId;
                onSuccess(`${response.name} company was updated successfully`);
            })
            .catch(reason => onFailure(reason.response.error));
    }

    return <CompanyForm
        handleSubmit={handleSubmit}
        control={control}
        errors={errors}
        onSubmit={onSubmit}
        buttonName={'update'}
    />;
}

export default CompanyUpdateForm;
