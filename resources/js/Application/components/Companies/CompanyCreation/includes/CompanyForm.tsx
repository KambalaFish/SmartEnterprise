import React from "react";
import {
    Button,
    Container,
    Grid,
    Paper,
    TextField
} from "@material-ui/core";
import {ParagraphHeader} from "./ParagraphHeader";
import {Controller} from "react-hook-form";
import {Contact} from "./Contact";
import {useStyles} from "./styles";
import {CompanyFormProps} from "../../../../utils/Interfaces/PropsInterfaces";

export function CompanyForm({handleSubmit, errors, control, onSubmit, buttonName}: CompanyFormProps): JSX.Element{
    const classes = useStyles();

    return (
        <Container maxWidth='md' className={classes.container} component={Paper} elevation={10}>
            <Grid container direction='column'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ParagraphHeader headerText={'General company info:'}/>
                    <Grid item container direction={'row'}>
                        <Grid item xs={5}>
                            <Controller
                                control={control}
                                name={'name'}
                                render={
                                    ({field}) =>
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label={'Name'}
                                            placeholder={'Type company name'}
                                            margin={'normal'}
                                            InputLabelProps={{shrink: true}}
                                            helperText={errors.name?.message}
                                            error={!!errors.name}
                                        />
                                }
                            />
                        </Grid>
                        <Grid item xs={1}/>
                        <Grid item xs={5}>
                            <Controller
                                control={control}
                                name={'address'}
                                render={
                                    ({field}) =>
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Address"
                                            placeholder='Type company address'
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            error={!!errors.address}
                                            helperText={errors.address?.message}
                                        />
                                }
                            />
                        </Grid>
                    </Grid>

                    <Grid item container>
                        <Grid item xs={3}>
                            <Controller
                                control={control}
                                name={'country'}
                                render={
                                    ({field}) =>
                                        <TextField
                                            {...field}
                                            label="Country"
                                            placeholder='Type company country'
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            error={!!errors.country}
                                            helperText={errors.country?.message}
                                        />
                                }
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Controller
                                control={control}
                                name={'city'}
                                render={
                                    ({field}) =>
                                        <TextField
                                            {...field}
                                            label="City"
                                            placeholder='Type company city'
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            error={!!errors.city}
                                            helperText={errors.city?.message}
                                        />
                                }
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Controller
                                control={control}
                                name={'zipCode'}
                                render={
                                    ({field}) =>
                                        <TextField
                                            {...field}
                                            label="ZIP"
                                            placeholder='Type company zip code'
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            error={!!errors.zipCode}
                                            helperText={errors.zipCode?.message}
                                        />
                                }
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Controller
                                control={control}
                                name='status'
                                render={
                                    ({field}) =>
                                        <TextField
                                            {...field}
                                            margin={'normal'}
                                            label={'Status'}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            select
                                            SelectProps={{native: true}}
                                        >
                                            <option value='not served'>not served</option>
                                            <option value='served'>served</option>
                                        </TextField>
                                }
                            />
                        </Grid>
                    </Grid>

                    <ParagraphHeader headerText={'Administrator contact:'}/>
                    <Contact
                        who={'admin'}
                        control={control}
                        firstNameError={!!errors.admin?.firstName}
                        firstNameMessage={errors.admin?.firstName?.message}
                        lastNameError={!!errors.admin?.lastName?.message}
                        lastNameMessage={errors.admin?.lastName?.message}
                        emailError={!!errors.admin?.email}
                        emailErrorMessage={errors.admin?.email?.message}
                        phoneError={!!errors.admin?.phone}
                        phoneErrorMessage={errors.admin?.phone?.message}
                    />

                    <ParagraphHeader headerText={'IT head contact:'}/>
                    <Contact
                        who={'itHead'}
                        control={control}
                        firstNameError={!!errors.itHead?.firstName}
                        firstNameMessage={errors.itHead?.firstName?.message}
                        lastNameError={!!errors.itHead?.lastName?.message}
                        lastNameMessage={errors.itHead?.lastName?.message}
                        emailError={!!errors.itHead?.email}
                        emailErrorMessage={errors.itHead?.email?.message}
                        phoneError={!!errors.itHead?.phone}
                        phoneErrorMessage={errors.itHead?.phone?.message}
                    />

                    <ParagraphHeader headerText={'Customer manager contact:'}/>
                    <Contact
                        who={'customerManager'}
                        control={control}
                        firstNameError={!!errors.customerManager?.firstName}
                        firstNameMessage={errors.customerManager?.firstName?.message}
                        lastNameError={!!errors.customerManager?.lastName?.message}
                        lastNameMessage={errors.customerManager?.lastName?.message}
                        emailError={!!errors.customerManager?.email}
                        emailErrorMessage={errors.customerManager?.email?.message}
                        phoneError={!!errors.customerManager?.phone}
                        phoneErrorMessage={errors.customerManager?.phone?.message}
                    />

                    <Button className={classes.mt} size={'small'} variant="contained" color='secondary' type='submit'>
                        {buttonName}
                    </Button>
                </form>
            </Grid>
        </Container>
    );
}


