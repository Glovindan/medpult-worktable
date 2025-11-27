import React, { useEffect, useState } from "react";
import {
  IInteractionItem,
  IInteractionDetailsItem,
} from "../../InteractionsListTypes";
import Scripts from "../../../../../shared/utils/clientScripts";
import Loader from "../../../../../../UIKit/Loader/Loader";
import InteractionsDetailsOpen from "./InteractionsDetailsOpen/InteractionsDetailsOpen";

/** Пропсы */
interface InteractionsDetailsProps {
  /** Данные взаимодействия */
  data: IInteractionItem;
  /** Обработчик нажатия на строку */
  onClickRowHandler: () => any;
  /** Перезагрузить список */
  reloadData: (id: string) => void;
  /** Список взаимодействий */
  items: IInteractionItem[];
  /** Установить список взаимодействий */
  setItems: React.Dispatch<React.SetStateAction<IInteractionItem[]>>;
  /** Идентификатор задачи */
  taskId?: string;
}

/** Детальная форма согласования */
function InteractionsDetails(props: InteractionsDetailsProps) {
  const { data, reloadData, items, setItems, taskId } = props;

  // Детальные данные взаимодействия
  const [interactionsDetailsData, setInteractionsDetailsData] =
    useState<IInteractionDetailsItem>();
  // Получить детальные данные взаимодействия
  const fetchInteractionsDetails = async () => {
    const detailsData = await Scripts.getInteractionsDetails(data.id);
    setInteractionsDetailsData(detailsData);
  };

  // Перезагрузить данные формы
  const reloadFulldata = () => {
    fetchInteractionsDetails();
  };

  // Изначальная загрузка данных
  React.useLayoutEffect(() => {
    reloadFulldata();
  }, []);

  return (
    <>
      {!interactionsDetailsData ? (
        <div className="custom-list-row-approval custom-list-row-approval_openable amendment-details">
          <Loader />
        </div>
      ) : (
        <div className="interactions-details">
            <div className="interactions-details__content">
              <InteractionsDetailsOpen
                data={interactionsDetailsData}
                interactionId={data.id}
                taskId={taskId}
                onSave={fetchInteractionsDetails}
                reloadData={reloadData}
              />
            </div>
        </div>
      )}
    </>
  );
}

export default InteractionsDetails;
