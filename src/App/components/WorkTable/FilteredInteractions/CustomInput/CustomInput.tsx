import React, { useEffect, useRef, useState } from "react";
import { CustomInputProps } from "../../../../../UIKit/shared/types/types";

function CustomInput(props: CustomInputProps) {
  const {
    value = "",
    setValue,
    name,
    buttons,
    cursor = "text",
    clickHandler,
    isOpen = false,
    wrapperRef = useRef<HTMLDivElement>(null),
    readOnly = false,
    isViewMode = false,
    placeholder = "",
    maskFunction,
    isInvalid,
    customClassname,
    style,
    width,
    ...inputStyles
  } = props;

  /** Обработчик ввода в поле */
  const onInput: React.ChangeEventHandler<HTMLInputElement> = (ev) => {
    if (!setValue) return;

    let value = ev.target.value;
    // Обработка текста по маске
    if (maskFunction) value = maskFunction(ev.target.value);

    // Запись значения в состояние
    setValue(value);
  };

  // Кнопки поля ввода
  const [buttonsWrapper, setButtonsWrapper] = useState<React.JSX.Element>();
  useEffect(() => {
    // Если режим редактирования и указаны кнопки, то отрисовать кнопки
    if (!isViewMode && buttons) {
      setButtonsWrapper(<div className="custom-input-wt__buttons">{buttons}</div>);
    } else {
      setButtonsWrapper(undefined);
    }
  }, [buttons]);

  return (
    <div
      className={`custom-input-wt__wrapper ${
        isOpen ? "custom-input-wt__wrapper_open" : ""
      } ${isInvalid ? "custom-input-wt__wrapper_invalid" : ""} ${
        customClassname ? customClassname : ""
      }`}
      ref={wrapperRef}
    >
      <input
        name={name}
        className="custom-input-wt__input"
        style={{
          cursor: cursor,
          width: width,
        }}
        onInput={onInput}
        onClick={clickHandler}
        value={value}
        readOnly={readOnly || isViewMode}
        placeholder={placeholder}
        {...inputStyles}
      />
      {buttonsWrapper}
    </div>
  );
}

export default CustomInput;
