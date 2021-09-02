import React from "react";
import {useAuth} from "../Auth/Authentication";
import {Grid, Paper, Typography} from "@material-ui/core";
import {UserType} from "../../utils/Interfaces/InterfacesApi";
import PageHeader from "../Reusable/Headers/PageHeader/PageHeader";
import {makeStyles} from "@material-ui/core/styles";
import {ParagraphHeader} from "../Reusable/Headers/ParagraphHeader/ParagraphHeader";

export default function Profile(): JSX.Element {
    const {user} = useAuth();

    let usertype;
    switch (user.usertype) {
        case UserType.CompanyAdmin:
            usertype = 'company administrator';
            break;
        case UserType.SystemAdmin:
            usertype = 'system administrator';
            break;
        default:
            usertype = 'undefined usertype';
    }
    const useStyles = makeStyles((theme) => ({
        container: {
            marginTop: theme.spacing(2),
            borderRadius: theme.spacing(3)
        },
        border: {
            border: '1px solid black'
        },
        pl: {
            paddingLeft: theme.spacing(2)
        },
        ml: {
            marginLeft: theme.spacing(3)
        },
        mb: {
            marginBottom: theme.spacing(2),
        }
    }));
    const classes = useStyles();

    return <>
        <PageHeader headerText={'Profile'}/>
        <Grid item xs={4} container direction={'column'} justifyContent={'center'} alignItems={'flex-start'}
              className={classes.container} component={Paper} elevation={12}>
            <Grid item container direction={'row'}>
                <ParagraphHeader headerText={'Identity'}/>
            </Grid>
            <Grid item xs={12} container direction={'row'} className={classes.ml}>
                <Grid item xs={2}>
                    <Typography variant={'h6'} color={'secondary'}>
                        ID: {user.id}
                    </Typography>
                </Grid>
                <Grid item xs={10}>
                    <Typography variant={'h6'} color={'primary'}>
                        Name: {`${user.name}`}
                    </Typography>
                </Grid>
            </Grid>

            <Grid item container direction={'row'}>
                <ParagraphHeader headerText={'Contacts'}/>
            </Grid>
            <Grid item xs={12} container direction={'row'} className={classes.ml}>
                <Grid item xs={6}>
                    <Typography variant={'h6'} color={'primary'}>
                        Phone: {user.phoneNumber}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant={'h6'} color={'primary'}>
                        Email: {user.email}
                    </Typography>
                </Grid>
            </Grid>

            {
                (usertype || user.roles.length > 0) &&
                    <>
                        <Grid item container direction={'row'}>
                            <ParagraphHeader headerText={'Authorities'}/>
                        </Grid>
                        {
                            usertype &&
                            <Grid item xs={12} className={classes.ml}>
                                <Typography variant={'h6'} color={'primary'}>
                                    Usertype: {usertype}
                                </Typography>
                            </Grid>
                        }
                        {user.roles.length > 0 &&
                        <Grid item xs={12} className={`${classes.ml} ${classes.mb}`}>
                            <Typography variant={'h6'} color={'primary'}>
                                Roles: {user.roles.map(role => role.toLowerCase()).join(', ')}
                            </Typography>
                        </Grid>
                        }
                    </>
            }


        </Grid>
    </>
}
