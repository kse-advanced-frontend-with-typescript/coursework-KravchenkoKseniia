import React from 'react';
import {initUserAPI, User} from './modules/clients/user';

type AppContext = {
    readonly user?: User
    setUser: (user: User) => void
    userAPI: ReturnType<typeof initUserAPI>
}

export const AppContext = React.createContext<AppContext>({
    setUser: (user: User) => {},
    userAPI: {} as ReturnType<typeof initUserAPI>
});