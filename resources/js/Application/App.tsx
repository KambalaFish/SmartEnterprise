import React from "react";
import {CssBaseline} from "@material-ui/core";
import {Switch} from 'react-router-dom';
import SignIn from "./components/Auth/SignIn/SignIn";
import {spaPaths} from "./utils/utils";
import {Layout} from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import {CompanyCreation} from "./components/Companies/CompanyCreation/CompanyCreation";
import {CompanyUpdate} from "./components/Companies/CompanyUpdate/CompanyUpdate";
import CompanyInfo from "./components/Companies/CompanyInfo/CompanyInfo";
import {CompanyTableLayout} from "./components/Companies/CompanyTable/CompanyTableLayout";
import PrivateRoute from "./utils/CustomRoutes/PrivateRoute";
import {ProvideAuth} from "./components/Auth/Authentication";
import UnloggedRoute from "./utils/CustomRoutes/UnloggedRoute";
import Profile from "./components/Profile/Profile";
import CompanyAdminCreation from "./components/Companies/CompanyAdminCreation/CompanyAdminCreation";

function App(): JSX.Element {
    return (
        <ProvideAuth>
            <CssBaseline/>
            <Switch>
                <UnloggedRoute path={spaPaths.signIn} component={SignIn}/>
                <Layout>
                    <PrivateRoute exact path={spaPaths.allCompanies} component={CompanyTableLayout}/>
                    <PrivateRoute exact path={spaPaths.companyCreation} component={CompanyCreation}/>
                    <PrivateRoute exact path={spaPaths.companyUpdate + ':id'} component={CompanyUpdate}/>
                    <PrivateRoute exact path={spaPaths.companyInfo + ':id'} component={CompanyInfo}/>
                    <PrivateRoute exact path={spaPaths.profile} component={Profile}/>
                    <PrivateRoute exact path={spaPaths.companyAdminCreation} component={CompanyAdminCreation}/>
                    <PrivateRoute exact path={[spaPaths.home, '/']} component={Home}/>
                </Layout>
            </Switch>
        </ProvideAuth>
    );
}
//logout after receiving 401 unautharized, interceptor
export default App;

// cntrl+a, cntrl+alt+l
// cntrl+shift+n
// windows+alt+f1
// renaming: shift+f6
// cntrl+tab
// cntrl+shift+up/bottom arrows
//cntrl+shift+f
