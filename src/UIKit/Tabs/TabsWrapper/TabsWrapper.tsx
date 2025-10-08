import React, { useEffect, useState } from 'react'
import TabSelectorItem from '../TabSelectorItem/TabSelectorItem'
import Icons from '../../shared/icons'
import TabButton from '../TabButton/TabButton'

interface TabsWrapperProps {
	children: any
	activeTabCodeGlobal?: string
	setActiveTabCodeGlobal?: any
	actionsLayout?: JSX.Element
}

function TabsWrapper({
	children,
	activeTabCodeGlobal,
	setActiveTabCodeGlobal,
	actionsLayout,
}: TabsWrapperProps) {
	const childrenFiltered = children.filter((child : any) => Boolean(child));

	const [activeTabCode, setActiveTabCode] = useState<string>(activeTabCodeGlobal ?? '')

	useEffect(() => {
		if (setActiveTabCodeGlobal) setActiveTabCodeGlobal(activeTabCode)
	}, [activeTabCode])

	useEffect(() => {
		if (activeTabCodeGlobal) setActiveTabCode(activeTabCodeGlobal)
	}, [activeTabCodeGlobal])

	const handleSelectorItemClick = (code: string) => {
		setActiveTabCode(code)
	}

	const createSelectorItem = (child: any) => {
		return (
			<TabSelectorItem
				activeTabCode={activeTabCode}
				handleClick={handleSelectorItemClick}
				code={child.props.code}
				name={child.props.name}
			/>
		)
	}

	const getSelector = () => {
		let array = childrenFiltered.length ? childrenFiltered : [childrenFiltered]
		return array.map((child: any) => {
			return createSelectorItem(child)
		})
	}

	const getActiveTab = () => {
		let array = childrenFiltered.length ? childrenFiltered : [childrenFiltered]
		return array.find((child: any) => child.props.code === activeTabCode)
	}

	useEffect(() => {
		if (!Array.isArray(childrenFiltered)) {
			setActiveTabCode(childrenFiltered.props.code)
			return
		}
		if (!activeTabCodeGlobal) {
			setActiveTabCode(childrenFiltered[0].props.code)
		} else {
			setActiveTabCode(activeTabCodeGlobal)
		}
	}, [])

	return (
		<div className="tabs-wrapper-new">
			<div className="tabs-wrapper-new__header">
				<div className="tabs-wrapper-new__selector">{getSelector()}</div>
				<div className="tabs-wrapper-new__actions">
					{actionsLayout}
				</div>
			</div>
			<div className="tabs-wrapper-new__container">{getActiveTab()}</div>
		</div>
	)
}

export default TabsWrapper
