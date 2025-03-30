import React from 'react';
import {initUserAPI, User} from './modules/clients/user';
import {IconType} from "./Components/IconButton/IconButton";

type AppContext = {
    readonly user?: User
    setUser: (user: User) => void
    userAPI: ReturnType<typeof initUserAPI>
    categories?: IconType[]
}

export const AppContext = React.createContext<AppContext>({
    setUser: (user: User) => {},
    userAPI: {} as ReturnType<typeof initUserAPI>
});