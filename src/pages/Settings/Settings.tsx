import React from 'react';
import { StylesContext } from 'context/Styles';
import { ContentPage } from 'middleware/ContentPage';
/** @jsxImportSource @emotion/react */
import { settingsStyles } from './Settings.styles';

const Settings = () => {
	const { styles } = React.useContext(StylesContext);

	return (
		<ContentPage title="Settings">
			<div css={settingsStyles(styles)}>
				<h2>Coming Soon</h2>
			</div>
		</ContentPage>
	);
};

export default Settings;
