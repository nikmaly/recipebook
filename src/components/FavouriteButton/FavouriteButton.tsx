/** @jsxImportSource @emotion/react */
import React from 'react';
import Recoil from 'recoil';
import { atomFavourites } from '../../atoms/atomFavourites';
import { StylesContext } from '../../context/Styles';
import {
	favouriteButtonStyles,
} from './FavouriteButton.styles';

type TFavouriteButtonProps = {
	recipe: string;
};

const FavouriteButton: React.FunctionComponent<TFavouriteButtonProps> = ({
	recipe,
}) => {
	const { styles } = React.useContext(StylesContext);
	const [favourites, setFavourites] = Recoil.useRecoilState(atomFavourites);
	const [isSelected, setSelected] = React.useState(true);

	const clickHandler = () => {
		if (favourites.includes(recipe)) {
			setFavourites(favourites.filter((item) => item !== recipe));
		} else {
			setFavourites([
				...favourites,
				recipe,
			]);
		}
	};

	React.useEffect(() => {
		setSelected(favourites.includes(recipe));
	}, [favourites]);

	return (
		<button
			css={favouriteButtonStyles(styles, isSelected)}
			type="button"
			onClick={() => clickHandler()}
		>
			favourite
		</button>
	);
};

export default FavouriteButton;
