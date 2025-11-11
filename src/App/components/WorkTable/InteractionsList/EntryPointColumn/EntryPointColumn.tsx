import React, { useEffect, useState } from "react";
import { IEntryPoint } from "../InteractionsListTypes";

type DoubleStrokeColumnProps = {
    /** Значение первой строки */
    firstRowValue: string;
    /** Значение второй строки */
    secondRowValue: string;
}

/** Столбец с двумя строками */
export default function DoubleStrokeColumn({firstRowValue, secondRowValue}: DoubleStrokeColumnProps) {
  return (
    <div className="double-stroke-column">
        <div className="double-stroke-column__first-row" title={firstRowValue}>{firstRowValue}</div>
        <div className="double-stroke-column__second-row" title={secondRowValue}>{secondRowValue}</div>
    </div>
  );
}
