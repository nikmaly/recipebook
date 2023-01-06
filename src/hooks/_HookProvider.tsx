import React, { createContext } from 'react';
import { useViewportLogic } from '.';

type HookProviderProps = {
	children: React.ReactNode
};

export const HookContext = createContext({
	viewportWidth: 0,
	viewportHeight: 0,
});

export const HookProvider: React.FunctionComponent<HookProviderProps> = ({ children }) => {
	const { viewportWidth, viewportHeight } = useViewportLogic();
	const memoisedContext = React.useMemo(() => ({ viewportWidth, viewportHeight }), []);

	return (
		<HookContext.Provider value={memoisedContext}>
			{ children }
		</HookContext.Provider>
	);
};
