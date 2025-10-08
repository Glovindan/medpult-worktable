import { max } from "moment";
import React, { useEffect, useState } from "react";

export function usePagination() {
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

  return {currentPage, setCurrentPage, handleShowMoreClick, setPagesCount, setShowMoreCallback}
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

/** Выбор страницы */
export default function PageSelector() {
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    
    const currentPage = currentPageIndex + 1;
    const pagesCount = 20;

    /** Возможное количество отображаемых страниц слева и справа от текущей */
    const PAGES_RANGE = 2;

    /** Получение параметров селектора: минимальная и максимальная отображаемые страницы, флаг отображения многоточий слева и справа  */
    const getPagesParams = () => {
        let minPage = currentPage - PAGES_RANGE;
        let maxPage = currentPage + PAGES_RANGE;
        let isShowLeftEllispes = true;
        let isShowRightEllispes = true;

        const leftBorder = 2;
        const rightBorder = pagesCount - 1;

        if(pagesCount <= 2 * PAGES_RANGE + 5) {
            isShowLeftEllispes = false;
            isShowRightEllispes = false;
            minPage = leftBorder;
            maxPage = rightBorder;

            return {minPage, maxPage, isShowLeftEllispes, isShowRightEllispes};
        }
        
        if(minPage < leftBorder) minPage = leftBorder;
        if(maxPage > rightBorder) maxPage = rightBorder;
        
        const rightBorderNoEllipses = leftBorder + (2 * PAGES_RANGE + 1);
        if(minPage >= leftBorder && maxPage <= rightBorder && maxPage <= rightBorderNoEllipses) {
            minPage = leftBorder;
            maxPage = rightBorderNoEllipses;
            isShowLeftEllispes = false;
        }

        const leftBorderNoEllipses = rightBorder - (2 * PAGES_RANGE + 1);
        if(minPage >= leftBorder && maxPage <= rightBorder && minPage >= leftBorderNoEllipses) {
            minPage = leftBorderNoEllipses;
            maxPage = rightBorder;
            isShowRightEllispes = false;
        }
        
        if(minPage < leftBorder) minPage = leftBorder;
        if(maxPage > rightBorder) maxPage = rightBorder;

        return {minPage, maxPage, isShowLeftEllispes, isShowRightEllispes};
    }

    const {minPage, maxPage, isShowLeftEllispes, isShowRightEllispes} = getPagesParams();

    /** Получить список отображаемых страниц между максимальной и минимальной */
    const getDisplayablePages = () => {
        let pagesArr: number[] = [];
        for(let pageNumber = minPage; pageNumber <= maxPage; pageNumber++) {
            pagesArr.push(pageNumber)
        }

        return pagesArr;
    }

    /** Обработчик выбора страницы */
    const handlePageClick = (pageIndex: number) => {
        setCurrentPageIndex(pageIndex);
    }
    
    /** Обработчик уменьшения страницы */
    const handleLeftArrowClick = () => {
        const nextPageIndex = currentPageIndex - 1;
        if(nextPageIndex < 0) return;
        
        setCurrentPageIndex(nextPageIndex);
    }
    
    /** Обработчик увеличения страницы */
    const handleRightArrowClick = () => {
        const nextPageIndex = currentPageIndex + 1;
        if(nextPageIndex > pagesCount - 1) return;

        setCurrentPageIndex(nextPageIndex);
    }

    const ellipsesLayout = <div>...</div>;

    return (
        <div className="page-selector">
            <div className="page-selector__button-wrapper">
                <button className="page-selector__button-wrapper_button">Показать больше</button>
                <div className="page-selector__button-wrapper_counter">20 из 140</div>
            </div>
            <div className="page-selector__selector">
                <button className="page-selector__selector_left-arrow" onClick={handleLeftArrowClick}>{ArrowIcon}</button>

                <div className="page-selector__selector_pages">
                    <button className={currentPage == 1 ? "active-page" : ""} onClick={() => handlePageClick(0)}>1</button>

                    {isShowLeftEllispes ? ellipsesLayout : null}

                    {getDisplayablePages().map(page => {
                        return <button className={page == currentPage ? "active-page" : ""} onClick={() => handlePageClick(page - 1)}>{page}</button>
                    })}

                    {isShowRightEllispes ? ellipsesLayout : null}

                    {pagesCount > 1 ? <button onClick={() => handlePageClick(pagesCount - 1)} className={pagesCount == currentPage ? "active-page" : ""}>{pagesCount}</button> : null}
                </div>

                <button className="page-selector__selector_right-arrow" onClick={handleRightArrowClick}>{ArrowIcon}</button>
            </div>
        </div>
    )
}