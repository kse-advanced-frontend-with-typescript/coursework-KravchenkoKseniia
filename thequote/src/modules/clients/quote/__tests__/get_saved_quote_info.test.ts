import {initQuoteAPI, SavedQuoteItem} from '../index';
describe('Qet Saved Quote Info', () => {
    const API_KEY = 'some_key';

    describe('when response is valid', () => {
        const body : SavedQuoteItem = [
            {
                _id: 'some_id',
                username: 'some_username',
                quote: 'some_quote',
                author: 'some_author'
            }
        ];

        const mocked_fetch = jest.fn().mockImplementation(() => {
            return new Response(JSON.stringify(body), {
                status: 200,
            });
        });

        const api = initQuoteAPI(API_KEY, mocked_fetch);

        it('should return a quote info', async () => {
            const res = await api.GetSavedQuoteInfo('some_quote', 'some_author');
            expect(res).toEqual(body);
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
            await expect(api.GetSavedQuoteInfo('invalid_quote', 'invalid_author')).rejects.toThrow('Quote not found');
        });
    });

});