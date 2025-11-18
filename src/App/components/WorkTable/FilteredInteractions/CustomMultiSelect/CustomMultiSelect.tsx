import React, { useEffect, useState, useRef } from "react";
import icons from "../../InteractionsList/icons";
import { ObjectItem } from "../../../../../UIKit/Filters/FiltersTypes";
import Loader from "../../../../../UIKit/Loader/Loader";

interface MultiSelectProps {
  value?: string[];
  setValue: (v: string[]) => void;
  title: string;
  getDataHandler: () => Promise<ObjectItem[]>;
  isSearch?: boolean;
  placeholder?: string;
}

export default function CustomMultiSelect({
  value = [],
  setValue,
  title,
  getDataHandler,
  isSearch = false,
  placeholder,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState<ObjectItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setOpen((prev) => !prev);

  // Подгрузка данных при открытии дропдауна
  useEffect(() => {
    if (open) {
      setIsLoading(true);
      getDataHandler()
        .then((data) => setOptions(data))
        .finally(() => setIsLoading(false));
      setSearch("");
    }
  }, [open, getDataHandler]);

  const isAllSelected = value.length === options.length && options.length > 0;

  const handleOptionClick = (code: string) => {
    if (code === "all") {
      setValue(isAllSelected ? [] : options.map((o) => o.code));
    } else {
      setValue(
        value.includes(code)
          ? value.filter((v) => v !== code)
          : [...value, code]
      );
    }
  };

  // Отображение выбранных элементов
  const selectedLabels =
    value.length === 0
      ? ""
      : value.length === 1
      ? options.find((o) => o.code === value[0])?.value || ""
      : `Выбрано: ${value.length}`;

  // Фильтрация элементов по поисковой строке
  const filteredOptions = (
    isSearch ? [{ code: "all", value: "Все" }, ...options] : options
  ).filter(
    (opt) => !isSearch || opt.value.toLowerCase().includes(search.toLowerCase())
  );
  // Закрытие дропдауна при клике вне
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div className="multi-select" ref={rootRef}>
      <div className="multi-select__title">{title}</div>

      <div
        className="multi-select__field"
        onClick={toggleDropdown}
        tabIndex={0}
      >
        <span className="multi-select__field__label">{selectedLabels}</span>

        <span
          className="multi-select__arrow"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          {icons.arrowIcon}
        </span>
      </div>

      {open && (
        <div className="multi-select__dropdown">
          {/* Поле поиска */}
          {isSearch && (
            <div className="multi-select__search">
              <input
                type="text"
                value={search}
                placeholder={placeholder}
                onChange={(e) => setSearch(e.target.value)}
                className="multi-select__search__input"
                style={{
                  width: "100%",
                  border: "1px solid #a4a7ae",
                  borderRadius: "8px",
                }}
              />

              {search && (
                <span
                  className="multi-select__search__clear"
                  onClick={() => setSearch("")}
                >
                  {icons.closeIcon}
                </span>
              )}
            </div>
          )}

          {/* Выпадающий список */}
          <div className="multi-select__dropdown__list">
            {isLoading ? (
              <Loader />
            ) : (
              filteredOptions.map((opt) => {
                const checked =
                  opt.code === "all" ? isAllSelected : value.includes(opt.code);

                return (
                  <div
                    key={opt.value}
                    className="multi-select__dropdown__list__option"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOptionClick(opt.code);
                    }}
                  >
                    <span className="multi-select__dropdown__list__selected">
                      {checked ? icons.selectedIcon : icons.notSelectedIcon}
                    </span>

                    <span className="multi-select__dropdown__list__option_value">
                      {opt.value}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
