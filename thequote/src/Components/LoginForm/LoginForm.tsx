import React, {FormEventHandler} from 'react';
import styles from './styles.module.css';
import {Button} from '../Button/Button';

type LoginFormProps = {
    onSub:  FormEventHandler<HTMLFormElement>;
    isDis?: boolean;
    loginRef: React.RefObject<HTMLInputElement>;
    passwordRef: React.RefObject<HTMLInputElement>;
};

export const LoginForm: React.FC<LoginFormProps> = ({onSub, isDis, loginRef, passwordRef}) => {
    return (
        <div className={styles.container}>
            <form onSubmit={onSub} className={styles.form}>
                <div className={styles.login}>
                    <label className={styles.label}>Username</label>
                    <input type="text" className={styles.input} ref={loginRef} />
                </div>
                <div className={styles.password}>
                    <label className={styles.label}>Password</label>
                    <input type="password" className={styles.input} ref={passwordRef} />
                </div>
                <Button title={'Login'} isDisabled={isDis} />
            </form>
        </div>
    );
};
