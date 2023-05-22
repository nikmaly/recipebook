/** @jsxImportSource @emotion/react */
import React from 'react';
import { StylesContext } from 'context/Styles';
import {
	stepCounterStyles,
	stepCounterStepStyles,
} from '.';

type TStepCounterProps = {
	formSteps: string[];
	currentStep: number;
	setStep: (targetStep: number) => void;
};

const StepCounter: React.FunctionComponent<TStepCounterProps> = ({
	formSteps,
	currentStep,
	setStep,
}) => {
	const { styles } = React.useContext(StylesContext);

	return (
		<nav css={stepCounterStyles(styles)}>
			{
				formSteps
					&& formSteps.length > 0
					&& formSteps.map((step: string, i: number) => (
						<button
							type="button"
							onClick={() => setStep(i)}
							css={stepCounterStepStyles(styles, currentStep === i)}
							key={step}
						>
							<h4>
								{/* Visually display offset index */}
								{i + 1}
							</h4>

							<p>
								{step}
							</p>
						</button>
					))
			}
		</nav>
	);
};

export default StepCounter;
