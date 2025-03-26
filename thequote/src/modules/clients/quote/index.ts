import {Static, Type} from '@sinclair/typebox';
import {TypeCompiler} from '@sinclair/typebox/compiler';
import {schemaErrorToError} from '../schemaErrorToError';

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

const QuoteResponseSchema = Type.Array(QuoteItemSchema);

export type QuoteItem = Static<typeof QuoteResponseSchema>;

export const GetQuote = async (categories: Array<string>, fetchAPI: typeof fetch) : Promise<QuoteItem> => {
    const endpoint : string = 'https://api.quotable.io/quotes/random';
    const tags : string = categories.join('|');
    const url : string = `${endpoint}?tags=${encodeURIComponent(tags)}`;

    const response = await fetchAPI(url);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.statusText}`);
    }

    const Compiler = TypeCompiler.Compile(QuoteResponseSchema);
    const isValid = Compiler.Check(data);

    if(isValid) {
        return data;
    }

    throw schemaErrorToError(Compiler.Errors(data).First());
};
