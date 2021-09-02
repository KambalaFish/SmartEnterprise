import React from "react";
import AppBar from "@material-ui/core/AppBar";
import {Chip, Grid, IconButton, MenuItem, Toolbar} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import {CustomMenu} from "../../../utils/navBarUtils/CustomMenu";
import {spaPaths} from "../../../utils/utils";
import {useStyles} from "../../../utils/navBarUtils/styles";
import {useHistory} from "react-router-dom";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import AccountCircle from "@material-ui/icons/AccountCircle";
import HomeIcon from '@material-ui/icons/Home';
import {useAuth} from "../../Auth/Authentication";
import {getCurrentPageIdentifier} from "../../../utils/navBarUtils/currentPageName";
import useMenu from "../../../utils/navBarUtils/useMenu";

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
    const {
        menuAnchor: companyMenuAnchor,
        handleMenuClick: handleCompanyMenuClick,
        handleMenuClose: handleCompanyMenuClose,
        isMenuOpen: isCompanyMenuOpen
    } = useMenu();
    const {
        menuAnchor: staffMenuAnchor,
        handleMenuClick: handleStaffMenuClick,
        handleMenuClose: handleStaffMenuClose,
        isMenuOpen: isStaffMenuOpen
    } = useMenu();
    const currentPageIdentifier = getCurrentPageIdentifier(history.location.pathname);

    const onProfile = () => {
        history.push(spaPaths.profile, {from: history.location.pathname});
        handleProfileMenuClose();
    }

    const onCompanyCreation = () => {
        history.push(spaPaths.companyCreation, {from: history.location.pathname});
        handleCompanyMenuClose();
    }

    const onHomeHandle = () => {
        history.push(spaPaths.home, {from: history.location.pathname});
    }

    const onAllCompanies = () => {
        history.push(spaPaths.allCompanies, {from: history.location.pathname});
        handleCompanyMenuClose();
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
        history.push(spaPaths.companyAdminCreation, {from: history.location.pathname});
        handleStaffMenuClose();
    }

    const onAllCompanyAdmins = () => {
        history.push(spaPaths.allCompanyAdmins, {from: history.location.pathname});
        handleStaffMenuClose();
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
                        <Chip
                            label={'Company administrators'}
                            onClick={handleStaffMenuClick}
                            icon={<ExpandMoreRoundedIcon/>}
                            style={{marginRight: 10}}
                        />
                        <CustomMenu
                            anchorEl={staffMenuAnchor}
                            open={isStaffMenuOpen}
                            onClose={handleStaffMenuClose}
                        >
                            <MenuItem onClick={onAllCompanyAdmins}>All administrators</MenuItem>
                            <MenuItem onClick={onCompanyAdminCreation}>Create administrator</MenuItem>
                        </CustomMenu>
                    </Grid>
                    <Grid item>
                        <Chip
                            label={"Company"}
                            onClick={handleCompanyMenuClick}
                            icon={<ExpandMoreRoundedIcon/>}
                        />
                        <CustomMenu
                            anchorEl={companyMenuAnchor}
                            open={isCompanyMenuOpen}
                            onClose={handleCompanyMenuClose}
                        >
                            <MenuItem onClick={onAllCompanies}>All companies</MenuItem>
                            <MenuItem onClick={onCompanyCreation}>Create a company</MenuItem>
                        </CustomMenu>
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
