import React from 'react';
import {initUserAPI, User} from './modules/clients/user';
import {IconType} from './Components/IconButton/IconButton';
import {initQuoteAPI} from './modules/clients/quote';

export type Quote = {content: string, author: string} | null;

type AppContext = {
    readonly user?: User
    setUser: (user: User, c: IconType[]) => void
    cleanUser: () => void
    userAPI: ReturnType<typeof initUserAPI>
    quoteAPI?: ReturnType<typeof initQuoteAPI>
    categories?: IconType[]
    currentQuote?: Quote
    setCurrentQuote: (quote: Quote) => void
    lastSavedQuote?: Quote
    setLastSavedQuote: (quote: Quote) => void
    cleanCategories: () => void
}

export const AppContext = React.createContext<AppContext>({
    setUser: (user: User) => {},
    userAPI: {} as ReturnType<typeof initUserAPI>,
    quoteAPI: {} as ReturnType<typeof initQuoteAPI>,
    categories: [],
    cleanUser: () => {},
    currentQuote: undefined,
    setCurrentQuote: (quote: Quote) => {},
    lastSavedQuote: undefined,
    setLastSavedQuote: (quote: Quote) => {},
    cleanCategories: () => {}
});