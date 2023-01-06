/** @jsxImportSource @emotion/react */
import React, { useContext } from 'react';
import { StylesContext } from '../../context/StylesContext';
import {
	landingHeaderStyles,
	landingHeaderContentStyles,
	landingHeaderBackgroundStyles,
	landingHeaderShadeStyles,
	landingHeaderFrostingStyles,
	landingHeaderFrostingEdgesStyles,
	landingHeaderContentTextStyles,
	landingHeaderContentTextWrapperStyles,
} from './LandingHeader.styles';

const LandingHeader: React.FunctionComponent = () => {
	const { styles } = useContext(StylesContext);

	return (
		<section css={landingHeaderStyles(styles)}>
			<div css={landingHeaderBackgroundStyles(styles)}>
				{/* Shade */}
				<div css={landingHeaderShadeStyles(styles)} />
				{/* Frosting */}
				<div css={landingHeaderFrostingStyles(styles)} />
				{/* Frosting Edges */}
				<div css={landingHeaderFrostingEdgesStyles(styles)} />
			</div>

			<div css={landingHeaderContentStyles(styles)}>
				<div css={landingHeaderContentTextStyles(styles)}>
					<div css={landingHeaderContentTextWrapperStyles(styles)}>
						<h1>
							Nik Malyaris
							<span className="header-logo" />
							Photography
						</h1>
					</div>
				</div>
			</div>
		</section>
	);
};

export default LandingHeader;
