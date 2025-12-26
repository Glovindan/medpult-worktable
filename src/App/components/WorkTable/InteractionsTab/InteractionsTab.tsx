import React, { useEffect, useState } from "react";
import { SearchParams, SortData } from "../../../shared/types";
import FilteredInteractions from "../FilteredInteractions/FilteredInteractions";
import InteractionsList from "../InteractionsList/InteractionsList";
import { IInteractionItem, ISearchInteractionsParams } from "../InteractionsList/InteractionsListTypes";
import { useSort } from "../../../shared/hooks";

export interface IInteractionsTabProps {
  /** Установить обработчик подгрузки данных */
  setLoadData: React.Dispatch<React.SetStateAction<(page: number, size: number) => Promise<void>>>;
  /** Установить обработчик очистки списка */
  setClearList: React.Dispatch<React.SetStateAction<() => void>>;
  /** Установить количество отфильтрованных элементов */
  setFilteredElementsCount: React.Dispatch<React.SetStateAction<number>>;
  /** Получить количество взаимодействий */
  getInteractionsCount: (searchParams: ISearchInteractionsParams) => Promise<number>
  /** Обработчик получения взаимодействий */
  getInteractions: (searchParams: SearchParams<ISearchInteractionsParams>) => Promise<IInteractionItem[]>
  /** Скрытвать поле выбора сотрудника в фильтрах */
  isMyInteractions?: boolean
  /** Обработчик сброса списка и его контролера */
  handleResetList: () => void
  /** Открыть Модальное окно ответа на сообщение */
  handleOpenReplyModal: (interactionId: string, contractorId?: string, taskId?: string, requestId?: string) => void
  /** Открыть Модальное окно пересылки сообщения */
  handleOpenForwardModal: (interactionId: string) => void
  /** Идентификатор взаимодействия открытого по умолчанию */
  initialInteractionId: string | undefined
  /** Очистить изначальное взаимодействие */
  clearInitialInteractionId: () => void
};

/** Вкладка взаимодействий */
export default function InteractionsTab(props: IInteractionsTabProps) {
  const [searchParams, setSearchParams] = useState<ISearchInteractionsParams>({})

  const {handleResetList, isMyInteractions, getInteractionsCount, setFilteredElementsCount, clearInitialInteractionId} = props;
  const { sortData, toggleSort } = useSort();

  useEffect(() => {
    handleResetList()
    clearInitialInteractionId()
  }, [searchParams, sortData])

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
      <FilteredInteractions isMyInteractions={isMyInteractions} setSearchParams={setSearchParams} />
      <InteractionsList {...props} sortData={sortData} toggleSort={toggleSort} searchParams={searchParams} />
    </>
  );
}
