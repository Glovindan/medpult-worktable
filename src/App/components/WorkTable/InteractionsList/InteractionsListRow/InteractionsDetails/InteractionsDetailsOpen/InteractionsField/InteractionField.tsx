import React, { useEffect, useState } from "react";

function InteractionField({
  label,
  children,
  minWidth,
  maxWidth,
}: {
  label: string;
  children: React.ReactNode;
  minWidth?: number;
  maxWidth?: number;
}) {
  return (
    <div
      className="interactions-field"
      style={{ minWidth: `${minWidth}px`, maxWidth: `${maxWidth}px` }}
    >
      <span className="interactions-field__subtitle">{label}</span>
      <span>{children}</span>
    </div>
  );
}
export default InteractionField;
