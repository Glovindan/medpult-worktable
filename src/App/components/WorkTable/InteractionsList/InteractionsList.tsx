import React, { useEffect, useState } from "react";
import { useList, useSort } from "../../../shared/hooks";
import { SearchParams } from "../../../shared/types";
import { IInteractionItem, ISearchInteractionsParams } from "./InteractionsListTypes";

type InteractionsListProps = {
  /** Поисковые данные взаимодействий */
  searchParams: ISearchInteractionsParams
  /** Установить обработчик подгрузки данных */
  setLoadData: (callback: (page: number, size: number) => void) => void
  /** Установить обработчик очистки списка */
  setClearList: (callback: () => any) => void
}

/** Список взаимодействий */
export default function InteractionsList({searchParams, setLoadData, setClearList}: InteractionsListProps) {
  const {sortData, toggleSort, setAscending, setDescending} = useSort()

  const getInteractionsHandler = async (searchParams: SearchParams<ISearchInteractionsParams>): Promise<IInteractionItem[]> => {
    // TODO
    return []
  }

  const {items, clearList, loadData, isLoading} = useList(sortData, searchParams, getInteractionsHandler);

  useEffect(() => {
    setLoadData(loadData)
    setClearList(clearList)
  }, [loadData, clearList])
  
  return (
    <div className="interactions-list">
      <div className="interactions-list__header">test</div>
      <div className="interactions-list__list">
        {
          items.map(item => <div>test</div>)
        }
      </div>
    </div>
  );
}
