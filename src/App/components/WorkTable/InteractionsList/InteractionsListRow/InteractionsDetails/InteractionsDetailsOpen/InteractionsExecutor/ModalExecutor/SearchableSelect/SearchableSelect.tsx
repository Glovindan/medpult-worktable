import React, { useState, useRef, useEffect } from "react";
import icons from "../../../../../../icons";
import { ObjectItem } from "../../../../../../../../../../UIKit/Filters/FiltersTypes";
import Loader from "../../../../../../../../../../UIKit/Loader/Loader";

interface SearchableSelectProps {
  label: string;
  placeholder: string;
  value: ObjectItem | null;
  onSelect: (value: ObjectItem) => void;
  getDataHandler?: () => Promise<ObjectItem[]>;
}

export function SearchableSelect({
  label,
  placeholder,
  value,
  onSelect,
  getDataHandler,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<ObjectItem[]>([]);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = async () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) setSearch("");

    // Ленивое подгружение данных
    if (getDataHandler && items.length === 0) {
      setLoading(true);
      const data = await getDataHandler();
      setItems(data);
      setLoading(false);
    }
  };

  const filteredItems = items.filter((item) =>
    item.value.toLowerCase().includes(search.toLowerCase())
  );

  // Закрытие по клику вне
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="searchable-select">
      <div className="searchable-select__label">{label}</div>
      <div className="searchable-select__input" onClick={toggleDropdown}>
        <span className="searchable-select__input__value">
          {value?.value || ""}
        </span>

        <span
          className={`searchable-select__input__icon ${
            isOpen ? "searchable-select__input__icon_rotated" : ""
          }`}
        >
          {icons.arrowIcon}
        </span>
      </div>

      {isOpen && (
        <div className="searchable-select__dropdown">
          <div className="searchable-select__dropdown__search-wrapper">
            <input
              type="text"
              placeholder={placeholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="searchable-select__dropdown__search"
              style={{
                width: "100%",
                border: "1px solid #a4a7ae",
                borderRadius: "8px",
                height: "40px",
              }}
              onFocus={(e) => (e.target.style.border = "1px solid #1570ef")}
            />

            {search && ( // показываем иконку только если есть введённый текст
              <span
                className="searchable-select__dropdown__clear"
                onClick={() => setSearch("")}
              >
                {icons.closeIcon}
              </span>
            )}
          </div>

          <div className="searchable-select__dropdown__search__list">
            {loading ? (
              <Loader />
            ) : (
              filteredItems.map((item) => (
                <div
                  key={item.code}
                  className="searchable-select__dropdown__search__list__item"
                  onClick={() => {
                    onSelect(item);
                    setIsOpen(false);
                    setSearch("");
                  }}
                >
                  {item.value}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
