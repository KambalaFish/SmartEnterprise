import React, {useState} from "react";
import {Button, Grid, IconButton, InputAdornment, MenuItem, TextField} from "@material-ui/core";
import {useForm} from "react-hook-form";
import {UserStatus} from "../../../../../../utils/Interfaces/InterfacesApi";
import {Controller} from "react-hook-form";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {yupResolver} from "@hookform/resolvers/yup";
import {companyAdminCreateFormValidationSchema} from "../../../../../../utils/ValidationSchemas/CompanyAdminValidations/companyAdminCreateFormValidationSchema";
import {companyAdminUpdateFormValidationSchema} from "../../../../../../utils/ValidationSchemas/CompanyAdminValidations/companyAdminUpdateFormValidationSchema";
import {IStaffForm} from "../../../../../../utils/Interfaces/InterfacesApi";
import {CompanyAdminFormProps} from "../../../../../../utils/Interfaces/PropsInterfaces";
import {ParagraphHeader} from "../../../../../Reusable/Headers/ParagraphHeader/ParagraphHeader";

function CompanyAdminForm({onSubmit, buttonName, defaultValues, passwordFieldLabel}: CompanyAdminFormProps): JSX.Element {

    const resolver = buttonName == 'create'? companyAdminCreateFormValidationSchema:companyAdminUpdateFormValidationSchema;
    const {handleSubmit, control, formState: {errors}} = useForm<IStaffForm>({
        resolver: yupResolver(resolver),
        defaultValues: {
            ...defaultValues,
            password: '',
            passwordConfirmation: '',
        }
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);

    function handleShowPassword() {
        setShowPassword(!showPassword);
    }

    function handleMouseDownPassword(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <ParagraphHeader headerText={'General info'}/>
            <Grid item xs={12} container direction={'row'} spacing={2} justifyContent={'center'}>
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
                                    placeholder={'Type name'}
                                    margin={'normal'}
                                    InputLabelProps={{shrink: true}}
                                    helperText={errors.name?.message}
                                    error={!!errors.name}
                                />
                        }
                    />
                </Grid>
                <Grid item xs={5}/>
            </Grid>
            <Grid item xs={12} container direction={'row'} spacing={2} justifyContent={'center'}>
                <Grid item xs={5}>
                    <Controller
                        control={control}
                        name={'phoneNumber'}
                        render={
                            ({field}) =>
                                <TextField
                                    {...field}
                                    variant={'outlined'}
                                    size={'small'}
                                    fullWidth
                                    label={'Phone number'}
                                    placeholder={'Type phone number'}
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
                        defaultValue={defaultValues.status}
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
                    <Controller
                        control={control}
                        name={'email'}
                        render={
                            ({field}) =>
                                <TextField
                                    {...field}
                                    variant={'outlined'}
                                    size={'small'}
                                    fullWidth
                                    label={'Email'}
                                    placeholder={'Type email'}
                                    margin={'normal'}
                                    InputLabelProps={{shrink: true}}
                                    helperText={errors.name?.message}
                                    error={!!errors.name}
                                />
                        }
                    />
                </Grid>
                <Grid item xs={5}/>
            </Grid>
            <Grid item xs={12} container direction={'row'} spacing={2} justifyContent={'center'}>
                <Grid item xs={5}>
                    <Controller
                        control={control}
                        name={'password'}
                        render={
                            ({field}) =>
                                <TextField
                                    {...field}
                                    fullWidth
                                    type={showPassword ? 'text' : 'password'}
                                    label={passwordFieldLabel? passwordFieldLabel:'Password'}
                                    placeholder={'Type password'}
                                    margin={'normal'}
                                    InputLabelProps={{shrink: true}}
                                    helperText={buttonName=='create'? errors.password?.message : errors.password? errors.password?.message : 'If you leave these two fields empty, then password will not be changed'}
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
                                                {showPassword ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }}
                                />
                        }
                    />

                </Grid>
                <Grid item xs={5}>
                    <Controller
                        control={control}
                        name={'passwordConfirmation'}
                        render={
                            ({field}) =>
                                <TextField
                                    {...field}
                                    fullWidth
                                    type={showPassword ? 'text' : 'password'}
                                    label={passwordFieldLabel? passwordFieldLabel+' confirmation' : 'Password confirmation'}
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
                                                {showPassword ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }}
                                />
                        }
                    />
                </Grid>
            </Grid>
            <Grid item container direction={'row'} xs={12} spacing={2} justifyContent={'center'}>
                <Grid item xs={2}>
                    <Button variant={'contained'} type={"submit"} color={'secondary'}>{buttonName}</Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default CompanyAdminForm;
