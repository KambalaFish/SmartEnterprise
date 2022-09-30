import React from "react";
import {Route, RouteProps, Redirect, useHistory} from "react-router-dom";
import {RouteComponentProps} from "react-router";
import {UserType} from "../Interfaces/InterfacesApi";
import {useAuth} from "../../components/Auth/Authentication";
import {spaPaths} from "../utils";

/**
 * Роут, на который можно перейти, только если пользователь не авторизован.
 */

export default function SystemAdminRoute(props: RouteProps): JSX.Element {

    const {component: Component, ...rest} = props as { component: React.ComponentType<RouteComponentProps> };
    //const Component: React.ComponentType<RouteComponentProps<any>> = props.component as React.ComponentType<RouteComponentProps<any>>;

    const auth = useAuth();
    const history = useHistory<{from: string}>();

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
                            return <Component {...routeProps} />;
                        default:
                            return <Redirect
                                to={{
                                    pathname: history.location.state.from
                                }}
                            />
                            // return history.goBack();
                            // return <Redirect
                            //     to={{
                            //         pathname:
                            //     }}
                            // />;
                    }
                }
            }
        />
    );
}
