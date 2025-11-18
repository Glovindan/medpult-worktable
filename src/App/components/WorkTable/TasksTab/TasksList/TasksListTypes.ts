import { ObjectItem } from "../../../../../UIKit/Filters/FiltersTypes";
import { SlaStatus } from "../../WorkTableTypes";

/** Параметры поиска Задач */
export type ISearchTasksParams = {
    /** Номер */
    taskNumber?: string;
    /** ФИО */
    fullName?: string;
    /** Номер полиса */
    policyNumber?: string;
    /** Регион */
    region?: string;
    /** Срочность */
    urgencyId?: string;
    /** Тип задачи */
    taskTypeId?: string;
    /** Вид задачи */
    taskSortId?: string;
    /** Группа */
    groupId?: string;
    /** Сотрудник */
    employeeId?: string;
    /** Статус задачи */
    taskStatusCode?: string;
    /** Дата с */
    dateFrom?: Date;
    /** Дата по */
    dateTo?: Date;
}

/** Данные типа и вида задачи */
export type TaskTypeData = {
    /** Вид задачи */
    sort: string,
    /** Тип задачи */
    type: string
}

/** Категории полиса */
export enum PolicyCategory { 
    gold,
    silver,
    platinum,
}

/** Данные Застрахованного */
export type InsuredData = {
    /** ФИО */
    fullName: string,
    /** Категория полиса */
    policyCategory?: PolicyCategory
    /** Номер полиса */
    policyNumber?: string
}

/** Данные Исполнителя */
export type ExecutorData = {
    /** ФИО */
    fullName: string,
    /** Группа */
    groupName: string
}

/** Данные Задач */
export type TaskData = {
    /** Номер задачи */
    number: string,
    /** Идентификатор задачи */
    id: string
    /** Идентификатор обращений */
    requestId: string
}

/** Статус задачи */
export enum TaskStatus {
    /** В очереди */
    queue,
    /** В работе */
    atWork,
    /** Отложена */
    postpone,
    /** Выполнена */
    complete,
    /** На контроле */
    control,
    /** Анулировано */
    canceled,
    /** Возвращена */
    returned,
}

/** Элемент списка задач */
export interface ITaskItem {
    /** Идентификатор Задачи */
    id: string;
    /** Номер */
    task: TaskData;
    /** SLA */
    slaStatus?: SlaStatus;
    /** Срочность */
    urgency: string;
    /** Застрахованный */
    insured: InsuredData;
    /** Регион */
    region: string;
    /** Дата создания */
    createdAt: Date;
    /** Дата контроля */
    controlDate: Date;
    /** Вид задачи */
    taskTypeData: TaskTypeData;
    /** Статус задачи */
    taskStatus: TaskStatus;
    /** Исполнитель */
    executor: ExecutorData;
}

