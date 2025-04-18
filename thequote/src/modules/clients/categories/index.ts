import {IconType} from '../../../Components/IconButton/IconButton';

export const initCategoriesAPI = () => {

    const CATEGORIES = 'categories';

    const RestoreCategories = (): IconType[]  => {
        const categoriesString = window.localStorage.getItem(CATEGORIES);
        if (!categoriesString) return [];

        return JSON.parse(categoriesString) as IconType[];
    };

    const CleanCategories = (): void => {
        window.localStorage.removeItem(CATEGORIES);
    };

    const SaveCategories = (categories: IconType[]): void => {
        const categoriesString = JSON.stringify(categories);
        window.localStorage.setItem(CATEGORIES, categoriesString);
    };

    return {
        RestoreCategories,
        CleanCategories,
        SaveCategories
    };
};
