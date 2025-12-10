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

const types = [
  new ObjectItem({ code: "type", value: "Тип один" }),
  new ObjectItem({ code: "type1", value: "Тип два" }),
  new ObjectItem({ code: "type2", value: "Тип три" }),
];

const sorts = [
  new ObjectItem({ code: "sort", value: "Вид один" }),
  new ObjectItem({ code: "sort1", value: "Вид два" }),
  new ObjectItem({ code: "sort2", value: "Вид три" }),
  new ObjectItem({ code: "sort3", value: "Вид четыре" }),
  new ObjectItem({ code: "sort4", value: "Вид пять" }),
]

const typeSortMaps = [
  {type: "type", sorts: ["sort"],},
  {type: "type1", sorts: ["sort1", "sort2"]},
  {type: "type2 ", sorts: ["sort3", "sort4"]},
]

/** Получение типов задач */
async function getTaskTypes(taskSortIds?: string[]): Promise<ObjectItem[]> {
  await randomDelay();

  if(taskSortIds?.length) {
    const typesFiltered = types.filter(type => {
      const mapItem = typeSortMaps.find(typeSortMap => typeSortMap.type == type.code);
      if(!mapItem) return false;

      return mapItem.sorts.find(sortCode => taskSortIds.find(id => sortCode == id));
    })

    return typesFiltered;
  }

  return types;
}

/** Получение видов задач */
async function getTaskSorts(taskTypesIds?: string[]): Promise<ObjectItem[]> {
  await randomDelay();

  if(taskTypesIds?.length) {
    const sortCodes = typeSortMaps
      .filter(typeSortMap => taskTypesIds.find(id => id == typeSortMap.type))
      .flatMap(typeSortMap => typeSortMap.sorts);

    const sortsFiltered = sorts.filter(sort => sortCodes.find(sortCode => sortCode == sort.code))

    return sortsFiltered;
  }

  return sorts;
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
async function getGroupsByUserGroups(users?: string[]): Promise<ObjectItem[]> {
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
async function getUsersByUserGroups(groups?: string[]): Promise<ObjectItem[]> {
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

  getGroupsByUserGroups,
  getUsersByUserGroups,
};