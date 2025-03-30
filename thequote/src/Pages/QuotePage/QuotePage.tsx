import {Toolbar} from "../../Components/Toolbar/Toolbar";
import {BigQuote} from "../../Components/BigQuote/BigQuote";
import {Header} from "../../Components/Header/Header";
import {AppContext} from '../../context';
import {useNavigate} from 'react-router';
import React from "react";
import {NotificationElement} from "../../Components/NotificationElement/NotificationElement";

export const QuotePage: React.FC = () => {
    const navigate = useNavigate();
    const context = React.useContext(AppContext);
    const [quote, setQuote] = React.useState<{content: string, author: string} | null>(null);
    const [isProcessing, setIsProcessing] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string>();

    React.useEffect(() => {
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
                const quoteData = await context.quoteAPI.GetQuote(categories)

                if (quoteData && quoteData.length > 0) {
                    const {content, author} = quoteData[0];
                    setQuote({content, author});
                }
                else {
                    console.error('No quote found');
                }
            } catch (error) {
                console.error('Error fetching quote:', error);
                setError('Error fetching quote');
            } finally {
                setIsProcessing(false);
            }

        };
        void fetchQuote();
    }, [context.quoteAPI, context.categories]);

    return (
        <>
            <Header title='THE QUOTE'/>
            {isProcessing ? (
                <NotificationElement level={"info"} message={'Loading...'}/>
            ) : quote ? (
                <BigQuote quote={quote.content} author={quote.author} />
            ) : (
                <NotificationElement level={'error'} message={'No quote found'} />
            )}
            <Toolbar />
        </>
    );
}