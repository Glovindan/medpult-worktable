import React, { useEffect, useState } from "react";
import { useList } from "../../../shared/hooks";
import { SearchParams, SortData } from "../../../shared/types";
import {
  IInteractionItem,
  InteractionsSortableFieldCode,
  ISearchInteractionsParams,
} from "./InteractionsListTypes";
import Scripts from "../../../shared/utils/clientScripts";
import ListHeaderColumn from "../ListComponents/ListHeaderColumn/ListHeaderColumn";
import Loader from "../../../../UIKit/Loader/Loader";
import InteractionsListRow from "./InteractionsListRow/InteractionsListRow";
import { useSortHandlers } from "../ListComponents/ListComponentsHooks";
import { IInteractionsTabProps } from "../InteractionsTab/InteractionsTab";

interface IInteractionsListProps extends IInteractionsTabProps {
  /** Поисковые данные взаимодействий */
  searchParams: ISearchInteractionsParams;
  /** Данные сортировки */
  sortData: SortData | undefined;
  /** Переключить данные сортировки */
  toggleSort: (fieldCode: string) => void;
  /** Открыть Модальное окно ответа на сообщение */
  handleOpenReplyModal: (interactionId: string) => void
  /** Открыть Модальное окно пересылки сообщения */
  handleOpenForwardModal: (interactionId: string) => void
  /** Идентификатор взаимодействия открытого по умолчанию */
  initialInteractionId: string | undefined
};

/** Список взаимодействий */
export default function InteractionsList({
  searchParams,
  setLoadData,
  setClearList,
  sortData,
  toggleSort,
  getInteractions,
  handleOpenReplyModal,
  handleOpenForwardModal,
  initialInteractionId,
}: IInteractionsListProps) {
  const [openRowIndex, setOpenRowIndex] = useState<string | undefined>(
    undefined
  );
  
  const {getListColumnProps} = useSortHandlers(sortData, toggleSort)

  const getInteractionsHandler = async (searchParams: SearchParams<ISearchInteractionsParams>): Promise<IInteractionItem[]> => {
    const interactions = await getInteractions(searchParams);
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
  }, [searchParams, sortData]);

  // обновить данные взаимодейтсвия
  const reloadItem = async (id: string) => {
    try {
      const updated = await Scripts.getInteractionById(id);

      setItems((prev) => prev.map((item) => (item.id === id ? updated : item)));
    } catch (err) {
      console.error("Ошибка в функции reloadItem", err);
    }
  };

  const [initialItem, setInitialItem] = useState<IInteractionItem>();
  const [isInitialItemLoading, setIsInitialItemLoading] = useState<boolean>(false);
  const [isInitialItemOpen, setIsInitialItemOpen] = useState<boolean>(false);

  const handleInitialInteraction = async (initialInteractionId: string) => {
    setIsInitialItemLoading(true);
    
    const initialInteractionItem = await Scripts.getInitialInteractionItem(initialInteractionId);
    setInitialItem(initialInteractionItem);
    setIsInitialItemOpen(true);

    setIsInitialItemLoading(false);
  }

  useEffect(() => { 
    if(!initialInteractionId) {
      setInitialItem(undefined);
      setIsInitialItemOpen(false);
      return;
    }

    handleInitialInteraction(initialInteractionId);
  }, [initialInteractionId])

  const getInitialOpenRowIndex = (openRowIndex: string | undefined, isInitialItemOpen: boolean) => {
    // Если выбран элемент из основного списка, то изначальный закрыт
    if(openRowIndex?.length) return;
    // Если изначальный не открыт, то изначальный закрыт
    if(!isInitialItemOpen) return;

    console.log("getInitialOpenRowIndex", initialInteractionId)
    return initialInteractionId
  }

  const setInitialOpenRowIndex = (id?: string) => {
    if(id) {
      setIsInitialItemOpen(true);
      setOpenRowIndex(undefined);
      
      return;
    }

    setIsInitialItemOpen(false);
  }

  return (
    <div className="interactions-list">
      <div className="interactions-list__header">
        <ListHeaderColumn></ListHeaderColumn>
        <ListHeaderColumn></ListHeaderColumn>
        <ListHeaderColumn {...getListColumnProps(InteractionsSortableFieldCode.entryPoint)}>
          Точка входа
        </ListHeaderColumn>
        <ListHeaderColumn {...getListColumnProps(InteractionsSortableFieldCode.slaStatus)}>
          SLA
        </ListHeaderColumn>
        <ListHeaderColumn tooltip="Телефон / Email">
          Телефон /<br />
          Email
        </ListHeaderColumn>
        <ListHeaderColumn {...getListColumnProps(InteractionsSortableFieldCode.createdAt)}>
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
        {
          !isInitialItemLoading && initialItem && initialInteractionId &&
          <InteractionsListRow
            key={initialItem.id}
            item={initialItem}
            openRowIndex={getInitialOpenRowIndex(openRowIndex, isInitialItemOpen)}
            setOpenRowIndex={setInitialOpenRowIndex}
            items={[]}
            setItems={() => {}}
            reloadData={reloadItem}
            handleOpenReplyModal={handleOpenReplyModal}
            handleOpenForwardModal={handleOpenForwardModal}
          />
        }
        {!isInitialItemLoading && items.map((item) => (
          <InteractionsListRow
            key={item.id}
            item={item}
            openRowIndex={openRowIndex}
            setOpenRowIndex={setOpenRowIndex}
            items={items}
            setItems={setItems}
            reloadData={reloadItem}
            handleOpenReplyModal={handleOpenReplyModal}
            handleOpenForwardModal={handleOpenForwardModal}
          />
        ))}
        {(isLoading || isInitialItemLoading) && <Loader />}
      </div>
    </div>
  );
}
