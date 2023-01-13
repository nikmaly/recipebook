import { atom } from 'recoil';

export type TRecipeNameList = string[];

export const atomRecipeNameList = atom({
	key: 'recipeNameList',
	default: [],
});
