import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { SortData } from "../../../../shared/types";
import icons from "../../../../shared/icons";

interface IListColumnProps extends PropsWithChildren {
  /** Тултип */
  tooltip?: string
}

/** Столбец списка */
export default function ListColumn({children, tooltip}: IListColumnProps) {
  return (
    <div className="list-column" title={tooltip ?? children?.toString()}>
      <div className="list-column__content">{children}</div>
    </div>
  );
}
