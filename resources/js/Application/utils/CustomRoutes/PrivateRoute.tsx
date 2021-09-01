import React from "react";
import {Redirect, Route, RouteProps, useHistory} from "react-router-dom";
import {RouteComponentProps} from "react-router";
import {UserType} from "../Interfaces/InterfacesApi";
import {useAuth} from "../../components/Auth/Authentication";
import {spaPaths} from "../utils";

/**
 * Роут, на который можно перейти, только если пользователь не авторизован.
 */

interface PrivateRoteTestProps{
    systemAdminComponent?: React.ComponentType<RouteComponentProps<any>>,
    companyAdminComponent?: React.ComponentType<RouteComponentProps<any>>,
    managerComponent?: React.ComponentType<RouteComponentProps<any>>,
}

export default function PrivateRoute(props: RouteProps & PrivateRoteTestProps): JSX.Element {

    const {
        systemAdminComponent: SystemAdminComponent,
        companyAdminComponent: CompanyAdminComponent,
        managerComponent: ManagerComponent,
        ...rest
    } = props as {
        systemAdminComponent?: React.ComponentType<RouteComponentProps>,
        companyAdminComponent?: React.ComponentType<RouteComponentProps>,
        managerComponent?: React.ComponentType<RouteComponentProps>,
    };
    //const Component: React.ComponentType<RouteComponentProps<any>> = props.component as React.ComponentType<RouteComponentProps<any>>;

    const auth = useAuth();
    const history = useHistory<{from: string}>();

    function redirectBack(): JSX.Element{
        return <Redirect
            to={{
                pathname: history.location.state.from
            }}
        />;
    }

    return (
        <Route
            {...rest}
            render={
                (routeProps): React.ReactNode => {
                    switch (auth.user.usertype) {
                        case UserType.Unauthenticated:
                            return <Redirect
                                to={{
                                    pathname: spaPaths.signIn,
                                    state: {from: routeProps.location},
                                }}
                            />;
                        case UserType.SystemAdmin:
                            if (SystemAdminComponent)
                                return <SystemAdminComponent {...routeProps} />;
                            return redirectBack();
                        case UserType.CompanyAdmin:
                            if (CompanyAdminComponent)
                                return <CompanyAdminComponent {...routeProps} />;
                            return redirectBack();
                        case UserType.Manager:
                            if (ManagerComponent)
                                return <ManagerComponent {...routeProps} />;
                            return redirectBack();
                    }
                }
            }
        />
    );
}
