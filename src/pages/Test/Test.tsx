import React, { useContext } from 'react';
import { StylesContext } from '../../context/StylesContext';
/** @jsxImportSource @emotion/react */
import { testStyles, testStylesColors } from './Test.styles';

const Test = () => {
	const { styles } = useContext(StylesContext);

	return (
		<div css={testStyles()}>
			{/* Colors */}
			<div css={testStylesColors()}>
				<h2>Colors</h2>

				{Object.keys(styles.colors).map((colorCategory: any, i: number) => (
					// eslint-disable-next-line react/no-array-index-key
					<section key={i}>
						<h2>
							{colorCategory}
							:
						</h2>
						<ul>
							{Object.keys(styles.colors[colorCategory]).map((color: any, j: number) => (
								// eslint-disable-next-line react/no-array-index-key
								<li key={j}>
									<p style={{
										color: styles.colors[colorCategory][color],
									}}
									>
										{color}
									</p>

									<p style={{
										backgroundColor: styles.colors[colorCategory][color],
										color: '#000',
									}}
									>
										{styles.colors[colorCategory][color]}
									</p>

									<p style={{
										backgroundColor: styles.colors[colorCategory][color],
										color: '#FFF',
									}}
									>
										{styles.colors[colorCategory][color]}
									</p>
								</li>
							))}
						</ul>
					</section>
				))}
			</div>
		</div>
	);
};

export default Test;
