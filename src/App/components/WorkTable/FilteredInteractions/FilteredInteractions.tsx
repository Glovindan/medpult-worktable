import React, { useEffect, useState, useCallback } from "react";
import CustomInputSelect from "./CustomInputSelect/CustomInputSelect";
import CustomMultiSelect from "./CustomMultiSelect/CustomMultiSelect";
import Button from "../../../../UIKit/Button/Button";
import { ObjectItem } from "../../../../UIKit/Filters/FiltersTypes";
import Scripts from "../../../shared/utils/clientScripts.ts";

interface InteractionsFilters {
  searchQuery: string;
  searchField: string;
  channels: string[];
  lines: string[];
  groups: string[];
  users: string[];
  statuses: string[];
}
interface FilteredInteractionsProps {
  setSearchParams: (filters: InteractionsFilters) => void;
}
export default function FilteredInteractions({
  setSearchParams,
}: FilteredInteractionsProps) {
  /** Состояние фильтров */
  const [filters, setFilters] = useState<InteractionsFilters>({
    searchQuery: "",
    searchField: "phoneOrEmail",
    channels: [],
    lines: [],
    groups: [],
    users: [],
    statuses: [],
  });
  /** Варианты поиска */
  const searchOptions = [
    { code: "phoneOrEmail", name: "Телефон / Email" },
    { code: "topic", name: "Тема обращения" },
    { code: "contractorName", name: "Контрагент" },
    { code: "request", name: "Обращение" },
    { code: "task", name: "Задача" },
  ];

  const selectedFieldName = searchOptions.find(
    (o) => o.code === filters.searchField
  )?.name;

  /** Очистка всех фильтров */
  const clearFilters = () => {
    setFilters({
      searchQuery: "",
      searchField: "phoneOrEmail",
      channels: [],
      lines: [],
      groups: [],
      users: [],
      statuses: [],
    });
  };

  /** Применить все фильтры */
  const applyFilters = () => {
    setSearchParams(filters);
  };

  /**  Обработчик нажатия на enter*/
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        applyFilters();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [filters]);

  //Получение каналов
  const getChannels = useCallback(
    () => Scripts.getChannels(filters.lines),
    [filters.lines]
  );
  //Получение линий
  const getLines = useCallback(
    () => Scripts.getLines(filters.channels),
    [filters.channels]
  );
  //Получение групп
  const getGroups = useCallback(
    () => Scripts.getUserGroups(filters.users),
    [filters.users]
  );
  //Получение сотрудников
  const getUsers = useCallback(
    () => Scripts.getUsersInteraction(filters.groups),
    [filters.groups]
  );

  return (
    <div className="filtered-interactions">
      <div className="filtered-interactions__header">
        {/* Поле поиска */}
        <CustomInputSelect
          value={filters.searchQuery}
          setValue={(val) =>
            setFilters((prev) => ({ ...prev, searchQuery: val }))
          }
          cursor="text"
          placeholder="Поиск"
          searchFields={searchOptions.map((o) => o.name)}
          selectedField={selectedFieldName}
          setSelectedField={(name) => {
            const option = searchOptions.find((o) => o.name === name);
            if (option)
              setFilters((prev) => ({ ...prev, searchField: option.code }));
          }}
        />
        <div className="filtered-interactions__header__button">
          <Button
            title={"Очистить все"}
            clickHandler={clearFilters}
            buttonType="outline"
          />
          <Button title={"Применить"} clickHandler={applyFilters} />
        </div>
      </div>
      <div className="filtered-interactions__search">
        <CustomMultiSelect
          value={filters.channels}
          setValue={(val) => setFilters((prev) => ({ ...prev, channels: val }))}
          title="Канал"
          getDataHandler={getChannels}
        />
        <CustomMultiSelect
          value={filters.lines}
          setValue={(val) => setFilters((prev) => ({ ...prev, lines: val }))}
          title="Точка входа"
          getDataHandler={getLines}
        />
        <CustomMultiSelect
          value={filters.groups}
          setValue={(val) => setFilters((prev) => ({ ...prev, groups: val }))}
          title="Группа"
          isSearch={true}
          placeholder="Введите название группы"
          getDataHandler={getGroups}
        />
        <CustomMultiSelect
          value={filters.users}
          setValue={(val) => setFilters((prev) => ({ ...prev, users: val }))}
          title="Сотрудник"
          isSearch={true}
          placeholder="Введите ФИО сотрудника"
          getDataHandler={getUsers}
        />
        <CustomMultiSelect
          value={filters.statuses}
          setValue={(val) => setFilters((prev) => ({ ...prev, statuses: val }))}
          title="Статус обработки"
          getDataHandler={Scripts.getStatuses}
        />
      </div>
    </div>
  );
}
