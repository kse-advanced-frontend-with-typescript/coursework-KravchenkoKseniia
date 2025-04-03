import {initQuoteAPI, SavedQuoteItem} from '../index';
describe('Qet Saved Quotes', () => {
    const API_KEY = 'some_key';

    describe('when response is valid', () => {
        const some_username = 'some_username';
        const some_id = 'some_user_id';

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

        it('should return a quote', async () => {
            const res = await api.GetSavedQuotes(some_id, some_username);
            expect(res).toEqual(body);
        });
    });

    describe('when response is not valid', () => {
        const some_id = '';
        const invalid_username = '1234';

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

        it('should throw an error', async () => {
            await expect(api.GetSavedQuotes(some_id, invalid_username)).rejects.toThrow('User not found');
        });
    });

});