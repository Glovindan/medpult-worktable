import React from 'react'
import { initGlobalContext } from './GlobalContext'

/** Данные списка застрахованных */
export class InsuredListData {
	/** Идентификатор обращения */
	requestId: string

	constructor() {
		this.requestId = ''
	}
}

export const insuredListContext = initGlobalContext<InsuredListData>(new InsuredListData())
