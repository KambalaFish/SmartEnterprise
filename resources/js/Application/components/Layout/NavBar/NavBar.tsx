import React from "react";
import AppBar from "@material-ui/core/AppBar";
import {Chip, IconButton, MenuItem, Toolbar, Typography} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import {CustomMenu} from "./includes/CustomMenu";
import {spaPaths} from "../../../utils/utils";
import {useStyles} from "./includes/styles";
import {useHistory} from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import AccountCircle from "@material-ui/icons/AccountCircle";
import HomeIcon from '@material-ui/icons/Home';
import {useAuth} from "../../Auth/Authentication";

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


    // const handleLogout = () => {
    //     handleProfileMenuClose();
    //     logout()
    //         .then((response)=>{
    //             if (response === true){
    //                 history.replace(spaPaths.signIn);
    //             }
    //         })
    //         .catch((reason) => alert(reason.error));
    // };
    const auth = useAuth();

    const handleLogout = () => {
        handleProfileMenuClose();
        auth.signout(
            ()=>{
                history.replace(spaPaths.signIn);
            }
        )
    };

    const profileIcon = 'profileIcon';
    const adminId = 'adminIcon';

    return (
        <div className={classes.root}>
            <AppBar position="static" style={{margin: 0}}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Photos
                    </Typography>
                    <div>
                        <Chip
                            aria-controls={adminId}
                            aria-haspopup="true"
                            label="Administration"
                            onClick={handleAdministration}
                            icon={<ExpandMoreRoundedIcon/>}
                        />
                        <CustomMenu
                            id={adminId}
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
