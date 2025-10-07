import React, { useEffect, useState } from "react";
import Button from "../../../UIKit/Button/Button.tsx";
import TabsWrapper from "../../../UIKit/Tabs/TabsWrapper/TabsWrapper.tsx";
import TabItem from "../../../UIKit/Tabs/TabItem/TabItem.tsx";
import ModalWrapper from "./ModalWrapper/ModalWrapper.tsx";
import InsuredList from "../InsuredList/InsuredList.tsx";
import RequestList from "../RequestList/RequestList.tsx";
import TaskList from "../TaskList/TaskList.tsx";
import icons from "../../shared/icons.tsx";
import Scripts from "../../shared/utils/clientScripts.ts";
import { ContractorsSearchData } from "../../shared/types.ts";
import RequestsTab from "./Tabs/RequestsTab.tsx";
import InsuredTab from "./Tabs/InsuredTab.tsx";
import TasksTab from "./Tabs/TasksTab.tsx";
import SearchContractor from "../SearchContractor/SearchContractor.tsx";
import ContractorList from "../ContractorList/ContractorList.tsx";

/** Пропсы Модального окна */
export type ModalIncomingCallProps = {
  /** Поисковые данные контрагента */
  contractorsSearchData: ContractorsSearchData;
};

/**Модальное окно */

export default function ModalIncomingCall({
  contractorsSearchData,
}: ModalIncomingCallProps) {
  // Идентификаторы выбранных обратившихся
  const [selectedContractorsIds, setSelectedContractorsIds] = useState<
    string[]
  >([]);
  // Идентификаторы выбранных застрахованных
  const [selectedInsuredIds, setSelectedInsuredIds] = useState<string[]>([]);
  // Идентификаторы выбранных обращений
  const [selectedRequestsIds, setSelectedRequestsIds] = useState<string[]>([]);
  // Идентификаторы выбранных задач
  const [selectedTasksIds, setSelectedTasksIds] = useState<string[]>([]);

  // Вкладка застрахованные
  const insuredTab = InsuredTab({
    contractorsSearchData: contractorsSearchData,
    selectedInsuredIds: selectedInsuredIds,
    setSelectedInsuredIds: setSelectedInsuredIds,
    selectedContractorsIds: selectedContractorsIds,
  });

  // Вкладка обращения
  const requestsTab = RequestsTab({
    selectedInsuredIds: selectedInsuredIds,
    contractorsSearchData: contractorsSearchData,
    selectedRequestsIds: selectedRequestsIds,
    setSelectedRequestsIds: setSelectedRequestsIds,
    selectedContractorsIds: selectedContractorsIds,
  });

  // Вкладка задачи
  const tasksTab = TasksTab({
    selectedInsuredIds: selectedInsuredIds,
    selectedRequestsIds: selectedRequestsIds,
    contractorsSearchData: contractorsSearchData,
    selectedTasksIds: selectedTasksIds,
    setSelectedTasksIds: setSelectedTasksIds,
    selectedContractorsIds: selectedContractorsIds,
  });

  return (
    <div className="incoming-call-modal">
      <div className="incoming-call-modal__header">
        <span className="incoming-call-modal__header__label">
          Входящий звонок
        </span>
      </div>

      <div className="incoming-call-modal__content">
        <div className="incoming-call-modal__search">
          <SearchContractor phone={contractorsSearchData.phone} />
        </div>

        <div className="incoming-call-modal__panel">
          <ContractorList
            selectedContractorsIds={selectedContractorsIds}
            setSelectedContractorsIds={setSelectedContractorsIds}
            contractorsSearchData={contractorsSearchData}
          />
        </div>

        <div className="incoming-call-modal__table">
          <TabsWrapper>
            {/* Вкладка застрахованных */}
            {insuredTab}
            {/* Вкладка обращений */}
            {requestsTab}
            {/* Вкладка задач */}
            {tasksTab}
          </TabsWrapper>
        </div>
      </div>
    </div>
  );
}
