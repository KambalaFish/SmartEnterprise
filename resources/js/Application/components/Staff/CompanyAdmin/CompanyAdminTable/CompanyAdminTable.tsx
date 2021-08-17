import React, {useState} from "react";
import {getCompanyAdmins} from "../../../../utils/FetchFunctions";
import {Column} from "../../../../utils/Interfaces/PropsInterfaces";
import {Grid, Typography} from "@material-ui/core";
import {AdvancedReusableTable} from "../../../ReusableTable/AdvancedReusableTable";
import {useStyles} from "./includes/styles";
import {CompanyAdminFilter} from "./CompanyAdminFilter/CompanyAdminFilter";
import {ICompanyAdminFilter, UserStatus} from "../../../../utils/Interfaces/InterfacesApi";

function CompanyAdminTable(): JSX.Element{
    const [activateFilterEffect, setFilterEffectActivation] = useState<boolean>(false);
    const [activateRemovalEffect, setActivateRemovalEffect] = useState<boolean>(false);
    const [filter, setFilter] = useState<ICompanyAdminFilter>({
        name: '',
        phone: '',
        email: '',
        company:'',
        status: UserStatus.works
    });
    function fetcher(pageNumber: number){
        return getCompanyAdmins(pageNumber);
    }

    const columns: Column[] = [
        {name: 'Name', property: 'name', percent: 20},
        {name: 'Phone', property: 'phoneNumber', percent: 15},
        {name: 'Email', property: 'email', percent: 30},
        {name: 'Company', property: 'companyName', percent: 25},
        {name: 'Status', property: 'status', percent: 10},
    ]
    const classes = useStyles();

    return <>
        <Grid item container direction={'row'} justifyContent={'center'} className={`${classes.mt} ${classes.mb}`}>
            <Grid item xs={10}>
                <Typography variant={'h4'} color={'primary'}>
                    Company administrators:
                </Typography>
            </Grid>
        </Grid>
        <Grid item container direction={'row'} justifyContent={'center'}>
            <Grid item xs={10}>
                <CompanyAdminFilter setFilter={setFilter} filter={filter}/>
            </Grid>
        </Grid>
        <Grid item container direction={'row'} justifyContent={'center'}>
            <Grid item xs={10}>
                <AdvancedReusableTable
                    fetcher={fetcher}
                    tableCellHeight={60}
                    columns={columns}
                    actionColumns={[]}
                />
            </Grid>
        </Grid>
    </>
}

export default CompanyAdminTable;
