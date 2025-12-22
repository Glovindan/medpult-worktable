import React, { useEffect, useState } from "react";
import { SearchParams, SortData } from "../../../shared/types";
import { ISearchTasksParams, ITaskItem } from "./TasksList/TasksListTypes";
import TasksList from "./TasksList/TasksList";
import TasksFilters from "./TasksFilters/TasksFilters";
import { useSort } from "../../../shared/hooks";
import Scripts from "../../../shared/utils/clientScripts";

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

  const [isFilterLoading, setIsFilterLoading] = useState<boolean>(true)
  const handleInitializeFilter = async () => {
    // Для вкладки Мои задачи не инициализировать
    if(isMyTasksTab) return;

    const users = await Scripts.getUsersByUserGroups();
    const usersIds = users.map(user => user.code);

    setSearchParams(prev => ({...prev, employeeIds: usersIds}))
  }

  useEffect(() => {
    handleInitializeFilter().then(() => setIsFilterLoading(false));
  }, []) 

  useEffect(() => {
    updateFilteredElementsCount()
  }, [searchParams, isFilterLoading])

  return (
    <>
      <TasksFilters
        isMyTasksTab={isMyTasksTab}
        setSearchParams={setSearchParams}
        searchParams={searchParams}
        isFilterLoading={isFilterLoading}
      />
      <TasksList {...props} sortData={sortData} toggleSort={toggleSort} searchParams={searchParams} isFilterLoading={isFilterLoading} />
    </>
  );
}
