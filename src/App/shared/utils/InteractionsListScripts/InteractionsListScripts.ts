import { IInteractionItem, InteractionStatus, ISearchInteractionsParams } from "../../../components/WorkTable/InteractionsList/InteractionsListTypes";
import { SearchParams } from "../../types";
import { generateInteractionsArray } from "./interactionsGenerator";

/** Заглушка ожидания ответа сервера */
function randomDelay() {
  const delay = Math.random() * 1000;
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

/** Поиск взаимодействий */
async function getInteractions(
  searchParams: SearchParams<ISearchInteractionsParams>
): Promise<IInteractionItem[]> {
  await randomDelay();
  console.log(searchParams)
  return generateInteractionsArray(searchParams.size);
}

/** Получение количества взаимодействий */
async function getInteractionsCount(searchParams: ISearchInteractionsParams): Promise<number> {
  return Math.floor(Math.random() * 200);
}

/** Поиск взаимодействий группы */
async function getInteractionsGroup(searchParams: SearchParams<ISearchInteractionsParams>): Promise<IInteractionItem[]> {
  return getInteractions(searchParams)
}

/** Получение количества моих взаимодействий */
async function getInteractionsGroupCount(searchParams: ISearchInteractionsParams): Promise<number> {
  return getInteractionsCount(searchParams);
}

/** Поиск моих взаимодействий */
async function getInteractionsMy(searchParams: SearchParams<ISearchInteractionsParams>): Promise<IInteractionItem[]> {
  return getInteractions(searchParams)
}

/** Получение количества моих взаимодействий */
async function getInteractionsMyCount(searchParams: ISearchInteractionsParams): Promise<number> {
  return getInteractionsCount(searchParams);
}

/** Получение названия статуса */
function getInteractionStatusName(status: InteractionStatus) {
  switch (status) {
    case InteractionStatus.new:
      return "Новое";
    case InteractionStatus.queue:
      return "В очереди";
    case InteractionStatus.atWork:
      return "В работе";
    case InteractionStatus.processed:
      return "Обработано";
    default:
      return "Пропущено";
  }
}

export default {
    getInteractionsGroup,
    getInteractionsGroupCount,
    getInteractionsMy,
    getInteractionsMyCount,
    getInteractionStatusName,
}