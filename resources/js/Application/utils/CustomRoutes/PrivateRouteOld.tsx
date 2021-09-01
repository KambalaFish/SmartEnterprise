import React from "react";
import {Route, RouteProps, Redirect} from "react-router-dom";
import {RouteComponentProps} from "react-router";
import {UserType} from "../Interfaces/InterfacesApi";
import {useAuth} from "../../components/Auth/Authentication";
import {spaPaths} from "../utils";

/**
 * Роут, на который можно перейти, только если пользователь не авторизован.
 */

export default function PrivateRouteOld(props: RouteProps): JSX.Element {

    const {component: Component, ...rest} = props as { component: React.ComponentType<RouteComponentProps> };
    //const Component: React.ComponentType<RouteComponentProps<any>> = props.component as React.ComponentType<RouteComponentProps<any>>;

    const auth = useAuth();

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
                        default:
                            return <Component {...routeProps} />;
                    }
                }
            }
        />
    );
}
