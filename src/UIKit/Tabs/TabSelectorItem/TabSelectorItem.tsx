import React, { useEffect, useState } from 'react'

interface TabSelectorItemProps {
	handleClick: any
	code: string
	name: string
	activeTabCode: string
}

function TabSelectorItem({ handleClick, code, name, activeTabCode }: TabSelectorItemProps) {
	return (
		<div
			className={
				code === activeTabCode
					? 'tab-selector-item-new tab-selector-item-new_active'
					: 'tab-selector-item-new'
			}
			onClick={() => handleClick(code)}
		>
			{name}
		</div>
	)
}

export default TabSelectorItem
