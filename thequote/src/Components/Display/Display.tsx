import React from 'react';
import styles from './styles.module.css';
import {StatusBar} from "../StatusBar/StatusBar";
import {Header} from "../Header/Header";

export const Display = () => {
    return (
        <div className={styles.display}>
            <div className={styles.phone}>
                <StatusBar />
                <Header />
            </div>
        </div>
    );
};
