import React from "react";
import {
    Button,
    Grid,
    TextField
} from "@material-ui/core";
import {ParagraphHeader} from "../../../Reusable/Headers/ParagraphHeader/ParagraphHeader";
import {Controller} from "react-hook-form";
import {Contact} from "./includes/Contact";
import {useStyles} from "./includes/styles";
import {CompanyFormProps} from "../../../../utils/Interfaces/PropsInterfaces";

export function CompanyForm({handleSubmit, errors, control, onSubmit, buttonName}: CompanyFormProps): JSX.Element{
    const classes = useStyles();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <ParagraphHeader headerText={'General company info:'}/>
            <Grid item container direction={'row'} spacing={2}>
                <Grid item xs={5}>
                    <Controller
                        control={control}
                        name={'name'}
                        render={
                            ({field}) =>
                                <TextField
                                    {...field}
                                    variant={'outlined'}
                                    size={'small'}
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
                <Grid item xs={5}>
                    <Controller
                        control={control}
                        name={'address'}
                        render={
                            ({field}) =>
                                <TextField
                                    {...field}
                                    variant={'outlined'}
                                    size={'small'}
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

            <Grid item container direction={'row'} spacing={2}>
                <Grid item xs={3}>
                    <Controller
                        control={control}
                        name={'country'}
                        render={
                            ({field}) =>
                                <TextField
                                    {...field}
                                    variant={'outlined'}
                                    size={'small'}
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
                                    variant={'outlined'}
                                    size={'small'}
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
                                    variant={'outlined'}
                                    size={'small'}
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
                                    fullWidth
                                    variant={'outlined'}
                                    size={'small'}
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
                who={'mainAdminContact'}
                control={control}
                firstNameError={!!errors.mainAdminContact?.firstName}
                firstNameMessage={errors.mainAdminContact?.firstName?.message}
                lastNameError={!!errors.mainAdminContact?.lastName?.message}
                lastNameMessage={errors.mainAdminContact?.lastName?.message}
                emailError={!!errors.mainAdminContact?.email}
                emailErrorMessage={errors.mainAdminContact?.email?.message}
                phoneError={!!errors.mainAdminContact?.phoneNumber}
                phoneErrorMessage={errors.mainAdminContact?.phoneNumber?.message}
            />

            <ParagraphHeader headerText={'IT head contact:'}/>
            <Contact
                who={'itDepartmentContact'}
                control={control}
                firstNameError={!!errors.itDepartmentContact?.firstName}
                firstNameMessage={errors.itDepartmentContact?.firstName?.message}
                lastNameError={!!errors.itDepartmentContact?.lastName?.message}
                lastNameMessage={errors.itDepartmentContact?.lastName?.message}
                emailError={!!errors.itDepartmentContact?.email}
                emailErrorMessage={errors.itDepartmentContact?.email?.message}
                phoneError={!!errors.itDepartmentContact?.phoneNumber}
                phoneErrorMessage={errors.itDepartmentContact?.phoneNumber?.message}
            />

            <ParagraphHeader headerText={'Customer manager contact:'}/>
            <Contact
                who={'customerManagerContact'}
                control={control}
                firstNameError={!!errors.customerManagerContact?.firstName}
                firstNameMessage={errors.customerManagerContact?.firstName?.message}
                lastNameError={!!errors.customerManagerContact?.lastName?.message}
                lastNameMessage={errors.customerManagerContact?.lastName?.message}
                emailError={!!errors.customerManagerContact?.email}
                emailErrorMessage={errors.customerManagerContact?.email?.message}
                phoneError={!!errors.customerManagerContact?.phoneNumber}
                phoneErrorMessage={errors.customerManagerContact?.phoneNumber?.message}
            />

            <Grid item container direction={'row'} xs={12} spacing={2} justifyContent={'center'} className={classes.mt}>
                <Grid item xs={2}>
                    <Button variant={'contained'} type={"submit"} color={'secondary'}>{buttonName}</Button>
                </Grid>
            </Grid>
        </form>
    );
}
