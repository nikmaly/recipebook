/** @jsxImportSource @emotion/react */
import React from 'react';
import { StylesContext } from 'context/Styles';
import {
	favouriteButtonStyles,
} from '.';

type TPureFavouriteButtonProps = {
	isSelected: boolean;
	clickHandler: () => void;
};

const PureFavouriteButton: React.FunctionComponent<TPureFavouriteButtonProps> = ({
	isSelected,
	clickHandler,
}) => {
	const { styles } = React.useContext(StylesContext);

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

export default PureFavouriteButton;
