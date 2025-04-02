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

const DeleteSavedQuoteItemSchema = Type.Object({
    result: Type.Array(Type.String())
});

const QuoteResponseSchema = Type.Array(QuoteItemSchema);
const SavedQuoteResponseSchema = Type.Array(SavedQuoteItemSchema);

export type QuoteItem = Static<typeof QuoteResponseSchema>;
export type SavedQuoteItem = Static<typeof SavedQuoteResponseSchema>;
export type PostSavedQuoteItem = Static<typeof PostSavedQuoteItemSchema>;
export type DeleteSavedQuoteItem = Static<typeof DeleteSavedQuoteItemSchema>;

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

    const GetSavedQuoteInfo = async (quote: string, author: string) : Promise<SavedQuoteItem> => {
        const headers = new Headers();
        headers.set('x-apikey', api_key);
        headers.set('Content-Type', 'application/json');
        headers.set('cache-control', 'no-cache');

        const query = {
            quote: quote,
            author: author
        };

        const params = new URLSearchParams();
        params.set('q', JSON.stringify(query));

        const res = await fetchAPI(`https://thequote-9624.restdb.io/rest/savedquotes?${params.toString()}`, {
            headers
        });

        if (!res.ok) {
            throw Error(`Could not fetch saved quotes: ${res.statusText}`);
        }

        const data = await res.json();

        if (data.length === 0 || !Array.isArray(data)) {
            throw Error('Quote not found');
        }

        return convertToType(data, SavedQuoteResponseSchema);
    };

    const DeleteSavedQuote = async (quote: string, author: string) : Promise<DeleteSavedQuoteItem> => {
        //{"result":["67e9779f59a5aa4a00001fe0"]} - if found
        // {"message":"Not found"} - if not found

        //curl -k -H "Content-Type: application/json" -H "x-apikey: 2ef09655927bb6f9141452b0ec4b481c00e56"
        // -X DELETE 'https://thequote-9624.restdb.io/rest/savedquotes/67e9779f59a5aa4a00001fe0'

        const headers = new Headers();
        headers.set('x-apikey', api_key);
        headers.set('Content-Type', 'application/json');
        headers.set('cache-control', 'no-cache');

        const quoteInfo = await GetSavedQuoteInfo(quote, author);

        const quoteId = quoteInfo[0]._id;

        const res = await fetchAPI(`https://thequote-9624.restdb.io/rest/savedquotes/${quoteId}`, {
            method: 'DELETE',
            headers
        });

        if (!res.ok) {
            throw Error(`Could not delete saved quote: ${res.statusText}`);
        }

        const data = await res.json();
        if (data.message === 'Not found') {
            throw Error('Quote not found');
        }

        return convertToType(data, DeleteSavedQuoteItemSchema);
    };

    return {
        GetQuote,
        GetSavedQuotes,
        PostSavedQuote,
        GetSavedQuoteInfo,
        DeleteSavedQuote
    };
};


