import React, { useEffect, useRef, useState } from 'react'
import { InputDateType } from './CustomInputDateTypes';
import masks from '../../../../../UIKit/shared/utils/masks';
import CustomInputDateIcons from './CustomInputDateIcons';
import moment from 'moment';

interface CustomInputDateProps {
	/** Тип даты */
	type: InputDateType,
	title: string,
	value?: string,
	/** Дата очистки фильтра (Триггер) */
	clearedAt?: Date
	/** Изменение состояния */
	setValue: (value: string, ...args: any) => any
}

/** Поле ввода даты */
function CustomInputDate(props: CustomInputDateProps) {
	const { type = InputDateType.date, setValue, title, value, clearedAt } = props;
	const pickerRef = useRef<HTMLInputElement>(null)
   	const inputRef = useRef<HTMLInputElement>(null);

	// Открыть календарь
	const openPicker = () => {
		const picker = pickerRef.current;
		if (!picker) return;

		picker.showPicker();
	}

	//  При выборе даты/времени в календаре
	const onChangePickerValue: React.ChangeEventHandler<HTMLInputElement> = () => {
		const picker = pickerRef.current;
		if (!picker) return;

		let value = "";
		// switch (picker.type) {
		// 	case InputDateType.date:
		// 		{
		// 			const values = picker.value.split("-");
		// 			value = values.reverse().join(".");
		// 			break;
		// 		}
		// 	case InputDateType.time:
		// 		{
		// 			value = picker.value;
		// 			break;
		// 		}
		// 	case InputDateType.datetime:
		// 		{
		// 			const values = picker.value.split("T");
		// 			const dateValues = values[0].split("-");
		// 			const timeValue = values[1];

		// 			value = dateValues.reverse().join(".") + " " + timeValue;
		// 			break;
		// 		}
		// }

		const values = picker.value.split("-");
		value = values.reverse().join(".");

		// setValue(value)
		setStringValue(value)
	}
	
	/** Обработчик ввода в поле */
	const onInput: React.ChangeEventHandler<HTMLInputElement> = (ev) => {
		let value = masks.applyDateMask(ev.target.value);
		
		const picker = pickerRef.current;
		if(!value.match(/\d\d\.\d\d\.\d\d\d\d/gm)) {
			if (picker) picker.value = ""
		} else {
			if (picker) picker.value = moment(value, "DD.MM.YYYY").format("YYYY-MM-DD")
		}

		// Запись значения в состояние
		setStringValue(value);
	};

	const [stringValue, setStringValue] = useState<string>(value ?? "");

	useEffect(() => {
		if(stringValue.match(/\d\d\.\d\d\.\d\d\d\d/gm)) {
			setValue(stringValue)
		} else {
			setValue("")
		}
	}, [stringValue])

	useEffect(() => {
		setStringValue("")

		const picker = pickerRef.current;
		if (picker) picker.value = ""
	}, [clearedAt])

	const handleContainerClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

	return (
		<div className='custom-input-date-wt' onClick={handleContainerClick}>
			<div className="custom-input-date-wt__title">{title}</div>
			<input type={type} onChange={onChangePickerValue} className='custom-input-date-wt__picker' ref={pickerRef} />
	
			<div className="custom-input-date-wt__field" tabIndex={0}>
				<input className="custom-input-date-wt__input" value={stringValue} onInput={onInput} type="text" ref={inputRef}/>
		
				<button className="custom-input-date-wt__calendar" onClick={openPicker}>
					{CustomInputDateIcons.calendar}
				</button>
			</div>
		</div>
	)
}

export default CustomInputDate
