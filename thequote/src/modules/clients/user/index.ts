import {Static, Type} from '@sinclair/typebox';
import {convertToType} from '../convertToType';

const UserSchema = Type.Array(Type.Object({
    _id: Type.String(),
    username: Type.String(),
    password: Type.String(),
    token: Type.String(),
}));

export type User = Static<typeof UserSchema>

export const initUserAPI = (api_key: string, fetchAPI: typeof fetch) => {
    const GetUserToken = async (login: string, password: string): Promise<string> => {
        const headers = new Headers();
        headers.set('x-apikey', api_key);
        headers.set('Content-Type', 'application/json');
        headers.set('cache-control', 'no-cache');

        const userData = {
            username: login,
            password: password
        };

        const params = new URLSearchParams();
        params.set('q', JSON.stringify(userData));

        const res =  await fetchAPI(`https://thequote-9624.restdb.io/rest/login?${params.toString()}`, {
            headers
        });

        if (!res.ok) {
            throw Error(`Could not fetch user: ${res.statusText}`);
        }

        const data = await res.json();

        const user = convertToType(data, UserSchema);

        if(user.length > 0) {
            return user[0].token;
        }

        throw Error('User does not exist');
    };


    return {
        getUserToken: GetUserToken
    };
};
