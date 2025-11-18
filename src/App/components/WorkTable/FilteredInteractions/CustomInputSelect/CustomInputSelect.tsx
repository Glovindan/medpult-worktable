import React, { useEffect, useRef, useState } from "react";
import icons from "../../../../shared/icons";

interface CustomInputSelectProps {
  value?: string;
  setValue?: (val: string) => void;
  searchFields?: string[];
  selectedField?: string;
  setSelectedField?: (field: string) => void;
  placeholder?: string;
  isViewMode?: boolean;
  readOnly?: boolean;
  cursor?: string;
  buttons?: any;
}

function CustomInputSelect({
  value = "",
  setValue,
  searchFields = [],

  selectedField,
  setSelectedField,
  placeholder = "",
  isViewMode = false,
  readOnly = false,
  cursor = "text",
  buttons,
}: CustomInputSelectProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    if (readOnly || isViewMode) return;
    setDropdownOpen((prev) => !prev);
  };

  const handleOptionClick = (field: string) => {
    setSelectedField?.(field);
    setValue?.("");
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Кнопки поля ввода
  const [buttonsWrapper, setButtonsWrapper] = useState<React.JSX.Element>();
  useEffect(() => {
    // Если режим редактирования и указаны кнопки, то отрисовать кнопки
    if (!isViewMode && buttons) {
      setButtonsWrapper(<div className="custom-input__buttons">{buttons}</div>);
    } else {
      setButtonsWrapper(undefined);
    }
  }, [buttons]);

  return (
    <div className="custom-input-select" ref={rootRef}>
      {/* Выпадающий список */}
      {searchFields.length > 0 && (
        <div className="custom-input-select__field" onClick={toggleDropdown}>
          <span>{selectedField}</span>
          <span
            className="custom-input-select__arrow"
            style={{
              transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            {icons.Arrow}
          </span>

          {dropdownOpen && (
            <div className="custom-input-select__dropdown">
              {searchFields.map((field) => (
                <div
                  key={field}
                  className={`custom-input-select__option ${
                    field === selectedField
                      ? "custom-input-select__option__active"
                      : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOptionClick(field);
                  }}
                >
                  <span className="custom-input-select__option__check">
                    {field === selectedField && icons.Check}
                  </span>
                  {field}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Инпут */}
      <input
        className="custom-input-select__input"
        style={{
          cursor: cursor,
        }}
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue && setValue(e.target.value)}
        readOnly={readOnly || isViewMode}
      />
      {buttonsWrapper}
    </div>
  );
}

export default CustomInputSelect;
