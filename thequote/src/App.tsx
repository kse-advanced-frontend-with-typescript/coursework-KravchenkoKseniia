import React, {useEffect, useState} from 'react';
import styles from './main.module.css';
import {Link, Route, Router, Routes} from 'react-router';
import {AppContext} from "./context";
import {initUserAPI, User} from "./modules/clients/user";
import {QuotePage} from "./Pages/QuotePage/QuotePage";
// import {SharePage} from "./Pages/SharePage/SharePage";
import {LoginPage} from "./Pages/LoginPage/LoginPage";
import {SettingsPage} from "./Pages/SettingsPage/SettingsPage";
import {initQuoteAPI} from './modules/clients/quote';


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
    //
    // useEffect(() => {
    //     const token = userAPI.RestoreToken();
    //     if (!token) return;
    //
    //     userAPI.(token).then(user => {
    //         setUser(user);
    //     }).catch(console.error);
    // }, []);


    return (
        <>
            <AppContext.Provider value={{
                ...context,
                setUser,
                userAPI,
                quoteAPI
            }}>
                <div className={styles.app}>
                    <div className={styles.content}>
                        {/*<Link to='/login'>pypypy</Link>*/}
                        <Routes>
                            <Route index element={<QuotePage/>}/>
                            <Route path="login" element={<LoginPage/>}/>
                            {/*<Route path="settings" element={<SettingsPage/>}/>*/}
                            {/*<Route path="share" element={<SharePage/>}/>*/}
                            {/*<Route path="save" element={<SavedQuotesPage/>}/>*/}
                        </Routes>
                    </div>
                </div>
            </AppContext.Provider>
        </>
    );

};