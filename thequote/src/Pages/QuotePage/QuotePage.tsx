import {Toolbar, ToolbarType} from '../../Components/Toolbar/Toolbar';
import {BigQuote} from '../../Components/BigQuote/BigQuote';
import {Header} from '../../Components/Header/Header';
import {AppContext} from '../../context';
import {useLocation, useNavigate} from 'react-router';
import React from 'react';
import {NotificationElement} from '../../Components/NotificationElement/NotificationElement';
import {Button} from '../../Components/Button/Button';
import styles from './styles.module.css';

export const QuotePage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const context = React.useContext(AppContext);
    const [quote, setQuote] = React.useState<{content: string, author: string} | null>(null);
    const [isProcessing, setIsProcessing] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string>();

    const [saveNotification, setSaveNotification] = React.useState<{level: 'error' | 'success' | 'info' | 'warning', message: string} | null>(null);
    const [savedQuotes, setSavedQuotes] = React.useState<{content: string, author: string}[]>([]);

    const fetchQuote = async () => {
        setError('');
        setIsProcessing(true);

        if (!context.quoteAPI) {
            setError('Quote API is not available');
            setIsProcessing(false);
            return;
        }

        const categories = context.categories && context.categories.length > 0 ?
            context.categories : [];

        try {
            const quoteData = await context.quoteAPI.GetQuote(categories);

            if (quoteData && quoteData.length > 0) {
                const {content, author} = quoteData[0];
                setQuote({content, author});
            }
            else {
                console.error('No quote found');
                setError('No quote found');
            }
        } catch (error) {
            console.error('Error fetching quote:', error);
            setError('Error fetching quote');
        } finally {
            setIsProcessing(false);
        }

    };

    const saveQuoteHandleClick = async () => {
        if (!context.quoteAPI) {
            setSaveNotification({level: 'error', message: 'Quote API is not available'});
            return;
        }

        if (!context.user) {
            setSaveNotification({level: 'error', message: 'User not found'});
            return;
        }

        if (!quote){
            setSaveNotification({level: 'error', message: 'No quote to save'});
            return;
        }

        if (savedQuotes.some(savedQuote => savedQuote.content === quote.content && savedQuote.author === quote.author)) {
            setSaveNotification({level: 'info', message: 'Quote already saved'});
            return;
        }

        try {
            const savedQuote = await context.quoteAPI.PostSavedQuote(
                context.user[0].username,
                quote.content,
                quote.author
            );

            console.log(savedQuote);
            setSavedQuotes([...savedQuotes, quote]);
            setSaveNotification({level: 'success', message: 'Quote saved successfully'});
        }
        catch (e) {
            console.error('Error saving quote:', e);
            setSaveNotification({level: 'error', message: 'Error saving quote'});
        }
    };

    React.useEffect(() => {
        if (saveNotification) {
            const timer = setTimeout(() => setSaveNotification(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [saveNotification]);

    const handleToolbarClick = (tab: ToolbarType) => {
        let route : string;
        switch (tab.page) {
            case 'Settings':
                route = '/settings';
                break;
            case 'Saved quotes':
                route = '/save';
                break;
            case 'Shared with':
                route = '/share';
                break;
            case 'Today\'s quote':
                route = '/';
                break;
            default:
                route = '/';
        }

        if (route === location.pathname) {
            if (tab.page === 'Today\'s quote') {
                fetchQuote();
            }
        }
        else {
            navigate(route);
        }
    };

    React.useEffect(() => {
        fetchQuote();
    }, [context.quoteAPI, context.categories]);

    return (
        <>
            <Header title='THE QUOTE'/>
            {isProcessing ? (
                <NotificationElement level={'info'} message={'Loading...'}/>
            ) : quote ? (
                <div className={styles.quoteContainer}>
                    <BigQuote quote={quote.content} author={quote.author} />
                </div>
            ) : (
                <NotificationElement level={'error'} message={String(error)} />
            )}
            <div className={styles.container}>
                <Button title={'SAVE'} onClick={saveQuoteHandleClick} />
            </div>

            {saveNotification && <NotificationElement level={saveNotification.level} message={saveNotification.message} />}
            <Toolbar initialTab={3} onTabClick={handleToolbarClick} />
        </>
    );
};