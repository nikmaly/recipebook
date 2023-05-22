import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { DynamoDB } from 'aws-sdk';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import Recoil from 'recoil';
import {
	Styles,
	StylesContext,
	StylesContextType,
	TTheme,
} from './context/Styles';
import { RoutesController } from './middleware/RoutesController';
import { DataLayer } from './middleware/DataLayer';
import { DevTooling } from './middleware/DevTooling';
import './App.css';

const App = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [isLoading, setLoading] = React.useState<boolean>(true);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [errors, setErrors] = React.useState<string>('');
	const [, setRecipeList] = React.useState();
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
				main: styles.colors.primary.base,
			},
			secondary: {
				main: styles.colors.secondary.base,
			},
		},
		typography: {
			fontFamily: styles.typography.fontText,
		},
	});

	const memoisedContext = React.useMemo<StylesContextType>(() => ({ styles, setTheme }), []);

	const fetchRecipeData = () => {
		fetch('https://0hgyyrn329.execute-api.ap-southeast-2.amazonaws.com/v1/recipes/list/title')
			.then((response) => response.json())
			.then((data) => (async () => {
				await new Promise((resolve) => { setTimeout(resolve, 1000); });
				setLoading(false);
				setRecipeList(data.Items.map((item: any) => DynamoDB.Converter.output({ M: item }).title));
			})()).catch((_error) => {
				setLoading(false);
				setErrors(_error);
			});
	};

	React.useEffect(() => {
		fetchRecipeData();
	}, []);

	return (
		<Recoil.RecoilRoot>
			<DataLayer>
				<StylesContext.Provider value={memoisedContext}>
					<MuiThemeProvider theme={muiTheme}>
						<DevTooling display={shouldDisplay}>
							<BrowserRouter>
								<RoutesController />
							</BrowserRouter>
						</DevTooling>
					</MuiThemeProvider>
				</StylesContext.Provider>
			</DataLayer>
		</Recoil.RecoilRoot>
	);
};

export default App;
