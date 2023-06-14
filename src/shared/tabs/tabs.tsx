import React, { useState } from "react";
import styles from './tabs.module.scss';
import Tab from '../../domain/todos/tab/tab';

interface IProps {
	tabs: Tab[]
}

function TabBar(props: React.PropsWithChildren<IProps>) {

	const [selectedTab, setSelectedTab] = useState(0);

	async function setTab(selectedTabIndex: number) {
		setSelectedTab(selectedTabIndex);
		props.tabs[selectedTabIndex].onChangeCallback();
	}

	function renderTabChild(child: Tab, index: number) {
		return (
			<div
				key={index}
				onClick={() => setTab(index)}
				className={`${selectedTab === index ? styles.tab_nav_item_active : styles.tab_nav_item}`}>
				{child.title}
			</div>
		)
	}

	return (
		<>
			<div className={styles.tab_nav}>
				{
					(props.tabs as Tab[]).map(renderTabChild)
				}
			</div>
		</>
	)
}

export default TabBar;