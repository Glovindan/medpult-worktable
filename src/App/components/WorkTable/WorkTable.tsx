import React, { useEffect, useState } from "react";
import TabsWrapper from "../../../UIKit/Tabs/TabsWrapper/TabsWrapper.tsx";
import TabItem from "../../../UIKit/Tabs/TabItem/TabItem.tsx";
import WorkTableTabsActions from "./WorkTableTabsActions/WorkTableTabsActions.tsx";
import PageSelector from "./PageSelector/PageSelector.tsx";

function usePagination() {
  // Текущая страница
  const [currentPage, setCurrentPage] = useState(0);
  // Количество страниц
  const [pagesCount, setPagesCount] = useState(0);
  // Обработчик нажтия на кнопку Показать больше
  const [showMoreCallback, setShowMoreCallback] = useState(() => () => {})

  // Нажатие на кнопку Показать больше
  const handleShowMoreClick = () => {
    const nextPage = currentPage + 1;
    if(nextPage >= pagesCount) return;

    setCurrentPage(nextPage);
    showMoreCallback();
  }

  // Сброс текущей страницы при изменении обработчика нажатия или количества страниц
  useEffect(() => {
    setCurrentPage(0);
  }, [pagesCount, showMoreCallback])

  return {currentPage, setCurrentPage, setPagesCount, handleShowMoreClick}
}

/** Рабочий стол */
export default function WorkTable() {
  // TODO: States of tab items count
  return (
    <div className="worktable">
      <div className="worktable__tabs">
        <TabsWrapper actionsLayout={<WorkTableTabsActions />}>
          {/* TODO: create every tab layout and logic
              add tab items count indicator
          */}
          <TabItem code="groupInteractions" name="Взаимодействия группы">Взаимодействия группы</TabItem>
          <TabItem code="myInteractions" name="Мои взаимодействия">Мои взаимодействия</TabItem>
          <TabItem code="groupTasks" name="Задачи группы">Задачи группы</TabItem>
          <TabItem code="myTasks" name="Мои задачи">Мои задачи</TabItem>
        </TabsWrapper>
      </div>
      <div className="worktable__page-selector">
        <PageSelector />
      </div>
    </div>
  );
}
