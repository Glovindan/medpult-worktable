import React, { PropsWithChildren} from "react";
import ListColumn from "../ListColumn/ListColumn";

interface ILinkColumnProps extends PropsWithChildren {
  /** Ссылка */
  href: string;
  /** Отображаемое значение */
  tooltip: string;
}

/** Столбец ссылка */
export default function LinkColumn({tooltip, href, children}: ILinkColumnProps) {
  return (
    <ListColumn tooltip={tooltip}><a target="_blank" className="link-column" href={href}>{children}</a></ListColumn>
  );
}
