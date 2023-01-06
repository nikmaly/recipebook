/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useContext } from 'react';
import { DynamoDB } from 'aws-sdk';
import { useViewport } from '../../hooks';
import { StylesContext } from '../../context/StylesContext';
import { imageTilesStyles, imageTilesColumnStyles } from './ImageTiles.styles';
import { Loader } from '../Loader';
import { ImageTile, ITileData } from './ImageTile';

type TImageTilesProps = {
	imagesPath: string;
};

const ImageTiles: React.FunctionComponent<TImageTilesProps> = ({
	imagesPath,
}) => {
	const { styles } = useContext(StylesContext);
	const [isLoading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState();
	const [imageData, setImageData] = useState<ITileData[]>();
	const [numCols, setCols] = useState<number>(4);
	const { viewportWidth } = useViewport();

	/**
	 * Creates an array of tiles for rendering
	 * @param {sourceObject} data items An object containing the keys to be shuffled.
	 */
	const tileBuilder = (data: ITileData[]) => data.map((tile, index) => {
		if (!tile.imageShouldDisplay) {
			return false;
		}

		return (
			<ImageTile
				// eslint-disable-next-line react/no-array-index-key
				key={index}
				offset={0}
				tileData={tile}
			/>
		);
	});

	const layoutBuilder = (_imageData: ITileData[]) => {
		//  Get number of columns from css breakpoints in the styles object
		const cols: React.ReactNode[][] = [];
		const tiles = tileBuilder(_imageData);

		for (let i = 0; i < numCols; i++) {
			cols.push([]);
		}

		tiles.forEach((tile, index) => {
			cols[index % numCols].push(tile);
		});

		return cols;
	};

	// Load tile data set
	useEffect(() => {
		fetch(`https://api.malyaris.com/${imagesPath}`)
			.then((response) => response.json())
			.then((data) => (async () => {
				await new Promise((resolve) => { setTimeout(resolve, 3000); });
				setLoading(false);
				setImageData(data.Items.map(
					(item: any) => DynamoDB.Converter.output({ M: item }),
				)[0].galleryImages);
			})())
			.catch((apiError) => {
				setError(apiError);
				setLoading(false);
			});
	}, [imagesPath]);

	// Set the number of columns
	useEffect(() => {
		let cols = 2;

		cols = viewportWidth > parseInt(styles.breakpoints.ms.val, 10) ? 3 : cols;
		cols = viewportWidth > parseInt(styles.breakpoints.m.val, 10) ? 4 : cols;

		setCols(cols);
	}, [viewportWidth, styles.breakpoints]);

	return (
		<section css={imageTilesStyles(styles)}>
			{
				error || isLoading || !imageData
					? <Loader />
					: layoutBuilder(imageData).map((col, i) => (
						// eslint-disable-next-line react/no-array-index-key
						<div css={imageTilesColumnStyles(styles, numCols)} key={i}>
							{col.map((tile) => tile)}
						</div>
					))
			}
		</section>
	);
};

export default ImageTiles;
