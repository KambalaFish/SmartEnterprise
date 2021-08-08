import React, {useState} from 'react';
import {Avatar, Box, Button, Grid, Link, Typography} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {useStyles} from "./includes/styles";
import {Copyright} from "./includes/Copyright";
import {useHistory} from "react-router-dom";
import {spaPaths} from "../../../utils/utils";
import {useAuth} from "../Authentication";
import Alert from '@material-ui/lab/Alert';
import {useForm, SubmitHandler} from "react-hook-form";
import {Credentials} from "../../../utils/Interfaces/InterfacesApi";
import {yupResolver} from "@hookform/resolvers/yup";
import {loginFormValidationSchema} from "../../../utils/ValidationSchemas/LoginValidations/loginFormValidationSchema";
import {Controller} from "react-hook-form";

export default function SignIn(): JSX.Element {
    const classes = useStyles();
    const auth = useAuth();
    const [alert, setAlert] = useState<string | null>(null);
    const history = useHistory();
    const {handleSubmit, control, formState: {errors}} = useForm<Credentials>({
        resolver: yupResolver(loginFormValidationSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<Credentials> = (data: Credentials) => {
        auth
            .signin(data, () => {
                history.replace(spaPaths.home);
            })
            .catch((reason) => {
                console.log('signin reason: ', reason);
                setAlert(reason.error);
                setTimeout(() => {
                    setAlert(null);
                }, 10000)
            })
    }

    return (
        <Grid container direction={"column"}>
            {alert &&
            <Alert variant={'filled'} severity={'error'} onClose={() => setAlert(null)}>{alert}</Alert>
            }
            <Grid container direction={'row'} component="main" className={classes.root}>
                <Grid item sm={6} md={9} className={classes.image}/>
                <Grid item xs={12} sm={6} md={3} component={Paper} elevation={24} square={false}>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                            <Controller name={'email'} control={control} render={
                                ({field}) =>
                                    <TextField
                                        {...field}
                                        variant="outlined"
                                        margin="normal"
                                        // required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        autoComplete="email"
                                        autoFocus
                                        helperText={errors.email?.message}
                                        error={!!errors.email} //equivalent error={Boolean(errors.email)}
                                    />
                            }
                            />
                            <Controller name={'password'} control={control} render={
                                ({field}) =>
                                    <TextField
                                        {...field}
                                        variant="outlined"
                                        margin="normal"
                                        // required
                                        fullWidth
                                        // name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        helperText={errors.password?.message}
                                        error={!!errors.password}
                                    />
                            }
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#forget" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#sign-up" variant="body2">
                                        {"Don't have an account? Sign Up!"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Box mt={5}>
                                <Copyright/>
                            </Box>
                        </form>
                    </div>
                </Grid>
            </Grid>
        </Grid>
    );
}
