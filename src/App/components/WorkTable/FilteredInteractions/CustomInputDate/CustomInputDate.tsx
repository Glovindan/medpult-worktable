import React, { useEffect, useRef, useState } from 'react'
import { InputDateType } from './CustomInputDateTypes';
import icons from '../../../../../UIKit/shared/icons';
import { CustomInputProps } from '../../../../../UIKit/shared/types/types';
import InputButton from '../../../../../UIKit/InputButton/InputButton';
import masks from '../../../../../UIKit/shared/utils/masks';
import CustomInput from '../CustomInput/CustomInput';
import CustomInputDateIcons from './CustomInputDateIcons';
import moment from 'moment';

interface CustomInputDateProps {
	/** Тип даты */
	type: InputDateType,
	title: string,
	value?: string,
	/** Изменение состояния */
	setValue: (value: string, ...args: any) => any
}

/** Поле ввода даты */
function CustomInputDate(props: CustomInputDateProps) {
	const { type = InputDateType.date, setValue, title, value } = props;
	const pickerRef = useRef<HTMLInputElement>(null)

	const buttonSvg = CustomInputDateIcons.calendar;

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
		switch (picker.type) {
			case InputDateType.date:
				{
					const values = picker.value.split("-");
					value = values.reverse().join(".");
					break;
				}
			case InputDateType.time:
				{
					value = picker.value;
					break;
				}
			case InputDateType.datetime:
				{
					const values = picker.value.split("T");
					const dateValues = values[0].split("-");
					const timeValue = values[1];

					value = dateValues.reverse().join(".") + " " + timeValue;
					break;
				}
		}

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
		// setValue(value);
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

	return (
		<div className='custom-input-date-wt'>
			<div className="custom-input-date-wt__title">{title}</div>
			<input type={type} onChange={onChangePickerValue} className='custom-input-date-wt__picker' ref={pickerRef} />
	
			<div className="custom-input-date-wt__field" tabIndex={0}>
				<input className="custom-input-date-wt__input" value={stringValue} onInput={onInput} type="text" />
		
				<button className="custom-input-date-wt__calendar" onClick={openPicker}>
					{CustomInputDateIcons.calendar}
				</button>
			</div>
			{/* <CustomInput
				{...props}
				type='text'
				buttons={<InputButton svg={buttonSvg} clickHandler={openPicker} />}
				placeholder={props.placeholder ?? "ДД.ММ.ГГГГ"}
				maskFunction={masks.applyDateMask}
			/> */}
		</div>
	)
}

export default CustomInputDate
