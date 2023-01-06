import React, { useContext, useState } from 'react';
// import { LoadingSkeleton } from "../../LoadingSkeleton";
import { StylesContext } from '../../../context/StylesContext';
/** @jsxImportSource @emotion/react */
import {
	imageTileStyles,
	imageTileImageStyles,
	imageTileLinkStyles,
} from './ImageTile.styles';

export type ITileData = {
	imageTitle?: string;
	imageDescription?: string;
	imageTags?: string[];
	imageShouldDisplay?: boolean;
	imageLinkLowres: string;
	imageLinkHighres: string;
	imageLink?: string;
};

export type IImageTileProps = {
	tileData: ITileData;
	offset: number;
};

const ImageTile: React.FunctionComponent<IImageTileProps> = ({
	tileData,
	offset,
}) => {
	const { styles } = useContext(StylesContext);
	const [isLoaded, setLoaded] = useState<boolean>(false);

	return (
		<div css={imageTileStyles(styles)} className="image-tile" style={{ marginTop: `${offset}px` }}>
			{/* <ScrollAnimation
				animateIn="fadeIn"
				animateOnce={true}
				offset={0}
			> */}
			<a
				className="image-tile__link"
				css={imageTileLinkStyles(styles, isLoaded)}
				href={tileData.imageLinkHighres ? tileData.imageLinkHighres : ''}
			>
				{tileData.imageLinkLowres && (
					<img
						className="image-tile__image"
						css={imageTileImageStyles(styles)}
						src={tileData.imageLinkLowres}
						alt={tileData.imageTitle}
						onLoad={() => setLoaded(true)}
					/>
				)}

				{/* {(tileData.imageTitle || tileData.imageDescription) && (
					<div className="image-tile__text" css={imageTileTextStyles(styles)}>
						<h4>{tileData.imageTitle}</h4>
						<p>{tileData.imageDescription}</p>
					</div>
				)} */}
			</a>
			{/* </ScrollAnimation> */}
		</div>
	);
};

export default ImageTile;
