import {BigQuote} from '../../Components/BigQuote/BigQuote';
import {Header} from '../../Components/Header/Header';
import {AppContext} from '../../context';
import {useNavigate, useParams} from 'react-router';
import React, {useEffect} from 'react';
import {NotificationElement} from '../../Components/NotificationElement/NotificationElement';
import {Button} from '../../Components/Button/Button';
import styles from './styles.module.css';

export const DeleteSavedQuotePage: React.FC = () => {
    const navigate = useNavigate();
    const context = React.useContext(AppContext);
    const [quote, setQuote] = React.useState<{content: string, author: string} | null>(null);
    const [isProcessing, setIsProcessing] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string>();
    const [deleteNotification, setDeleteNotification] = React.useState<{level: 'error' | 'success' | 'info' | 'warning', message: string} | null>(null);

    const {quoteId} = useParams();

    useEffect(() => {
        if (quoteId) {
            const [quote, author] = quoteId.split('-');
            setQuote({content: decodeURIComponent(quote), author: decodeURIComponent(author)});
            setIsProcessing(false);
        }
        else {
            setError('Quote not found');
            setIsProcessing(false);
        }
    }, [quoteId]);

    const deleteSavedQuoteHandleClick = async () => {
        if (!context.quoteAPI) {
            setDeleteNotification({level: 'error', message: 'Quote API is not available'});
            return;
        }

        if (!context.user) {
            setDeleteNotification({level: 'error', message: 'User not found'});
            return;
        }

        if (!quote) {
            setError('No quote to delete!');
            return;
        }

        try {
            await context.quoteAPI.DeleteSavedQuote(quote.content, quote.author);
            setDeleteNotification({level: 'success', message: 'Successfully deleted!'});
            navigate('/save');
        }
        catch (e) {
            setError('Error during deleting the quote');
        }
    };

    const backToSavedQuotesHandleClick = () => {
        navigate('/save');
    };

    return (
        <>
            <Header title='THE SAVED QUOTE'/>
            {deleteNotification && <NotificationElement level={deleteNotification.level} message={deleteNotification.message} />}
            { isProcessing && <NotificationElement level={'info'} message={'Loading...'}/>}
            { error && <NotificationElement level='error' message={`Error: ${error}`}/>}
            {quote &&
                <>
                    <div className={styles.quoteContainer}>
                        <BigQuote quote={quote.content} author={quote.author}/>
                    </div>
                    <div className={styles.container}>
                        <Button title={'BACK'} type={'default'} onClick={backToSavedQuotesHandleClick} />
                        <Button title={'DELETE'} type={'inverse'} onClick={deleteSavedQuoteHandleClick}/>
                        {/*<Button title={'SHARE'} type={'default'} onClick={shareSavedQuoteHandleClick} />*/}
                    </div>
                </>
            }
        </>
    );
};