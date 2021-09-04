import React from "react";
import AppBar from "@material-ui/core/AppBar";
import {Grid, IconButton, MenuItem, Toolbar} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import {CustomMenu} from "../../../utils/navBarUtils/CustomMenu";
import {spaPaths} from "../../../utils/utils";
import {useStyles} from "../../../utils/navBarUtils/styles";
import {useHistory} from "react-router-dom";
import AccountCircle from "@material-ui/icons/AccountCircle";
import HomeIcon from '@material-ui/icons/Home';
import {useAuth} from "../../Auth/Authentication";
import {getCurrentPageIdentifier} from "../../../utils/navBarUtils/currentPageName";
import useMenu from "../../../utils/navBarUtils/useMenu";
import ChipMenu from "../../../utils/navBarUtils/ChipMenu";

export default function SystemAdminNavBar(): JSX.Element {

    const classes = useStyles();
    const history = useHistory();
    const auth = useAuth();
    const {
        menuAnchor: profileMenuAnchor,
        handleMenuClick: handleProfileMenuClick,
        handleMenuClose: handleProfileMenuClose,
        isMenuOpen: isProfileMenuOpen
    } = useMenu();
    const currentPageIdentifier = getCurrentPageIdentifier(history.location.pathname);

    const onProfile = () => {
        history.push(spaPaths.profile, {from: history.location.pathname});
        handleProfileMenuClose();
    }

    const onCompanyCreation = () => {
        history.push(spaPaths.systemAdminPaths.companyCreation, {from: history.location.pathname});
    }

    const onHomeHandle = () => {
        history.push(spaPaths.systemAdminPaths.allCompanies, {from: history.location.pathname});
    }

    const onAllCompanies = () => {
        history.push(spaPaths.systemAdminPaths.allCompanies, {from: history.location.pathname});
    }

    const onLogout = () => {
        auth.signout(
            () => {
                history.replace(spaPaths.signIn);
            }
        );
        handleProfileMenuClose();
    };

    const onCompanyAdminCreation = () => {
        history.push(spaPaths.systemAdminPaths.companyAdminCreation, {from: history.location.pathname});
    }

    const onAllCompanyAdmins = () => {
        history.push(spaPaths.systemAdminPaths.allCompanyAdmins, {from: history.location.pathname});
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Grid item container direction={'row'} alignItems={'center'}>
                    <Grid item>
                        {currentPageIdentifier}
                    </Grid>
                    <Grid item className={classes.fg}/>
                    <Grid item>
                        <ChipMenu
                            label={'Company administrators'}
                            menuItems={[
                                    {label: 'All administrators', onClick: onAllCompanyAdmins},
                                    {label: 'Create administrator', onClick: onCompanyAdminCreation}
                                ]}
                        />
                    </Grid>
                    <Grid item>
                        <ChipMenu
                            label={'Company'}
                            menuItems={[
                                {label: 'All companies', onClick: onAllCompanies},
                                {label: 'Create a company', onClick: onCompanyCreation}
                            ]}
                        />
                    </Grid>

                    <Grid item>
                        <IconButton
                            onClick={onHomeHandle}
                            style={{color: green[500]}}
                        >
                            <HomeIcon/>
                        </IconButton>
                    </Grid>

                    <Grid item>
                        <IconButton
                            onClick={handleProfileMenuClick}
                            color="inherit"
                            style={{marginRight: 5}}
                        >
                            <AccountCircle/>
                        </IconButton>
                        <CustomMenu
                            anchorEl={profileMenuAnchor}
                            open={isProfileMenuOpen}
                            onClose={handleProfileMenuClose}
                        >
                            <MenuItem onClick={onProfile}>Profile</MenuItem>
                            <MenuItem onClick={onLogout}>Log out</MenuItem>
                        </CustomMenu>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}
