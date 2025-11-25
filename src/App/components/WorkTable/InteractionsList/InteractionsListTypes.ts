import { ObjectItem } from "../../../../UIKit/Filters/FiltersTypes";
import { SlaStatus } from "../WorkTableTypes";

/** Статус взаимодействия */
export enum InteractionStatus {
  /** Новое*/
  new = "new",
  /**В очереди*/
  queue = "queue",
  /**В работе */
  atWork = "atWork",
  /** Обработано */
  processed = "processed",
  /** Пропущено */
  missed = "missed",
}

/** Тип канала поступления */
export enum ChannelType {
  /** Электронная почта */
  email,
  /** Звонок */
  call,
  /** СМС */
  sms,
  /** Ручной ввод */
  manual,
}

/** Данные точки входа */
export interface IEntryPoint {
  /** Вид канала поступления */
  channelSort: string;
  /** Маркетинговое название ящика */
  marketingName: string;
}

/** Данные исполнителя */
export interface IExecutorData {
  /** ФИО исполнителя */
  fullname: string;
  /** Группа исполнителя */
  groupName: string;
}

/** Элемент списка взаимодействий */
export interface IInteractionItem {
  /** Идентификатор Взаимодействия */
  id: string;
  /** Статус */
  status: InteractionStatus;
  /** Тип канала поступления */
  channelType: ChannelType;
  /** Является входящим */
  isIncoming: boolean;
  /** Точка входа */
  entryPoint: IEntryPoint;
  /** SLA */
  slaStatus?: SlaStatus;
  /** Контактные данные (Телефон / Email) */
  contactData: string;
  /** Дата и время */
  createdAt: Date;
  /** Контрагент */
  contractorName: string | undefined;
  /** Имеются вложения? */
  hasAttachments: boolean;
  /** Тема обращения */
  requestTopic: string;
  /** Обращение */
  request: ObjectItem | undefined;
  /** Задача */
  task: ObjectItem | undefined;
  /** Задача */
  executor: IExecutorData | undefined;
}

/** Данные вложений */
export class FilesData {
  /** Идентификатор файла */
  id: string;
  /** Ссылка на скачивание файла */
  fileDownloadURL: string;
  /** Название файла */
  nameFiles: string;

  constructor() {
    this.id = "";
    this.fileDownloadURL = "";
    this.nameFiles = "";
  }
}

/** Детальные данные взаимодействий */
export interface IInteractionDetailsItem {
  /** id */
  id: string;
  /** Дата */
  number: string;
  /** От кого */
  fioFrom: string;
  /** email */
  email: string;
  /** Кому */
  fioWhom: string[];
  /** Копия */
  copy: string[];
  /** Дата создания */
  createdAt: string;
  /** Статус взаимодействия */
  status: ObjectItem;
  /** Вложения */
  fileSrc?: FilesData[];
  /** Группа */
  group?: ObjectItem;
  /** Сотрудник */
  employee?: ObjectItem;
  /** Номер обращения */
  request?: ObjectItem;
  /** Номер задачи */
  task?: ObjectItem;
  /** Причина обращения */
  reasonRequest: string;
  /** Описание задачи */
  descriptionTask: string;
  /** Тема */
  topic: string;
  /** Текст письма */
  text: string;
}

/** Параметры поиска Взаимодействий */
export interface ISearchInteractionsParams {
  /** Телефон / Email */
  phoneOrEmail?: string
  /** Тема обращения */
  topic?: string
  /** Контрагент */
  contractorName?: string
  /** Обращение */
  request?: string
  /** Задача */
  task?: string
  /** Канал */
  channels?: string[];
  /** Точка входа */
  lines?: string[];
  /** Группа */
  groups?: string[];
  /** Сотрудник */
  users?: string[];
  /** Статус обработки */
  statuses?: string[];
}

/** Коды сортируемых колонок взаимодействий */
export enum InteractionsSortableFieldCode {
  /** Точка входа */
  entryPoint = "entryPoint",
  /** SLA */
  slaStatus = "slaStatus",
  /** Дата создания */
  createdAt = "createdAt",
}
