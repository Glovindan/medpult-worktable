import React, { useEffect, useState } from "react";

type TabWithCounterProps = {
    /** Текст вкладки */
    title: string
    /** Количество элементов вкладки */
    count: number
    /** Загружается ли */
    isLoading: boolean
}

/** Вкладка с счетчиком элементов */
export default function TabWithCounter({title, count, isLoading} : TabWithCounterProps) {
  return (
    <div className="tab-counter">
      <div className="tab-counter__title">{title}</div>
      <div className="tab-counter__count">{isLoading ? <div className="tab-counter__loader"></div> : count}</div>
    </div>
  )
}