import React, { useEffect, useRef, useState } from "react";
import CustomListColumn from "./CustomListHeaderColumn/CustomListHeaderColumn";
import Loader from "../Loader/Loader";
import CustomListRow from "./CustomListRow/CustomListRow";
import {
  FetchData,
  FetchItem,
  ListColumnData,
  SortData,
  getDetailsLayoutAttributes,
} from "./CustomListTypes";
import CustomListSelector from "./CustomListSelector/CustomListSelector";
import { useElementHeight, useWindowSizeAndZoom } from "../shared/utils/hooks";

type ListProps<SearchDataType = any, ItemType = any> = {
  /** Основные настройки */
  /** Настройки отображения колонок */
  columnsSettings: ListColumnData[];
  /** Получение данных */
  getDataHandler: (
    page: number,
    sortData?: SortData,
    searchData?: SearchDataType
  ) => Promise<FetchData<ItemType>>;
  /** Есть прокрутка? */
  isScrollable?: boolean;
  /** Высота */
  height?: string;
  /** Ширина списка в пикселях */
  listWidth?: number;

  /** Настройки поиска */
  /** Данные поиска */
  searchData?: SearchDataType;
  searchFields?: string[];
  /** Установка обработчика нажатия на поиск */
  setSearchHandler?: (callback: () => void) => void;

  /** Получение формы детальной информации по вкладке */
  getDetailsLayout?: ({
    rowData,
    onClickRowHandler,
  }: getDetailsLayoutAttributes) => any;

  /** Возможность выбора строки */
  isSelectable?: boolean;
  /** Множественный выбор строк */
  isMultipleSelect?: boolean;
  /** Присвоить выбранные строки */
  selectedItems?: string[];
  /** Присвоить выбранные строки */
  setSelectedItems?: (ids: string[]) => void;
};

