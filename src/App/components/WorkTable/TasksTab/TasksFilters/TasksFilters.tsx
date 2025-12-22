import React, { useCallback, useEffect, useState } from "react";
import { ISearchTasksParams, SearchQueryData } from "../TasksList/TasksListTypes";
import { useEnterClickHandler } from "../../../../shared/hooks";
import Scripts from "../../../../shared/utils/clientScripts";
import CustomMultiSelect from "../../FilteredInteractions/CustomMultiSelect/CustomMultiSelect";
import Button from "../../../../../UIKit/Button/Button";
import CustomInputSelect from "../../FilteredInteractions/CustomInputSelect/CustomInputSelect";
import { InputDateType } from "../../../../../UIKit/CustomInputDate/CustomInputDateTypes";
import CustomInputDate from "../../FilteredInteractions/CustomInputDate/CustomInputDate";

type TasksFiltersProps = {
  setSearchParams: (filters: ISearchTasksParams) => void;
  searchParams: ISearchTasksParams;
  /** Является вкладкой моих задач */
  isMyTasksTab?: boolean
  isFilterLoading?: boolean
};

/** Вкладка фильтров задач */
export default function TasksFilters({
  setSearchParams,
  searchParams,
  isMyTasksTab,
  isFilterLoading
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
  useEffect(() => {
    setFilters(searchParams)
  }, [isFilterLoading])
  const setFilter = (updateData: ISearchTasksParams) => {
    setFilters((prev) => ({ ...prev, ...updateData }))
  };

  /** Очистка всех фильтров */
  const clearFilters = () => {
    setFilters({})
    setSearchParams({});
    setSelectedFieldCode(defaultSearchField.code)
    handleClearDateFilters()
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

  // Обработчик выбора Типа задач
  const handleSelectTypeOption = async(selectedTypesCodes: string[]) => {
    // // Фильтрация выбранных Видов задач
    // const availableSorts = await Scripts.getTaskSorts(selectedTypesCodes)
    // const selectedSortsFiltered = filters.taskSortIds?.filter(sortCode => availableSorts.find(availableSort => availableSort.code == sortCode));

    setFilter({/* taskSortIds: selectedSortsFiltered, */ taskTypeIds: selectedTypesCodes})
  }

  // Обработчик выбора Вида задач
  const handleSelectSortOption = async(selectedSortsCodes: string[]) => {
    // // Фильтрация выбранных Типов задач
    // const availableTypes = await Scripts.getTaskTypes(selectedSortsCodes)
    // const selectedTypesFiltered = filters.taskTypeIds?.filter(typeCode => availableTypes.find(availableType => availableType.code == typeCode));

    setFilter({taskSortIds: selectedSortsCodes/* , taskTypeIds: selectedTypesFiltered */})
  }

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

  const [clearedAt, setClearedAt] = useState<Date>(new Date());
  const handleClearDateFilters = () => {
    setClearedAt(new Date())
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
            setValue={handleSelectTypeOption}
            title="Тип задачи"
            getDataHandler={getTypes}
          />
          <CustomMultiSelect
            value={filters.taskSortIds}
            // setValue={(val) => setFilter({taskSortIds: val})}
            setValue={handleSelectSortOption}
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
            !isMyTasksTab &&
            <CustomMultiSelect
              value={filters.employeeIds}
              setValue={(val) => setFilter({employeeIds: val})}
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
