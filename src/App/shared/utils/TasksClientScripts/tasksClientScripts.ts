import { ObjectItem } from "../../../../UIKit/Filters/FiltersTypes";
import { ISearchTasksParams, ITaskItem, TaskStatus, TermBuffer } from "../../../components/WorkTable/TasksTab/TasksList/TasksListTypes";
import { SearchParams } from "../../types";
import { generateTasksArray } from "./tasksGenerator";
import { generateTermBufferList } from "./termBufferMockGenerator";


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

  console.log(searchParams)
  return generateTasksArray(searchParams.size);
}

/** Получение количества взаимодействий */
async function getTasksCount(searchParams: ISearchTasksParams): Promise<number> {
  return Math.floor(Math.random() * 200);
}

/** Поиск моих задач */
async function getTasksMy(searchParams: SearchParams<ISearchTasksParams>): Promise<ITaskItem[]> {
  return getTasks(searchParams);
}

/** Получение количества моих задач */
async function getTasksMyCount(searchParams:ISearchTasksParams): Promise<number> {
  return getTasksCount(searchParams);
}

/** Поиск задач группы */
async function getTasksGroup(searchParams: SearchParams<ISearchTasksParams>): Promise<ITaskItem[]> {
  return getTasks(searchParams);
}

/** Получение количества задач группы */
async function getTasksGroupCount(searchParams: ISearchTasksParams): Promise<number> {
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

/** Получение типов задач */
async function getTaskTypes(taskSortIds?: string[]): Promise<ObjectItem[]> {
  await randomDelay();

  if(taskSortIds?.length) return [
    new ObjectItem({ code: "test", value: "Тип один" }),
    new ObjectItem({ code: "test1", value: "Тип два" })
  ]

  return [
    new ObjectItem({ code: "test", value: "Тип один" }),
    new ObjectItem({ code: "test1", value: "Тип два" }),
    new ObjectItem({ code: "test2", value: "Тип три" }),
  ];
}

/** Получение видов задач */
async function getTaskSorts(taskTypesIds?: string[]): Promise<ObjectItem[]> {
  await randomDelay();

  if(taskTypesIds?.length) return [
    new ObjectItem({ code: "test", value: "Вид один" }),
    new ObjectItem({ code: "test1", value: "Вид два" })
  ]

  return [
    new ObjectItem({ code: "test", value: "Вид один" }),
    new ObjectItem({ code: "test1", value: "Вид два" }),
    new ObjectItem({ code: "test2", value: "Вид три" }),
  ];
}

/** Получение статусов задач */
async function getTaskStatuses(): Promise<ObjectItem[]> {
  await randomDelay();

  return [
    new ObjectItem({ code: "queue", value: "В очереди" }),
    new ObjectItem({ code: "atWork", value: "В работе" }),
    new ObjectItem({ code: "postpone", value: "Отложена" }),
    new ObjectItem({ code: "complete", value: "Выполнена" }),
    new ObjectItem({ code: "control", value: "На контроле" }),
    new ObjectItem({ code: "returned", value: "Возвращена" }),
  ];
}

/** Получить сроки решения задач */
async function getTasksResolutionTerms(tasksIds: string[]): Promise<TermBuffer[]> {
  await randomDelay();
  return generateTermBufferList(tasksIds)
}

/** Получение групп для вкладок с задачами */
async function getTasksUserGroups(users?: string[]): Promise<ObjectItem[]> {
  await randomDelay();

  const authors: ObjectItem[] = [
    new ObjectItem({ code: "testTask", value: "Группа записи" }),
    new ObjectItem({ code: "testTask1", value: "Врачи кураторы МедКЦ (3 линия)" }),
    new ObjectItem({ code: "testTask2", value: "Операторы (дев)" }),
    new ObjectItem({ code: "testTask3", value: "Врачи кураторы МедКЦ (2 линия)" }),
    new ObjectItem({ code: "testTask4", value: "Супервайзеры (дев)" }),
    new ObjectItem({ code: "testTask5", value: "Экперты по претензиям (4 линия)" }),
  ];

  return authors;
}

/** Получение исполнителей для вкладки задач */
async function getUsersTasks(groups?: string[]): Promise<ObjectItem[]> {
  await randomDelay();
  const authors: ObjectItem[] = [
    new ObjectItem({ code: "test", value: "Иванов Иван Иванович" }),
    new ObjectItem({ code: "test1", value: "Петров Петр Петрович" }),
    new ObjectItem({ code: "test2", value: "Сидоров Сидр Сидрович" }),
    new ObjectItem({
      code: "test3",
      value:
        "Назаров Антон Алексеевиччччччччччччччччччччччччччччччччччччччччччччччччч",
    }),
    new ObjectItem({ code: "test4", value: "Иванов Олег Михайлович" }),
    new ObjectItem({ code: "test5", value: "Петрова Ольга Ивановна" }),
  ];
  return authors;
}

export default {
  getTasksMy,
  getTasksGroup,
  getTasksMyCount,
  getTasksGroupCount,
  getTaskStatusName,

  getTaskTypes,
  getTaskSorts,
  getTaskStatuses,

  getTasksResolutionTerms,

  getTasksUserGroups,
  getUsersTasks,
};