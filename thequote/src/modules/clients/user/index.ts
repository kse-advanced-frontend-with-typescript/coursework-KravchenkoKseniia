import {Static, Type} from '@sinclair/typebox';
import {convertToType} from '../convertToType';

const UserSchema = Type.Array(Type.Object({
    _id: Type.String(),
    username: Type.String(),
    password: Type.String(),
    token: Type.String(),
    categories: Type.Optional(Type.Array(
        Type.Union([
            Type.Literal('motivation'),
            Type.Literal('life'),
            Type.Literal('wisdom'),
            Type.Literal('love'),
            Type.Literal('technology'),
            Type.Literal('creativity'),
            Type.Literal('change'),
            Type.Literal('inspirational'),
            Type.Literal('leadership'),
            Type.Literal('happiness'),
            Type.Literal('imagination'),
            Type.Literal('friendship')
        ])
    )),
}));

export type User = Static<typeof UserSchema>

export const initUserAPI = (api_key: string, fetchAPI: typeof fetch) => {

    const SESSION_KEY = 'quote-session';

    const GetUserToken = async (login: string, password: string): Promise<User> => {
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
            return [{
                _id: user[0]._id,
                username: user[0].username,
                password: user[0].password,
                token: user[0].token
            }];
        }

        throw Error('User does not exist');
    };

    const GetUserInfo = async (token: string): Promise<User> => {
        const headers = new Headers();
        headers.set('x-apikey', api_key);
        headers.set('Content-Type', 'application/json');
        headers.set('cache-control', 'no-cache');

        const query = {
            token
        };

        const params = new URLSearchParams();
        params.set('q', JSON.stringify(query));

        const res = await fetchAPI(`https://thequote-9624.restdb.io/rest/login?${params.toString()}`, {
            headers
        });

        if (!res.ok) {
            throw Error(`Could not fetch token: ${res.statusText}`);
        }

        const data = await res.json();
        const user = convertToType(data, UserSchema);

        if(user.length > 0) {
            return [{
                _id: user[0]._id,
                username: user[0].username,
                password: user[0].password,
                token: user[0].token
            }];
        }

        throw Error('User does not exist');
    }

    const RestoreToken = (): string | null => {
        return window.localStorage.getItem(SESSION_KEY);
    };

    const CleanToken = (): void => {
        window.localStorage.removeItem(SESSION_KEY);
    };

    const SaveToken = (token: string): void => {
        window.localStorage.setItem(SESSION_KEY, token);
    };


    return {
        GetUserToken,
        GetUserInfo,
        RestoreToken,
        CleanToken,
        SaveToken
    };
};
