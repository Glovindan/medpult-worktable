import React, { useEffect, useState } from "react";
import icons from "../../shared/icons";

/** Сворачиваемая панель */
type PanelProps = {
  children?: any;
  label: any;
  count: any;
  isRollable?: boolean;
  isOpen: boolean;
};

/** Сворачиваемая панель */
export default function Panel({
  children,
  label,
  count,
  isRollable = true,
  isOpen = true,
}: PanelProps) {
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(isOpen);

  const handleClick = () => {
    if (!isRollable) return;
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <div className="panel">
      <div className="panel__header" onClick={handleClick}>
        <span className="panel__header__label">{label}</span>
        <span className="panel__header__count">{count}</span>
        {isRollable && (
          <span
            className={
              isPanelOpen
                ? "panel__header__triangle panel__header__triangle_open"
                : "panel__header__triangle"
            }
          >
            {icons.Triangle}
          </span>
        )}
      </div>
      <div
        className="panel__content"
        style={{
          display: isPanelOpen ? "block" : "none",
        }}
      >
        {children}
      </div>
    </div>
  );
}
