import React from 'react';
import styles from './styles.module.css';

type SmallQuoteProps = {
    quote?: string;
    author?: string;
    onClick?: () => void;
}
export const SmallQuote: React.FC<SmallQuoteProps> = ({quote = 'Some  quote', author = 'author', onClick}) => {
    return (
        <div className={styles.container} onClick={onClick}>
            <p className={styles.quote}>&quot;{quote}&quot;</p>
            <p className={styles.author}>- {author}</p>
        </div>
    );
};
