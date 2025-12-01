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
        {items.map((item) => (
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
        {isLoading && <Loader />}
      </div>
    </div>
  );
}
