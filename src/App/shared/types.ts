import {
  MyItemData,
  ItemDataString,
} from "../../UIKit/CustomList/CustomListTypes";

export interface IInputData<DataType = any> {
  value: string;
  data?: DataType;
}

export class ContractorListData {
  id?: ItemDataString;
  /** Получен по интеграции? */
  isIntegration?: MyItemData<boolean>;
  /** Наименование  */
  fullname?: MyItemData<string>;
  /** Телефон */
  phone?: ItemDataString;
  /** Дата рождения */
  birthdate?: ItemDataString;
  /** Полис */
  policy?: ItemDataString;
  /** Дата начала действия полиса */
  policyStartDate?: ItemDataString;
  /** Дата окончания действия полиса */
  policyEndDate?: ItemDataString;
  /** Вид контрагента */
  type?: ItemDataString;
  /** Адресс */
  adress?: ItemDataString;

  constructor({
    id,
    isIntegration,
    fullname,
    phone,
    birthdate,
    policy,
    policyStartDate,
    policyEndDate,
    type,
    adress,
  }: ContractorListData) {
    this.id = id;
    this.isIntegration = isIntegration;
    this.fullname = fullname;
    this.phone = phone;
    this.birthdate = birthdate;
    this.policy = policy;
    this.policyStartDate = policyStartDate;
    this.policyEndDate = policyEndDate;
    this.type = type;
    this.adress = adress;
  }
}

export class InsuredListData {
  id?: ItemDataString;
  /** Получен по интеграции? */
  isIntegration?: MyItemData<boolean>;
  /** ФИО застрахованного */
  fullname?: MyItemData<string>;
  /** Дата рождения */
  birthdate?: ItemDataString;
  /** Телефон */
  phone?: ItemDataString;
  /** Email */
  email?: ItemDataString;
  /** Полис */
  policy?: ItemDataString;
  /** Дата начала действия полиса */
  policyStartDate?: ItemDataString;
  /** Дата окончания действия полиса */
  policyEndDate?: ItemDataString;
  constructor({
    id,
    isIntegration,
    fullname,
    birthdate,
    phone,
    email,
    policy,
    policyStartDate,
    policyEndDate,
  }: InsuredListData) {
    this.id = id;
    this.isIntegration = isIntegration;
    this.fullname = fullname;
    this.birthdate = birthdate;
    this.phone = phone;
    this.email = email;
    this.policy = policy;
    this.policyStartDate = policyStartDate;
    this.policyEndDate = policyEndDate;
  }
}

export class RequestListData {
  id: ItemDataString;
  /** Номер */
  number?: MyItemData;
  /** Дата создания  */
  createdAt?: ItemDataString;
  /** Канал */
  channel?: ItemDataString;
  /** Тема обращения */
  topic?: ItemDataString;
  /** Статус */
  statusRequest?: MyItemData;
  /** Причина обращения */
  reason?: ItemDataString;
  isOpen?: MyItemData;

  constructor({
    id,
    number,
    createdAt,
    channel,
    topic,
    statusRequest,
    reason,
  }: RequestListData) {
    this.id = id;
    this.number = number;
    this.createdAt = createdAt;
    this.channel = channel;
    this.topic = topic;
    this.statusRequest = statusRequest;
    this.reason = reason;
  }
}

export class TaskListData {
  id: ItemDataString;
  /** Номер */
  number?: MyItemData;
  /** Дата создания  */
  createdAt?: ItemDataString;
  /** Тип задачи  */
  type?: ItemDataString;
  /** Вид задачи */
  sort?: ItemDataString;
  /** Статус задачи */
  statusTask?: MyItemData;
  /** Форма согласования */
  formApproval?: ItemDataString;
  /** Описание задачи */
  description?: ItemDataString;
  isOpen?: MyItemData;

  constructor({
    id,
    number,
    createdAt,
    type,
    sort,
    statusTask,
    formApproval,
    description,
  }: TaskListData) {
    this.id = id;
    this.number = number;
    this.createdAt = createdAt;
    this.type = type;
    this.sort = sort;
    this.statusTask = statusTask;
    this.formApproval = formApproval;
    this.description = description;
  }
}

/** Данные поиска дубликатов контрагента по номеру */
export interface ContractorsSearchData {
  /** Телефон */
  phone?: string;
}

/** Данные поиска дубликатов контрагента (с дополнительными полями) */
export interface ContractorsSearchDataExtended extends ContractorsSearchData {
  /** Данные поисковой строки */
  searchQuery?: string;
  /** Идентификаторы выбранных контрагентов */
  contractorsIds?: string[];
}
