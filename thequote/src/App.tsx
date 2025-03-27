import React from 'react';
import styles from './main.module.css';
// import {Link, Route, Routes} from 'react-router';
// import {AppContext} from "./context";
// import {initUserAPI, User} from "./modules/clients/user";
import {Display} from './Components/Display/Display';
// import {initQuoteAPI} from './modules/clients/quote';


export const App: React.FC = () => {
    // const [context, setContext] = useState<{ user?: User }>({});
    // const userAPI = initUserAPI(process.env.API_KEY ?? '', fetch);
    //
    // return <>
    //
    // </>
    return (
        <div className={styles.app}>
            <Display />
        </div>
    );

};