import React from 'react';
import styles from './styles.module.css';

type BigQuoteProps = {
    quote?: string;
    author?: string;
}
export const BigQuote: React.FC<BigQuoteProps> = ({quote = 'Some  quote', author = 'author'}) => {
    return (
        <div className={styles.container}>
            <p className={styles.quote}>&quot;{quote}&quot;</p>
            <p className={styles.author}>- {author}</p>
        </div>
    );
};
