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

/** Поиск взаимодействий */
async function getMyTasks(
  searchParams: SearchParams<ISearchTasksParams>
): Promise<ITaskItem[]> {
  await randomDelay();

  return generateTasksArray(searchParams.size);
}


/** Получение названия статуса задачи */
function getTaskStatusName(status: TaskStatus) {
  switch (status) {
    case TaskStatus.queue:  return "В очереди"
    case TaskStatus.atWork:  return "В работе"
    case TaskStatus.postpone:  return "Отложена"
    case TaskStatus.complete:  return "Выполнена"
    case TaskStatus.control:  return "На контроле"
    default: return "Анулировано"
  }
}

export default {
  getMyTasks,
  getTaskStatusName,
};