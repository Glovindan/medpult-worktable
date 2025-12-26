import React, { useEffect, useRef, useState } from "react";
import TabsWrapper from "../../../UIKit/Tabs/TabsWrapper/TabsWrapper.tsx";
import TabItem from "../../../UIKit/Tabs/TabItem/TabItem.tsx";
import WorkTableTabsActions from "./WorkTableTabsActions/WorkTableTabsActions.tsx";
import PageSelector from "./PageSelector/PageSelector.tsx";
import { TabsItemsCounts } from "../../shared/types.ts";
import Scripts from "../../shared/utils/clientScripts.ts";
import TabWithCounter from "./TabWithCounter/TabWithCounter.tsx";
import { useSort } from "../../shared/hooks.ts";
import TasksTab from "./TasksTab/TasksTab.tsx";
import InteractionsTab from "./InteractionsTab/InteractionsTab.tsx";
import { TabCode } from "./WorkTableTypes.ts";
import SendEmailModal from "./InteractionsList/SendEmailModal/SendEmailModal.tsx";
import { useEmailModalController } from "./InteractionsList/SendEmailModal/SendEmailModalHooks.ts";
import { AppFilter } from "../../../UIKit/Filters/FiltersTypes.ts";

const SAVED_TAB_CODE_KEY = "worktableTabCode";

function useTabsController(
  setElementsCount: React.Dispatch<React.SetStateAction<number>>
) {
  // Индикатор загрузки количества элементов на вкладках
  const [isTabsItemsCountsLoading, setIsTabsItemsCountsLoading] =
    useState<boolean>(true);
  // Количество элементов на каждой вкладке
  const [tabsItemsCounts, setTabsItemsCounts] = useState<TabsItemsCounts>(
    new TabsItemsCounts()
  );

  const getTabCodeByStringCode = (stringCode: string) => {
    switch (stringCode) {
      case TabCode.groupInteractions:
        return TabCode.groupInteractions;
      case TabCode.myInteractions:
        return TabCode.myInteractions;
      case TabCode.groupTasks:
        return TabCode.groupTasks;
      case TabCode.myTasks:
        return TabCode.myTasks;
      default:
        return;
    }
  };

  const getSavedTabCode = () => {
    const savedTabCode = localStorage.getItem(SAVED_TAB_CODE_KEY);

    if (!savedTabCode) return;
    const tabCode = getTabCodeByStringCode(savedTabCode);
    if (!tabCode) return;

    return tabCode;
  };

  // Состояние кода выбранной вкладки
  const [activeTabCode, setActiveTabCode] = useState<TabCode>(
    getSavedTabCode() ?? TabCode.groupInteractions
  );

  // Обновление количества элементов на вкладках
  const updateTabsItemsCounts = async () => {
    setIsTabsItemsCountsLoading(true);

    const count = await Scripts.getTabItemsCount();
    setTabsItemsCounts(count);

    setIsTabsItemsCountsLoading(false);
  };

  /** Получить количество элементов по коду текущей вкладки */
  const getElementsCountByActiveTabCode = () => {
    switch (activeTabCode) {
      case TabCode.groupInteractions:
        return tabsItemsCounts.groupInteractions;
      case TabCode.myInteractions:
        return tabsItemsCounts.myInteractions;
      case TabCode.groupTasks:
        return tabsItemsCounts.groupTasks;
      default:
        return tabsItemsCounts.myTasks;
    }
  };

  // Обновление количества элементов при изменении вкладки или при обновлении количества элементов на вкладках
  useEffect(() => {
    setElementsCount(getElementsCountByActiveTabCode());
  }, [tabsItemsCounts, activeTabCode]);

  // Иницизализация
  useEffect(() => {
    // Получение количества элементов на вкладках
    updateTabsItemsCounts();
  }, []);

  return {
    isTabsItemsCountsLoading,
    tabsItemsCounts,
    updateTabsItemsCounts,
    activeTabCode,
    setActiveTabCode,
    getTabCodeByStringCode,
  };
}

