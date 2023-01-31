import { atom } from 'recoil';

export const atomFavourites = atom({
	key: 'favourites',
	default: [] as string[],
});
