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

export default function PageSelector() {
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

    return (
        <div className="page-selector">
            <div className="page-selector__button-wrapper">
                <button className="page-selector__button-wrapper_button">Показать больше</button>
                <div className="page-selector__button-wrapper_counter">20 из 140</div>
            </div>
            <div className="page-selector__selector">
                <button className="page-selector__selector_left-arrow">{ArrowIcon}</button>
                <div className="page-selector__selector_pages">
                    <button>1</button>
                    <button className="active-page">2</button>
                    <button>3</button>
                    <div>...</div>
                    <button>6</button>
                    <button>7</button>
                    <button>8</button>
                </div>
                <button className="page-selector__selector_right-arrow">{ArrowIcon}</button>
            </div>
        </div>
    )
}