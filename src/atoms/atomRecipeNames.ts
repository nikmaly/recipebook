import { atom } from 'recoil';

export type TRecipeNames = string[];

export const atomRecipeNames = atom({
	key: 'recipeNames',
	default: [],
});
