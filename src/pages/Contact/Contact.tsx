import React, { useContext } from 'react';
import { StylesContext } from '../../context/StylesContext';
import { ContentPage } from '../../components/ContentPage';
/** @jsxImportSource @emotion/react */
import { contactStyles } from './Contact.styles';

const Contact = () => {
	const { styles } = useContext(StylesContext);

	return (
		<ContentPage title="Contact" navFadeIn>
			<div css={contactStyles(styles)}>
				<h2>Please don&apos;t.</h2>

				<p>
					This is a personal / family / friend thing.
					<br />
					It&apos;s meant exclusively for that use and, and frankly the answer to any question
					is almost certainly &quot;no&quot;. I don&apos;t mean this to be rude, just that I
					have no intention on supporting this for public use.
				</p>
				<p>
					If you end up here and use it for recipes that&apos;s fine, but you are not the target
					audience and I&apos;m not going to make any changes / fixes / updates for that purpose.
				</p>
				<p>
					If you know me and can contact me in person, then obviously feel free, especially if
					you come bearing beerrs.
				</p>
			</div>
		</ContentPage>
	);
};

export default Contact;
