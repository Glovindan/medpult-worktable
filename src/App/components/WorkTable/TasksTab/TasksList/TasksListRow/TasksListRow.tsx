import React, { useEffect, useState } from "react";
import ListColumn from "../../../ListComponents/ListColumn/ListColumn";
import LinkColumn from "../../../ListComponents/LinkColumn/LinkColumn";
import Scripts from "../../../../../shared/utils/clientScripts";
import { ITaskItem } from "../TasksListTypes";
import { MiddleEllipsisString } from "../../../ListComponents/MiddleEllipsisString/MiddleEllipsisString";
import DoubleStrokeColumn from "../../../ListComponents/DoubleStrokeColumn/DoubleStrokeColumn";
import TaskStatusColumn from "./TaskStatusColumn/TaskStatusColumn";
import TaskInsuredColumn from "./TaskInsuredColumn/TaskInsuredColumn";
import { convertDateToTimezone, getTaskHref } from "../../../../../shared/utils/utils";

type TasksListRowProps = {
  /** Данные строки задачи */
  item: ITaskItem;
};

/** Строка взаимодействия */
export default function TasksListRow({
  item,
}: TasksListRowProps) {
  const emptyColumn = <ListColumn>–</ListColumn>;
  const unknownColumn = <ListColumn>Неизвестно</ListColumn>;

  return (
    <>
      <div className="tasks-list-row">
        <LinkColumn
          href={getTaskHref(item.task.requestId, item.task.id)}
          tooltip={item.task.number}
        >
          <MiddleEllipsisString value={item.task.number} />
        </LinkColumn>
        {/* TODO: Колонка SLA */}
        <ListColumn></ListColumn>
        <ListColumn>{item.urgency}</ListColumn>
        <TaskInsuredColumn insuredData={item.insured} />
        <ListColumn noWrap={true}>{item.region}</ListColumn>
        <ListColumn>{convertDateToTimezone(item.createdAt, 'Europe/Moscow', "DD.MM.YYYY HH:mm")}</ListColumn>
        <ListColumn>{convertDateToTimezone(item.controlDate, 'Europe/Moscow', "DD.MM.YYYY HH:mm")}</ListColumn>
        <DoubleStrokeColumn firstRowValue={item.taskTypeData.sort} secondRowValue={item.taskTypeData.type} />
        <TaskStatusColumn taskStatus={item.taskStatus}/>
        <DoubleStrokeColumn firstRowValue={item.executor.fullName} secondRowValue={item.executor.groupName} />
      </div>
    </>
  );
}
