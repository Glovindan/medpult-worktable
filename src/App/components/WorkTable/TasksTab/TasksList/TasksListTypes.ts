import { ObjectItem } from "../../../../../UIKit/Filters/FiltersTypes";
import { SlaStatus } from "../../WorkTableTypes";

/** Данные поисковой строки с выпдающим списком поля фильтрации */
export type SearchQueryData = {
    /** Поисковый запрос */
    query: string,
    /** Код поля */
    fieldCode: string,
}

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
    urgencyIds?: string[];
    /** Тип задачи */
    taskTypeIds?: string[];
    /** Вид задачи */
    taskSortIds?: string[];
    /** Группа */
    groupIds?: string[];
    /** Сотрудник */
    employeeIds?: string[];
    /** Статус задачи */
    taskStatusCodes?: string[];
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

/** Коды сортируемых колонок задач */
export enum TasksSortableFieldCode {
    /** Номер */
    taskNumber = "taskNumber",
    /** SLA */
    slaStatus = "slaStatus",
    /** Срочность */
    urgency = "urgency",
    /** Застрахованный */
    insured = "insured",
    /** Регион */
    region = "region",
    /** Дата создания */
    createdAt = "createdAt",
    /** Дата контроля */
    controlDate = "controlDate",
    /** Вид задачи */
    taskTypeData = "taskTypeData",
    /** Статус задачи */
    taskStatus = "taskStatus",
    /** Исполнитель */
    executor = "executor",
}
