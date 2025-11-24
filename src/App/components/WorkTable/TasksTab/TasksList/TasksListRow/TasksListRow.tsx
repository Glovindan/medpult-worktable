import React, { useEffect, useState } from "react";
import moment from "moment";
import ListColumn from "../../../ListComponents/ListColumn/ListColumn";
import LinkColumn from "../../../ListComponents/LinkColumn/LinkColumn";
import Scripts from "../../../../../shared/utils/clientScripts";
import { ITaskItem } from "../TasksListTypes";
import { MiddleEllipsisString } from "../../../ListComponents/MiddleEllipsisString/MiddleEllipsisString";
import DoubleStrokeColumn from "../../../ListComponents/DoubleStrokeColumn/DoubleStrokeColumn";
import TaskStatusColumn from "./TaskStatusColumn/TaskStatusColumn";
import TaskInsuredColumn from "./TaskInsuredColumn/TaskInsuredColumn";

type TasksListRowProps = {
  /** Данные строки задачи */
  item: ITaskItem;
};

/** Строка взаимодействия */
export default function TasksListRow({
  item,
}: TasksListRowProps) {
  /** Получить ссылку на страницу конкретного обращения */
  function getRequestHref(requestId: string) {
    const requestPageLink = Scripts.getRequestPagePath();
    const origin = window.location.origin;
    const url = new URL(`${origin}/${requestPageLink}`);

    url.searchParams.set("requestId", requestId);

    const href = url.toString();

    return href;
  }

  /** Получить ссылку на страницу конкретной задачи */
  function getTaskHref(requestId: string, taskId: string) {
    const url = new URL(getRequestHref(requestId));

    url.searchParams.set("taskId", taskId);

    const href = url.toString();

    return href;
  }

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
        <ListColumn>{item.region}</ListColumn>
        <ListColumn>{moment(item.createdAt).format("DD.MM.YYYY HH:mm")}</ListColumn>
        <ListColumn>{moment(item.controlDate).format("DD.MM.YYYY HH:mm")}</ListColumn>
        <DoubleStrokeColumn firstRowValue={item.taskTypeData.sort} secondRowValue={item.taskTypeData.type} />
        <TaskStatusColumn taskStatus={item.taskStatus}/>
        <DoubleStrokeColumn firstRowValue={item.executor.fullName} secondRowValue={item.executor.groupName} />
      </div>
    </>
  );
}
