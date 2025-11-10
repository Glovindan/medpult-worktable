import React, { useEffect, useState } from "react";
import { useList, useSort } from "../../../shared/hooks";
import { SearchParams, SortData } from "../../../shared/types";
import { IInteractionItem, ISearchInteractionsParams } from "./InteractionsListTypes";
import Scripts from "../../../shared/utils/clientScripts";
import ListHeaderColumn, { SortingState } from "../ListHeaderColumn/ListHeaderColumn";
import Loader from "../../../../UIKit/Loader/Loader";
import StatusColumn from "./StatusColumn/StatusColumn";
import ChannelColumn from "./ChannelColumn/ChannelColumn";

type InteractionsListProps = {
  /** Поисковые данные взаимодействий */
  searchParams: ISearchInteractionsParams
  /** Установить обработчик подгрузки данных */
  setLoadData: React.Dispatch<React.SetStateAction<(page: number, size: number) => Promise<void>>>
  /** Установить обработчик очистки списка */
  setClearList: React.Dispatch<React.SetStateAction<() => void>>
  /** Данные сортировки */
  sortData: SortData | undefined
  /** Переключить данные сортировки */
  toggleSort: (fieldCode: string) => void
}

/** Список взаимодействий */
export default function InteractionsList({searchParams, setLoadData, setClearList, sortData, toggleSort}: InteractionsListProps) {

  const getSortingState = (fieldCode: string) => {
    if(sortData?.code != fieldCode) return SortingState.unsorted;
    if(sortData.isAscending) return SortingState.ascending;

    return SortingState.descending
  }

  const getListColumnProps = (fieldCode: string) => {
    const handleSortClick = () => toggleSort(fieldCode)
    const sortingState = getSortingState(fieldCode) 

    return {handleSortClick, sortingState}
  }

  const getInteractionsHandler = async (searchParams: SearchParams<ISearchInteractionsParams>): Promise<IInteractionItem[]> => {
    const interactions = await Scripts.getInteractions(searchParams)
    console.log(interactions);
    return interactions
  }

  const {items, clearList, loadData, isLoading} = useList(sortData, searchParams, getInteractionsHandler);

  useEffect(() => {
    setLoadData(() => loadData)
    setClearList(() => clearList)
  }, [])

  return (
    <div className="interactions-list">
      <div className="interactions-list__header">
        <ListHeaderColumn></ListHeaderColumn>
        <ListHeaderColumn></ListHeaderColumn>
        <ListHeaderColumn {...getListColumnProps("entryPoint")}>Точка входа</ListHeaderColumn>
        <ListHeaderColumn {...getListColumnProps("slaStatus")}>SLA</ListHeaderColumn>
        <ListHeaderColumn tooltip="Телефон / Email">Телефон /<br/>Email</ListHeaderColumn>
        <ListHeaderColumn {...getListColumnProps("createdAt")}>Дата и время</ListHeaderColumn>
        <ListHeaderColumn>Контрагент</ListHeaderColumn>
        <ListHeaderColumn></ListHeaderColumn>
        <ListHeaderColumn>Тема обращения</ListHeaderColumn>
        <ListHeaderColumn>Обращение</ListHeaderColumn>
        <ListHeaderColumn>Задача</ListHeaderColumn>
        <ListHeaderColumn>Исполнитель</ListHeaderColumn>
        <ListHeaderColumn></ListHeaderColumn>
      </div>
      <div className="interactions-list__list">
        {
          items.map(item => <div className="interactions-list__list_item">
            <StatusColumn status={item.status} />
            <ChannelColumn channel={item.channelType} isIncoming={item.isIncoming}/>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
          </div>)
        }
        {isLoading && <Loader />}
      </div>
    </div>
  );
}
