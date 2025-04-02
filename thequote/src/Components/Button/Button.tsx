import React from 'react';
import styles from './styles.module.css';


interface ButtonProps {
    title: string,
    onClick?: () => void,
    isDisabled?: boolean
}

export const Button = ({onClick, title = 'SAVE', isDisabled}: ButtonProps) => {
    return (
        // <div className={styles.container}>
            <button onClick={onClick} className={styles.btn} disabled={isDisabled}>{title}</button>
        // </div>
    );
};
