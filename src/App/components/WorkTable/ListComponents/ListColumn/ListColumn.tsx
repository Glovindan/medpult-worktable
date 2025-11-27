import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { SortData } from "../../../../shared/types";
import icons from "../../../../shared/icons";

interface IListColumnProps extends PropsWithChildren {
  /** Тултип */
  tooltip?: string
  /** white-space: nowrap ? */
  noWrap?: boolean
}

/** Столбец списка */
export default function ListColumn({children, tooltip, noWrap}: IListColumnProps) {
  return (
    <div className="list-column" title={tooltip ?? children?.toString()}>
      <div className="list-column__content" style={noWrap ? {whiteSpace: "nowrap"} : {}}>{children}</div>
    </div>
  );
}
