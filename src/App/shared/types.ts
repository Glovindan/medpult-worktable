/** Количество элементов каждой вкладки */
export class TabsItemsCounts {
  /** Взаимодействия группы */
  groupInteractions: number;
  /** Мои взаимодействия */
  myInteractions: number;
  /** Задачи группы */
  groupTasks: number;
  /** Мои задачи */
  myTasks: number;

  constructor() {
    this.groupInteractions = 0;
    this.myInteractions = 0;
    this.groupTasks = 0;
    this.myTasks = 0;
  }
}