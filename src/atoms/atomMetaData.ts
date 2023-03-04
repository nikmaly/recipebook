import { atom } from 'recoil';

export type TMetaTags = Record<string, string[]>;

export type TMetaData = {
	tags: TMetaTags;
};

export const atomMetaData = atom({
	key: 'metadata',
	default: {
		tags: {
			nationality: [],
			region: [],
			meal: [],
			general: [],
		},
	},
});
