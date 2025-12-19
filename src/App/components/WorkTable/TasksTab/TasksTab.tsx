import React, { useEffect, useState } from "react";
import { SearchParams, SortData } from "../../../shared/types";
import { ISearchTasksParams, ITaskItem } from "./TasksList/TasksListTypes";
import TasksList from "./TasksList/TasksList";
import TasksFilters from "./TasksFilters/TasksFilters";
import { useSort } from "../../../shared/hooks";

export interface ITasksTabProps {
  /** Установить обработчик подгрузки данных */
  setLoadData: React.Dispatch<React.SetStateAction<(page: number, size: number) => Promise<void>>>;
  /** Установить обработчик очистки списка */
  setClearList: React.Dispatch<React.SetStateAction<() => void>>;
  /** Установить количество отфильтрованных элементов */
  setFilteredElementsCount: React.Dispatch<React.SetStateAction<number>>;
  /** Получить количество задач */
  getTasksCount: (searchParams: ISearchTasksParams) => Promise<number>;
  /** Обработчик получения задач */
  getTasks: (searchParams: SearchParams<ISearchTasksParams>) => Promise<ITaskItem[]>;
  /** Является вкладкой моих задач */
  isMyTasksTab?: boolean;
  /** Обработчик сброса списка и его контролера */
  handleResetList: () => void;
}

/** Вкладка задач */
export default function TasksTab(props: ITasksTabProps) {
  const [searchParams, setSearchParams] = useState<ISearchTasksParams>({});

  const { handleResetList, isMyTasksTab, setFilteredElementsCount, getTasksCount } = props;
  const { sortData, toggleSort } = useSort();     
  useEffect(() => {
    handleResetList();
  }, [searchParams, sortData]);
  
  // Обновление количества отфильтрованных Задач
  const updateFilteredElementsCount = async() => {
    const count = await getTasksCount(searchParams);
    setFilteredElementsCount(count);
  }

  useEffect(() => {
    updateFilteredElementsCount()
  }, [searchParams])

  return (
    <>
      <TasksFilters
        isMyTasksTab={isMyTasksTab}
        setSearchParams={setSearchParams}
      />
      <TasksList {...props} sortData={sortData} toggleSort={toggleSort} searchParams={searchParams} />
    </>
  );
}
