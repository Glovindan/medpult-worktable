import React, { useEffect, useState } from "react";
import { useList, useSort } from "../../../shared/hooks";
import { SearchParams, SortData } from "../../../shared/types";
import { IInteractionItem, ISearchInteractionsParams } from "./InteractionsListTypes";
import Scripts from "../../../shared/utils/clientScripts";
import ListHeaderColumn, { SortingState } from "../ListComponents/ListHeaderColumn/ListHeaderColumn";
import Loader from "../../../../UIKit/Loader/Loader";
import StatusColumn from "./StatusColumn/StatusColumn";
import ChannelColumn from "./ChannelColumn/ChannelColumn";
import DoubleStrokeColumn from "./EntryPointColumn/EntryPointColumn";
import moment from "moment";
import ListColumn from "../ListComponents/ListColumn/ListColumn";
import { ObjectItem } from "../../../../UIKit/Filters/FiltersTypes";
import LinkColumn from "../ListComponents/LinkColumn/LinkColumn";
import { MiddleEllipsisString } from "./MiddleElipsisString/MiddleEllipsisString";

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
  /** Установить количество отображаемых элементов */
  setDisplayableElementsCount: React.Dispatch<React.SetStateAction<number | undefined>>
}

/** Список взаимодействий */
export default function InteractionsList({searchParams, setLoadData, setClearList, sortData, toggleSort, setDisplayableElementsCount}: InteractionsListProps) {

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

  useEffect(() => {
    setDisplayableElementsCount(items.length)
  }, [items])

  /** Получить ссылку на страницу конкретного обращения */
  function getRequestHref(requestId: string) {
    const requestPageLink = Scripts.getRequestPagePath();
    const origin = window.location.origin
    const url = new URL(`${origin}/${requestPageLink}`)

    url.searchParams.set("requestId", requestId);

    const href = url.toString();

    return href;
  }

  /** Получить ссылку на страницу конкретной задачи */
  function getTaskHref(requestId: string, taskId: string) {
    const requestPageLink = Scripts.getRequestPagePath();
    const origin = window.location.origin
    const url = new URL(`${origin}/${requestPageLink}`)

    url.searchParams.set("requestId", requestId);
    url.searchParams.set("taskId", taskId);

    const href = url.toString();

    return href;
  }

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
            <DoubleStrokeColumn firstRowValue={item.entryPoint.channelSort} secondRowValue={item.entryPoint.marketingName}/>
            <ListColumn></ListColumn>
            <ListColumn>{item.contactData}</ListColumn>
            <ListColumn>{moment(item.createdAt).format("DD.MM.YYYY HH:mm")}</ListColumn>
            <ListColumn>{item.contractorName}</ListColumn>
            <ListColumn><span>attachment</span></ListColumn>
            <ListColumn>{item.requestTopic}</ListColumn>
            <LinkColumn href={getRequestHref(item.request.code)} tooltip={item.request.value}><MiddleEllipsisString value={item.request.value}/></LinkColumn>
            <LinkColumn href={getTaskHref(item.request.code, item.task.code)} tooltip={item.task.value}><MiddleEllipsisString value={item.task.value}/></LinkColumn>
            <DoubleStrokeColumn firstRowValue={item.executor.fullname} secondRowValue={item.executor.groupName}/>
            <ListColumn>button</ListColumn>
          </div>)
        }
        {isLoading && <Loader />}
      </div>
    </div>
  );
}
