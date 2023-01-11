/* eslint-disable react/no-array-index-key */
/** @jsxImportSource @emotion/react */
import React from 'react';
import MuiTab from '@mui/material/Tab';
import MuiTabContext from '@mui/lab/TabContext';
import MuiTabList from '@mui/lab/TabList';
import MuiTabPanel from '@mui/lab/TabPanel';
import { StylesContext } from '../../context/Styles';
import {
	tabStyles,
	tabButtonStyles,
	tabContentStyles,
} from './Tab.styles';

export type ITabContent = {
	tabTitle: string;
	tabContent: React.ReactNode;
	tabIcon: React.ReactNode;
}

export type ITabProps = {
	title?: string
	content: ITabContent[];
}

const Tab: React.FunctionComponent<ITabProps> = ({
	title,
	content,
}) => {
	const { styles } = React.useContext(StylesContext);
	const [currentTab, setCurrentTab] = React.useState<string>('0');

	const handleTabChange = (
		event: React.SyntheticEvent,
		newTab: string,
	) => {
		setCurrentTab(newTab);
	};

	return (
		<div css={tabStyles(styles)}>
			{ title && <h3>{title}</h3> }

			{ content && (
				<MuiTabContext value={currentTab}>
					<MuiTabList
						onChange={handleTabChange}
						textColor="primary"
						indicatorColor="secondary"
						variant="fullWidth"
						aria-label="Ingredients and method tabs"
					>
						{content.map((tab: ITabContent, i: number) => (
							<MuiTab
								key={`tab-${i}`}
								css={tabButtonStyles(styles)}
								label={tab.tabTitle}
								icon={<>{tab.tabIcon}</>}
								iconPosition="start"
								value={i.toString()}
							/>
						))}
					</MuiTabList>

					{content.map((tab: ITabContent, i: number) => (
						<MuiTabPanel
							value={i.toString()}
							css={tabContentStyles(styles)}
							key={`tab-panel-${i}`}
						>
							{tab.tabContent}
						</MuiTabPanel>
					))}
				</MuiTabContext>
			)}
		</div>
	);
};

export default Tab;
