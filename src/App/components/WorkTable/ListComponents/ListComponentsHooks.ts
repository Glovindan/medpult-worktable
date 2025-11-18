import { SortData } from "../../../shared/types";
import { SortingState } from "./ListHeaderColumn/ListHeaderColumn";

export function useSortHandlers(sortData: SortData | undefined, toggleSort: (fieldCode: string) => void) {
    const getSortingState = (fieldCode: string) => {
      if (sortData?.code != fieldCode) return SortingState.unsorted;
      if (sortData.isAscending) return SortingState.ascending;
  
      return SortingState.descending;
    };
  
    const getListColumnProps = (fieldCode: string) => {
      const handleSortClick = () => toggleSort(fieldCode);
      const sortingState = getSortingState(fieldCode);
  
      return { handleSortClick, sortingState };
    };

    return {getSortingState, getListColumnProps}
}