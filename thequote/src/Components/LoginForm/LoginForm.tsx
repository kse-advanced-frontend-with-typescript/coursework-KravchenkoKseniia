import React from 'react';
import styles from './styles.module.css';

export const LoginForm = () => {
    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <div className={styles.login}>
                    <label className={styles.label}>Username</label>
                    <input type="text" className={styles.input} />
                </div>
                <div className={styles.password}>
                    <label className={styles.label}>Password</label>
                    <input type="password" className={styles.input} />
                </div>
                <button className={styles.btn}>Login</button>
            </form>
        </div>
    );
};
