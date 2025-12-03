import React from "react";
import ListColumn from "../ListColumn/ListColumn";

type SlaColumnProps = {
  /** Оставщееся время SLA */
  remainingTimeInMinutes?: number,
  /** Значение SLA */
  totalTimeInMinutes?: number;
}

enum SlaColor {
  /** Процент SLA > 0.3 */
  ok = "#21A038",
  /** 0 < Процент SLA < 0.3 */
  warning = "#DC7703",
  /** Процент SLA < 0 */
  bad = "#D92D20",
}

// Функция чтобы дни, часы, минуты было в формате 00
function padZero(value: number): string {
    return value < 10 ? '0' + value : value.toString();
}

//Функция для преобразования вывода SLA
function formatDuration(totalMinutes: number): string {
    const isNegative = totalMinutes < 0;
    const absMinutes = Math.abs(totalMinutes); // модуль числа

    // Вычисляем дни, часы, минуты 
    const days = Math.floor(absMinutes / (60 * 24));
    const hours = Math.floor((absMinutes % (60 * 24)) / 60);
    const minutes = Math.floor(absMinutes % 60);

    // Добавляем знак "-" для отрицательной разницы
    const result = `${padZero(days)}д ${padZero(hours)}ч ${padZero(minutes)}м`;
    return isNegative ? `-${result}` : result;
}

/** Столбец SLA */
export default function SlaColumn({remainingTimeInMinutes, totalTimeInMinutes}: SlaColumnProps) {
  // Если не указаны значения, то вывести пустую колонку
  if(remainingTimeInMinutes == undefined || totalTimeInMinutes == undefined) return <ListColumn></ListColumn>

  const remainingTimeRelation = remainingTimeInMinutes / totalTimeInMinutes;

  const getSlaIconColor = () => {
    if(remainingTimeRelation <= 0) return SlaColor.bad;
    if(remainingTimeRelation <= 0.3) return SlaColor.warning;

    return SlaColor.ok;
  }

  const slaColumn = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_4284_43828)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C1.28851e-07 3.58172 3.58172 1.28855e-07 8 0ZM8 2.75C7.58579 2.75 7.25 3.08579 7.25 3.5V8C7.25 8.19891 7.32907 8.38962 7.46973 8.53027L10.4697 11.5303C10.7626 11.8232 11.2374 11.8232 11.5303 11.5303C11.8232 11.2374 11.8232 10.7626 11.5303 10.4697L8.75 7.68945V3.5C8.75 3.08579 8.41421 2.75 8 2.75Z"
          fill={getSlaIconColor()}
        />
      </g>
      <defs>
        <clipPath id="clip0_4284_43828">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );

  return (
    <div className="sla-column" title={formatDuration(remainingTimeInMinutes)}>
      {slaColumn}
    </div>
  );
}
