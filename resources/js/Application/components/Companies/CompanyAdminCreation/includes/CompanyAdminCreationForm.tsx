import React, {useState} from "react";
import {Button, Divider, Grid, IconButton, InputAdornment, MenuItem, TextField, Typography} from "@material-ui/core";
import {SubmitHandler, useForm} from "react-hook-form";
import {ErrorBody, StaffCreationResponse, UserStatus} from "../../../../utils/Interfaces/InterfacesApi";
import {useStyles} from "./styles";
import {Controller} from "react-hook-form";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {yupResolver} from "@hookform/resolvers/yup";
import {companyAdminFormValidationSchema} from "../../../../utils/ValidationSchemas/CompanyAdminValidations/companyAdminFormValidationSchema";
import {CompanyAdminForm} from "../../../../utils/Interfaces/InterfacesApi";
import {CompanyAdminCreationFormProps} from "../../../../utils/Interfaces/PropsInterfaces";
import api from "../../../../utils/Api";

function CompanyAdminCreationForm({alert, setAlert, setSuccessMessage, companyId}: CompanyAdminCreationFormProps): JSX.Element {

    const {handleSubmit, control, register, formState: {errors}} = useForm<CompanyAdminForm>({
        resolver: yupResolver(companyAdminFormValidationSchema)
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);

    function handleShowPassword(){
        setShowPassword(!showPassword);
    }

    function handleMouseDownPassword(event: React.MouseEvent<HTMLButtonElement>){
        event.preventDefault();
    }

    const onSubmit: SubmitHandler<CompanyAdminForm> = (data: CompanyAdminForm) => {
        if (data.password != data.passwordConfirmation) {
            if (!alert)
                setAlert("Password and password confirmation don't match");
            return;
        }
        if (alert){
            setAlert(null);
        }
        // console.log('data', {...data, companyId});
        api()
            .createCompanyAdmin({...data, companyId})
            .then(({code, response}) => {
                console.log('code: ', code,' response: ', response);
                if (code==200){
                    setSuccessMessage(`Company admin with ${(response as StaffCreationResponse).email} email was created successfully`);
                } else {
                    setAlert((response as ErrorBody).error);
                }
            })
            .catch((reason) => {
                console.log('companyAdminCreation reason: ', reason);
                setAlert(reason.response.error);
            })
    }
    const ParagraphHeader = ({message}: {message: string;}) => {
        return (
            <Grid item xs={11} className={`${classes.mt} ${classes.mb}`}>
                <Typography variant={'h6'} align={'left'} className={classes.formHeader}>
                    {message}
                </Typography>
                <Divider variant='middle' className={classes.divider}/>
            </Grid>
        );
    }
    const classes = useStyles();
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <ParagraphHeader message={'General info'}/>
            <Grid item xs={12} container direction={'row'} spacing={2} justifyContent={'center'}>
                <Grid item xs={5}>
                    <TextField
                        defaultValue={""}
                        {...register('firstName')}
                        fullWidth
                        label={'First name'}
                        placeholder={'Type first name'}
                        margin={'normal'}
                        InputLabelProps={{shrink: true}}
                        helperText={errors.firstName?.message}
                        error={!!errors.firstName}
                        variant="outlined"
                        size={'small'}
                    />
                </Grid>
                <Grid item xs={5}>
                    <TextField
                        defaultValue={""}
                        {...register('lastName')}
                        fullWidth
                        label={'Last name'}
                        placeholder={'Type last name'}
                        margin={'normal'}
                        InputLabelProps={{shrink: true}}
                        helperText={errors.lastName?.message}
                        error={!!errors.lastName}
                        variant="outlined"
                        size={'small'}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12} container direction={'row'} spacing={2} justifyContent={'center'}>
                <Grid item xs={5}>
                    <TextField
                        defaultValue={""}
                        {...register('phoneNumber')}
                        fullWidth
                        label={'Phone number'}
                        placeholder={'Type phone number'}
                        margin={'normal'}
                        InputLabelProps={{shrink: true}}
                        helperText={errors.phoneNumber?.message}
                        error={!!errors.phoneNumber}
                        variant="outlined"
                        size={'small'}
                    />
                </Grid>
                <Grid item xs={5}>
                    <Controller
                        defaultValue={UserStatus.works}
                        control={control}
                        name={'status'}
                        render={
                            ({field}) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    select
                                    label="Select status"
                                    margin={'normal'}
                                    helperText="Please select status"
                                    variant="outlined"
                                    size={'small'}
                                >
                                    <MenuItem value={UserStatus.works}>
                                        works
                                    </MenuItem>
                                    <MenuItem value={UserStatus.illness}>
                                        illness
                                    </MenuItem>
                                    <MenuItem value={UserStatus.onVacation}>
                                        on vacation
                                    </MenuItem>
                                </TextField>
                            )
                        }
                    />
                </Grid>
            </Grid>
            <ParagraphHeader message={'Credentials'}/>
            <Grid item xs={12} container direction={'row'} spacing={2} justifyContent={'center'}>
                <Grid item xs={5}>
                    <TextField
                        defaultValue={""}
                        {...register('email')}
                        fullWidth
                        label={'Email'}
                        placeholder={'Type email'}
                        margin={'normal'}
                        InputLabelProps={{shrink: true}}
                        helperText={errors.email?.message}
                        error={!!errors.email}
                        variant="outlined"
                        size={'small'}
                    />
                </Grid>
                <Grid item xs={5}/>
            </Grid>
            <Grid item xs={12} container direction={'row'} spacing={2} justifyContent={'center'}>
                <Grid item xs={5}>
                    <TextField
                        defaultValue={""}
                        {...register('password')}
                        fullWidth
                        type={showPassword? 'text' : 'password'}
                        label={'Password'}
                        placeholder={'Type password'}
                        margin={'normal'}
                        InputLabelProps={{shrink: true}}
                        helperText={errors.password?.message}
                        error={!!errors.password}
                        variant="outlined"
                        size={'small'}
                        InputProps={{
                            endAdornment: <InputAdornment position={'end'}>
                                <IconButton
                                    onClick={handleShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge={'end'}
                                >
                                    {showPassword? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                        }}
                    />
                </Grid>
                <Grid item xs={5}>
                    <TextField
                        defaultValue={""}
                        {...register('passwordConfirmation')}
                        fullWidth
                        type={showPassword? 'text' : 'password'}
                        label={'Password confirmation'}
                        placeholder={'Type password again'}
                        margin={'normal'}
                        InputLabelProps={{shrink: true}}
                        helperText={errors.passwordConfirmation?.message}
                        error={!!errors.passwordConfirmation}
                        variant="outlined"
                        size={'small'}
                        InputProps={{
                            endAdornment: <InputAdornment position={'end'}>
                                <IconButton
                                    onClick={handleShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge={'end'}
                                >
                                    {showPassword? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                        }}
                    />
                </Grid>
            </Grid>
            <Grid item container direction={'row'} xs={12} spacing={2} justifyContent={'center'}>
                <Grid item xs={2}>
                    <Button variant={'contained'} type={"submit"} color={'secondary'}>create</Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default CompanyAdminCreationForm;
