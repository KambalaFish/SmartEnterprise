import React, {useState} from "react";
import {Button, Grid, IconButton, InputAdornment, MenuItem, TextField} from "@material-ui/core";
import {SubmitHandler, useForm} from "react-hook-form";
import {ErrorBody, IStaff, UserStatus} from "../../../../../utils/Interfaces/InterfacesApi";
import {Controller} from "react-hook-form";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {yupResolver} from "@hookform/resolvers/yup";
import {companyAdminFormValidationSchema} from "../../../../../utils/ValidationSchemas/CompanyAdminValidations/companyAdminFormValidationSchema";
import {CompanyAdminForm} from "../../../../../utils/Interfaces/InterfacesApi";
import {CompanyAdminCreationFormProps} from "../../../../../utils/Interfaces/PropsInterfaces";
import api from "../../../../../utils/Api";
import {ParagraphHeader} from "../../../../Reusable/Headers/ParagraphHeader/ParagraphHeader";
function CompanyAdminCreationForm({alert, setAlert, setSuccess, companyId}: CompanyAdminCreationFormProps): JSX.Element {

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
        if (companyId == undefined){
            setAlert('You must choose company before creating company admin');
            return;
        }

        api()
            .createCompanyAdmin({...data, companyId})
            .then(({code, response}) => {
                console.log('code: ', code,' response: ', response);
                if (code==200){
                    setSuccess(`Company admin with ${(response as IStaff).email} email was created successfully`);
                } else {
                    setAlert((response as ErrorBody).error);
                }
            })
            .catch((reason) => {
                console.log('companyAdminCreation reason: ', reason);
                setAlert(reason.response.error);
            })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <ParagraphHeader headerText={'General info'}/>
            <Grid item xs={12} container direction={'row'} spacing={2} justifyContent={'center'}>
                <Grid item xs={5}>
                    <TextField
                        defaultValue={""}
                        {...register('name')}
                        fullWidth
                        label={'Name'}
                        placeholder={'Type name'}
                        margin={'normal'}
                        InputLabelProps={{shrink: true}}
                        helperText={errors.name?.message}
                        error={!!errors.name}
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
                                    label="Status"
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
            <ParagraphHeader headerText={'Credentials'}/>
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
