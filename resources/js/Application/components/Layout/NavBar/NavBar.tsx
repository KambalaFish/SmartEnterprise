import React from "react";
import AppBar from "@material-ui/core/AppBar";
import {Chip, IconButton, MenuItem, Toolbar} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import {CustomMenu} from "./includes/CustomMenu";
import {spaPaths} from "../../../utils/utils";
import {useStyles} from "./includes/styles";
import {useHistory} from "react-router-dom";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import AccountCircle from "@material-ui/icons/AccountCircle";
import HomeIcon from '@material-ui/icons/Home';
import {useAuth} from "../../Auth/Authentication";
import {getCurrentPageIdentifier} from "./includes/currentPageName";

export default function NavBar (): JSX.Element {

    const classes = useStyles();
    const history = useHistory();
    const [profileAnchor, setProfileAnchor] = React.useState<null | HTMLElement>(null);
    const [administrationAnchor, setAdminAnchor] = React.useState<null | HTMLElement>(null);
    const profileOpen = !!profileAnchor;
    const adminOpen = !!administrationAnchor;

    const handleProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
        setProfileAnchor(event.currentTarget);
    };
    const handleProfileMenuClose = () => {
        setProfileAnchor(null);
    };
    const handleProfile = () => {
        history.push(spaPaths.profile);
        handleProfileMenuClose();
    }
    const handleCompanyCreation = () => {
        history.push(spaPaths.companyCreation);
        handleAdministrationClose();
    }
    const handleCompanyInfo = () => {
        const id = 1;
        history.push(`${spaPaths.companyInfo}${id}`);
        handleAdministrationClose();
    }
    const onHomeHandle = () => {
        history.push(spaPaths.home);
    }

    const handleAdministration = (event: React.MouseEvent<HTMLElement>) => {
        setAdminAnchor(event.currentTarget);
    };
    const handleAdministrationClose = () => {
        setAdminAnchor(null);
    };

    const onAllCompanies = () => {
        history.push(spaPaths.allCompanies);
        handleAdministrationClose();
    }

    const auth = useAuth();

    const handleLogout = () => {
        handleProfileMenuClose();
        auth.signout(
            ()=>{
                history.replace(spaPaths.signIn);
            }
        )
    };

    const currentPageIdentifier = getCurrentPageIdentifier(history.location.pathname);

    return (
        <div className={classes.root}>
            <AppBar position="static" style={{margin: 0}}>
                <Toolbar>
                    {currentPageIdentifier}
                    <div className={classes.title}/>
                    <div>
                        <Chip
                            label="Company menu"
                            onClick={handleAdministration}
                            icon={<ExpandMoreRoundedIcon/>}
                        />
                        <CustomMenu
                            anchorEl={administrationAnchor}
                            open={adminOpen}
                            onClose={handleAdministrationClose}
                        >
                            <MenuItem onClick={onAllCompanies}>All companies</MenuItem>
                            <MenuItem onClick={handleCompanyCreation}>Create a company</MenuItem>
                            <MenuItem onClick={handleCompanyInfo}>Company info</MenuItem>
                        </CustomMenu>

                        <IconButton
                            onClick={onHomeHandle}
                            style={{ color: green[500] }}
                        >
                            <HomeIcon/>
                        </IconButton>

                        <IconButton
                            onClick={handleProfileMenu}
                            color="inherit"
                            style={{marginRight: 5}}
                        >
                            <AccountCircle />
                        </IconButton>
                        <CustomMenu
                            anchorEl={profileAnchor}
                            open={profileOpen}
                            onClose={handleProfileMenuClose}
                        >
                            <MenuItem onClick={handleProfile}>Profile</MenuItem>
                            <MenuItem onClick={handleLogout}>Log out</MenuItem>
                        </CustomMenu>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
