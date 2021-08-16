import React from "react";
import AppBar from "@material-ui/core/AppBar";
import {Chip, IconButton, MenuItem, Toolbar} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import {CustomMenu} from "./includes/CustomMenu";
import {spaPaths} from "../../utils/utils";
import {useStyles} from "./includes/styles";
import {useHistory} from "react-router-dom";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import AccountCircle from "@material-ui/icons/AccountCircle";
import HomeIcon from '@material-ui/icons/Home';
import {useAuth} from "../Auth/Authentication";
import {getCurrentPageIdentifier} from "./includes/currentPageName";
import useMenu from "./includes/useMenu";

export default function NavBar(): JSX.Element {

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
        history.push(spaPaths.profile);
        handleProfileMenuClose();
    }

    const onCompanyCreation = () => {
        history.push(spaPaths.companyCreation);
        handleCompanyMenuClose();
    }

    const onCompanyInfo = () => {
        const id = 1;
        history.push(`${spaPaths.companyInfo}${id}`);
        handleCompanyMenuClose();
    }

    const onHomeHandle = () => {
        history.push(spaPaths.home);
    }

    const onAllCompanies = () => {
        history.push(spaPaths.allCompanies);
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
        history.push(spaPaths.companyAdminCreation);
        handleStaffMenuClose();
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" style={{margin: 0}}>
                <Toolbar>
                    {currentPageIdentifier}
                    <div className={classes.title}/>
                    <div>
                        <Chip
                            label={'Staff'}
                            onClick={handleStaffMenuClick}
                            icon={<ExpandMoreRoundedIcon/>}
                            style={{marginRight: 10}}
                        />
                        <CustomMenu
                            anchorEl={staffMenuAnchor}
                            open={isStaffMenuOpen}
                            onClose={handleStaffMenuClose}
                        >
                            <MenuItem onClick={onCompanyAdminCreation}>Create company admin</MenuItem>
                        </CustomMenu>
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
                            <MenuItem onClick={onCompanyInfo}>Company info</MenuItem>
                        </CustomMenu>

                        <IconButton
                            onClick={onHomeHandle}
                            style={{color: green[500]}}
                        >
                            <HomeIcon/>
                        </IconButton>

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
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}