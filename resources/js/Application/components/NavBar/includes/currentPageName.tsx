import React from "react";
import {spaPaths} from "../../../utils/utils";
import {Chip} from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import CreateIcon from '@material-ui/icons/Create';
import InfoIcon from '@material-ui/icons/Info';
import {SupervisorAccount} from "@material-ui/icons";

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
        case spaPaths.companyAdminCreation:
            currentPageName = 'Company admin creation';
            icon = <CreateIcon/>;
            break;
        case spaPaths.allCompanyAdmins:
            currentPageName = 'Company administrators';
            icon = <SupervisorAccount/>
            break;
        default:
            currentPageName = 'default'
            if (/^\/company\/[\d]+\/about\/?$/g.test(pathname)) {
                currentPageName = 'Company info';
                icon = <InfoIcon/>;
            }
            if (/^\/company\/[\d]+\/update\/?$/g.test(pathname)) {
                currentPageName = 'Company update';
                icon = <CreateIcon/>;
            }
            if (/^\/company\/[\d]+\/admin\/creation\/?$/g.test(pathname)){
                currentPageName = 'Company admin creation';
                icon = <CreateIcon/>;
            }
            if (/^\/company\/admin\/[\d]+\/update\/?$/g.test(pathname)){
                currentPageName = 'Company admin update';
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
