import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HookProvider } from './hooks';
import { StylesContext, StylesContextType } from './context/StylesContext';
import Styles, { TTheme } from './context/Styles';
import { RoutesController } from './components/RoutesController';
// import { Loader } from './components/Loader';
import './App.css';

const App = () => {
	const [styles, setStyles] = React.useState(Styles);

	const setTheme = (theme: TTheme) => {
		setStyles({
			...styles,
			theme,
		});
	};

	// Yay efficiency
	const memoisedContext = React.useMemo<StylesContextType>(() => ({ styles, setTheme }), []);

	return (
		<HookProvider>
			<StylesContext.Provider value={memoisedContext}>
				<BrowserRouter>
					<RoutesController />
				</BrowserRouter>
			</StylesContext.Provider>
		</HookProvider>
	);
};

export default App;
