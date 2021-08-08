import React from "react";
import {Grid, Typography} from "@material-ui/core";
import {useStyles} from "./includes/styles";
import {useForm, SubmitHandler} from "react-hook-form";
import {ICompanyCreation, ICompanyWithId} from "../../../utils/Interfaces/InterfacesApi";
import {yupResolver} from '@hookform/resolvers/yup';
import {companyFormValidationSchema} from "../../../utils/ValidationSchemas/CompanyValidations/companyFormValidationSchema";
import api from '../../../utils/Api';
import {CompanyForm} from "./includes/CompanyForm";
import {useAppDispatch} from "../../../redux/reduxHooks";
import {removeLastPage} from "../../../redux/slices/companyTableSlice";

export function CompanyCreation(): JSX.Element{
    const classes = useStyles();
    const {handleSubmit, control, formState: {errors} } = useForm<ICompanyCreation>({
        resolver: yupResolver(companyFormValidationSchema),
        defaultValues: {
            name: '',
            status: 'served',
            country: '',
            city: '',
            address: '',
            zipCode: '',
            admin:{
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
            },
            itHead:{
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
            },
            customerManager:{
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
            },
        }
    });
    const dispatch = useAppDispatch();
    const onSubmit: SubmitHandler<ICompanyCreation> = (data: ICompanyCreation) => {
        console.log('data: ',data);
        api()
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
            <Grid item className={classes.mt} xs={3}>
                <Typography variant='h4' align='center'>
                    Create new company
                </Typography>
            </Grid>
            <Grid item container xs={8}>
                <CompanyForm handleSubmit={handleSubmit} control={control} errors={errors} onSubmit={onSubmit} buttonName={'create'}/>
            </Grid>
        </Grid>
    )
}
