/** Статус SLA. TODO: На будущую проработку */
export enum SlaStatus {
  /** Нормально */
  ok,
  /** Срок подходит к концу */
  warning,
  /** Просрочено */
  overdue,
}

/** Коды вкладок */
export enum TabCode {
  /** Взаимодействия группы */
  groupInteractions = "groupInteractions",
  /** Мои взаимодействия */
  myInteractions = "myInteractions",
  /** Задачи группы */
  groupTasks = "groupTasks",
  /** Мои задачи */
  myTasks = "myTasks",
}