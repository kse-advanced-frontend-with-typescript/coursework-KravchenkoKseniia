import {initUserAPI, User} from '../index';
describe('User API: Get User Info', () => {
    const API_KEY = 'API_KEY';

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

        const api = initUserAPI(API_KEY, mocked_fetch);

        it('should return user info', async () => {
            const res = await api.GetUserInfo('some_token');

            expect(res).toEqual([{
                _id: 'some_id',
                username: 'some_username',
                password: 'some_password',
                token: 'some_token',
            }]);
        })
    })

    describe('when user does not exist', () => {
        const body: User = [];

        const mocked_fetch = jest.fn().mockImplementation(() => {
            return new Response(JSON.stringify(body), {
                status: 200,
            });
        });

        const api = initUserAPI(API_KEY, mocked_fetch);

        it('should throw an error', async () => {
            await expect(api.GetUserInfo('some_token')).rejects.toThrow('User does not exist');
        });

    })

});