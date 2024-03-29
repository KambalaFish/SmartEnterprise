import React from "react";
import {Redirect, Route, RouteProps} from "react-router-dom";
import {RouteComponentProps} from "react-router";
import {UserType} from "../Interfaces/InterfacesApi";
import {useAuth} from "../../components/Auth/Authentication";


/**
 * Роут, на который можно перейти, только если пользователь не авторизован.
 */

export default function UnloggedRoute(props: RouteProps): JSX.Element {
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
                            return <Component {...routeProps} />;
                        default:
                            return <Redirect
                                to={{
                                    pathname: '/',
                                    state: {from: routeProps.location},
                                }}
                            />;
                    }
                }
            }
        />
    );
}


// export default function UnloggedRoute(props: RouteProps): JSX.Element {
//     const {component: Component, ...rest} = props as {component: React.ComponentType<RouteComponentProps>};
//     //const Component: React.ComponentType<RouteComponentProps<any>> = props.component as React.ComponentType<RouteComponentProps<any>>;
//
//     const role = authService().getUserRole();
//
//     return (
//         <Route
//             {...rest}
//             render={(routeProps): React.ReactNode =>
//                 role == UserRole.Unauthenticated ? (
//                     <Component {...routeProps} />
//                 ) : (
//                     <Redirect
//                         to={{
//                             pathname: "/home",
//                             state: { from: routeProps.location },
//                         }}
//                     />
//                 )
//             }
//         />
//     );
// }
