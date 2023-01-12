/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { DynamoDB } from 'aws-sdk';
import Recoil from 'recoil';
import { atomApi } from '../../atoms/atomApi';
import { TRecipeData } from '../../components/DataLayer';
import { NavBar } from '../../components/NavBar';
import { RecipeRow } from '../../components/RecipeRow';
import { StylesContext } from '../../context/Styles';
/** @jsxImportSource @emotion/react */
import {
	searchPageStyles,
	searchPageHeaderContainerStyles,
	searchPageTitleStyles,
	searchPageFieldStyles,
	searchPageContentContainerStyles,
} from './Search.styles';

const Search = () => {
	const api = Recoil.useRecoilValue(atomApi);
	const { styles } = React.useContext(StylesContext);
	const [inputVal, setInputVal] = React.useState('');
	const [recipeData, setRecipeData] = React.useState<TRecipeData>();

	const fetchRecipe = () => {
		fetch(`${api.uri}/${api.version}/${api.endpoints.getRecipe}/neapolitan-pizza`)
			.then((response) => response.json())
			.then((data) => (async () => {
				setRecipeData(data.Items.map((item: any) => DynamoDB.Converter.output({ M: item }))[0]);
			})()).catch((_error) => {
				console.error(_error);
			});
	};

	React.useEffect(() => {
		fetchRecipe();
	}, []);

	return (
		<>
			<NavBar />

			<main css={searchPageStyles(styles)}>
				<div css={searchPageHeaderContainerStyles(styles)}>
					<h1 css={searchPageTitleStyles(styles)}>Search</h1>
					<input
						css={searchPageFieldStyles(styles)}
						value={inputVal}
						onChange={(e) => setInputVal(e.target.value)}
					/>
				</div>

				{ recipeData && (
					<div css={searchPageContentContainerStyles(styles)}>
						<RecipeRow {...recipeData} />
						<RecipeRow {...recipeData} />
						<RecipeRow {...recipeData} />
						<RecipeRow {...recipeData} />
					</div>
				)}
			</main>
		</>
	);
};

export default Search;
