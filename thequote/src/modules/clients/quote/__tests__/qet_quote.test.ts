import { QuoteItem, GetQuote } from '../index';
describe('Qet Quote', () => {


  describe('when response is valid', () => {
    const body : QuoteItem = [
      {
        _id: 'some_id',
        author: 'some_author',
        content: 'some_content',
        tags: [
          'inspirational'
        ],
        authorSlug: 'some_author_slug',
        length: 0,
        dateAdded: '12-12-2021',
        dateModified: '12-12-2021'
      }
    ];

    const mocked_fetch = jest.fn().mockImplementation(() => {
      return new Response(JSON.stringify(body), {
        status: 200,
      });
    });

    const api = GetQuote(['inspirational', 'life', 'love'], mocked_fetch);

    it('should return a quote', async () => {

      const res = await api;
      expect(res).toEqual(body);
    });
  });

  describe('when response is not valid', () => {
    const body : QuoteItem = [
      {
        _id: 'some_id',
        author: 'some_author',
        // @ts-expect-error To test the error we are passing a number instead of a string
        content: 12,
        tags: [
          'inspirational'
        ],
        authorSlug: 'some_author_slug',
        length: 0,
        dateAdded: '12-12-2021',
        dateModified: '12-12-2021'
      }
    ];

    const mocked_fetch = jest.fn().mockImplementation(() => {
      return new Response(JSON.stringify(body), {
        status: 200,
      });
    });

    const api = GetQuote(['inspirational', 'life', 'love'], mocked_fetch);

    it('should throw an error', async () => {
        await expect(api).rejects.toThrow('Data is not valid: /0/content (Expected string)');
    });
  });

});
