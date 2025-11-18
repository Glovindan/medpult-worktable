import React, { useEffect, useState } from "react";
import { SortData } from "../../../shared/types";
import { ISearchTasksParams } from "./TasksList/TasksListTypes";
import TasksList from "./TasksList/TasksList";

type TasksTabProps = {
  /** Установить обработчик подгрузки данных */
  setLoadData: React.Dispatch<
    React.SetStateAction<(page: number, size: number) => Promise<void>>
  >;
  /** Установить обработчик очистки списка */
  setClearList: React.Dispatch<React.SetStateAction<() => void>>;
  /** Данные сортировки */
  sortData: SortData | undefined;
  /** Переключить данные сортировки */
  toggleSort: (fieldCode: string) => void;
  /** Установить количество отображаемых элементов */
  setDisplayableElementsCount: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
};

/** Вкладка задач */
export default function TasksTab(props: TasksTabProps) {
  const [searchParams, setSearchParams] = useState<ISearchTasksParams>({});

  return (
    <>
      {/* TODO: Компонент фильтров */}
      <TasksList {...props} searchParams={searchParams} />
    </>
  );
}
