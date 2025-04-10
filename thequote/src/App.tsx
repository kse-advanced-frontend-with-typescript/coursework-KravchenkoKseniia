    import React, {useState} from 'react';
    import styles from './main.module.css';
    import {Route, Routes} from 'react-router';
    import {AppContext, Quote} from './context';
    import {initUserAPI, User} from './modules/clients/user';
    import {QuotePage} from './Pages/QuotePage/QuotePage';
    import {SharePage} from './Pages/SharePage/SharePage';
    import {LoginPage} from './Pages/LoginPage/LoginPage';
    import {SettingsPage} from './Pages/SettingsPage/SettingsPage';
    import {initQuoteAPI} from './modules/clients/quote';
    import {SavedQuotesPage} from './Pages/SavedQuotesPage/SavedQuotesPage';
    import {DeleteSavedQuotePage} from './Pages/DeleteSavedQuotePage/DeleteSavedQuotePage';
    import {Loader} from './Components/Loader/Loader';
    import {initCategoriesAPI} from './modules/clients/categories';
    import {IconType} from './Components/IconButton/IconButton';


    export const App: React.FC = () => {
        const [context, setContext] = useState<{ user?: User,
            currentQuote?: Quote,
            lastSavedQuote?: Quote,
            categories?: IconType[]
        }>({});
        const [userFetching, setUserFetching] = useState(false);

        const userAPI = initUserAPI(process.env.API_KEY ?? '', fetch);
        const quoteAPI = initQuoteAPI(process.env.API_KEY ?? '', fetch);
        const categoriesAPI = initCategoriesAPI();

        const setUser = (user: User, categories: IconType[]) => {
            const token = user[0].token;
            userAPI.SaveToken(token);
            categoriesAPI.SaveCategories(categories);

            setContext({
                ...context,
                user,
                categories
            });
        };

        // const setCategories = (categories: IconType[]) => {
        //     categoriesAPI.SaveCategories(categories);
        //
        //     setContext({
        //         ...context,
        //         categories: categories
        //     });
        // };

        const cleanUser = () => {
            setContext({
                ...context,
                user: undefined
            });

            userAPI.CleanToken();
        };

        const cleanCategories = () => {
            setContext({
                ...context,
                categories: []
            });

            categoriesAPI.CleanCategories();
        };

        const setCurrentQuote = (quote: Quote) => {
            setContext({
                ...context,
                currentQuote: quote
            });
        };

        const setLastSavedQuote = (quote: Quote) => {
            setContext({
                ...context,
                lastSavedQuote: quote
            });
        };


        React.useEffect(() => {
            const token = userAPI.RestoreToken();
            if (!token) return;

            setUserFetching(true);

            userAPI.GetUserInfo(token).then(user => {
                const categories = categoriesAPI.RestoreCategories();
                setUser(user, categories);
                console.log(user);
            }).catch(console.error)
                .finally( () =>
                setUserFetching(false)
            );
        }, []);


        return (
            <>
                {userFetching ?
                <Loader isLoading={userFetching} /> :
                    <AppContext.Provider value={{
                        ...context,
                        setUser,
                        cleanUser,
                        setCurrentQuote,
                        setLastSavedQuote,
                        cleanCategories,
                        userAPI,
                        quoteAPI
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
                }
            </>
        );

    };