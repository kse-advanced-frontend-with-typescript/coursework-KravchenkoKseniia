import React from 'react';
import styles from './styles.module.css';


interface SaveButtonProps {
    onClick?: () => void
}

export const SaveButton = ({onClick}: SaveButtonProps) => {
    return (
        <div className={styles.container}>
            <button className={styles.btn}>SAVE</button>
        </div>
    );
};
