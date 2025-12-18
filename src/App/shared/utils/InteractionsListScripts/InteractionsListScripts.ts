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

/** Получение данных взаимодействия по умолчанию */
async function getInitialInteractionItem(interactionId: string): Promise<IInteractionItem> {
  await randomDelay();
  const interactions = generateInteractionsArray(1)

  return {...interactions[0], id: interactionId};
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

let dateBuffer = new Date();
(window as any)["setLastUpdateDate"] = (date: Date) => dateBuffer = date;
/** Получить последнюю дату обновления в миллисекундах по массиву идентификаторов Взаимодействий */
async function getInteractionsLastUpdateDate(interactionsIds: string[]): Promise<number> {
  return dateBuffer.getTime()
}

/** Получить обновленные данные по массиву идентификаторов Взаимодействий */
async function getInteractionsUpdatedData(interactionsIds: string[]): Promise<IInteractionItem[]> {
  const interactions = await getInteractions({page: 0, size: interactionsIds.length});
  let interactionsUpdated: IInteractionItem[] = [];

  for (let index = 0; index < interactionsIds.length; index++) {
    const interactionId = interactionsIds[index];
    const interaction = interactions[index]

    interaction.id = interactionId;

    interactionsUpdated.push(interaction)
  }

  return interactionsUpdated;
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
    getInitialInteractionItem,
    getInteractionsLastUpdateDate,
    getInteractionsUpdatedData,
}