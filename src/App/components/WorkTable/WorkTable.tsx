import React, { useEffect, useState } from "react";
import TabsWrapper from "../../../UIKit/Tabs/TabsWrapper/TabsWrapper.tsx";
import TabItem from "../../../UIKit/Tabs/TabItem/TabItem.tsx";
import WorkTableTabsActions from "./WorkTableTabsActions/WorkTableTabsActions.tsx";
import PageSelector from "./PageSelector/PageSelector.tsx";
import { TabsItemsCounts } from "../../shared/types.ts";
import Scripts from "../../shared/utils/clientScripts.ts";
import TabWithCounter from "./TabWithCounter/TabWithCounter.tsx";
import { InteractionStatus, ISearchInteractionsParams } from "./InteractionsList/InteractionsListTypes.ts";
import InteractionsList from "./InteractionsList/InteractionsList.tsx";
import { useSort } from "../../shared/hooks.ts";

function useTabsItemsCount() {
  // Индикатор загрузки количества элементов на вкладках
  const [isTabsItemsCountsLoading, setIsTabsItemsCountsLoading] = useState<boolean>(true);
  // Количество элементов на каждой вкладке
  const [tabsItemsCounts, setTabsItemsCounts] = useState<TabsItemsCounts>(new TabsItemsCounts());
  
  // Обновление количества элементов на вкладках
  const updateTabsItemsCounts = async() => {
    setIsTabsItemsCountsLoading(true);

    const count = await Scripts.getTabItemsCount();
    setTabsItemsCounts(count);

    setIsTabsItemsCountsLoading(false);
  }

  return {isTabsItemsCountsLoading, tabsItemsCounts, updateTabsItemsCounts}
}

/** Рабочий стол */
export default function WorkTable() {
  const {isTabsItemsCountsLoading, tabsItemsCounts, updateTabsItemsCounts} = useTabsItemsCount();
  // Иницизализация
  useEffect(() => {
    // Получение количества элементов на вкладках
    updateTabsItemsCounts()
  }, [])

  const [elementsCount, setElementsCount] = useState<number>(200)
  const [clearItemsHandler, setClearItemsHandler] = useState<() => void>(() => () => {})
  const [addItemsHandler, setAddItemsHandler] = useState<(page: number, size: number) => Promise<void>>(() => async (page: number, size: number) => {})
  const {sortData, toggleSort} = useSort()

  const searchParams: ISearchInteractionsParams = {};

  return (
    <div className="worktable">
      <div className="worktable__tabs">
        <TabsWrapper actionsLayout={<WorkTableTabsActions />}>
          <TabItem code="groupInteractions" name={<TabWithCounter title="Взаимодействия группы" count={tabsItemsCounts.groupInteractions} isLoading={isTabsItemsCountsLoading}/>}>
            <InteractionsList searchParams={searchParams} setLoadData={setAddItemsHandler} setClearList={setClearItemsHandler} sortData={sortData} toggleSort={toggleSort}/>
          </TabItem>
          <TabItem code="myInteractions" name={<TabWithCounter title="Мои взаимодействия" count={tabsItemsCounts.myInteractions} isLoading={isTabsItemsCountsLoading}/>}>
            Мои взаимодействия
          </TabItem>
          <TabItem code="groupTasks" name={<TabWithCounter title="Задачи группы" count={tabsItemsCounts.groupTasks} isLoading={isTabsItemsCountsLoading}/>}>
            Задачи группы
          </TabItem>
          <TabItem code="myTasks" name={<TabWithCounter title="Мои задачи" count={tabsItemsCounts.myTasks} isLoading={isTabsItemsCountsLoading}/>}>
            Мои задачи
          </TabItem>
        </TabsWrapper>
      </div>
      <div className="worktable__page-selector">
        <PageSelector elementsCount={elementsCount} clearItemsHandler={clearItemsHandler} addItemsHandler={addItemsHandler} sortData={sortData}/>
      </div>
    </div>
  );
}
