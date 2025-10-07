import React from "react";
import icons from "../../shared/icons";
import { ListColumnData, SortData } from "../CustomListTypes";

interface ListColumnProps extends ListColumnData {
  handleSortClick: any;
  sortData: SortData | undefined;
}

/** Столбец шапки таблицы */
function CustomListHeaderColumn(props: ListColumnProps) {
  const { code, fr, fixedWidth, isSortable, name, handleSortClick, sortData } =
    props;

  /** Переключение режима сортировки для колонки */
  const toggleSortColumn = () => {
    let data: SortData | undefined = sortData;

    if (data?.code !== code) {
      data = new SortData({ code, isAscending: true });
    } else if (data.isAscending) {
      data = new SortData({ code, isAscending: false });
    } else {
      data = undefined;
    }
    handleSortClick(data);
  };

  const sortButton = (
    <div
      className="custom-list-header-column__button"
      onClick={toggleSortColumn}
    >
      {icons.SortArrow}
    </div>
  );

  return (
    <div
      className="custom-list-header-column"
      style={fixedWidth ? { width: fixedWidth } : { flex: fr }}
    >
      <div className="custom-list-header-column__name" title={name}>
        {name}
      </div>
      {isSortable && sortButton}
    </div>
  );
}

export default CustomListHeaderColumn;
