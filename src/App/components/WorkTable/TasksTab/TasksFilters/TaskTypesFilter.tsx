import React, { useCallback, useEffect, useState } from "react";
import {
  ISearchTasksParams,
} from "../TasksList/TasksListTypes";
import Scripts from "../../../../shared/utils/clientScripts";
import CustomMultiSelect from "../../FilteredInteractions/CustomMultiSelect/CustomMultiSelect";
import { useDebounce } from "../../../../shared/utils/utils";

type TaskTypesFilterProps = {
  /** Данные поиска задачи */
  filters: ISearchTasksParams;
  /** Дата обновления фильтра */
  filterUpdatedAt: Date;
  /** Обновить поле в фильтре */
  setFilter: (updateData: ISearchTasksParams) => void;
  /** Обновить колбэки для получения списка фильтра */
  handleUpdateGetCallbacks: () => void
};

/** Фильтр типа задачи */
export default function TaskTypesFilter({
  filterUpdatedAt,
  filters,
  setFilter,
  handleUpdateGetCallbacks,
}: TaskTypesFilterProps) {
  const getTypes = useCallback(
    () => Scripts.getTaskTypes(filters.taskSortIds),
    [filterUpdatedAt]
  );

  const [taskTypesIds, setTaskTypesIds] = useState<string[]>([]);
  const taskTypesIdsDebounced = useDebounce(taskTypesIds, 500);

  useEffect(() => {
    handleUpdateSortsBySelectedTypes(taskTypesIdsDebounced)
  }, [taskTypesIdsDebounced])

  // Обработчик выбора Типа задач
  const handleSelectTypeOption = async(selectedTypesCodes: string[]) => {
    setTaskTypesIds(selectedTypesCodes)
    setFilter({taskTypeIds: selectedTypesCodes})
  }

  const handleUpdateSortsBySelectedTypes = async(selectedTypesCodes: string[]) => {
    setFilter({taskTypeIds: selectedTypesCodes})

    // Фильтрация выбранных Видов задач
    const availableSorts = await Scripts.getTaskSorts(selectedTypesCodes)
    const selectedSortsFiltered = filters.taskSortIds?.filter(sortCode => availableSorts.find(availableSort => availableSort.code == sortCode));

    setFilter({taskSortIds: selectedSortsFiltered})
  }

  return (
    <>
      <CustomMultiSelect
        value={filters.taskTypeIds}
        setValue={handleSelectTypeOption}
        title="Тип задачи"
        getDataHandler={getTypes}
        onClose={handleUpdateGetCallbacks}
      />
    </>
  );
}
