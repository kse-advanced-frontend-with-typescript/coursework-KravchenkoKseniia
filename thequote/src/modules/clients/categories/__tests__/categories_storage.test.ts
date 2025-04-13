import {initCategoriesAPI} from '../index';
import {IconType} from '../../../../Components/IconButton/IconButton';

const mockGetItem = jest.fn();
const mockSetItem = jest.fn();
const mockRemoveItem = jest.fn();

Object.defineProperty(window, 'localStorage', {
    value: {
        getItem: (...args: string[]) => mockGetItem(...args),
        setItem: (...args: string[]) => mockSetItem(...args),
        removeItem: (...args: string[]) => mockRemoveItem(...args),
    },
});

describe('Categories API: Categories Storage', () => {
    const SESSION_KEY = 'categories';

    const api = initCategoriesAPI();

    beforeEach(() => {
        mockSetItem.mockClear();
        mockSetItem.mockClear();
    });

    it('should save categories to localStorage', () => {
        const categories: IconType[] = [
            'change', 'creativity', 'life'
        ];

        api.SaveCategories(categories);
        expect(mockSetItem).toHaveBeenCalledTimes(1);
        expect(mockSetItem).toHaveBeenCalledWith(SESSION_KEY, JSON.stringify(categories));

    });

    it('should restore categories from localStorage', () => {
        api.RestoreCategories();
        expect(mockGetItem).toHaveBeenCalledTimes(1);
        expect(mockGetItem).toHaveBeenCalledWith(SESSION_KEY);
    });

    it('should clean token from localStorage', () => {
        api.CleanCategories();
        expect(mockRemoveItem).toHaveBeenCalledTimes(1);
        expect(mockRemoveItem).toHaveBeenCalledWith(SESSION_KEY);
    });
});