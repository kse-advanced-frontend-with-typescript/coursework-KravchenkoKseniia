import React from 'react';
import ReactDOM, {Container} from 'react-dom/client';
import styles from './main.css';
const App: React.FC = () => {
    const a: string = 'World!';
    return <div className={styles.text}>Hello, world! {a}</div>;
};

const root = ReactDOM.createRoot(
    document.getElementById('root') as Container
);

//
root.render(<App />);
