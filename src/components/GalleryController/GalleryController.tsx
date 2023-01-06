import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { StylesContext } from '../../context/StylesContext';
import type { TRouteData } from '../../App';
import { ContentPage } from '../ContentPage';
import { ImageTiles } from '../ImageTiles';
import { Loader } from '../Loader';
import { galleryControllerStyles } from './GalleryController.styles';

export type IGalleryControllerProps = {
	data: TRouteData[];
};

const GalleryController: React.FunctionComponent<IGalleryControllerProps> = ({
	data,
}) => {
	const { styles } = useContext(StylesContext);
	const [galleryData, setGalleryData] = useState<TRouteData>();
	const { id } = useParams();

	const buildGallery = (): React.ReactElement => {
		if (!galleryData) { return <></>; }

		const gallery = (
			<ContentPage
				title={galleryData.routeId}
				stylesProp={galleryControllerStyles(styles)}
			>
				<ImageTiles imagesPath={`gallery/${galleryData.routeId}`} />
			</ContentPage>
		);

		return gallery;
	};

	useEffect(() => {
		setGalleryData(data.filter((route) => route.routeId === id)[0]);
	}, []);

	return (
		galleryData
			? buildGallery()
			: <Loader />
	);
};

export default GalleryController;
