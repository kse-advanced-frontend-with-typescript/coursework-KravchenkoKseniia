import React from 'react';
import styles from './styles.module.css';
import {Header} from '../Header/Header';
// import {BigQuote} from '../BigQuote/BigQuote';
// import {SaveButton} from '../SaveButton/SaveButton';
// import {Toolbar} from '../Toolbar/Toolbar';
import {LoginForm} from '../LoginForm/LoginForm';
import {NotificationElement} from '../NotificationElement/NotificationElement';

export const Display = () => {
    return (

            <div className={styles.phone}>

                <div className={styles.content}>
                    <Header />
                    {/*<BigQuote />*/}
                    {/*<SaveButton />*/}

                    <LoginForm onSub={() => {}} isDis={false} />
                    <NotificationElement message={'error'} level='error' />
                </div>

                {/*<Toolbar />*/}
            </div>
    );
};
