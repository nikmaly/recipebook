/** @jsxImportSource @emotion/react */
import React from 'react';
import Recoil from 'recoil';
import { atomFavourites } from 'atoms/atomFavourites';
import { useFavourites } from 'hooks/useFavourites';
import { PureFavouriteButton } from '.';

type TFavouriteButtonProps = {
	recipe: string;
};

const FavouriteButton: React.FunctionComponent<TFavouriteButtonProps> = ({
	recipe,
}) => {
	const favourites = Recoil.useRecoilValue(atomFavourites);
	const setFavourites = useFavourites();
	const [isSelected, setSelected] = React.useState<boolean>(false);

	const clickHandler = () => {
		if (isSelected) {
			setFavourites(favourites.filter((item) => item !== recipe));
		} else {
			setFavourites([
				...favourites,
				recipe,
			]);
		}

		setSelected(!isSelected);
	};

	return (
		<PureFavouriteButton
			isSelected={isSelected}
			clickHandler={clickHandler}
		/>
	);
};

export default FavouriteButton;
