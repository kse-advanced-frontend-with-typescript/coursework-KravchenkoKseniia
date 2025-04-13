import {initUserAPI} from '../index';

const mocked_fetch = jest.fn();
const mockGetItem = jest.fn();
const mockSetItem = jest.fn();
const mockRemoveItem = jest.fn();

Object.defineProperty(window, "localStorage", {
    value: {
        getItem: (...args: string[]) => mockGetItem(...args),
        setItem: (...args: string[]) => mockSetItem(...args),
        removeItem: (...args: string[]) => mockRemoveItem(...args),
    },
});

describe('User API: Token Storage', () => {
    const API_KEY = 'API_KEY';
    const SESSION_KEY = 'quote-session';

    const api = initUserAPI(API_KEY, mocked_fetch);

    beforeEach(() => {
        mockSetItem.mockClear();
        mockSetItem.mockClear();
    });

    it('should save token to localStorage', () => {
        const token = 'some_token';
        api.SaveToken(token);
        expect(mockSetItem).toHaveBeenCalledTimes(1);
        expect(mockSetItem).toHaveBeenCalledWith(SESSION_KEY, token);
    })

    it('should restore token from localStorage', () => {
        api.RestoreToken();
        expect(mockGetItem).toHaveBeenCalledTimes(1);
        expect(mockGetItem).toHaveBeenCalledWith(SESSION_KEY);
    })

    it('should clean token from localStorage', () => {
        api.CleanToken();
        expect(mockRemoveItem).toHaveBeenCalledTimes(1);
        expect(mockRemoveItem).toHaveBeenCalledWith(SESSION_KEY);
    })
});