import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HookProvider } from './hooks';
import { StylesContext, StylesContextType } from './context/StylesContext';
import Styles, { TTheme } from './context/Styles';
import { RoutesController } from './components/RoutesController';
// import { Loader } from './components/Loader';
import './App.css';

export type TRouteData = {
	routeId: string;
	routeName: string;
	routeDescription: string;
	routeType: string;
	routeData: string;
};

const App = () => {
	// eslint-disable-next-line no-unused-vars
	const [isPageReady, setPageReady] = useState<boolean>(false);
	const [styles, setStyles] = useState(Styles);
	// FIXME: remove routes if I don't need it or use another implementation
	const routes: TRouteData[] = [];

	useEffect(() => {
		/*
		* Normally timeout would be an anti-pattern. We're using it here because
		* from a programatic perspective we *are* done loading, but the browser
		* still has high resource usage while it unpacks and finalises rendering.
		* We aren't trying to wait for load, we're trying to wait for resources.
		* There's no more specific way to target this, so I've defaulted to this.
		*/
		if (
			document.readyState === 'complete'
		) {
			setTimeout(() => {
				setPageReady(true);
			}, 1000);
		}
	}, [document.readyState]);

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
					isPageReady
					&& routes
					&& (
					<RoutesController routes={routes} />
					)
				</BrowserRouter>
			</StylesContext.Provider>
		</HookProvider>
	);
};

export default App;
