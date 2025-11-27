import {
  IInteractionItem,
  IInteractionDetailsItem,
  FilesData,
  InteractionStatus,
} from "../../components/WorkTable/InteractionsList/InteractionsListTypes";
import { TabsItemsCounts } from "../types";
import {generateRandomInteractionItem} from "./InteractionsListScripts/interactionsGenerator";
import { ObjectItem } from "../../../UIKit/Filters/FiltersTypes";
import tasksClientScripts from "./TasksClientScripts/tasksClientScripts";
import interactionsListScripts from "./InteractionsListScripts/InteractionsListScripts";

/** Заглушка ожидания ответа сервера */
function randomDelay() {
  const delay = Math.random() * 1000;
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

async function getTabItemsCount() {
  await randomDelay();

  const tabsItemsCounts = new TabsItemsCounts();

  tabsItemsCounts.groupInteractions = Math.floor(200 * Math.random());
  tabsItemsCounts.groupTasks = Math.floor(200 * Math.random());
  tabsItemsCounts.myInteractions = Math.floor(200 * Math.random());
  tabsItemsCounts.myTasks = Math.floor(200 * Math.random());

  return tabsItemsCounts;
}

/**Обновление взаимодейтсвий взаимодействий */
async function getInteractionById(id: string): Promise<IInteractionItem> {
  await randomDelay();
  const item = generateRandomInteractionItem();
  return {
    ...item,
    id,
  };
}
/** Получение детальных данных взаимодействия */
async function getInteractionsDetails(
  interactionId: string
): Promise<IInteractionDetailsItem> {
  await randomDelay()
  return {
    id: "111",
    number: "VZ00000809/21",
    fioFrom: "Андреев Максим Максимович",
    email: "andreev@mail.ru",
    fioWhom: ["103@sberins.ru"],
    copy: [""],
    createdAt: " 02.08.2025 15:00",
    status: { value: "Новое", code: InteractionStatus.new },
    fileSrc: [
      {
        ...new FilesData(),
        fileDownloadURL:
          "https://t4.ftcdn.net/jpg/02/66/72/41/360_F_266724172_Iy8gdKgMa7XmrhYYxLCxyhx6J7070Pr8.jpg",
        nameFiles: "file1",
      },
      {
        ...new FilesData(),
        fileDownloadURL:
          "https://t3.ftcdn.net/jpg/02/36/99/22/360_F_236992283_sNOxCVQeFLd5pdqaKGh8DRGMZy7P4XKm.jpg",
        nameFiles: "file2",
      },
    ],
    group: { value: "Экстренная помощь", code: "fasfas" },
    employee: { value: "", code: "" },
    request: { value: "RQ00000809/21", code: "fasfas" },
    task: { value: " -", code: "" },
    reasonRequest: "Информация о состоянии здоровья",
    descriptionTask:
      " Информация о состоянии здоровья предоставляется пациенту лично",
    topic: "Fw: Запрос согласования",
    text: "Это электронное сообщение и любые документы, приложенные к нему, содержат конфиденциальную информацию. Настоящим уведомляем Вас о том, что если это сообщение не предназначено Вам, использование, копирование, распространение информации, содержащейся в настоящем сообщении, а также осуществление любых действий на основе этой информации, строго запрещено.",
  };
}

/** Получить количество дублей взаимодействий */
//Если дублей нет возращать просто return null, если есть то кол-во
async function getInteractionsDublicateCount(data?: IInteractionDetailsItem) {
  return null;
}

/** Нажатие на кнопку "Взять в работу" */
async function setStatusAtWork(interactionId: string | undefined) {
  return;
}
/** Нажатие на кнопку "Закрыть" */
async function setStatusProcessed(interactionId: string | undefined) {
  return;
}

/** Открыть модальное окно для отправки ответа на email */
async function toggleSendEmailAnswer(interactionId: string, taskId?: string) {
  try {
    alert("Send Answer on: " + interactionId);
  } catch (e) {
    throw new Error("Ошибка в функции toggleSendEmailAnswer: " + e);
  }
}

/** Открыть модальное окно для отправки ответа на email */
async function toggleSendEmailForward(interactionId: string, taskId?: string) {
  try {
    alert("Forward on: " + interactionId + "taskId: " + taskId);
  } catch (e) {
    throw new Error("Ошибка в функции toggleSendEmailForward: " + e);
  }
}

/** Получение каналов */
async function getChannels(lines?: string[]): Promise<ObjectItem[]> {
  await randomDelay();
  const channels: ObjectItem[] = [
    new ObjectItem({ code: "test1", value: "Телефон" }),
    new ObjectItem({ code: "test2", value: "Email" }),
  ];

  return channels;
}
/** Получение линий */
async function getLines(channels?: string[]): Promise<ObjectItem[]> {
  await randomDelay();
  const lines: ObjectItem[] = [
    new ObjectItem({ code: "test1", value: "103@sberins.ru" }),
    new ObjectItem({ code: "test2", value: "911@sberins.ru" }),
    new ObjectItem({ code: "test3", value: "dms.kurators@sberins.ru" }),
  ];
  return lines;
}

/** Получение статусов взаимодействий */
async function getStatuses(): Promise<ObjectItem[]> {
  await randomDelay();
  /** Статусы */
  const statuses: ObjectItem[] = [
    new ObjectItem({ code: "test1", value: "Новое" }),
    new ObjectItem({ code: "test2", value: "В очереди" }),
    new ObjectItem({ code: "test3", value: "В работе" }),
  ];
  return statuses;
}
/** Получение групп */
async function getUserGroups(users?: string[]): Promise<ObjectItem[]> {
  await randomDelay();

  const authors: ObjectItem[] = [
    new ObjectItem({ code: "test", value: "Группа записи" }),
    new ObjectItem({ code: "test1", value: "Врачи кураторы МедКЦ (3 линия)" }),
    new ObjectItem({ code: "test2", value: "Операторы (дев)" }),
    new ObjectItem({ code: "test3", value: "Врачи кураторы МедКЦ (2 линия)" }),
    new ObjectItem({ code: "test4", value: "Супервайзеры (дев)" }),
    new ObjectItem({ code: "test5", value: "Экперты по претензиям (4 линия)" }),
  ];

  return authors;
}
/** Получение исполнителей */
async function getUsersInteraction(groups?: string[]): Promise<ObjectItem[]> {
  await randomDelay();
  const authors: ObjectItem[] = [
    new ObjectItem({ code: "test", value: "Иванов Иван Иванович" }),
    new ObjectItem({ code: "test1", value: "Петров Петр Петрович" }),
    new ObjectItem({ code: "test2", value: "Сидоров Сидр Сидрович" }),
    new ObjectItem({ code: "test3", value: "Назаров Антон Алексеевиччччччччччччччччччччччччччччччччччччччччччччччччч" }),
    new ObjectItem({ code: "test4", value: "Иванов Олег Михайлович" }),
    new ObjectItem({ code: "test5", value: "Петрова Ольга Ивановна" }),
  ];
  return authors;
}

/** Сохранить группу и пользователя */
async function saveGroupExecutor(
  interactionId: string | undefined,
  group: ObjectItem | null,
  employee?: ObjectItem | null
): Promise<void> {
  // TODO
  await randomDelay();
}

/** Скачать файл из внешней системы */
async function downloadFileBucket(
  url: string,
  fileName: string
): Promise<{ arrayBuffer: ArrayBuffer; contentType: string }> {
  // TODO
  const file = await fetch(url);

  return {
    arrayBuffer: await file.arrayBuffer(),
    contentType: file.headers.get("content-type") ?? "application/octet-stream",
  };
}

/** Получение пути на страницу обращения */
function getRequestPagePath() {
  return "request";
}

/** Получение id обращения по id задачи */
async function getRequestIdByTaskId(appealId: string): Promise<string> {
  return "test";
}

/** Получение ссылки для перехода на страницу входящего email */
function getIcomingEmailLink(): string {
  return "";
}

/** Получение значений справочника Срочность */
async function getUrgencyList(): Promise<ObjectItem[]> {
  await randomDelay();
  const channels: ObjectItem[] = [
    new ObjectItem({ code: "test1", value: "Срочно" }),
    new ObjectItem({ code: "test2", value: "Несрочно" }),
  ];

  return channels;
}

async function isCurrentUserExecutor(id: string): Promise<boolean> {
  await randomDelay();

  return Math.random() > 0.5;
}

export default {
  getTabItemsCount,

  getInteractionById,
  getInteractionsDetails,
  getInteractionsDublicateCount,
  setStatusAtWork,
  setStatusProcessed,
  toggleSendEmailAnswer,
  toggleSendEmailForward,

  getChannels,
  getLines,
  getStatuses,
  getUserGroups,
  getUsersInteraction,
  saveGroupExecutor,
  downloadFileBucket,

  getRequestPagePath,
  getRequestIdByTaskId,
  getIcomingEmailLink,

  getUrgencyList,
  isCurrentUserExecutor,

  ...interactionsListScripts,
  ...tasksClientScripts,
};
