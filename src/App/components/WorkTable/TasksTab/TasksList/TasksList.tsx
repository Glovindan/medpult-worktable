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
import { ITasksTabProps } from "../TasksTab";

export interface ITasksListProps extends ITasksTabProps {
  /** Поисковые данные задач */
  searchParams: ISearchTasksParams;
};

/** Список взаимодействий */
export default function TasksList({
  searchParams,
  setLoadData,
  setClearList,
  sortData,
  toggleSort,
  setDisplayableElementsCount,
  getTasksCount,
  getTasks,
}: ITasksListProps) {
  const { getListColumnProps } = useSortHandlers(sortData, toggleSort);

  const getTasksHandler = async (
    searchParams: SearchParams<ISearchTasksParams>
  ): Promise<ITaskItem[]> => {
    const tasks = await getTasks(searchParams);
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
            />
        )}
        {isLoading && <Loader />}
      </div>
    </div>
  );
}
