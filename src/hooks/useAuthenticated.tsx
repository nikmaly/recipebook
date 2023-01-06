import React from 'react';

const useAuthenticated = () => {
	const [isAuthenticated, setAuthenticated] = React.useState<boolean>(false);

	const checkAuthentication = () => {
		setAuthenticated(true);
	};

	React.useEffect(() => {
		checkAuthentication();
	}, []);

	return { isAuthenticated };
};

export default useAuthenticated;
