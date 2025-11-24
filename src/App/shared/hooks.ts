import { useEffect, useRef, useState } from "react";
import { FetchData, SearchParams, SortData } from "./types";

/** Кастмоный хук для обработки сортировки */
export function useSort() {
  const [sortData, setSortData] = useState<SortData | undefined>();

  const setAscending = (fieldCode: string) => {
    const newSortData: SortData = {
      code: fieldCode,
      isAscending: true,
    };

    setSortData(newSortData);
  };

  const setDescending = (fieldCode: string) => {
    const newSortData: SortData = {
      code: fieldCode,
      isAscending: false,
    };

    setSortData(newSortData);
  };

  /** Нажатие на сортировку */
  const toggleSort = (fieldCode: string) => {
    if (sortData?.code != fieldCode) {
      setAscending(fieldCode);
      return;
    }

    if (sortData.isAscending) {
      setDescending(fieldCode);
      return;
    }

    setSortData(undefined);
  };

  return { sortData, toggleSort, setAscending, setDescending };
}

/** Кастмоный хук для обработки загрузки и пагинации списка */
export function useList<ItemType = any, SearchDataType = any>(
  sortData: SortData | undefined,
  searchData: SearchDataType | undefined,
  getDataHandler: (props: SearchParams) => Promise<ItemType[]>
) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [items, setItems] = useState<ItemType[]>([]);

  /** Очистить список */
  const clearList = () => {
    setItems([]);
  };

  /** Добавить значения в список */
  const loadData = async (page: number, size: number) => {
    if (isLoading) return;

    setIsLoading(true);

    const itemsPart = await getDataHandler({
      page,
      size,
      sortData,
      searchData,
    });
    setItems((itemsBefore) => [...itemsBefore, ...itemsPart]);
    console.log("load");

    setIsLoading(false);
  };

  return { items, clearList, setItems, loadData, isLoading };
}

/** Обработчик нажатия на enter*/
export function useEnterClickHandler(filters: any, applyFilters: () => void) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        applyFilters();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [filters]);
}