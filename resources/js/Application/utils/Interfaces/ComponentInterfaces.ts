import {AuthenticatedUser, Credentials, ErrorBody, UserStatus} from "./InterfacesApi";

export type ClickableButton = (arg: never) => JSX.Element;
export type Action = { clickableButton: ClickableButton, targetProperty: string};
export type useProvideAuthType = {
    user: AuthenticatedUser,
    signin: (creds: Credentials,cb: (user: AuthenticatedUser)=>void) => Promise<ErrorBody|boolean>,
    signout: (cb: () => void) => Promise<ErrorBody|boolean>,
}
export interface CompanyAdminFormDefaultValues{
    name: string;
    phoneNumber: string;
    status: UserStatus;
    email: string;
}