/** Рабочий стол */
export default function WorkTable() {
  const [elementsCount, setElementsCount] = useState<number>(0);
  const {
    isTabsItemsCountsLoading,
    tabsItemsCounts,
    activeTabCode,
    setActiveTabCode,
    getTabCodeByStringCode,
    updateTabsItemsCounts,
  } = useTabsController(setElementsCount);

  const [clearItemsHandler, setClearItemsHandler] = useState<() => void>(
    () => () => {}
  );
  const [addItemsHandler, setAddItemsHandler] = useState<
    (page: number, size: number) => Promise<void>
  >(() => async (page: number, size: number) => {});
  const [filteredElementsCount, setFilteredElementsCount] = useState<number>(0);

  const [lastResetDate, setLastResetDate] = useState<Date>(new Date());
  /** Обработчик сброса списка и его контролера */
  const handleResetList = () => setLastResetDate(new Date());

  const {
    modalProps,
    isModalVisible,
    handleOpenReplyModal,
    handleOpenForwardModal,
    getState,
  } = useEmailModalController();

  // Идентификатор раскрытого взаимодействие при инициализации формы
  const [initialInteractionId, setInitialInteractionId] = useState<string>();

  const initWithSendEmailModal = () => {
    const currentURL = new URL(window.location.href);

    const contractorId = currentURL.searchParams.get("contractorId");
    const interactionId = currentURL.searchParams.get("interaction_id");

    // Указать раскрытое взаимодействие
    if (interactionId) setInitialInteractionId(interactionId);

    // Указать выбранного контрагента и открыть модалку
    if (interactionId && contractorId) {
      const state = getState(interactionId);
      handleOpenForwardModal(
        interactionId,
        contractorId,
        state.taskId,
        state.requestId
      );
    }

    const newUrl = new URL(currentURL);

    newUrl.searchParams.delete("contractorId");
    newUrl.searchParams.delete("tab_code");
    newUrl.searchParams.delete("interaction_id");

    window.history.replaceState({}, "", newUrl.href);
  };

  useEffect(() => {
    initWithSendEmailModal();
  }, []);

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    localStorage.setItem(SAVED_TAB_CODE_KEY, activeTabCode);
    setInitialInteractionId(undefined);
  }, [activeTabCode]);

  return (
    <>
      {isModalVisible && (
        <SendEmailModal {...modalProps} openTabCode={activeTabCode} />
      )}
      <div className="worktable">
        <div className="worktable__tabs">
          <TabsWrapper
            actionsLayout={<WorkTableTabsActions />}
            setActiveTabCodeGlobal={setActiveTabCode}
            activeTabCodeGlobal={activeTabCode}
          >
            <TabItem
              code={TabCode.groupInteractions}
              name={
                <TabWithCounter
                  title="Взаимодействия группы"
                  count={tabsItemsCounts.groupInteractions}
                  isLoading={isTabsItemsCountsLoading}
                />
              }
            >
              <InteractionsTab
                key="groupInteractions"
                setLoadData={setAddItemsHandler}
                setClearList={setClearItemsHandler}
                setFilteredElementsCount={setFilteredElementsCount}
                getInteractions={Scripts.getInteractionsGroup}
                getInteractionsCount={Scripts.getInteractionsGroupCount}
                handleResetList={handleResetList}
                handleOpenReplyModal={handleOpenReplyModal}
                handleOpenForwardModal={handleOpenForwardModal}
                initialInteractionId={initialInteractionId}
                clearInitialInteractionId={() =>
                  setInitialInteractionId(undefined)
                }
                updateTabsItemsCounts={updateTabsItemsCounts}
              />
            </TabItem>
            <TabItem
              code={TabCode.myInteractions}
              name={
                <TabWithCounter
                  title="Мои взаимодействия"
                  count={tabsItemsCounts.myInteractions}
                  isLoading={isTabsItemsCountsLoading}
                />
              }
            >
              <InteractionsTab
                key="myInteractions"
                setLoadData={setAddItemsHandler}
                setClearList={setClearItemsHandler}
                setFilteredElementsCount={setFilteredElementsCount}
                getInteractions={Scripts.getInteractionsMy}
                getInteractionsCount={Scripts.getInteractionsMyCount}
                isMyInteractions={true}
                handleResetList={handleResetList}
                handleOpenReplyModal={handleOpenReplyModal}
                handleOpenForwardModal={handleOpenForwardModal}
                initialInteractionId={initialInteractionId}
                clearInitialInteractionId={() =>
                  setInitialInteractionId(undefined)
                }
                updateTabsItemsCounts={updateTabsItemsCounts}
              />
            </TabItem>
            <TabItem
              code={TabCode.groupTasks}
              name={
                <TabWithCounter
                  title="Задачи группы"
                  count={tabsItemsCounts.groupTasks}
                  isLoading={isTabsItemsCountsLoading}
                />
              }
            >
              <TasksTab
                key="groupTasks"
                setLoadData={setAddItemsHandler}
                setClearList={setClearItemsHandler}
                setFilteredElementsCount={setFilteredElementsCount}
                getTasks={Scripts.getTasksGroup}
                getTasksCount={Scripts.getTasksGroupCount}
                handleResetList={handleResetList}
              />
            </TabItem>
            <TabItem
              code={TabCode.myTasks}
              name={
                <TabWithCounter
                  title="Мои задачи"
                  count={tabsItemsCounts.myTasks}
                  isLoading={isTabsItemsCountsLoading}
                />
              }
            >
              <TasksTab
                key="myTasks"
                setLoadData={setAddItemsHandler}
                setClearList={setClearItemsHandler}
                setFilteredElementsCount={setFilteredElementsCount}
                getTasks={Scripts.getTasksMy}
                getTasksCount={Scripts.getTasksMyCount}
                handleResetList={handleResetList}
                isMyTasksTab={true}
              />
            </TabItem>
          </TabsWrapper>
        </div>
        <div className="worktable__page-selector">
          <PageSelector
            elementsCount={elementsCount}
            clearItemsHandler={clearItemsHandler}
            addItemsHandler={addItemsHandler}
            resetTrigger={lastResetDate}
            filteredElementsCount={filteredElementsCount}
            onClickPage={() => setInitialInteractionId(undefined)}
          />
        </div>
      </div>
    </>
  );
}
