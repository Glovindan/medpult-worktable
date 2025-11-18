import React, { useEffect, useState } from "react";
import { SearchParams, SortData } from "../../../shared/types";
import FilteredInteractions from "../FilteredInteractions/FilteredInteractions";
import InteractionsList from "../InteractionsList/InteractionsList";
import { IInteractionItem, ISearchInteractionsParams } from "../InteractionsList/InteractionsListTypes";

export interface IInteractionsTabProps {
  /** Установить обработчик подгрузки данных */
  setLoadData: React.Dispatch<React.SetStateAction<(page: number, size: number) => Promise<void>>>;
  /** Установить обработчик очистки списка */
  setClearList: React.Dispatch<React.SetStateAction<() => void>>;
  /** Данные сортировки */
  sortData: SortData | undefined;
  /** Переключить данные сортировки */
  toggleSort: (fieldCode: string) => void;
  /** Установить количество отображаемых элементов */
  setDisplayableElementsCount: React.Dispatch<React.SetStateAction<number | undefined>>;
  /** Получить количество взаимодействий */
  getInteractionsCount: (searchParams: SearchParams<ISearchInteractionsParams>) => Promise<number>
  /** Обработчик получения взаимодействий */
  getInteractions: (searchParams: SearchParams<ISearchInteractionsParams>) => Promise<IInteractionItem[]>
};

/** Вкладка взаимодействий */
export default function InteractionsTab(props: IInteractionsTabProps) {
  const [searchParams, setSearchParams] = useState<ISearchInteractionsParams>({})
  
  return (
    <>
      <FilteredInteractions setSearchParams={setSearchParams} />
      <InteractionsList {...props} searchParams={searchParams} />
    </>
  );
}
