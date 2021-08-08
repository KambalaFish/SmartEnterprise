import React, {useState} from "react";
import {Grid, Typography} from "@material-ui/core";
import {CompanyFilter} from "./CompanyFilter/CompanyFilter";
import {ICompanyFilter} from "../../../utils/Interfaces/InterfacesApi";
import {CompanyTable} from "./CompanyTable";

export function CompanyTableLayout(): JSX.Element{
    const [companyFilter, setCompanyFilter] = useState<ICompanyFilter>({
        name: '',
        country: '',
        city: '',
        address: '',
        zipCode: '',
        status: 'any'
    });

    return (
        <Grid item container direction={'row'} justifyContent={'center'}>
            <Grid item style={{margin: `30px 0px`}} xs={10}>
                <Typography variant={'h4'}  color='secondary'>Registered companies:</Typography>
            </Grid>
            <Grid item xs={10}>
                <CompanyFilter
                    setFilter={setCompanyFilter}
                    companyFilter={companyFilter}
                />
            </Grid>
            <Grid item xs={10}>
                <CompanyTable
                    filter={companyFilter}
                    tableCellHeight={75}
                />
            </Grid>
        </Grid>
    );
}
