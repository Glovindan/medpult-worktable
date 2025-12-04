import React, { useEffect, useState } from "react";
import { InteractionStatus } from "../../InteractionsListTypes";
import Scripts from "../../../../../shared/utils/clientScripts";
type StatusColumnProps = {
  /** Статус */
  status: InteractionStatus;
};

/** Колонка статуса взаимодействия */
export default function StatusColumn({ status }: StatusColumnProps) {
  const getStatusIconColor = () => {
    switch (status) {
      case InteractionStatus.new:
        return "#1570EF";
      case InteractionStatus.atWork:
        return "#DC7703";
      case InteractionStatus.processed:
        return "#21A038";
      case InteractionStatus.missed:
        return "#D92D20";
      default:
        return "#A4A7AE";
    }
  };

  const statusName = Scripts.getInteractionStatusName(status);

  return (
    <div className="status-column" title={statusName}>
      <svg
        width="8"
        height="8"
        viewBox="0 0 8 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="4"
          cy="4"
          r="3"
          fill={getStatusIconColor()}
          stroke={getStatusIconColor()}
        />
      </svg>
    </div>
  );
}
