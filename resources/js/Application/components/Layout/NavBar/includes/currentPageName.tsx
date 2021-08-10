import React from "react";
import {spaPaths} from "../../../../utils/utils";
import {Chip} from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import CreateIcon from '@material-ui/icons/Create';
import InfoIcon from '@material-ui/icons/Info';

export function getCurrentPageIdentifier(pathname: string): JSX.Element{
    let currentPageName;
    let icon;
    switch (pathname) {
        case spaPaths.home:
            currentPageName = 'Home';
            icon = <HomeIcon/>;
            break;
        case spaPaths.allCompanies:
            currentPageName = 'All companies';
            icon = <AccountBalanceIcon/>;
            break;
        case spaPaths.profile:
            currentPageName = 'Profile';
            icon = <PermIdentityIcon/>;
            break;
        case spaPaths.companyCreation:
            currentPageName = 'Company creation';
            icon = <CreateIcon/>;
            break;
        default:
            currentPageName = 'default'
            if (pathname.includes(spaPaths.companyInfo)) {
                currentPageName = 'Company info';
                icon = <InfoIcon/>;
            }
            if (pathname.includes(spaPaths.companyUpdate)) {
                currentPageName = 'Company update';
                icon = <CreateIcon/>;
            }
            break;
    }
    return <Chip
        style={{marginLeft: 15}}
        color={"secondary"}
        label={currentPageName}
        icon={icon}
    />;
}
