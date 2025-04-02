import {AppContext} from '../../context';
import React from 'react';
import styles from './styles.module.css';
import {useNavigate} from 'react-router';
import {Header} from '../../Components/Header/Header';
import {Toolbar, ToolbarType} from '../../Components/Toolbar/Toolbar';
import {NotificationElement} from '../../Components/NotificationElement/NotificationElement';
import {SmallQuote} from '../../Components/SmallQuote/SmallQuote';

export const SavedQuotesPage: React.FC = () => {
    const navigate = useNavigate();
    const context = React.useContext(AppContext);
    const [quotes, setQuotes] = React.useState<{quote: string, author: string} []>([]);
    const [isProcessing, setIsProcessing] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string>();


    const handleToolbarClick = (tab: ToolbarType) => {
        let route: string;
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

        if (route !== window.location.pathname) {
            navigate(route);
        }
    };

    const fetchSavedQuotes = async () => {
        setError('');
        setIsProcessing(true);

        if (!context.quoteAPI) {
            setError('Quote API is not available');
            setIsProcessing(false);
            return;
        }

        try {
            const quoteData = await context.quoteAPI.GetSavedQuotes();

            if (quoteData && quoteData.length > 0) {
                const savedQuotes = quoteData.map(item => ({
                    quote: item.quote,
                    author: item.author,
                }));
                setQuotes(savedQuotes);
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

    React.useEffect(() => {
        if (!context.user || context.user.length === 0) {
            setIsProcessing(false);
            setError('User not found. Please login.');
            return;
        }
        fetchSavedQuotes();
    }, [context.quoteAPI, context.user]);


    return (
        <>
            <div className={styles.content}>
                <Header title={'SAVED QUOTES'}/>
                {isProcessing && <NotificationElement level={'info'} message={'Loading...'} />}
                {error && <NotificationElement level={'error'} message={`Error while fetching quotes: ${error}`} />}
                <div className={styles.savedquotes}>
                    {quotes.map((quote, index) => (
                        <SmallQuote key={index} quote={quote.quote} author={quote.author} />
                    ))}
                </div>
                <Toolbar initialTab={1} onTabClick={handleToolbarClick}/>
            </div>
        </>
    );
};