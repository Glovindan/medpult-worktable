import { TabsItemsCounts } from "../types";

/** Заглушка ожидания ответа сервера */
function randomDelay() {
  const delay = Math.random() * 1000;
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

async function getTabItemsCount() {
  await randomDelay();

  const tabsItemsCounts = new TabsItemsCounts();

  tabsItemsCounts.groupInteractions = Math.floor(200 * Math.random())
  tabsItemsCounts.groupTasks = Math.floor(200 * Math.random())
  tabsItemsCounts.myInteractions = Math.floor(200 * Math.random())
  tabsItemsCounts.myTasks = Math.floor(200 * Math.random())

  return tabsItemsCounts;
}
export default {
  getTabItemsCount
};
