import {AuthenticatedUser, Credentials, ErrorBody} from "./InterfacesApi";

export type ClickableButton = (arg: never) => JSX.Element;
export type Action = { clickableButton: ClickableButton, targetProperty: string};
export type useProvideAuthType = {
    user: AuthenticatedUser,
    signin: (creds: Credentials,cb: ()=>void) => Promise<ErrorBody|boolean>,
    signout: (cb: () => void) => Promise<ErrorBody|boolean>,
}
