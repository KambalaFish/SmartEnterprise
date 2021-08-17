import React, {createContext, useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import {AuthenticatedUser, Credentials, ErrorBody, UserType} from "../../utils/Interfaces/InterfacesApi";
import api from "../../utils/Api";
import {useProvideAuthType} from "../../utils/Interfaces/ComponentInterfaces";

const unauthenticatedUser: AuthenticatedUser = {
    id: -1,
    name: 'init',
    phoneNumber: 'initphone',
    email: 'init@init.init',
    usertype: UserType.Unauthenticated,
    roles: []
}

const USERSTORAGE = 'user';
const SESSIONWASEXPIRED = 'sessionwasexpired';

const authContext = createContext<useProvideAuthType>(
    {
        user: unauthenticatedUser,
        signin: (creds, cb: () => void) => {return Promise.reject({error: `Initial signin`})},
        signout: (cb: () => void) => {return Promise.reject({error: `Initial signout`})}
    }
)

export function useAuth(): useProvideAuthType {
    return useContext(authContext);
}

export function ProvideAuth({children}: { children: JSX.Element[] }): JSX.Element {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>
        {children}
    </authContext.Provider>
}

function getUserFromLocalStorage(): AuthenticatedUser{
    const storageVal = localStorage.getItem(USERSTORAGE);
    if (!storageVal){
        return unauthenticatedUser;
    }
    return JSON.parse(storageVal) as AuthenticatedUser;
}

function setUserToLocalStorage(user: AuthenticatedUser){
    localStorage.setItem(USERSTORAGE, JSON.stringify(user));
}

export function removeUserFromLocalStorage(): void{
    localStorage.removeItem(USERSTORAGE);
}

export function setSessionWasExpired(): void{
    localStorage.setItem(SESSIONWASEXPIRED, 'true');
}

export function wasSessionExpired(): boolean{
    return localStorage.getItem(SESSIONWASEXPIRED) === 'true';
}

export function removeSessionExpiration(): void{
    localStorage.removeItem(SESSIONWASEXPIRED);
}

function useProvideAuth(): useProvideAuthType {

    const [user, setUser] = useState<AuthenticatedUser>(getUserFromLocalStorage());
    const history = useHistory();

    //signin should redirect to page corresponding to user role
    const signin = (creds: Credentials,cb: ()=>void): Promise<ErrorBody|boolean> => {
        return api()
            .login(creds)
            .then<boolean|ErrorBody>( ({code, response}) => {
                console.log('signin.then response: ', response, 'code: ', code)
                if (code==200){
                    setUser(response as AuthenticatedUser);
                    setUserToLocalStorage(response as AuthenticatedUser);
                    cb();
                    return true;
                }
                return Promise.reject<ErrorBody>({error: `Error occurred during sign-in. Error code: ${code}. Error message: ${(response as ErrorBody).error}`});
            })
            .catch<ErrorBody>( (reason) => {
                console.log('signin.catch reason: ', reason);
                return Promise.reject({error: `${reason.response.error}. Error code: ${reason.code}`});
            });
    };

    const signout = (cb: () => void): Promise<ErrorBody|boolean> => {
        return api()
            .logout()
            .then<boolean|ErrorBody>(({code,response}) => {
                if (code === 200){
                    setUser(unauthenticatedUser);
                    removeUserFromLocalStorage();
                    cb();
                    return true;
                }
                return Promise.reject<ErrorBody>({error: `Error occurred during sign-in. Error code: ${code}. Error message: ${(response as ErrorBody).error}`});
            })
            .catch<ErrorBody>((reason) => (Promise.reject<ErrorBody>(reason)))
    };

    return {
        user,
        signin,
        signout
    };
}
