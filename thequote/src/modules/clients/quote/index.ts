import {Static, Type} from '@sinclair/typebox';
import {convertToType} from '../convertToType';

const QuoteItemSchema = Type.Object({
    _id: Type.String(),
    author: Type.String(),
    content: Type.String(),
    tags: Type.Array(Type.String()),
    authorSlug: Type.String(),
    length: Type.Number(),
    dateAdded: Type.String(),
    dateModified: Type.String()
});

const SavedQuoteItemSchema = Type.Object({
    _id: Type.String(),
    username: Type.String(),
    quote: Type.String(),
    author: Type.String()
});

const PostSavedQuoteItemSchema = Type.Object({
    _id: Type.String(),
    username: Type.String(),
    quote: Type.String(),
    author: Type.String(),
    _created: Type.String(),
    _changed: Type.String(),
    _createdby: Type.String(),
    _changedby: Type.String(),
    _keywords: Type.Array(Type.String()),
    _tags: Type.String(),
    _version: Type.Number()
});

const QuoteResponseSchema = Type.Array(QuoteItemSchema);
const SavedQuoteResponseSchema = Type.Array(SavedQuoteItemSchema);

export type QuoteItem = Static<typeof QuoteResponseSchema>;
export type SavedQuoteItem = Static<typeof SavedQuoteResponseSchema>;
export type PostSavedQuoteItem = Static<typeof PostSavedQuoteItemSchema>;

export const initQuoteAPI = (api_key: string, fetchAPI: typeof fetch) => {
    const GetQuote = async (categories: Array<string>) : Promise<QuoteItem> => {
        const endpoint : string = 'https://api.quotable.io/quotes/random';
        const tags : string = categories.length > 0 ? `?tags=${encodeURIComponent(categories.join('|'))}` : '';
        const url : string = `${endpoint}${tags}`;

        console.log(`Fetching ${url}`);
        const response = await fetchAPI(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.statusText}`);
        }

        return convertToType(data, QuoteResponseSchema);
    };

    const GetSavedQuotes = async () : Promise<SavedQuoteItem> => {
        const headers = new Headers();
        headers.set('x-apikey', api_key);
        headers.set('Content-Type', 'application/json');
        headers.set('cache-control', 'no-cache');

        const res = await fetchAPI('https://thequote-9624.restdb.io/rest/savedquotes', {
            headers
        });

        if (!res.ok) {
            throw Error(`Could not fetch saved quotes: ${res.statusText}`);
        }

        const data = await res.json();

        return convertToType(data, SavedQuoteResponseSchema);
    };

    const PostSavedQuote = async (username: string, quote: string, author: string) : Promise<PostSavedQuoteItem> => {
        const headers = new Headers();
        headers.set('x-apikey', api_key);
        headers.set('Content-Type', 'application/json');
        headers.set('cache-control', 'no-cache');

        const quoteData = {
            username: username,
            quote: quote,
            author: author
        };

        const res = await fetchAPI('https://thequote-9624.restdb.io/rest/savedquotes', {
            method: 'POST',
            headers,
            body: JSON.stringify(quoteData)
        });

        if (!res.ok) {
            throw Error(`Could not save quote: ${res.statusText}`);
        }

        const data = await res.json();
        return convertToType(data, PostSavedQuoteItemSchema);
    };

    return {
        GetQuote,
        GetSavedQuotes,
        PostSavedQuote
    };
};


