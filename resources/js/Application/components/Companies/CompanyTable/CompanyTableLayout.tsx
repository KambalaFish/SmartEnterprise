import React, {useState} from "react";
import {Grid, Typography} from "@material-ui/core";
import {CompanyFilter} from "./CompanyFilter/CompanyFilter";
import {ICompanyFilter} from "../../../utils/Interfaces/InterfacesApi";
import {CompanyTable} from "./CompanyTable";
import {useStyles} from "./includes/styles";
export function CompanyTableLayout(): JSX.Element{
    const [companyFilter, setCompanyFilter] = useState<ICompanyFilter>({
        name: '',
        country: '',
        city: '',
        address: '',
        zipCode: '',
        status: 'any'
    });
    const classes = useStyles();

    return (
        <>
            <Grid item container direction={'row'} justifyContent={'center'} className={`${classes.mt} ${classes.mb}`}>
                <Grid item xs={10}>
                    <Typography variant={'h4'} color='primary'>
                        Registered companies:
                    </Typography>
                </Grid>
            </Grid>
            <Grid item container direction={'row'} justifyContent={'center'}>
                <Grid item xs={10}>
                    <CompanyFilter
                        setFilter={setCompanyFilter}
                        companyFilter={companyFilter}
                    />
                </Grid>
            </Grid>
            <Grid item container direction={'row'} justifyContent={'center'}>
                <Grid item xs={10}>
                    <CompanyTable
                        filter={companyFilter}
                        tableCellHeight={75}
                    />
                </Grid>
            </Grid>
        </>
    );
    // return (
    //     <Grid item container direction={'row'} justifyContent={'center'}>
    //         <Grid item className={`${classes.mt} ${classes.mb}`} xs={10}>
    //             <Typography variant={'h4'} color='primary'>Registered companies:</Typography>
    //         </Grid>
    //         <Grid item xs={10}>
    //             <CompanyFilter
    //                 setFilter={setCompanyFilter}
    //                 companyFilter={companyFilter}
    //             />
    //         </Grid>
    //         <Grid item xs={10}>
    //             <CompanyTable
    //                 filter={companyFilter}
    //                 tableCellHeight={75}
    //             />
    //         </Grid>
    //     </Grid>
    // );
}