// import React from "react";
// import {
//     Button,
//     Container,
//     FormControl,
//     Grid,
//     InputLabel,
//     Paper,
//     Select,
//     TextField
// } from "@material-ui/core";
// import {ParagraphHeader} from "./ParagraphHeader";
// import {Controller} from "react-hook-form";
// import {Contact} from "./Contact";
// import {useStyles} from "./styles";
// import {CompanyFormProps} from "../../../../utils/Interfaces/PropsInterfaces";
//
// export function CompanyForm({handleSubmit, errors, control, onSubmit, buttonName}: CompanyFormProps): JSX.Element{
//     const classes = useStyles();
//
//     return (
//         <Container maxWidth='md' className={classes.container} component={Paper} elevation={10}>
//             <Grid container direction='column'>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <ParagraphHeader headerText={'General company info:'}/>
//                     <Grid item container>
//                         <Grid item xs={3}>
//                             <Controller
//                                 control={control}
//                                 name={'name'}
//                                 render={
//                                     ({field}) =>
//                                     <TextField
//                                         {...field}
//                                         label={'Name'}
//                                         placeholder={'Type company name'}
//                                         margin={'normal'}
//                                         InputLabelProps={{shrink: true}}
//                                         helperText={errors.name?.message}
//                                         error={!!errors.name}
//                                     />
//                                 }
//                             />
//                         </Grid>
//                         <Grid item xs={3}>
//                             <FormControl margin='normal'>
//                                 <InputLabel htmlFor={'status'}>Status</InputLabel>
//                                 <Controller
//                                     control={control}
//                                     name='status'
//                                     render={
//                                         ({field}) => <Select {...field} native>
//                                             <option value='not served'>not served</option>
//                                             <option value='served'>served</option>
//                                         </Select>
//                                     }
//                                 />
//                             </FormControl>
//                         </Grid>
//                     </Grid>
//
//                     <Grid item container>
//                         <Grid item xs={3}>
//                             <Controller
//                                 control={control}
//                                 name={'country'}
//                                 render={
//                                     ({field}) =>
//                                         <TextField
//                                             {...field}
//                                             label="Country"
//                                             placeholder='Type company country'
//                                             margin="normal"
//                                             InputLabelProps={{
//                                                 shrink: true,
//                                             }}
//                                             error={!!errors.country}
//                                             helperText={errors.country?.message}
//                                         />
//                                 }
//                             />
//                         </Grid>
//                         <Grid item xs={3}>
//                             <Controller
//                                 control={control}
//                                 name={'city'}
//                                 render={
//                                     ({field}) =>
//                                         <TextField
//                                             {...field}
//                                             label="City"
//                                             placeholder='Type company city'
//                                             margin="normal"
//                                             InputLabelProps={{
//                                                 shrink: true,
//                                             }}
//                                             error={!!errors.city}
//                                             helperText={errors.city?.message}
//                                         />
//                                 }
//                             />
//                         </Grid>
//                         <Grid item xs={3}>
//                             <Controller
//                                 control={control}
//                                 name={'address'}
//                                 render={
//                                     ({field}) =>
//                                         <TextField
//                                             {...field}
//                                             label="Address"
//                                             placeholder='Type company address'
//                                             margin="normal"
//                                             InputLabelProps={{
//                                                 shrink: true,
//                                             }}
//                                             error={!!errors.address}
//                                             helperText={errors.address?.message}
//                                         />
//                                 }
//                             />
//                         </Grid>
//                         <Grid item xs={3}>
//                             <Controller
//                                 control={control}
//                                 name={'zipCode'}
//                                 render={
//                                     ({field}) =>
//                                         <TextField
//                                             {...field}
//                                             label="ZIP"
//                                             placeholder='Type company zip code'
//                                             margin="normal"
//                                             InputLabelProps={{
//                                                 shrink: true,
//                                             }}
//                                             error={!!errors.zipCode}
//                                             helperText={errors.zipCode?.message}
//                                         />
//                                 }
//                             />
//                         </Grid>
//                     </Grid>
//
//                     <ParagraphHeader headerText={'Administrator contact:'}/>
//                     <Contact
//                         who={'admin'}
//                         control={control}
//                         firstNameError={!!errors.admin?.firstName}
//                         firstNameMessage={errors.admin?.firstName?.message}
//                         lastNameError={!!errors.admin?.lastName?.message}
//                         lastNameMessage={errors.admin?.lastName?.message}
//                         emailError={!!errors.admin?.email}
//                         emailErrorMessage={errors.admin?.email?.message}
//                         phoneError={!!errors.admin?.phone}
//                         phoneErrorMessage={errors.admin?.phone?.message}
//                     />
//
//                     <ParagraphHeader headerText={'IT head contact:'}/>
//                     <Contact
//                         who={'itHead'}
//                         control={control}
//                         firstNameError={!!errors.itHead?.firstName}
//                         firstNameMessage={errors.itHead?.firstName?.message}
//                         lastNameError={!!errors.itHead?.lastName?.message}
//                         lastNameMessage={errors.itHead?.lastName?.message}
//                         emailError={!!errors.itHead?.email}
//                         emailErrorMessage={errors.itHead?.email?.message}
//                         phoneError={!!errors.itHead?.phone}
//                         phoneErrorMessage={errors.itHead?.phone?.message}
//                     />
//
//                     <ParagraphHeader headerText={'Customer manager contact:'}/>
//                     <Contact
//                         who={'customerManager'}
//                         control={control}
//                         firstNameError={!!errors.customerManager?.firstName}
//                         firstNameMessage={errors.customerManager?.firstName?.message}
//                         lastNameError={!!errors.customerManager?.lastName?.message}
//                         lastNameMessage={errors.customerManager?.lastName?.message}
//                         emailError={!!errors.customerManager?.email}
//                         emailErrorMessage={errors.customerManager?.email?.message}
//                         phoneError={!!errors.customerManager?.phone}
//                         phoneErrorMessage={errors.customerManager?.phone?.message}
//                     />
//
//                     <Button className={classes.mt} variant="contained" color='secondary' type='submit'>
//                         {buttonName}
//                     </Button>
//                 </form>
//             </Grid>
//         </Container>
//     );
// }
