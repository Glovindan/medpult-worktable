import React, { useCallback, useEffect, useState } from "react";
import {
  ISearchTasksParams,
} from "../TasksList/TasksListTypes";
import Scripts from "../../../../shared/utils/clientScripts";
import CustomMultiSelect from "../../FilteredInteractions/CustomMultiSelect/CustomMultiSelect";
import { useDebounce } from "../../../../shared/utils/utils";

type TaskSortsFilterProps = {
  /** Данные поиска задачи */
  filters: ISearchTasksParams;
  /** Дата обновления фильтра */
  filterUpdatedAt: Date;
  /** Обновить поле в фильтре */
  setFilter: (updateData: ISearchTasksParams) => void;
  /** Обновить колбэки для получения списка фильтра */
  handleUpdateGetCallbacks: () => void
};

/** Фильтр вида задачи */
export default function TaskSortsFilter({
  filterUpdatedAt,
  filters,
  setFilter,
  handleUpdateGetCallbacks,
}: TaskSortsFilterProps) {
  // Получение Видов задач
  const getSorts = useCallback(
    () => Scripts.getTaskSorts(filters.taskTypeIds),
    [filterUpdatedAt]
  );

  const [taskSortsIds, setTaskSortsIds] = useState<string[]>([]);
  const taskSortIdsDebounced = useDebounce(taskSortsIds, 500);

  useEffect(() => {
    handleUpdateTypeBySelectedSorts(taskSortIdsDebounced);
  }, [taskSortIdsDebounced]);

  // Обработчик выбора Вида задач
  const handleSelectSortOption = async (selectedSortsCodes: string[]) => {
    setTaskSortsIds(selectedSortsCodes);
    setFilter({ taskSortIds: selectedSortsCodes });
  };

  const handleUpdateTypeBySelectedSorts = async (
    selectedSortsCodes: string[]
  ) => {
    // Фильтрация выбранных Типов задач
    const availableTypes = await Scripts.getTaskTypes(selectedSortsCodes);
    const selectedTypesFiltered = filters.taskTypeIds?.filter((typeCode) =>
      availableTypes.find((availableType) => availableType.code == typeCode)
    );

    setFilter({ taskTypeIds: selectedTypesFiltered });
  };

  return (
    <>
      <CustomMultiSelect
        value={filters.taskSortIds}
        setValue={handleSelectSortOption}
        title="Вид задачи"
        getDataHandler={getSorts}
        onClose={handleUpdateGetCallbacks}
      />
    </>
  );
}
