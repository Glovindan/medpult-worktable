import React, { useEffect, useState } from "react";
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

function useTabsController(setElementsCount: React.Dispatch<React.SetStateAction<number>>) {
  // Индикатор загрузки количества элементов на вкладках
  const [isTabsItemsCountsLoading, setIsTabsItemsCountsLoading] = useState<boolean>(true);
  // Количество элементов на каждой вкладке
  const [tabsItemsCounts, setTabsItemsCounts] = useState<TabsItemsCounts>(new TabsItemsCounts());
  // Состояние кода выбранной вкладки
  const [activeTabCode, setActiveTabCode] = useState<TabCode>(TabCode.groupInteractions)

  // Обновление количества элементов на вкладках
  const updateTabsItemsCounts = async () => {
    setIsTabsItemsCountsLoading(true);

    const count = await Scripts.getTabItemsCount();
    setTabsItemsCounts(count);

    setIsTabsItemsCountsLoading(false);
  };

  /** Получить количество элементов по коду текущей вкладки */
  const getElementsCountByActiveTabCode = () => {
    switch(activeTabCode) {
      case TabCode.groupInteractions: return tabsItemsCounts.groupInteractions
      case TabCode.myInteractions: return tabsItemsCounts.myInteractions
      case TabCode.groupTasks: return tabsItemsCounts.groupTasks
      default: return tabsItemsCounts.myTasks
    }
  }
  
  // Обновление количества элементов при изменении вкладки или при обновлении количества элементов на вкладках
  useEffect(() => {
    setElementsCount(getElementsCountByActiveTabCode());
  }, [tabsItemsCounts, activeTabCode])

  // Иницизализация
  useEffect(() => {
    // Получение количества элементов на вкладках
    updateTabsItemsCounts();
  }, []);

  return { isTabsItemsCountsLoading, tabsItemsCounts, updateTabsItemsCounts, activeTabCode, setActiveTabCode };
}

/** Рабочий стол */
export default function WorkTable() {
  const [elementsCount, setElementsCount] = useState<number>(0);
  const { isTabsItemsCountsLoading, tabsItemsCounts, activeTabCode, setActiveTabCode } = useTabsController(setElementsCount);

  const [clearItemsHandler, setClearItemsHandler] = useState<() => void>(() => () => {});
  const [addItemsHandler, setAddItemsHandler] = useState<(page: number, size: number) => Promise<void>>(() => async (page: number, size: number) => {});
  const [filteredElementsCount, setFilteredElementsCount] = useState<number>(0);
  const { sortData, toggleSort } = useSort();

  const [lastResetDate, setLastResetDate] = useState<Date>(new Date());
  /** Обработчик сброса списка и его контролера */
  const handleResetList = () => setLastResetDate(new Date());

  return (
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
              sortData={sortData}
              toggleSort={toggleSort}
              setFilteredElementsCount={setFilteredElementsCount}
              getInteractions={Scripts.getInteractionsGroup}
              getInteractionsCount={Scripts.getInteractionsGroupCount}
              handleResetList={handleResetList}
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
              sortData={sortData}
              toggleSort={toggleSort}
              setFilteredElementsCount={setFilteredElementsCount}
              getInteractions={Scripts.getInteractionsMy}
              getInteractionsCount={Scripts.getInteractionsMyCount}
              hideEmployeeFilter={true}
              handleResetList={handleResetList}
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
              sortData={sortData}
              toggleSort={toggleSort}
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
              sortData={sortData}
              toggleSort={toggleSort}
              setFilteredElementsCount={setFilteredElementsCount}
              getTasks={Scripts.getTasksMy}
              getTasksCount={Scripts.getTasksMyCount}
              handleResetList={handleResetList}
              hideEmployeeFilter={true}
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
        />
      </div>
    </div>
  );
}
