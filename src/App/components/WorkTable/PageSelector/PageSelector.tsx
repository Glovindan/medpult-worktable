import { max } from "moment";
import React, { useEffect, useState } from "react";
import Loader from "../../../../UIKit/Loader/Loader";
import { SortData } from "../../../shared/types";

/** Возможное количество отображаемых страниц слева и справа от текущей */
const PAGES_RANGE = 2;
/** Количество отображаемых элементов на одной странице */
const PART_SIZE = 20;

/** Получение параметров селектора: минимальная и максимальная отображаемые страницы, флаг отображения многоточий слева и справа  */
function getPagesParams(currentPage: number, pagesCount: number) {
  let minPage = currentPage - PAGES_RANGE;
  let maxPage = currentPage + PAGES_RANGE;
  let isShowLeftEllispes = true;
  let isShowRightEllispes = true;

  const leftBorder = 2;
  const rightBorder = pagesCount - 1;

  if (pagesCount <= 2 * PAGES_RANGE + 5) {
    isShowLeftEllispes = false;
    isShowRightEllispes = false;
    minPage = leftBorder;
    maxPage = rightBorder;

    return { minPage, maxPage, isShowLeftEllispes, isShowRightEllispes };
  }

  if (minPage < leftBorder) minPage = leftBorder;
  if (maxPage > rightBorder) maxPage = rightBorder;

  const rightBorderNoEllipses = leftBorder + (2 * PAGES_RANGE + 1);
  if (
    minPage >= leftBorder &&
    maxPage <= rightBorder &&
    maxPage <= rightBorderNoEllipses
  ) {
    minPage = leftBorder;
    maxPage = rightBorderNoEllipses;
    isShowLeftEllispes = false;
  }

  const leftBorderNoEllipses = rightBorder - (2 * PAGES_RANGE + 1);
  if (
    minPage >= leftBorder &&
    maxPage <= rightBorder &&
    minPage >= leftBorderNoEllipses
  ) {
    minPage = leftBorderNoEllipses;
    maxPage = rightBorder;
    isShowRightEllispes = false;
  }

  if (minPage < leftBorder) minPage = leftBorder;
  if (maxPage > rightBorder) maxPage = rightBorder;

  return { minPage, maxPage, isShowLeftEllispes, isShowRightEllispes };
}

const ArrowIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 6L9 12L15 18"
      stroke="#A4A7AE"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

type PageSelectorProps = {
  /** Количество элементов */
  elementsCount: number;
  /** Обработчик очистки списка */
  clearItemsHandler: () => void;
  /** Обработчик добавления элементов в список */
  addItemsHandler: (page: number, size: number) => Promise<void>;
  /** Данные сортировки */
  sortData: SortData | undefined
};

/** Выбор страницы */
export default function PageSelector({
  elementsCount,
  clearItemsHandler,
  addItemsHandler,
  sortData,
}: PageSelectorProps) {
  // Индекс текущей страницы
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  
  // Количество страниц
  const pagesCount = Math.ceil(elementsCount / PART_SIZE);
  // Номер текущей страницы
  const currentPageNumber = currentPageIndex + 1;

  const { minPage, maxPage, isShowLeftEllispes, isShowRightEllispes } = getPagesParams(currentPageNumber, pagesCount);

  async function handleAddItems(page: number, size: number) {
    setIsShowMoreLoading(true)
    await addItemsHandler(page, PART_SIZE);
    setIsShowMoreLoading(false)
  }

  // Сброс текущей страницы при изменении обработчика нажатия или количества страниц
  useEffect(() => {
    clearItemsHandler()
    handleAddItems(0, PART_SIZE)
    setCurrentPageIndex(0);
  }, [elementsCount, clearItemsHandler, addItemsHandler, sortData?.isAscending]);

  const [isShowMoreLoading, setIsShowMoreLoading] = useState<boolean>(false);

  // Нажатие на кнопку Показать больше
  const handleShowMoreClick = async () => {
    const nextPage = currentPageIndex + 1;
    if (nextPage >= pagesCount) return;

    setCurrentPageIndex(nextPage);

    // Добавить PART_SIZE элементов
    handleAddItems(nextPage, PART_SIZE);
  };

  /** Получить список отображаемых страниц между максимальной и минимальной */
  const getDisplayablePages = () => {
    let pagesArr: number[] = [];
    for (let pageNumber = minPage; pageNumber <= maxPage; pageNumber++) {
      pagesArr.push(pageNumber);
    }

    return pagesArr;
  };

  /** Обработчик выбора страницы */
  const handlePageClick = (pageIndex: number) => {
    setCurrentPageIndex(pageIndex);

    // Показать PART_SIZE элементов
    clearItemsHandler();
    handleAddItems(pageIndex, PART_SIZE);
  };

  /** Обработчик уменьшения страницы */
  const handleLeftArrowClick = () => {
    const nextPageIndex = currentPageIndex - 1;
    if (nextPageIndex < 0) return;

    handlePageClick(nextPageIndex);
  };

  /** Обработчик увеличения страницы */
  const handleRightArrowClick = () => {
    const nextPageIndex = currentPageIndex + 1;
    if (nextPageIndex > pagesCount - 1) return;

    handlePageClick(nextPageIndex);
  };

  const ellipsesLayout = <div>...</div>;

  return (
    <div className="page-selector">
      <div className="page-selector__button-wrapper">
        <button
          className="page-selector__button-wrapper_button"
          onClick={handleShowMoreClick}
          disabled={isShowMoreLoading}
        >
          {isShowMoreLoading ? <Loader /> : "Показать больше"}
        </button>
        <div className="page-selector__button-wrapper_counter">
          20 из {elementsCount}
        </div>
      </div>
      <div className="page-selector__selector">
        <button
          className="page-selector__selector_left-arrow"
          onClick={handleLeftArrowClick}
        >
          {ArrowIcon}
        </button>

        <div className="page-selector__selector_pages">
          <button
            className={currentPageNumber == 1 ? "active-page" : ""}
            onClick={() => handlePageClick(0)}
          >
            1
          </button>

          {isShowLeftEllispes ? ellipsesLayout : null}

          {getDisplayablePages().map((page) => {
            return (
              <button
                className={page == currentPageNumber ? "active-page" : ""}
                onClick={() => handlePageClick(page - 1)}
              >
                {page}
              </button>
            );
          })}

          {isShowRightEllispes ? ellipsesLayout : null}

          {pagesCount > 1 ? (
            <button
              onClick={() => handlePageClick(pagesCount - 1)}
              className={pagesCount == currentPageNumber ? "active-page" : ""}
            >
              {pagesCount}
            </button>
          ) : null}
        </div>

        <button
          className="page-selector__selector_right-arrow"
          onClick={handleRightArrowClick}
        >
          {ArrowIcon}
        </button>
      </div>
    </div>
  );
}
