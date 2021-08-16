import React from "react";
import {CompanyForm} from "../../CompanyCreation/includes/CompanyForm";
import FormLayout from "../../../Layout/FormLayout/FormLayout";
import {SubmitHandler, useForm} from "react-hook-form";
import {ICompanyCreation, ICompanyWithId} from "../../../../utils/Interfaces/InterfacesApi";
import api from "../../../../utils/Api";
import {upsertCompany} from "../../../../redux/slices/companySlice";
import {useAppDispatch} from "../../../../redux/reduxHooks";
import {yupResolver} from "@hookform/resolvers/yup";
import {companyFormValidationSchema} from "../../../../utils/ValidationSchemas/CompanyValidations/companyFormValidationSchema";
import {UpdateFormProps} from "../../../../utils/Interfaces/PropsInterfaces";

function CompanyUpdateForm({id, company}: UpdateFormProps): JSX.Element {

    const dispatch = useAppDispatch();
    const {handleSubmit, control, formState: {errors}} = useForm<ICompanyCreation>(
        {
            resolver: yupResolver(companyFormValidationSchema),
            defaultValues: company
        }
    );
    const onSubmit: SubmitHandler<ICompanyCreation> = (data: ICompanyCreation) => {
        api()
            .updateCompany(id, data)
            .then((value) => {
                const response = value.response as ICompanyWithId;
                dispatch(upsertCompany(response));
                alert(`updated company with id: ${response.id}`);
            })
            .catch((reason) => alert('Error message: ' + reason.response.error));
    }

    return <FormLayout xs={6}>
        <CompanyForm handleSubmit={handleSubmit} control={control} errors={errors} onSubmit={onSubmit}
                     buttonName={'update'}/>
    </FormLayout>
}

export default CompanyUpdateForm;
