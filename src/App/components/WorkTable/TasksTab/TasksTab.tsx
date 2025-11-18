import React, { useEffect, useState } from "react";
import { SearchParams, SortData } from "../../../shared/types";
import { ISearchTasksParams, ITaskItem } from "./TasksList/TasksListTypes";
import TasksList from "./TasksList/TasksList";

export interface ITasksTabProps {
  /** Установить обработчик подгрузки данных */
  setLoadData: React.Dispatch<React.SetStateAction<(page: number, size: number) => Promise<void>>>;
  /** Установить обработчик очистки списка */
  setClearList: React.Dispatch<React.SetStateAction<() => void>>;
  /** Данные сортировки */
  sortData: SortData | undefined;
  /** Переключить данные сортировки */
  toggleSort: (fieldCode: string) => void;
  /** Установить количество отображаемых элементов */
  setDisplayableElementsCount: React.Dispatch<React.SetStateAction<number | undefined>>;
  /** Получить количество задач */
  getTasksCount: (searchParams: SearchParams<ISearchTasksParams>) => Promise<number>
  /** Обработчик получения задач */
  getTasks: (searchParams: SearchParams<ISearchTasksParams>) => Promise<ITaskItem[]>
};

/** Вкладка задач */
export default function TasksTab(props: ITasksTabProps) {
  const [searchParams, setSearchParams] = useState<ISearchTasksParams>({});

  return (
    <>
      {/* TODO: Компонент фильтров */}
      <TasksList {...props} searchParams={searchParams} />
    </>
  );
}
