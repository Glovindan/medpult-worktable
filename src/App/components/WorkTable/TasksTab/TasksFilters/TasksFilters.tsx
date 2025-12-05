import React, { useCallback, useEffect, useState } from "react";
import { ISearchTasksParams, SearchQueryData } from "../TasksList/TasksListTypes";
import { useEnterClickHandler } from "../../../../shared/hooks";
import Scripts from "../../../../shared/utils/clientScripts";
import CustomMultiSelect from "../../FilteredInteractions/CustomMultiSelect/CustomMultiSelect";
import Button from "../../../../../UIKit/Button/Button";
import CustomInputSelect from "../../FilteredInteractions/CustomInputSelect/CustomInputSelect";

type TasksFiltersProps = {
  setSearchParams: (filters: ISearchTasksParams) => void;
  hideEmployeeFilter?: boolean
};

/** Вкладка фильтров задач */
export default function TasksFilters({
  setSearchParams,
  hideEmployeeFilter
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
  const [filters, setFilters] = useState<ISearchTasksParams>({});
  const setFilter = (updateData: ISearchTasksParams) => {
    setFilters((prev) => ({ ...prev, ...updateData }))
  };

  /** Очистка всех фильтров */
  const clearFilters = () => {
    setFilters({})
    setSearchParams({});
    setSelectedFieldCode(defaultSearchField.code)
  };

  /** Применить все фильтры */
  const applyFilters = () => {
    setSearchParams(filters);
  };

  // Обработчик нажатия на enter
  useEnterClickHandler(filters, applyFilters)

  // Получение Типов задач
  const getTypes = useCallback(
    () => Scripts.getTaskTypes(filters.taskSortIds),
    [filters.taskSortIds]
  );

  // Получение Видов задач
  const getSorts = useCallback(
    () => Scripts.getTaskSorts(filters.taskTypeIds),
    [filters.taskTypeIds]
  );

  // Получение групп
  const getGroups = useCallback(
    () => Scripts.getGroupsByUserGroups(filters.employeeIds),
    [filters.employeeIds]
  );

  // Получение сотрудников
  const getUsers = useCallback(
    () => Scripts.getUsersByUserGroups(filters.groupIds),
    [filters.groupIds]
  );

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
          <CustomMultiSelect
            value={filters.taskTypeIds}
            setValue={(val) => setFilter({taskTypeIds: val})}
            title="Тип задачи"
            getDataHandler={getTypes}
          />
          <CustomMultiSelect
            value={filters.taskSortIds}
            setValue={(val) => setFilter({taskSortIds: val})}
            title="Вид задачи"
            getDataHandler={getSorts}
          />
          <CustomMultiSelect
            value={filters.groupIds}
            setValue={(val) => setFilter({groupIds: val})}
            title="Группа"
            isSearch={true}
            placeholder="Введите название группы"
            getDataHandler={getGroups}
          />
          {
            !hideEmployeeFilter &&
            <CustomMultiSelect
              value={filters.employeeIds}
              setValue={(val) => setFilter({employeeIds: val})}
              title="Сотрудник"
              isSearch={true}
              placeholder="Введите ФИО сотрудника"
              getDataHandler={getUsers}
              isSelectedAllDefault={true}
            />
          }
          <CustomMultiSelect
            value={filters.taskStatusCodes}
            setValue={(val) => setFilter({taskStatusCodes: val})}
            title="Статус задачи"
            getDataHandler={Scripts.getTaskStatuses}
          />
        </div>
      </div>
    </>
  );
}
