import React from "react";
import {AppBar, Grid, IconButton, MenuItem, Toolbar} from "@material-ui/core";
import {getCurrentPageIdentifier} from "../../../utils/navBarUtils/currentPageName";
import {useHistory} from "react-router-dom";
import {useStyles} from "../../../utils/navBarUtils/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import {CustomMenu} from "../../../utils/navBarUtils/CustomMenu";
import useMenu from "../../../utils/navBarUtils/useMenu";
import {spaPaths} from "../../../utils/utils";
import {useAuth} from "../../Auth/Authentication";
import {green} from "@material-ui/core/colors";
import HomeIcon from "@material-ui/icons/Home";
import ChipMenu from "../../../utils/navBarUtils/ChipMenu";

function CompanyAdminNavBar(): JSX.Element {
    const history = useHistory();
    const auth = useAuth();
    const currentPageIdentifier = getCurrentPageIdentifier(history.location.pathname);
    const classes = useStyles();
    const {
        menuAnchor: profileMenuAnchor,
        handleMenuClick: handleProfileMenuClick,
        handleMenuClose: handleProfileMenuClose,
        isMenuOpen: isProfileMenuOpen
    } = useMenu();

    const onProfile = () => {
        history.push(spaPaths.profile, {from: history.location.pathname});
        handleProfileMenuClose();
    }

    const onLogout = () => {
        auth.signout(
            () => {
                history.replace(spaPaths.signIn);
            }
        );
        handleProfileMenuClose();
    };

    const onHomeHandle = () => {
        history.push(spaPaths.home, {from: history.location.pathname});
    }
    const onAllRoles = () => history.push(spaPaths.companyAdminPaths.allRoles, {from: history.location.pathname});
    return (
        <AppBar position={'static'}>
            <Toolbar>
                <Grid item container direction={'row'} alignItems={'center'}>
                    <Grid item>
                        {currentPageIdentifier}
                    </Grid>

                    <Grid item className={classes.fg}/>

                    <Grid item>
                        <ChipMenu
                            label={'Roles'}
                            menuItems={[
                                {label: 'All roles', onClick: onAllRoles},
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

export default CompanyAdminNavBar;
