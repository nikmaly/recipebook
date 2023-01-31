/** @jsxImportSource @emotion/react */
import React from 'react';
import { css, SerializedStyles } from '@emotion/react';
import { TStyles, StylesContext } from '../../context/Styles';
import { useViewport } from '../../hooks/useViewport';

export const devToolingStyles = (styles: TStyles): SerializedStyles => css`
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100vw;
	background: transparent;
	z-index: 99999;

	> div {
		padding: 2px 4px;
		border: 1px solid #666;
		text-align: center;
		font-size: 16px;
		font-family: sans-serif;
		line-height: 22px;
		background-color: ${styles.colors.white[0]};
		color: #666;

		&:first-of-type {
			border-top-right-radius: 5px;
		}

		&:last-of-type {
			border-top-left-radius: 5px;
		}
	}
`;

type DevToolingProps = {
	display: boolean;
	children: React.ReactNode;
};

const DevTooling: React.FunctionComponent<DevToolingProps> = ({
	display = false,
	children,
}) => {
	const { styles } = React.useContext(StylesContext);
	const { viewportWidth } = useViewport();
	const [breakpoint, setBreakpoint] = React.useState('');

	React.useEffect(() => {
		let bp = 'xxs';

		Object.keys(styles.breakpoints).forEach(((item) => {
			bp = parseInt(styles.breakpoints[item].val, 10) < viewportWidth
				? item
				: bp;
		}));

		setBreakpoint(bp);
	}, [viewportWidth]);

	return (
		<>
			{ display && (
				<div css={devToolingStyles(styles)}>
					<div>
						{breakpoint}
					</div>
					<div>
						{viewportWidth}
						px
					</div>
				</div>
			)}
			{children}
		</>
	);
};

export default DevTooling;
