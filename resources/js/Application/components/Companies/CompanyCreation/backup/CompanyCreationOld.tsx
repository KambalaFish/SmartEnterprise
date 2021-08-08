import React from "react";
import {Button, Container, FormControl, Grid, InputLabel, Paper, Select, TextField, Typography} from "@material-ui/core";
import {useStyles} from "../includes/styles";
import {ContactOld} from "./ContactOld";
import {ParagraphHeader} from "../includes/ParagraphHeader";
import {useForm, Controller, SubmitHandler} from "react-hook-form";
import {ICompanyCreation} from "../../../../utils/Interfaces/InterfacesApi";
import {yupResolver} from '@hookform/resolvers/yup';
import {companyFormValidationSchema} from "../../../../utils/ValidationSchemas/CompanyValidations/companyFormValidationSchema";
import api from '../../../../utils/Api';

export function CompanyCreationOld(): JSX.Element{
    const classes = useStyles();


    const {register, handleSubmit, control, formState: {errors} } = useForm<ICompanyCreation>({
        resolver: yupResolver(companyFormValidationSchema)
    });

    // const onSubmit = (data: ICompanyCreation) => alert(JSON.stringify(data));

    const onSubmit: SubmitHandler<ICompanyCreation> = (data: ICompanyCreation) => {
        console.log('data: ',data);
        api()
            .createCompany(data)
            .then( (value) => alert(value.response))
            .catch((reason) => alert('Error message: '+reason.response.error));
    }

    return(
        <React.Fragment>
            <Grid container direction='column' /*className={classes.borderV2}*/ justify='flex-end' alignItems='center'>
                <Grid item className={classes.mt} xs={3}>
                    <Typography variant='h4' align='center'>
                        Create new company
                    </Typography>
                </Grid>
                <Grid item container xs={8}>
                    <Container maxWidth='md' className={classes.container} component={Paper} elevation={10}>
                        <Grid container direction='column'>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <ParagraphHeader headerText={'General company info:'}/>

                                <Grid item container>
                                    <Grid item xs={3}>
                                        <TextField
                                            id="name"
                                            label="Name"
                                            placeholder='Type company name'
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            {...register('name')}
                                            helperText={errors.name?.message}
                                            error={Boolean(errors.name)}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormControl margin='normal'>
                                            <InputLabel htmlFor={'status'}>Status</InputLabel>
                                            <Controller
                                                control={control}
                                                name='status'
                                                defaultValue='served'
                                                render={
                                                    ({field}) => <Select {...field} native>
                                                        <option value='not served'>not served</option>
                                                        <option value='served'>served</option>
                                                    </Select>
                                                }
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>

                                <Grid item container>
                                    <Grid item xs={3}>
                                        <TextField
                                            id="country"
                                            label="Country"
                                            placeholder='Type company country'
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            {...register('country')}
                                            error={Boolean(errors.country)}
                                            helperText={errors.country?.message}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                            id="city"
                                            label="City"
                                            placeholder='Type company city'
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            {...register('city')}
                                            error={Boolean(errors.city)}
                                            helperText={errors.city?.message}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                            id="address"
                                            label="Address"
                                            placeholder='Type company address'
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            {...register('address')}
                                            error={Boolean(errors.address)}
                                            helperText={errors.address?.message}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                            id="zip"
                                            label="ZIP"
                                            placeholder='Type company zip code'
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            {...register("zipCode")}
                                            error={Boolean(errors.zipCode)}
                                            helperText={errors.zipCode?.message}
                                        />
                                    </Grid>
                                </Grid>

                                <ParagraphHeader headerText={'Administrator contact:'}/>
                                <ContactOld
                                    who={'admin'}
                                    register={register}
                                    firstNameError={Boolean(errors.admin?.firstName)}
                                    firstNameMessage={errors.admin?.firstName?.message}
                                    lastNameError={Boolean(errors.admin?.lastName?.message)}
                                    lastNameMessage={errors.admin?.lastName?.message}
                                    emailError={Boolean(errors.admin?.email)}
                                    emailErrorMessage={errors.admin?.email?.message}
                                    phoneError={Boolean(errors.admin?.phone)}
                                    phoneErrorMessage={errors.admin?.phone?.message}
                                />

                                <ParagraphHeader headerText={'IT head contact:'}/>
                                <ContactOld
                                    who={'itHead'}
                                    register={register}
                                    firstNameError={Boolean(errors.itHead?.firstName)}
                                    firstNameMessage={errors.itHead?.firstName?.message}
                                    lastNameError={Boolean(errors.itHead?.lastName?.message)}
                                    lastNameMessage={errors.itHead?.lastName?.message}
                                    emailError={Boolean(errors.itHead?.email)}
                                    emailErrorMessage={errors.itHead?.email?.message}
                                    phoneError={Boolean(errors.itHead?.phone)}
                                    phoneErrorMessage={errors.itHead?.phone?.message}
                                />

                                <ParagraphHeader headerText={'Customer manager contact:'}/>
                                <ContactOld
                                    who={'customerManager'}
                                    register={register}
                                    firstNameError={Boolean(errors.customerManager?.firstName)}
                                    firstNameMessage={errors.customerManager?.firstName?.message}
                                    lastNameError={Boolean(errors.customerManager?.lastName?.message)}
                                    lastNameMessage={errors.customerManager?.lastName?.message}
                                    emailError={Boolean(errors.customerManager?.email)}
                                    emailErrorMessage={errors.customerManager?.email?.message}
                                    phoneError={Boolean(errors.customerManager?.phone)}
                                    phoneErrorMessage={errors.customerManager?.phone?.message}
                                />

                                <Button className={classes.mt} variant="contained" color='secondary' type='submit'>
                                    Create
                                </Button>
                            </form>
                        </Grid>
                    </Container>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
