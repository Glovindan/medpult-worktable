import React from 'react';

/** Обертка модального окна */
export default function ModalWrapper({ children }) {

	return (
		<div className='modal-wrapper'>
			{children}
		</div>
	)
}