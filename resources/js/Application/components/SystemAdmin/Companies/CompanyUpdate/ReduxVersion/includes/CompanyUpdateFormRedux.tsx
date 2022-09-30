import React from "react";
import {CompanyForm} from "../../../CompanyForm/CompanyForm";
import FormLayout from "../../../../../Reusable/Layout/FormLayout/FormLayout";
import {SubmitHandler, useForm} from "react-hook-form";
import {ICompanyInfo, ICompanyWithId} from "../../../../../../utils/Interfaces/InterfacesApi";
import api from "../../../../../../utils/api/api";
import {upsertCompany} from "../../../../../../redux/slices/companySlice";
import {useAppDispatch} from "../../../../../../redux/reduxHooks";
import {yupResolver} from "@hookform/resolvers/yup";
import {companyFormValidationSchema} from "../../../../../../utils/ValidationSchemas/CompanyValidations/companyFormValidationSchema";

interface CompanyUpdateFormReduxProps {
    id: number,
    company: ICompanyInfo;
}
function CompanyUpdateFormRedux({id, company}: CompanyUpdateFormReduxProps): JSX.Element {

    const dispatch = useAppDispatch();
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

export default CompanyUpdateFormRedux;
