import {initUserAPI, User} from '../index';

describe('User API: Get User Token', () => {
    const api_key: string = 'some_key';

    describe('when user exists', () => {
        const body: User = [{
            _id: 'some_id',
            username: 'some_username',
            password: 'some_password',
            token: 'some_token',
        }];

        const mocked_fetch = jest.fn().mockImplementation(() => {
            return new Response(JSON.stringify(body), {
                status: 200,
            });
        });

        const api = initUserAPI(api_key, mocked_fetch);

        it('should return a token', async () => {
            const res = await api.getUserToken('some_username', 'some_password');
            expect(res).toEqual('some_token');
        });
    });

    describe('when user does not exist', () => {
        const body: User = [];

        const mocked_fetch = jest.fn().mockImplementation(() => {
            return new Response(JSON.stringify(body), {
                status: 200,
            });
        });

        const api = initUserAPI(api_key, mocked_fetch);

        it('should throw an error', async () => {
            await expect(api.getUserToken('some_username', 'some_password')).rejects.toThrow('User does not exist');
        });
    });


});