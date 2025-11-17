import React, { useEffect, useState } from "react";
import { useList, useSort } from "../../../shared/hooks";
import { SearchParams, SortData } from "../../../shared/types";
import Scripts from "../../../shared/utils/clientScripts";
import ListHeaderColumn, {
  SortingState,
} from "../ListComponents/ListHeaderColumn/ListHeaderColumn";
import { ISearchTasksParams } from "./TasksList/TasksListTypes";

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
export default function TasksTab({
  setLoadData,
  setClearList,
  sortData,
  toggleSort,
  setDisplayableElementsCount,
}: TasksTabProps) {
  const searchParams: ISearchTasksParams = {};

  return <div className="interactions-list"></div>;
}
