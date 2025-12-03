import React, { useEffect, useState } from "react";
import { ISearchTasksParams, ITaskItem, TasksSortableFieldCode } from "./TasksListTypes";
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
import { useTaskSlaBuffer } from "./TasksListHooks";

export interface ITasksListProps extends ITasksTabProps {
  /** Поисковые данные задач */
  searchParams: ISearchTasksParams;
  /** Данные сортировки */
  sortData: SortData | undefined;
  /** Переключить данные сортировки */
  toggleSort: (fieldCode: string) => void;
};

/** Список взаимодействий */
export default function TasksList({
  searchParams,
  setLoadData,
  setClearList,
  sortData,
  toggleSort,
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
  }, [searchParams, sortData]);
  
  const [tasksIds, setTasksIds] = useState<string[]>([]);
  useEffect(() => {
    setTasksIds(items.map(item => item.id))
  }, [items])

  const {slaBuffers, getSlaBufferByTaskId} = useTaskSlaBuffer(tasksIds);
  useEffect(() => {
    console.log("Уёбок гавна пидорас тупой");
    console.log(tasksIds);
    console.log(slaBuffers);
  }, [slaBuffers])

  return (
    <div className="tasks-list">
      <div className="tasks-list__header">
        <ListHeaderColumn {...getListColumnProps(TasksSortableFieldCode.taskNumber)}>
          Номер
        </ListHeaderColumn>
        <ListHeaderColumn /* {...getListColumnProps(TasksSortableFieldCode.slaStatus)} */>
          SLA
        </ListHeaderColumn>
        <ListHeaderColumn {...getListColumnProps(TasksSortableFieldCode.urgency)}>
          Срочность
        </ListHeaderColumn>
        <ListHeaderColumn {...getListColumnProps(TasksSortableFieldCode.insured)}>
          Застрахованный
        </ListHeaderColumn>
        <ListHeaderColumn /* {...getListColumnProps(TasksSortableFieldCode.region)} */>
          Регион
        </ListHeaderColumn>
        <ListHeaderColumn {...getListColumnProps(TasksSortableFieldCode.createdAt)}>
          Дата создания
        </ListHeaderColumn>
        <ListHeaderColumn {...getListColumnProps(TasksSortableFieldCode.controlDate)}>
          Дата контроля
        </ListHeaderColumn>
        <ListHeaderColumn {...getListColumnProps(TasksSortableFieldCode.taskTypeData)}>
          Вид задачи
        </ListHeaderColumn>
        <ListHeaderColumn {...getListColumnProps(TasksSortableFieldCode.taskStatus)}>
          Статус задачи
        </ListHeaderColumn>
        <ListHeaderColumn {...getListColumnProps(TasksSortableFieldCode.executor)}>
          Исполнитель
        </ListHeaderColumn>
      </div>
      <div className="tasks-list__list">
        {items.map((item) =>
            <TasksListRow
              key={item.id}
              item={item}
              slaBuffer={getSlaBufferByTaskId(item.id)}
            />
        )}
        {isLoading && <Loader />}
      </div>
    </div>
  );
}
