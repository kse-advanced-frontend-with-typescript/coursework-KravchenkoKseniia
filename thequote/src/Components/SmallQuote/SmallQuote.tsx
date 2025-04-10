import React from 'react';
import styles from './styles.module.css';

type SmallQuoteProps = {
    quote?: string;
    author?: string;
}
export const SmallQuote: React.FC<SmallQuoteProps> = ({quote = 'Some  quote', author = 'author'}) => {
    return (
        <div className={styles.container}>
            <p className={styles.quote}>&quot;{quote}&quot;</p>
            <p className={styles.author}>- {author}</p>
        </div>
    );
};