/** Список данных в виде таблицы */
function CustomList<SearchDataType = any, ItemType = any>(
  props: ListProps<SearchDataType, ItemType>
) {
  const {
    height,
    listWidth,
    columnsSettings,
    getDataHandler,
    searchData,
    searchFields,
    setSearchHandler,
    isScrollable = true,
    getDetailsLayout,
    isMultipleSelect,
    isSelectable,
    selectedItems = [],
    setSelectedItems,
  } = props;

  // Страница
  const [page, setPage] = useState<number>(0);
  // Показать лоадер
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // Параметр остановки подгрузки элементов
  const [hasMore, setHasMore] = useState<boolean>(true);
  // Данные сортировки
  const [sortData, setSortData] = useState<SortData>();
  // Элементы списка
  const [items, setItems] = useState<FetchItem<ItemType>[]>([]);
  // Индекс раскрытой строки
  const [openRowIndex, setOpenRowIndex] = useState<string>();
  // Ссылка на тело списка
  const bodyRef = useRef<HTMLDivElement>(null);
  // Ссылка на список
  const listRef = useRef<HTMLDivElement>(null);
  // Ссылка на шапку списка
  const headerRef = useRef<HTMLDivElement>(null);

  const reloadData = () => {
    console.log("searchData reloadData:", searchData);
    setIsLoading(false);
    setItems([]);
    setPage(0);
    setHasMore(true);
    loadData([], 0, true);
  };

  /** Обработка скролла по горизонтали */
  useEffect(() => {
    // Обработка скролла
    const handleScroll = () => {
      if (!bodyRef.current) return;
      if (!headerRef.current) return;

      // Синхронизация скролла шапки и тела
      headerRef.current.scrollLeft = bodyRef.current.scrollLeft;
    };

    bodyRef.current?.addEventListener("scroll", handleScroll);

    return () => bodyRef.current?.removeEventListener("scroll", handleScroll);
  }, []);

  /** Загрузка данных списка */
  const loadData = async (
    items: any[] = [],
    page: number = 0,
    hasMore: boolean = true
  ) => {
    if (isLoading) return;
    if (!hasMore) return;

    setIsLoading(true);

    const fetchData = await getDataHandler(page, sortData, searchData);
    setHasMore(fetchData.hasMore);

    setItems([...items, ...fetchData.items]);
    setPage(page + 1);
    setIsLoading(false);
  };

  useEffect(() => {
    reloadData();
  }, [searchData]);

  /** Обработчик скролла по вертикали */
  const onScroll = () => {
    const body = bodyRef.current!;
    const height = body.scrollHeight - body.offsetHeight;
    const scrollPosition = body.scrollTop;

    if ((height - scrollPosition) / height < 0.05 && !isLoading) {
      loadData(items, page, hasMore);
    }
  };

  /** Установить обработчик нажатия на кнопку поиск */
  useEffect(() => {
    if (!setSearchHandler) return;
    setSearchHandler(() => {
      reloadData();
    });
  }, [searchData, sortData]);

  /** Обновление оглавления при изменении сортировки */
  useEffect(() => {
    reloadData();
  }, [sortData]);

  /** Нажатие на сортировку */
  const handleSortClick = (sortDataNew: SortData | undefined) => {
    setSortData(sortDataNew);
  };
  /** Получение ширины скроллбара */
  const getScrollbarWidth = (ref: React.RefObject<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) return 0;

    return element.offsetWidth - element.clientWidth;
  };

  const setCheckedRowsIds = (ids: string[]) => {
    if (setSelectedItems) setSelectedItems(ids);
  };

  /** Добавление/удаление выбранной строки */
  const toggleCheckedRow = (id: string) => {
    const findId = selectedItems.find((checkedId) => checkedId === id);

    // Удаление
    if (findId) {
      setCheckedRowsIds(selectedItems.filter((checkedId) => checkedId != id));
      return;
    }

    // Добавление
    if (isMultipleSelect) {
      setCheckedRowsIds([...selectedItems, id]);
    } else {
      setCheckedRowsIds([id]);
    }
  };

  const headerStyles: React.CSSProperties = {};
  if (listWidth)
    headerStyles.width = `${listWidth - getScrollbarWidth(headerRef)}px`;
  if (!isSelectable) headerStyles.paddingLeft = `20px`;

  /** Показывать прокрутку по размеру содержимого */
  const [isScrollableByContent, setIsScrollableByContent] = useState<boolean>();
  const updateScrollableByContent = () => {
    const wrapperHeight = bodyRef.current?.getBoundingClientRect().height ?? 0;
    const listHeight = listRef.current?.getBoundingClientRect().height ?? 0;

    setIsScrollableByContent(listHeight > wrapperHeight);
  };

  // Хук для отслеживания изменения размеров окна
  const windowSizeParams = useWindowSizeAndZoom();
  // Хук для отслеживания изменения размеров списка
  const listHeight = useElementHeight(listRef);

  // Вычислять при изменении размера окна и высоты списка
  React.useLayoutEffect(() => {
    updateScrollableByContent();
  }, [windowSizeParams, listHeight]);

  const notFoundText = (
    <div className="custom-list__not-found">Записи не найдены</div>
  );

  const rowsLayout = items.map((item) => {
    /** Обработчик нажатия на строку */
    const toggleShowDetails = () => {
      if (item.id === undefined) return;

      if (item.id === openRowIndex) {
        setOpenRowIndex(undefined);
        return;
      }

      setOpenRowIndex(item.id);
    };

    return (
      <CustomListRow<ItemType>
        {...props}
        key={item.id}
        data={item.data}
        isShowDetails={getDetailsLayout && item.id === openRowIndex}
        setOpenRowIndex={toggleShowDetails}
        reloadData={reloadData}
        toggleChecked={() => toggleCheckedRow(item.id)}
        isChecked={Boolean(
          selectedItems.find((checkedId) => checkedId === item.id)
        )}
      />
    );
  });

  return (
    <div className="custom-list">
      <div
        className={
          isScrollable && isScrollableByContent
            ? "custom-list__header custom-list__header_scrollable"
            : "custom-list__header"
        }
        ref={headerRef}
      >
        <div style={headerStyles}>
          {/* TODO: Выбор всех */}
          {isSelectable && (
            <div
              style={
                !isMultipleSelect
                  ? { visibility: "hidden" }
                  : { visibility: "hidden" }
              }
            >
              <CustomListSelector
                onClickSelector={() => {}}
                isChecked={false}
              />
            </div>
          )}
          {columnsSettings.map((columnSettings) => (
            <CustomListColumn
              sortData={sortData}
              handleSortClick={handleSortClick}
              {...columnSettings}
            />
          ))}
        </div>
      </div>
      <div
        className={
          isScrollable && isScrollableByContent
            ? "custom-list__body_scrollable"
            : "custom-list__body"
        }
        style={height ? { height: height } : { height: "10px", flex: 1 }}
        ref={bodyRef}
        onScroll={onScroll}
      >
        <div
          ref={listRef}
          className="custom-list__body-wrapper"
          style={
            listWidth
              ? { width: `${listWidth - getScrollbarWidth(bodyRef)}px` }
              : {}
          }
        >
          {/* Показывать таблицу */}
          {Boolean(items.length) && rowsLayout}
          {/* Показывать надпись "Записи не найдены" */}
          {!Boolean(items.length) && !isLoading && notFoundText}
          {/* Показывать лоадер */}
          {isLoading && <Loader />}
        </div>
      </div>
    </div>
  );
}

export default CustomList;
