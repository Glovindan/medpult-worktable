import { ISearchTasksParams, ITaskItem, TaskStatus } from "../../../components/WorkTable/TasksTab/TasksList/TasksListTypes";
import { SearchParams } from "../../types";
import { generateTasksArray } from "./tasksGenerator";


/** Заглушка ожидания ответа сервера */
function randomDelay() {
  const delay = Math.random() * 1000;
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

/** Поиск задач */
async function getTasks(
  searchParams: SearchParams<ISearchTasksParams>
): Promise<ITaskItem[]> {
  await randomDelay();

  return generateTasksArray(searchParams.size);
}

/** Получение количества взаимодействий */
async function getTasksCount(searchParams: SearchParams<ISearchTasksParams>): Promise<number> {
  return Math.floor(Math.random() * 1000);
}

/** Поиск моих задач */
async function getTasksMy(searchParams: SearchParams<ISearchTasksParams>): Promise<ITaskItem[]> {
  return getTasks(searchParams);
}

/** Получение количества моих задач */
async function getTasksMyCount(searchParams: SearchParams<ISearchTasksParams>): Promise<number> {
  return getTasksCount(searchParams);
}

/** Поиск задач группы */
async function getTasksGroup(searchParams: SearchParams<ISearchTasksParams>): Promise<ITaskItem[]> {
  return getTasks(searchParams);
}

/** Получение количества задач группы */
async function getTasksGroupCount(searchParams: SearchParams<ISearchTasksParams>): Promise<number> {
  return getTasksCount(searchParams);
}

/** Получение названия статуса задачи */
function getTaskStatusName(status: TaskStatus) {
  switch (status) {
    case TaskStatus.queue:  return "В очереди"
    case TaskStatus.atWork:  return "В работе"
    case TaskStatus.postpone:  return "Отложена"
    case TaskStatus.complete:  return "Выполнена"
    case TaskStatus.control:  return "На контроле"
    case TaskStatus.returned:  return "Возвращена"
    default: return "Анулировано"
  }
}

export default {
  getTasksMy,
  getTasksGroup,
  getTasksMyCount,
  getTasksGroupCount,
  getTaskStatusName,
};