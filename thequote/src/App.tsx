import React from 'react';
import styles from './main.module.css';
import {Link, Route, Router, Routes} from 'react-router';
// import {AppContext} from "./context";
// import {initUserAPI, User} from "./modules/clients/user";
import {Display} from './Components/Display/Display';
import {LoginPage} from "./Pages/LoginPage/LoginPage";
import {SettingsPage} from "./Pages/SettingsPage/SettingsPage";
// import {initQuoteAPI} from './modules/clients/quote';


export const App: React.FC = () => {
    // const [context, setContext] = useState<{ user?: User }>({});
    // const userAPI = initUserAPI(process.env.API_KEY ?? '', fetch);
    //
    // return <>
    //
    // </>
    // return (
    //     <div className={styles.app}>
    //         <Display />
    //     </div>
    // );

    return (
        <div className={styles.content}>
            {/*<Link to='/login'>pypypy</Link>*/}
            <Routes>
                <Route index element={<SettingsPage />}/>
                <Route path="login" element={<p>123</p>}/>
                <Route path="add" element={<p>Changed</p>}/>
            </Routes>
        </div>
    )

};

// Context with categories
// Save quote