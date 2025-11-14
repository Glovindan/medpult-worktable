import { IInteractionItem, InteractionStatus, ISearchInteractionsParams } from "../../components/WorkTable/InteractionsList/InteractionsListTypes";
import { SearchParams, TabsItemsCounts } from "../types";
import { generateInteractionsArray } from "./interactionsGenerator";

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

  tabsItemsCounts.groupInteractions = Math.floor(200 * Math.random())
  tabsItemsCounts.groupTasks = Math.floor(200 * Math.random())
  tabsItemsCounts.myInteractions = Math.floor(200 * Math.random())
  tabsItemsCounts.myTasks = Math.floor(200 * Math.random())

  return tabsItemsCounts;
}

/** Поиск взаимодействий */
async function getInteractions(searchParams: SearchParams<ISearchInteractionsParams>): Promise<IInteractionItem[]> {
  await randomDelay();

  return generateInteractionsArray(searchParams.size)
}

/** Получение названия статуса */
function getInteractionStatusName(status: InteractionStatus) {
  switch(status) {
    case InteractionStatus.new: return "Новое"
    case InteractionStatus.queue: return "В очереди"
    case InteractionStatus.atWork: return "В работе"
    case InteractionStatus.processed: return "Обработано"
    default: return "Пропущено"
  }
}

/** Получение пути на страницу обращения */
function getRequestPagePath() {
  return "request"
}

export default {
  getTabItemsCount,
  getInteractions,
  getInteractionStatusName,
  getRequestPagePath,
};
