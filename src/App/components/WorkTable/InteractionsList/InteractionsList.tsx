import React, { useEffect, useState } from "react";
import { useList, useSort } from "../../../shared/hooks";
import { SearchParams, SortData } from "../../../shared/types";
import {
  IInteractionItem,
  ISearchInteractionsParams,
} from "./InteractionsListTypes";
import Scripts from "../../../shared/utils/clientScripts";
import ListHeaderColumn, {
  SortingState,
} from "../ListComponents/ListHeaderColumn/ListHeaderColumn";
import Loader from "../../../../UIKit/Loader/Loader";
import StatusColumn from "./InteractionsListRow/StatusColumn/StatusColumn";
import ChannelColumn from "./InteractionsListRow/ChannelColumn/ChannelColumn";
import DoubleStrokeColumn from "./InteractionsListRow/EntryPointColumn/EntryPointColumn";
import moment from "moment";
import ListColumn from "../ListComponents/ListColumn/ListColumn";
import { ObjectItem } from "../../../../UIKit/Filters/FiltersTypes";
import LinkColumn from "../ListComponents/LinkColumn/LinkColumn";
import { MiddleEllipsisString } from "./InteractionsListRow/MiddleEllipsisString/MiddleEllipsisString";
import icons from "./icons";
import InteractionsListRow from "./InteractionsListRow/InteractionsListRow";
import { useSortHandlers } from "../ListComponents/ListComponentsHooks";

type InteractionsListProps = {
  /** Поисковые данные взаимодействий */
  searchParams: ISearchInteractionsParams;
  /** Установить обработчик подгрузки данных */
  setLoadData: React.Dispatch<
    React.SetStateAction<(page: number, size: number) => Promise<void>>
  >;
  /** Установить обработчик очистки списка */
  setClearList: React.Dispatch<React.SetStateAction<() => void>>;
  /** Данные сортировки */
  sortData: SortData | undefined;
  /** Переключить данные сортировки */
  toggleSort: (fieldCode: string) => void;
  /** Установить количество отображаемых элементов */
  setDisplayableElementsCount: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
};

/** Список взаимодействий */
export default function InteractionsList({
  searchParams,
  setLoadData,
  setClearList,
  sortData,
  toggleSort,
  setDisplayableElementsCount,
}: InteractionsListProps) {
  const [openRowIndex, setOpenRowIndex] = useState<string | undefined>(
    undefined
  );
  
  const {getListColumnProps} = useSortHandlers(sortData, toggleSort)

  const getInteractionsHandler = async (
    searchParams: SearchParams<ISearchInteractionsParams>
  ): Promise<IInteractionItem[]> => {
    const interactions = await Scripts.getInteractions(searchParams);
    console.log(interactions);
    return interactions;
  };

  const { items, clearList, setItems, loadData, isLoading } = useList(
    sortData,
    searchParams,
    getInteractionsHandler
  );

  useEffect(() => {
    setLoadData(() => loadData);
    setClearList(() => clearList);
  }, []);

  useEffect(() => {
    setDisplayableElementsCount(items.length);
  }, [items]);

  // обновить данные взаимодейтсвия
  const reloadItem = async (id: string) => {
    try {
      const updated = await Scripts.getInteractionById(id);

      setItems((prev) => prev.map((item) => (item.id === id ? updated : item)));
    } catch (err) {
      console.error("Ошибка в функции reloadItem", err);
    }
  };

  useEffect(() => {
    clearList();
    loadData(1, 20);
  }, [searchParams]);

  return (
    <div className="interactions-list">
      <div className="interactions-list__header">
        <ListHeaderColumn></ListHeaderColumn>
        <ListHeaderColumn></ListHeaderColumn>
        <ListHeaderColumn {...getListColumnProps("entryPoint")}>
          Точка входа
        </ListHeaderColumn>
        <ListHeaderColumn {...getListColumnProps("slaStatus")}>
          SLA
        </ListHeaderColumn>
        <ListHeaderColumn tooltip="Телефон / Email">
          Телефон /<br />
          Email
        </ListHeaderColumn>
        <ListHeaderColumn {...getListColumnProps("createdAt")}>
          Дата и время
        </ListHeaderColumn>
        <ListHeaderColumn>Контрагент</ListHeaderColumn>
        <ListHeaderColumn></ListHeaderColumn>
        <ListHeaderColumn>Тема обращения</ListHeaderColumn>
        <ListHeaderColumn>Обращение</ListHeaderColumn>
        <ListHeaderColumn>Задача</ListHeaderColumn>
        <ListHeaderColumn>Исполнитель</ListHeaderColumn>
        <ListHeaderColumn></ListHeaderColumn>
      </div>
      <div className="interactions-list__list">
        {items.map((item) => (
          <InteractionsListRow
            key={item.id}
            item={item}
            openRowIndex={openRowIndex}
            setOpenRowIndex={setOpenRowIndex}
            items={items}
            setItems={setItems}
            reloadData={reloadItem}
          />
        ))}
        {isLoading && <Loader />}
      </div>
    </div>
  );
}
