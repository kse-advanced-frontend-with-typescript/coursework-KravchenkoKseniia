import React from 'react';
import styles from './styles.module.css';
import {Header} from '../Header/Header';
import {BigQuote} from '../BigQuote/BigQuote';
import {SaveButton} from '../SaveButton/SaveButton';
import {Toolbar} from '../Toolbar/Toolbar';

export const Display = () => {
    return (
        <div className={styles.display}>
            <div className={styles.phone}>

                <div className={styles.content}>
                    <Header />
                    <BigQuote />
                    <SaveButton />
                </div>

                <Toolbar />
            </div>
        </div>
    );
};
