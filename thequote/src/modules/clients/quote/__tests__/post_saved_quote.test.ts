import { PostSavedQuoteItem, initQuoteAPI } from '../index';

describe('Post Saved Quote', () => {
    const API_KEY = 'some_key';

    describe('when response is valid', () => {
        const body: PostSavedQuoteItem = {
            _id: 'some_id',
            username: 'some_username',
            quote: 'some_quote',
            author: 'some_author',
            _created: '2021-12-12T00:00:00Z',
            _changed: '2021-12-12T00:00:00Z',
            _createdby: 'test_user',
            _changedby: 'test_user',
            _keywords: ['inspiration', 'motivation'],
            _tags: 'tag1',
            _version: 1,
        };

        const mocked_fetch = jest.fn().mockImplementation(() => {
            return new Response(JSON.stringify(body), {
                status: 200,
            });
        });

        const api = initQuoteAPI(API_KEY, mocked_fetch);

        it('should post and return the saved quote data', async () => {
            const res = await api.PostSavedQuote('some_username', 'some_quote', 'some_author');

            expect(res).toEqual(body);

            expect(mocked_fetch).toHaveBeenCalledWith(
                'https://thequote-9624.restdb.io/rest/savedquotes',
                {
                    method: 'POST',
                    headers: expect.any(Headers),
                    body: JSON.stringify({
                        username: 'some_username',
                        quote: 'some_quote',
                        author: 'some_author',
                    }),
                }
            );
        });
    });

    describe('when response is not valid', () => {
        const invalidBody = {
            _id: 'some_id',
            username: 'some_username',
            quote: 'some_quote',
            author: 'some_author',
            // Missing "_tags" field (PostSavedQuoteItemSchema expects a string)
            _created: '2021-12-12T00:00:00Z',
            _changed: '2021-12-12T00:00:00Z',
            _createdby: 'test_user',
            _changedby: 'test_user',
            _keywords: ['inspiration', 'motivation'],
            _version: 1,
        };

        const mocked_fetch = jest.fn().mockImplementation(() => {
            return new Response(JSON.stringify(invalidBody), {
                status: 200,
            });
        });

        const api = initQuoteAPI(API_KEY, mocked_fetch);

        it('should throw a schema validation error', async () => {
            await expect(api.PostSavedQuote('some_username', 'some_quote', 'some_author'))
                .rejects
                .toThrow('Data is not valid: /_tags (Expected required property)');
        });
    });

    describe('when response is not OK (HTTP error)', () => {
        const mocked_fetch = jest.fn().mockImplementation(() => {
            return new Response(null, {
                status: 500,
                statusText: 'Internal Server Error',
            });
        });

        const api = initQuoteAPI(API_KEY, mocked_fetch);

        it('should throw an error if the response is not OK', async () => {
            await expect(api.PostSavedQuote('some_username', 'some_quote', 'some_author'))
                .rejects
                .toThrow('Could not save quote: Internal Server Error');
        });
    });
});
