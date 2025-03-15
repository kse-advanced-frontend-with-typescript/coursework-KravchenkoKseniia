import React from 'react';
import styles from './styles.module.css';
import {StatusBar} from "../StatusBar/StatusBar";
import {Header} from "../Header/Header";
import {BigQuote} from "../BigQuote/BigQuote";

export const Display = () => {
    return (
        <div className={styles.display}>
            <div className={styles.phone}>
                <StatusBar />
                <Header />
                <BigQuote />
            </div>
        </div>
    );
};
