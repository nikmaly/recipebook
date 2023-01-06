import { createContext, useContext } from 'react';
import Styles, { TTheme, TStyles } from './Styles';

export type StylesContextType = {
    styles: TStyles;
    // eslint-disable-next-line no-unused-vars
    setTheme: (Theme: TTheme) => void;
};

const defaultStylesContext = {
	styles: {
		...Styles,
		theme: TTheme.Light,
	},
	setTheme: () => null,
};

export const StylesContext = createContext<StylesContextType>(defaultStylesContext);
export const useTheme = () => useContext(StylesContext);
