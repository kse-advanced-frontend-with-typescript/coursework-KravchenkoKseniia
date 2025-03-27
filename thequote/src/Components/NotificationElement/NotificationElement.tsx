import React from 'react';
import classNames from 'classnames';
import styles from './styles.module.css';

type ErrorElementType = {
    level: 'error' | 'info' | 'warning'
    message: string
}

export const NotificationElement: React.FC<ErrorElementType> = ({ message, level }) => {
    return <div className={classNames(styles.notification, {
        [styles.error]: level === 'error',
        [styles.info]: level === 'info',
        [styles.warning]: level === 'warning'
    })}>{message}</div>;
};