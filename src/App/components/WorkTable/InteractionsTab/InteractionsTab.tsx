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
  /** Установить количество отфильтрованных элементов */
  setFilteredElementsCount: React.Dispatch<React.SetStateAction<number>>;
  /** Получить количество взаимодействий */
  getInteractionsCount: (searchParams: ISearchInteractionsParams) => Promise<number>
  /** Обработчик получения взаимодействий */
  getInteractions: (searchParams: SearchParams<ISearchInteractionsParams>) => Promise<IInteractionItem[]>
  /** Скрытвать поле выбора сотрудника в фильтрах */
  hideEmployeeFilter?: boolean
  /** Обработчик сброса списка и его контролера */
  handleResetList: () => void
};

/** Вкладка взаимодействий */
export default function InteractionsTab(props: IInteractionsTabProps) {
  const [searchParams, setSearchParams] = useState<ISearchInteractionsParams>({})

  const {handleResetList, hideEmployeeFilter, getInteractionsCount, setFilteredElementsCount} = props;

  useEffect(() => {
    handleResetList()
  }, [searchParams, props.sortData])

  // Обновление количества отфильтрованных Взаимодействий
  const updateFilteredElementsCount = async() => {
    const count = await getInteractionsCount(searchParams);
    setFilteredElementsCount(count);
  }

  useEffect(() => {
    updateFilteredElementsCount()
  }, [searchParams])

  return (
    <>
      <FilteredInteractions hideEmployeeFilter={hideEmployeeFilter} setSearchParams={setSearchParams} />
      <InteractionsList {...props} searchParams={searchParams} />
    </>
  );
}
