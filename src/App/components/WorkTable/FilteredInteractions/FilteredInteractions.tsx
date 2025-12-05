import React, { useEffect, useState, useCallback } from "react";
import CustomInputSelect from "./CustomInputSelect/CustomInputSelect";
import CustomMultiSelect from "./CustomMultiSelect/CustomMultiSelect";
import Button from "../../../../UIKit/Button/Button";
import Scripts from "../../../shared/utils/clientScripts.ts";
import { ISearchInteractionsParams } from "../InteractionsList/InteractionsListTypes.ts";
import { useEnterClickHandler } from "../../../shared/hooks.ts";

interface FilteredInteractionsProps {
  setSearchParams: (filters: ISearchInteractionsParams) => void;
  hideEmployeeFilter?: boolean
}
export default function FilteredInteractions({
  setSearchParams,
  hideEmployeeFilter,
}: FilteredInteractionsProps) {
  /** Состояние фильтров */
  const [filters, setFilters] = useState<ISearchInteractionsParams>({});
  const setFilter = (updateData: ISearchInteractionsParams) => {
    setFilters((prev) => ({ ...prev, ...updateData }))
  };

  enum SearchFieldCode {
    /** Телефон / Email */
    phoneOrEmail = "phoneOrEmail",
    /** Тема обращения */
    topic = "topic",
    /** Контрагент */
    contractorName = "contractorName",
    /** Обращение */
    request = "request",
    /** Задача */
    task = "task",
  }

  /** Варианты поиска */
  const searchOptions = [
    { code: SearchFieldCode.phoneOrEmail, name: "Телефон / Email" },
    { code: SearchFieldCode.topic, name: "Тема обращения" },
    { code: SearchFieldCode.contractorName, name: "Контрагент" },
    { code: SearchFieldCode.request, name: "Обращение" },
    { code: SearchFieldCode.task, name: "Задача" },
  ];
  
  const defaultSearchField = searchOptions[0];
  const [selectedFieldCode, setSelectedFieldCode] = useState<SearchFieldCode>(defaultSearchField.code);

  const setSelectedFieldByName = (name: string) => {
    const option = searchOptions.find((o) => o.name === name);
    if (option) setSelectedFieldCode(option.code)
  }

  const getSelectedFieldName = () => {
    const option = searchOptions.find(searchOption => searchOption.code == selectedFieldCode);
    return option?.name
  }

  /** Получение значения поискового запроса */
  const getSearchQuery = () => {
    switch(selectedFieldCode) {
      case SearchFieldCode.phoneOrEmail: return filters.phoneOrEmail;
      case SearchFieldCode.topic: return filters.topic;
      case SearchFieldCode.contractorName: return filters.contractorName;
      case SearchFieldCode.request: return filters.request;
      default: return filters.task;
    }
  }

  /** Установить значения поискового запроса в соответствующее поле фильтров */
  const setSearchQuery = (query?: string) => {
    switch(selectedFieldCode) {
      case SearchFieldCode.phoneOrEmail: return setFilter({phoneOrEmail: query })
      case SearchFieldCode.topic: return setFilter({topic: query })
      case SearchFieldCode.contractorName: return setFilter({contractorName: query })
      case SearchFieldCode.request: return setFilter({request: query })
      default: return setFilter({task: query })
    }
  }


  /** Очистка всех фильтров */
  const clearFilters = () => {
    setFilters({});
  };

  /** Применить все фильтры */
  const applyFilters = () => {
    setSearchParams(filters);
  };
  
  useEnterClickHandler(filters, applyFilters)

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

  // const applyAllEmployeesFilter = async () => {
  //   if(!hideEmployeeFilter) return;

  //   const allUsers = await getUsers();

  // }

  // useEffect(() => {
  //   applyAllEmployeesFilter()
  // }, [])

  return (
    <div className="filtered-interactions">
      <div className="filtered-interactions__header">
        {/* Поле поиска */}
        <CustomInputSelect
          value={getSearchQuery()}
          setValue={setSearchQuery}
          cursor="text"
          placeholder="Поиск"
          searchFields={searchOptions.map((o) => o.name)}
          selectedField={getSelectedFieldName()}
          setSelectedField={setSelectedFieldByName}
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
        {
          !hideEmployeeFilter &&
          <CustomMultiSelect
            value={filters.users}
            setValue={(val) => setFilters((prev) => ({ ...prev, users: val }))}
            title="Сотрудник"
            isSearch={true}
            placeholder="Введите ФИО сотрудника"
            getDataHandler={getUsers}
            isSelectedAllDefault={true}
          />
        }
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
