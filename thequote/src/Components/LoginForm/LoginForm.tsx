import React, {FormEventHandler} from 'react';
import styles from './styles.module.css';

type LoginFormProps = {
    onSub:  FormEventHandler<HTMLFormElement>;
    isDis?: boolean;
};

export const LoginForm: React.FC<LoginFormProps> = ({onSub, isDis}) => {
    return (
        <div className={styles.container}>
            <form onSubmit={onSub} className={styles.form}>
                <div className={styles.login}>
                    <label className={styles.label}>Username</label>
                    <input type="text" className={styles.input} />
                </div>
                <div className={styles.password}>
                    <label className={styles.label}>Password</label>
                    <input type="password" className={styles.input} />
                </div>
                <button disabled={isDis} className={styles.btn}>Login</button>
            </form>
        </div>
    );
};
