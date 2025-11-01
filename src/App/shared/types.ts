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

export type FetchData<ItemType = any> = {
    data: ItemType[],
    hasMore: boolean,
}

/** Данные сортировки */
export class SortData {
  code: string;
  isAscending: boolean;

  constructor({ code, isAscending }: { code?: string; isAscending?: boolean }) {
    this.code = code ?? "";
    this.isAscending = isAscending ?? true;
  }
}

/** Данные поиска */
export type SearchParams<SearchDataType = any> = {
    /** Текущая страница */
    page: number, 
    /** Количество элементов страницы */
    size: number,
    /** Данные сортировки */
    sortData?: SortData, 
    /** Данные поиска */
    searchData?: SearchDataType
    [property: string]: any;
}