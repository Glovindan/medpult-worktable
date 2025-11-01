import { ObjectItem } from "../../../../UIKit/Filters/FiltersTypes"

/** Статус взаимодействия */
export enum InteractionStatus {
    /** Новое */
    new,
    /** В очереди */
    queue,
    /** В работе */
    atWork,
    /** Обработано */
    processed,
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

/** Статус SLA. TODO: На будущую проработку */
export enum SlaStatus {
    /** Нормально */
    ok,
    /** Срок подходит к концу */
    warning,
    /** Просрочено */
    overdue
}

/** Данные точки входа */
export interface IEntryPoint {
    /** Вид канала поступления */
    channelSort: string
    /** Маркетинговое название ящика */
    marketingName: string
}

/** Данные исполнителя */
export interface IExecutorData {
    /** ФИО исполнителя */
    fullname: string
    /** Группа исполнителя */
    groupName: string
}

/** Элемент списка взаимодействий */
export interface IInteractionItem {
    /** Идентификатор Взаимодействия */
    id: string,
    /** Статус */
    status: InteractionStatus,
    /** Тип канала поступления */
    channelType: ChannelType
    /** Точка входа */
    entryPoint: IEntryPoint
    /** SLA */
    slaStatus?: SlaStatus
    /** Контактные данные (Телефон / Email) */
    contactData: string
    /** Дата и время */
    createdAt: Date
    /** Контрагент */
    contractorName: string
    /** Имеются вложения? */
    hasAttachments: boolean
    /** Тема обращения */
    requestTopic: string
    /** Обращение */
    request: ObjectItem
    /** Задача */
    task: ObjectItem
    /** Задача */
    executor: IExecutorData
}

/** Параметры поиска Взаимодействий */
export interface ISearchInteractionsParams {

}