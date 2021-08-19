import React, {useEffect, useState} from "react";
import {RouteComponentProps} from "react-router-dom";
import {CircularProgress} from "@material-ui/core";
import api from "../../../../../utils/Api";
import {ICompany} from "../../../../../utils/Interfaces/InterfacesApi";
import CompanyAdminCreationForm from "../includes/CompanyAdminCreationForm";
import {ResponseLayout} from "../../../../Reusable/Layout/ResponseLayout/ResponseLayout";
import PageHeader from "../../../../Reusable/Headers/PageHeader/PageHeader";
import FormLayout from "../../../../Reusable/Layout/FormLayout/FormLayout";

function SelectedCompanyAdminCreation({match}: RouteComponentProps<Record<'id', string>>): JSX.Element {
    const id: number = parseInt(match.params.id);
    const [company, setCompany] = useState<ICompany | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        api()
            .getCompany(id)
            .then((result) => {
                setCompany(result.response as ICompany);
            });
        setLoading(false);
    }, [id]);
    return (
        loading?
            <CircularProgress/>
            :
            <ResponseLayout
                render={
                    (renderProps) => (
                        <>
                            <PageHeader headerText={`Create administrator for ${company?.name} company`}/>
                            <FormLayout xs={6}>
                                <CompanyAdminCreationForm
                                    {...renderProps}
                                    companyId={id}
                                />
                            </FormLayout>
                        </>
                    )
                }
            />
    );
}

export default SelectedCompanyAdminCreation;
