// import {initQuoteAPI, SavedQuoteItem} from '../index';
// describe('Qet Saved Quotes', () => {
//     const API_KEY = 'some_key';
//
//     describe('when response is valid', () => {
//         const body : SavedQuoteItem = [
//             {
//                 _id: 'some_id',
//                 username: 'some_username',
//                 quote: 'some_quote',
//                 author: 'some_author'
//             }
//         ];
//
//         const mocked_fetch = jest.fn().mockImplementation(() => {
//             return new Response(JSON.stringify(body), {
//                 status: 200,
//             });
//         });
//
//         const api = initQuoteAPI(API_KEY, mocked_fetch);
//
//         it('should return a quote', async () => {
//             const res = await api.GetSavedQuotes();
//             expect(res).toEqual(body);
//         });
//     });
//
//     describe('when response is not valid', () => {
//         const body : SavedQuoteItem = [
//             {
//                 _id: 'some_id',
//                 // @ts-expect-error To test the error we are passing a number instead of a string
//                 username: 4,
//                 quote: 'some_quote',
//                 author: 'some_author'
//             }
//         ];
//
//         const mocked_fetch = jest.fn().mockImplementation(() => {
//             return new Response(JSON.stringify(body), {
//                 status: 200,
//             });
//         });
//
//         const api = initQuoteAPI(API_KEY, mocked_fetch);
//
//         it('should throw an error', async () => {
//             await expect(api.GetSavedQuotes()).rejects.toThrow('Data is not valid: /0/username (Expected string)');
//         });
//     });
//
// });