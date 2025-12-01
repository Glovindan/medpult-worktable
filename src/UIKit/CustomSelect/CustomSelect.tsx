import React, { useEffect, useRef, useState } from "react";
import CustomSelectRow from "./CustomSelectRow/CustomSelectRow";
import CustomInput from "../CustomInput/CustomInput";
import { CustomSelectOption, CustomSelectProps } from "./CustomSelectTypes";
import InputButton from "../InputButton/InputButton";
import icons from "../shared/icons";
import CustomSelectList from "./CustomSelectList/CustomSelectList";

/** Выпадающий список */
function CustomSelect(props: CustomSelectProps) {
  const {
    isViewMode,
    getDataHandler,
    value,
    setValue,
    disabled,
    isInvalid,
    showClearButton = true,
    isEmail,
  } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [listWidth, setListWidth] = useState<number>(100);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [listValues, setListValues] = useState<CustomSelectOption[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const clickHandler = async () => {
    if (disabled || isViewMode || isOpen) return;
    // Показать список
    setIsOpen(true);
    // Показать лоадер
    setIsLoading(true);

    // Показать данные
    setListValues([]);
    const values = await getDataHandler();
    console.log(values);
    setListValues(values);

    // Скрыть лоадер
    setIsLoading(false);
  };

  const handleOptionClick = ({
    value,
    code,
  }: {
    value: string;
    code: string;
  }) => {
    props.setValue(value, code);
    setIsOpen(false);
  };

  useEffect(() => {
    const wrapper = wrapperRef.current!;
    setListWidth(wrapper.getBoundingClientRect().width);
  }, [isOpen]);

  const emailSvg = icons.emailButton;
  const buttonSvg = icons.Triangle;
  const displayValue = Array.isArray(value) ? value.join(", ") : value;

  const hasValue = Boolean(displayValue && displayValue.trim());
  const isEditable = !disabled && !isViewMode;

  return (
    <div className="custom-select" ref={rootRef}>
      <CustomInput
        {...props}
        isInvalid={isInvalid}
        value={displayValue}
        clickHandler={clickHandler}
        wrapperRef={wrapperRef}
        cursor={isViewMode ? "text" : "pointer"}
        isOpen={isOpen}
        readOnly
        disabled={disabled}
        buttons={
          isEmail
            ? [<InputButton svg={emailSvg} clickHandler={clickHandler} />]
            : [<InputButton svg={buttonSvg} clickHandler={clickHandler} />]
        }
      />
      {isOpen && (
        <CustomSelectList
          rootRef={rootRef}
          isOpen={isOpen}
          closeHandler={() => setIsOpen(false)}
          isLoading={isLoading}
          listWidth={listWidth}
        >
          {listValues.map((value) => (
            <CustomSelectRow
              value={value.value}
              data={value.code}
              clickHandler={(value: string, data?: string) =>
                handleOptionClick({ value: value, code: data ?? "" })
              }
            />
          ))}
        </CustomSelectList>
      )}
    </div>
  );
}

export default CustomSelect;
