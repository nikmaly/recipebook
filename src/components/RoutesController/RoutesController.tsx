import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { RecipePage } from '../RecipePage';

// Pages
import { Landing } from '../../pages/Landing';
import { Contact } from '../../pages/Contact';
import Error404 from '../ErrorPage/Errors/404';
import Error405 from '../ErrorPage/Errors/405';

// Dev Env Only
import { Test } from '../../pages/Test';
import { Dev } from '../../pages/Dev';

const RoutesController: React.FunctionComponent = () => (
	<Routes>
		<Route
			path="/"
			element={<Landing />}
		/>

		<Route
			path="/random"
			element={<Contact />}
		/>

		<Route
			path="/contact"
			element={<Contact />}
		/>

		{/* <Route
			path="/recipe"
			element={(
				<GalleryLandingPage
					title="personal"
					routeData={routes.filter((route) => route.routeType === 'personal')}
					isSecure={false}
				/>
			)}
		/> */}

		<Route
			path="/recipe/:id"
			element={(
				<RecipePage />
			)}
		/>

		{ process.env.NODE_ENV === 'development' && (
			<>
				<Route
					path="/test"
					element={<Test />}
				/>

				<Route
					path="/dev"
					element={<Dev />}
				/>
			</>
		)}

		<Route
			path="/405"
			element={<Error405 />}
		/>

		<Route
			path="*"
			element={<Error404 />}
		/>
	</Routes>
);

export default RoutesController;
