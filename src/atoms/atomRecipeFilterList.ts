import { atom } from 'recoil';

export type TRecipeFilterItem = {
	recipeName: string;
	tags: string[];
};

export type TRecipeFilterList = TRecipeFilterItem[];

export const atomRecipeFilterList = atom({
	key: 'recipeFilterList',
	default: [],
});
