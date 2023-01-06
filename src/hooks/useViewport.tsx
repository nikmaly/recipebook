import React from 'react';
import { HookContext } from '.';

export const useViewportLogic = () => {
	const [viewportWidth, setWidth] = React.useState(window.innerWidth);
	const [viewportHeight, setHeight] = React.useState(window.innerHeight);

	const handleWindowResize = () => {
		setWidth(window.innerWidth);
		setHeight(window.innerHeight);
	};

	React.useEffect(() => {
		window.addEventListener('resize', handleWindowResize);
		return () => window.removeEventListener('resize', handleWindowResize);
	}, []);

	return { viewportWidth, viewportHeight };
};

export const useViewport = () => {
	const { viewportWidth, viewportHeight } = React.useContext(HookContext);
	return { viewportWidth, viewportHeight };
};
