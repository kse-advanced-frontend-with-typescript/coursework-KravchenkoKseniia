import React from 'react';
import ReactDOM, {Container} from 'react-dom/client';
import styles from './main.css';
import {initUserAPI} from './modules/clients/user';
const App: React.FC = () => {
    const a: string = 'World!';
    initUserAPI(process.env.API_KEY ?? '', fetch).getUserToken('user', 'user').then(r => console.log(r));
    return <div className={styles.text}>Hello, world! {a}</div>;
};

const root = ReactDOM.createRoot(
    document.getElementById('root') as Container
);

//
root.render(<App />);
