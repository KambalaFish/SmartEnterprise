import React from "react";
import {CssBaseline} from "@material-ui/core";
import {Switch} from 'react-router-dom';
import SignIn from "./components/Auth/SignIn/SignIn";
import {spaPaths} from "./utils/utils";
import {MainLayout} from "./components/Reusable/Layout/MainLayout/MainLayout";
import Home from "./components/Home/Home";
import CompanyCreationReduxVersion from "./components/Companies/CompanyCreation/ReduxVersion/CompanyCreationReduxVersion";
import {CompanyUpdateReduxVersion} from "./components/Companies/CompanyUpdate/ReduxVersion/CompanyUpdateReduxVersion";
import CompanyCreation from "./components/Companies/CompanyCreation/CompanyCreation";
import CompanyInfo from "./components/Companies/CompanyInfo/CompanyInfo";
import PrivateRoute from "./utils/CustomRoutes/PrivateRoute";
import {ProvideAuth} from "./components/Auth/Authentication";
import UnloggedRoute from "./utils/CustomRoutes/UnloggedRoute";
import Profile from "./components/Profile/Profile";
import CompanyAdminCreation from "./components/Staff/CompanyAdmin/Creation/CompanyAdminCreation/CompanyAdminCreation";
import SelectedCompanyAdminCreation from "./components/Staff/CompanyAdmin/Creation/SelectedCompanyAdminCreation/SelectedCompanyAdminCreation";
import CompanyAdminTable from "./components/Staff/CompanyAdmin/CompanyAdminTable/CompanyAdminTable";
import CompanyAdminUpdate from "./components/Staff/CompanyAdmin/Update/CompanyAdminUpdate";
import CompanyTable from "./components/Companies/CompanyTable/CompanyTable";
import CompanyUpdate from "./components/Companies/CompanyUpdate/CompanyUpdate";

function App(): JSX.Element {
    return (
        <ProvideAuth>
            <CssBaseline/>
            <Switch>
                <UnloggedRoute path={spaPaths.signIn} component={SignIn}/>
                <MainLayout>
                    <PrivateRoute exact path={spaPaths.allCompanies} component={CompanyTable}/>
                    <PrivateRoute exact path={spaPaths.companyCreation} component={CompanyCreation}/>
                    <PrivateRoute exact path={spaPaths.companyUpdatePath} component={CompanyUpdate}/>
                    <PrivateRoute exact path={spaPaths.companyInfoPath} component={CompanyInfo}/>
                    <PrivateRoute exact path={spaPaths.profile} component={Profile}/>
                    <PrivateRoute exact path={spaPaths.companyAdminCreation} component={CompanyAdminCreation}/>
                    <PrivateRoute exact path={spaPaths.selectedCompanyAdminCreationPath} component={SelectedCompanyAdminCreation}/>
                    <PrivateRoute exact path={spaPaths.allCompanyAdmins} component={CompanyAdminTable}/>
                    <PrivateRoute exact path={spaPaths.companyAdminUpdatePath} component={CompanyAdminUpdate}/>
                    <PrivateRoute exact path={[spaPaths.home, '/']} component={Home}/>
                </MainLayout>
            </Switch>
        </ProvideAuth>
    );
}

export default App;

// cntrl+a, cntrl+alt+l
// cntrl+shift+n
// windows+alt+f1
// renaming: shift+f6
// cntrl+tab
// cntrl+shift+up/bottom arrows
//cntrl+shift+f
