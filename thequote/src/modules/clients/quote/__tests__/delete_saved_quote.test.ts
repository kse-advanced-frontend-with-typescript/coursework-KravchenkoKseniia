import {DeleteSavedQuoteItem, initQuoteAPI, SavedQuoteItem} from '../index';
describe('Delete Saved Quote', () => {
    const API_KEY = 'some_key';

    describe('when quote is found', () => {
        const body : SavedQuoteItem = [
            {
                _id: 'some_id',
                username: 'some_username',
                quote: 'some_quote',
                author: 'some_author'
            }
        ];

        const successResponse: DeleteSavedQuoteItem = {
            result: ['some_id']
        };

        const mocked_fetch = jest.fn().mockImplementationOnce(() => {
            return new Response(JSON.stringify(body), {
                status: 200,
            });
        }).mockImplementationOnce(() => {
            return new Response(JSON.stringify(successResponse), {
                status: 200,
            });
        });

        const api = initQuoteAPI(API_KEY, mocked_fetch);

        it('should delete the quote', async () => {
            const res = await api.DeleteSavedQuote('some_quote', 'some_author');
            expect(mocked_fetch).toHaveBeenCalledTimes(2);
            expect(res).toEqual(successResponse);
        });
    });

    describe('when response is not valid', () => {
        const emptyBody : SavedQuoteItem = [];

        const mocked_fetch = jest.fn().mockImplementation(() => {
            return new Response(JSON.stringify(emptyBody), {
                status: 200,
            });
        });

        const api = initQuoteAPI(API_KEY, mocked_fetch);

        it('should throw an error', async () => {
            await expect(api.DeleteSavedQuote('invalid_quote', 'invalid_author')).rejects.toThrow('Quote not found');
            expect(mocked_fetch).toHaveBeenCalledTimes(1);
        });

    });

    describe('when quote is not found', () => {
        const body : SavedQuoteItem = [
            {
                _id: 'some_id',
                username: 'some_username',
                quote: 'some_quote',
                author: 'some_author'
            }
        ];

        const notFoundResponse = {
            message: 'Not found'
        };

        const mocked_fetch = jest.fn().mockImplementationOnce(() => {
            return new Response(JSON.stringify(body), {
                status: 200,
            });
        }).mockImplementationOnce(() => {
            return new Response(JSON.stringify(notFoundResponse), {
                status: 200,
            });
        });

        const api = initQuoteAPI(API_KEY, mocked_fetch);

        it('should throw an error "Quote not found"', async () => {
            await expect(api.DeleteSavedQuote('quote', 'author')).rejects.toThrow('Quote not found');
            expect(mocked_fetch).toHaveBeenCalledTimes(2);
        });
    });

});