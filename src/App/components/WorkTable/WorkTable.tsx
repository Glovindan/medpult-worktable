import React, { useEffect, useState } from "react";
import TabsWrapper from "../../../UIKit/Tabs/TabsWrapper/TabsWrapper.tsx";
import TabItem from "../../../UIKit/Tabs/TabItem/TabItem.tsx";
import WorkTableTabsActions from "./WorkTableTabsActions/WorkTableTabsActions.tsx";

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
        {/* TODO: custom hook or component
            must have: set and get current state, set pages count
        */}
      </div>
    </div>
  );
}
