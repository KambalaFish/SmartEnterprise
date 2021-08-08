import React from "react";
import {Button, Container, FormControl, Grid, InputLabel, Paper, Select, TextField, Typography} from "@material-ui/core";
import {useStyles} from "../includes/styles";
import {ContactOld} from "./ContactOld";
import {ParagraphHeader} from "../includes/ParagraphHeader";
import {useForm, Controller, SubmitHandler, DeepMap, FieldError} from "react-hook-form";
import {ICompanyCreation, Contact as ContactInt} from "../../../../utils/Interfaces/InterfacesApi";
import {yupResolver} from '@hookform/resolvers/yup';
import {companyFormValidationSchema} from "../../../../utils/ValidationSchemas/CompanyValidations/companyFormValidationSchema";
import api from '../../../../utils/Api';

export function CompanyCreationTest(): JSX.Element{
    const classes = useStyles();


    const {register, handleSubmit, control, formState: {errors} } = useForm<ICompanyCreation>({
        resolver: yupResolver(companyFormValidationSchema)
    });

    const onSubmit: SubmitHandler<ICompanyCreation> = (data: ICompanyCreation) => {
        api()
            .createCompany(data)
            .then( (value) => alert(value.response))
            .catch((reason) => alert('Error message: '+reason.response.error));
    }

    interface ContactBox{
        contactHeader: string,
        name: string;
    }
    const contacts: ContactBox[] = [
        {contactHeader: 'Administrator contact:', name: 'admin'},
        {contactHeader: 'IT head contact:', name: 'itHead'},
        {contactHeader: 'Customer manager contact:', name: 'customerManager'}
    ];


    // function mapContacts(){
    //     return contacts.map(value => {
    //         const name = value.name;
    //         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //         // @ts-ignore
    //         const error = errors[name];
    //         let allRequired = '';
    //         const firstNameReq = error?.firstName?.type == 'required';
    //         const lastNameReq = error?.lastName?.type == 'required';
    //         const emailReq = error?.email?.type == 'required';
    //         const phoneReq = error?.phone?.type == 'required';
    //         if (firstNameReq || lastNameReq || emailReq || phoneReq){
    //             allRequired = firstNameReq? (error?.firstName?.message as string) : allRequired;
    //             allRequired = lastNameReq? (error?.lastName?.message as string) : allRequired;
    //             allRequired = emailReq? (error?.email?.message as string) : allRequired;
    //             allRequired = phoneReq? (error?.phone?.message as string) : allRequired;
    //             return (<React.Fragment key={name}>
    //                 <ParagraphHeader headerText={value.contactHeader}/>
    //                 <ContactOld
    //                     who={name}
    //                     register={register}
    //                     firstNameError={Boolean(error?.firstName)}
    //                     firstNameMessage={''}
    //                     lastNameError={Boolean(error?.lastName?.message)}
    //                     lastNameMessage={''}
    //                     emailError={Boolean(error?.email)}
    //                     emailErrorMessage={''}
    //                     phoneError={Boolean(error?.phone)}
    //                     phoneErrorMessage={''}
    //                     allRequired={allRequired}
    //                 />
    //             </React.Fragment>)
    //         }
    //         return (<React.Fragment key={name}>
    //             <ParagraphHeader headerText={value.contactHeader}/>
    //             <ContactOld
    //                 who={name}
    //                 register={register}
    //                 firstNameError={Boolean(error?.firstName)}
    //                 firstNameMessage={error?.firstName?.message}
    //                 lastNameError={Boolean(error?.lastName?.message)}
    //                 lastNameMessage={error?.lastName?.message}
    //                 emailError={Boolean(error?.email)}
    //                 emailErrorMessage={error?.email?.message}
    //                 phoneError={Boolean(error?.phone)}
    //                 phoneErrorMessage={error?.phone?.message}
    //             />
    //         </React.Fragment>)
    //     });
    // }

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

                                {/*{mapContacts()}*/}

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



// https://stackoverflow.com/questions/57086672/element-implicitly-has-an-any-type-because-expression-of-type-string-cant-b
// function hasKey<O>(obj: O, key: PropertyKey): key is keyof O {
//     return key in obj
// }
//
// function mapContacts() {
//     return contacts.map(value => {
//         const name = value.name;
//         if (hasKey(errors, name)) {
//             const error = errors[name] as DeepMap<ContactInt, FieldError>;
//             let allRequired = '';
//             const firstNameReq: boolean = error?.firstName?.type == 'required';
//             const lastNameReq = error?.lastName?.type == 'required';
//             const emailReq = error?.email?.type == 'required';
//             const phoneReq = error?.phone?.type == 'required';
//             if (firstNameReq || lastNameReq || emailReq || phoneReq) {
//                 allRequired = firstNameReq ? (error?.firstName?.message as string) : allRequired;
//                 allRequired = lastNameReq ? (error?.lastName?.message as string) : allRequired;
//                 allRequired = emailReq ? (error?.email?.message as string) : allRequired;
//                 allRequired = phoneReq ? (error?.phone?.message as string) : allRequired;
//                 return (<React.Fragment key={name}>
//                     <ParagraphHeader headerText={value.contactHeader}/>
//                     <ContactOld
//                         who={name}
//                         register={register}
//                         firstNameError={Boolean(error?.firstName)}
//                         firstNameMessage={''}
//                         lastNameError={Boolean(error?.lastName?.message)}
//                         lastNameMessage={''}
//                         emailError={Boolean(error?.email)}
//                         emailErrorMessage={''}
//                         phoneError={Boolean(error?.phone)}
//                         phoneErrorMessage={''}
//                         allRequired={allRequired}
//                     />
//                 </React.Fragment>)
//             }
//             return (<React.Fragment key={name}>
//                 <ParagraphHeader headerText={value.contactHeader}/>
//                 <ContactOld
//                     who={name}
//                     register={register}
//                     firstNameError={Boolean(error?.firstName)}
//                     firstNameMessage={error?.firstName?.message}
//                     lastNameError={Boolean(error?.lastName?.message)}
//                     lastNameMessage={error?.lastName?.message}
//                     emailError={Boolean(error?.email)}
//                     emailErrorMessage={error?.email?.message}
//                     phoneError={Boolean(error?.phone)}
//                     phoneErrorMessage={error?.phone?.message}
//                 />
//             </React.Fragment>)
//         }
//     })
// }
