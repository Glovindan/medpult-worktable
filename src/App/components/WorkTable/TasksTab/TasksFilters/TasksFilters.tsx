import React, { useCallback, useEffect, useState } from "react";
import { ISearchTasksParams, SearchQueryData } from "../TasksList/TasksListTypes";
import { useEnterClickHandler } from "../../../../shared/hooks";
import Scripts from "../../../../shared/utils/clientScripts";
import CustomMultiSelect from "../../FilteredInteractions/CustomMultiSelect/CustomMultiSelect";
import Button from "../../../../../UIKit/Button/Button";
import CustomInputSelect from "../../FilteredInteractions/CustomInputSelect/CustomInputSelect";
import { InputDateType } from "../../../../../UIKit/CustomInputDate/CustomInputDateTypes";
import CustomInputDate from "../../FilteredInteractions/CustomInputDate/CustomInputDate";
import { useDebounce } from "../../../../shared/utils/utils";
import TaskSortsFilter from "./TaskSortsFilter";
import TaskTypesFilter from "./TaskTypesFilter";
import { useUserGroupsFilter } from "../../../../shared/utils/useUserGroupsFilter";

type TasksFiltersProps = {
  setSearchParams: (filters: ISearchTasksParams) => void;
  searchParams: ISearchTasksParams;
  /** Является вкладкой моих задач */
  isMyTasksTab?: boolean
};

/** Вкладка фильтров задач */
export default function TasksFilters({
  setSearchParams,
  searchParams,
  isMyTasksTab,
}: TasksFiltersProps) {

  enum SearchFieldCode {
    /** Номер */
    taskNumber,
    /** ФИО */
    insuredFullname,
    /** Номер полиса */
    insuredPolicyNumber,
    /** Регион */
    region,
  }

  /** Варианты поиска */
  const searchOptions = [
    { code: SearchFieldCode.taskNumber, name: "Номер" },
    { code: SearchFieldCode.insuredFullname, name: "ФИО" },
    { code: SearchFieldCode.insuredPolicyNumber, name: "Полис" },
    { code: SearchFieldCode.region, name: "Регион" },
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

  /** Состояние фильтров */
  const [filters, setFilters] = useState<ISearchTasksParams>(searchParams);
  
  const setFilter = (updateData: ISearchTasksParams) => {
    setFilters((prev) => ({ ...prev, ...updateData }))
  };

  /** Очистка всех фильтров */
  const clearFilters = () => {
    setFilters({})
    setSearchParams({});
    setSelectedFieldCode(defaultSearchField.code)
    handleClearDateFilters()
    handleResetUserGroupsFilters()
  };

  /** Применить все фильтры */
  const applyFilters = () => {
    setSearchParams(filters);
  };

  // Обработчик нажатия на enter
  useEnterClickHandler(filters, applyFilters)

  const [filterUpdatedAt, setFilterUpdatedAt] = useState<Date>(new Date());
  const handleUpdateGetCallbacks = () => {
    setFilterUpdatedAt(new Date());
  }

  /** Получение значения поискового запроса */
  const getSearchQuery = () => {
    switch(selectedFieldCode) {
      case SearchFieldCode.taskNumber: return filters.taskNumber;
      case SearchFieldCode.insuredFullname: return filters.fullName;
      case SearchFieldCode.insuredPolicyNumber: return filters.policyNumber;
      default: return filters.region;
    }
  }

  /** Установить значения поискового запроса в соответствующее поле фильтров */
  const setSearchQuery = (query?: string) => {
    switch(selectedFieldCode) {
      case SearchFieldCode.taskNumber: return setFilter({taskNumber: query })
      case SearchFieldCode.insuredFullname: return setFilter({fullName: query })
      case SearchFieldCode.insuredPolicyNumber: return setFilter({policyNumber: query })
      default: return setFilter({region: query })
    }
  }

  const [clearedAt, setClearedAt] = useState<Date>(new Date());
  const handleClearDateFilters = () => {
    setClearedAt(new Date())
  }

  
  
  const {handleSelectUsers, handleSelectGroups, getUsers, getGroups, handleResetUserGroupsFilters} = useUserGroupsFilter(setFilters, isMyTasksTab ?? false);

  return (
    <>
      <div className="tasks-filters">
        <div className="tasks-filters__header">
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
          <div className="tasks-filters__header__button">
            <Button
              title={"Очистить все"}
              clickHandler={clearFilters}
              buttonType="outline"
            />
            <Button title={"Применить"} clickHandler={applyFilters} />
          </div>
        </div>
        <div className="tasks-filters__search">
          <CustomMultiSelect
            value={filters.urgencyIds}
            setValue={(val) => setFilter({urgencyIds: val})}
            title="Срочность"
            getDataHandler={Scripts.getUrgencyList}
          />
          <TaskTypesFilter 
            filters={filters} 
            filterUpdatedAt={filterUpdatedAt} 
            setFilter={setFilter} 
            handleUpdateGetCallbacks={handleUpdateGetCallbacks} 
          />
          <TaskSortsFilter 
            filters={filters} 
            filterUpdatedAt={filterUpdatedAt} 
            setFilter={setFilter} 
            handleUpdateGetCallbacks={handleUpdateGetCallbacks} 
          />
          <CustomMultiSelect
            value={filters.groupIds}
            setValue={handleSelectGroups}
            title="Группа"
            isSearch={true}
            placeholder="Введите название группы"
            getDataHandler={getGroups}
          />
          {
            !isMyTasksTab &&
            <CustomMultiSelect
              value={filters.employeeIds}
              setValue={handleSelectUsers}
              title="Сотрудник"
              isSearch={true}
              placeholder="Введите ФИО сотрудника"
              getDataHandler={getUsers}
            />
          }
          <CustomMultiSelect
            value={filters.taskStatusCodes}
            setValue={(val) => setFilter({taskStatusCodes: val})}
            title="Статус задачи"
            getDataHandler={Scripts.getTaskStatuses}
          />
          <CustomInputDate title="Дата с" type={InputDateType.date} value={filters.dateFrom} setValue={(val) => setFilter({dateFrom: val})} clearedAt={clearedAt} />
          <CustomInputDate title="Дата по" type={InputDateType.date} value={filters.dateTo} setValue={(val) => setFilter({dateTo: val})} clearedAt={clearedAt} />
        </div>
      </div>
    </>
  );
}
