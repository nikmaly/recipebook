import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { HookProvider } from './hooks';
import { StylesContext, StylesContextType } from './context/StylesContext';
import Styles, { TTheme } from './context/Styles';
import { RoutesController } from './components/RoutesController';
import { DevTooling } from './components/DevTooling';
import './App.css';

const App = () => {
	const [styles, setStyles] = React.useState(Styles);
	const shouldDisplay: boolean = process.env.NODE_ENV === 'development';

	// Custom Theme
	const setTheme = (theme: TTheme) => {
		setStyles({
			...styles,
			theme,
		});
	};

	// MUI Theme Overrides
	const muiTheme = createTheme({
		palette: {
			primary: {
				main: styles.colors.brand.primary,
			},
			secondary: {
				main: styles.colors.brand.secondary,
			},
		},
		typography: {
			fontFamily: styles.typography.fontText,
		},
	});

	// Yay efficiency
	const memoisedContext = React.useMemo<StylesContextType>(() => ({ styles, setTheme }), []);

	return (
		<HookProvider>
			<StylesContext.Provider value={memoisedContext}>
				<ThemeProvider theme={muiTheme}>
					<DevTooling display={shouldDisplay}>
						<BrowserRouter>
							<RoutesController />
						</BrowserRouter>
					</DevTooling>
				</ThemeProvider>
			</StylesContext.Provider>
		</HookProvider>
	);
};

export default App;
