    import React, {useState} from 'react';
    import styles from './main.module.css';
    import {Route, Routes} from 'react-router';
    import {AppContext} from './context';
    import {initUserAPI, User} from './modules/clients/user';
    import {QuotePage} from './Pages/QuotePage/QuotePage';
    import {SharePage} from "./Pages/SharePage/SharePage";
    import {LoginPage} from './Pages/LoginPage/LoginPage';
    import {SettingsPage} from './Pages/SettingsPage/SettingsPage';
    import {initQuoteAPI} from './modules/clients/quote';
    import {SavedQuotesPage} from './Pages/SavedQuotesPage/SavedQuotesPage';
    import {DeleteSavedQuotePage} from './Pages/DeleteSavedQuotePage/DeleteSavedQuotePage';


    export const App: React.FC = () => {
        const [context, setContext] = useState<{ user?: User }>({});

        const userAPI = initUserAPI(process.env.API_KEY ?? '', fetch);
        const quoteAPI = initQuoteAPI(process.env.API_KEY ?? '', fetch);

        const setUser = (user: User) => {
            const token = user[0].token;
            userAPI.SaveToken(token);

            setContext({
                ...context,
                user
            });
        };

        const cleanUser = () => {
            setContext({
                ...context,
                user: undefined
            });

            userAPI.CleanToken();
        };

        React.useEffect(() => {
            const token = userAPI.RestoreToken();
            if (!token) return;

            userAPI.GetUserInfo(token).then(user => {
                setUser(user);
            }).catch(console.error);
        }, []);


        return (
            <>
                <AppContext.Provider value={{
                    ...context,
                    setUser,
                    cleanUser,
                    userAPI,
                    quoteAPI,
                    categories: context.user && context.user.length > 0 ? context.user[0].categories || [] : []
                }}>
                    <div className={styles.app}>
                        <div className={styles.content}>
                            <Routes>
                                <Route index element={<QuotePage/>}/>
                                <Route path="login" element={<LoginPage/>}/>
                                <Route path="settings" element={<SettingsPage/>}/>
                                <Route path="share" element={<SharePage/>}/>
                                <Route path="save" element={<SavedQuotesPage/>}/>
                                <Route path="share-or-delete/:quoteId" element={<DeleteSavedQuotePage/>}/>
                            </Routes>
                        </div>
                    </div>
                </AppContext.Provider>
            </>
        );

    };