import React from "react";
import {CssBaseline} from "@material-ui/core";
import {Switch} from 'react-router-dom';
import SignIn from "./components/Auth/SignIn/SignIn";
import {spaPaths} from "./utils/utils";
import {MainLayout} from "./components/Reusable/Layout/MainLayout/MainLayout";
import Home from "./components/Home/Home";
import CompanyCreation from "./components/SystemAdmin/Companies/CompanyCreation/CompanyCreation";
import CompanyInfo from "./components/SystemAdmin/Companies/CompanyInfo/CompanyInfo";
import {ProvideAuth} from "./components/Auth/Authentication";
import UnloggedRoute from "./utils/CustomRoutes/UnloggedRoute";
import Profile from "./components/Profile/Profile";
import CompanyAdminCreation from "./components/SystemAdmin/Staff/CompanyAdmin/Creation/CompanyAdminCreation/CompanyAdminCreation";
import SelectedCompanyAdminCreation from "./components/SystemAdmin/Staff/CompanyAdmin/Creation/SelectedCompanyAdminCreation/SelectedCompanyAdminCreation";
import CompanyAdminTable from "./components/SystemAdmin/Staff/CompanyAdmin/CompanyAdminTable/CompanyAdminTable";
import CompanyAdminUpdate from "./components/SystemAdmin/Staff/CompanyAdmin/Update/CompanyAdminUpdate";
import CompanyTable from "./components/SystemAdmin/Companies/CompanyTable/CompanyTable";
import CompanyUpdate from "./components/SystemAdmin/Companies/CompanyUpdate/CompanyUpdate";
import PrivateRoute from "./utils/CustomRoutes/PrivateRoute";
import CompanyAdminHome from "./components/Home/CompanyAdminHome";

function App(): JSX.Element {
    return (
        <ProvideAuth>
            <CssBaseline/>
            <Switch>
                <UnloggedRoute path={spaPaths.signIn} component={SignIn}/>
                <MainLayout>
                    <PrivateRoute exact path={spaPaths.allCompanies} systemAdminComponent={CompanyTable}/>
                    <PrivateRoute exact path={spaPaths.companyCreation} systemAdminComponent={CompanyCreation}/>
                    <PrivateRoute exact path={spaPaths.companyUpdatePath} systemAdminComponent={CompanyUpdate}/>
                    <PrivateRoute exact path={spaPaths.companyInfoPath} systemAdminComponent={CompanyInfo}/>
                    <PrivateRoute exact path={spaPaths.profile}
                                  systemAdminComponent={Profile}
                                  companyAdminComponent={Profile}
                    />
                    <PrivateRoute exact path={spaPaths.companyAdminCreation} systemAdminComponent={CompanyAdminCreation}/>
                    <PrivateRoute exact path={spaPaths.selectedCompanyAdminCreationPath} systemAdminComponent={SelectedCompanyAdminCreation}/>
                    <PrivateRoute exact path={spaPaths.allCompanyAdmins} systemAdminComponent={CompanyAdminTable}/>
                    <PrivateRoute exact path={spaPaths.companyAdminUpdatePath} systemAdminComponent={CompanyAdminUpdate}/>
                    <PrivateRoute exact path={spaPaths.companyAdminUpdatePath} systemAdminComponent={CompanyAdminUpdate}/>
                    <PrivateRoute exact path={[spaPaths.home, '/', '']}
                                  systemAdminComponent={Home}
                                  companyAdminComponent={CompanyAdminHome}
                    />
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
