import React from 'react';
import {useForm, SubmitHandler} from "react-hook-form";
import {ICompanyCreation, ICompanyWithId} from "../../../../utils/Interfaces/InterfacesApi";
import {CompanyForm} from "../../CompanyCreation/includes/CompanyForm";
import api from "../../../../utils/Api";
import {yupResolver} from "@hookform/resolvers/yup";
import {companyFormValidationSchema} from "../../../../utils/ValidationSchemas/CompanyValidations/companyFormValidationSchema";
import {UpdateFormProps} from "../../../../utils/Interfaces/PropsInterfaces";
import {useAppDispatch} from "../../../../redux/reduxHooks";
import {upsertCompany} from "../../../../redux/slices/companySlice";

export function CompanyUpdateForm({id, company}: UpdateFormProps): JSX.Element{
    const {handleSubmit, control, formState: {errors}} = useForm<ICompanyCreation>(
        {
            resolver: yupResolver(companyFormValidationSchema),
            defaultValues: company
        }
    );
    const dispatch = useAppDispatch();
    const onSubmit: SubmitHandler<ICompanyCreation> = (data: ICompanyCreation) => {
        api()
            .updateCompany(id, data)
            .then( (value) => {
                const response = value.response as ICompanyWithId;
                dispatch(upsertCompany(response));
                alert(`updated company with id: ${response.id}`);
            })
            .catch((reason) => alert('Error message: '+reason.response.error));
    }

    return <CompanyForm handleSubmit={handleSubmit} control={control} errors={errors} onSubmit={onSubmit} buttonName={'update'}/>
}
