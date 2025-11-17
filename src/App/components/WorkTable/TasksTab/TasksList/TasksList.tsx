import React, { useEffect, useState } from "react";
import { ISearchTasksParams, ITaskItem } from "./TasksListTypes";
import { SearchParams, SortData } from "../../../../shared/types";
import ListHeaderColumn, {
  SortingState,
} from "../../ListComponents/ListHeaderColumn/ListHeaderColumn";
import { useSortHandlers } from "../../ListComponents/ListComponentsHooks";
import Loader from "../../../../../UIKit/Loader/Loader";
import Scripts from "../../../../shared/utils/clientScripts";
import { useList } from "../../../../shared/hooks";
import TasksListRow from "./TasksListRow/TasksListRow";

type TasksListProps = {
  /** Поисковые данные задач */
  searchParams: ISearchTasksParams;
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

/** Список взаимодействий */
export default function TasksList({
  searchParams,
  setLoadData,
  setClearList,
  sortData,
  toggleSort,
  setDisplayableElementsCount,
}: TasksListProps) {
  const { getListColumnProps } = useSortHandlers(sortData, toggleSort);

  const getTasksHandler = async (
    searchParams: SearchParams<ISearchTasksParams>
  ): Promise<ITaskItem[]> => {
    const tasks = await Scripts.getMyTasks(searchParams);
    console.log(tasks);
    return tasks;
  };

  const { items, clearList, setItems, loadData, isLoading } = useList(
    sortData,
    searchParams,
    getTasksHandler
  );

  useEffect(() => {
    setLoadData(() => loadData);
    setClearList(() => clearList);
  }, []);

  useEffect(() => {
    setDisplayableElementsCount(items.length);
  }, [items]);

  return (
    <div className="tasks-list">
      <div className="tasks-list__header">
        <ListHeaderColumn {...getListColumnProps("taskNumber")}>
          Номер
        </ListHeaderColumn>
        <ListHeaderColumn {...getListColumnProps("slaStatus")}>
          SLA
        </ListHeaderColumn>
        <ListHeaderColumn {...getListColumnProps("urgency")}>
          Срочность
        </ListHeaderColumn>
        <ListHeaderColumn {...getListColumnProps("insured")}>
          Застрахованный
        </ListHeaderColumn>
        <ListHeaderColumn {...getListColumnProps("region")}>
          Регион
        </ListHeaderColumn>
        <ListHeaderColumn {...getListColumnProps("createdAt")}>
          Дата создания
        </ListHeaderColumn>
        <ListHeaderColumn {...getListColumnProps("controlDate")}>
          Дата контроля
        </ListHeaderColumn>
        <ListHeaderColumn {...getListColumnProps("taskTypeData")}>
          Вид задачи
        </ListHeaderColumn>
        <ListHeaderColumn {...getListColumnProps("taskStatus")}>
          Статус задачи
        </ListHeaderColumn>
        <ListHeaderColumn {...getListColumnProps("executor")}>
          Исполнитель
        </ListHeaderColumn>
      </div>
      <div className="tasks-list__list">
        {items.map((item) =>
            <TasksListRow
              key={item.id}
              item={item}
              items={items}
              setItems={setItems}
            />
        )}
        {isLoading && <Loader />}
      </div>
    </div>
  );
}
