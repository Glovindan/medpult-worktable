import React, { useEffect, useState } from "react";

const attachmentIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.9217 12.5456L13.0395 19.4278C10.9939 21.4734 7.67903 21.4788 5.62686 19.4398C3.56528 17.3915 3.5599 14.0582 5.61484 12.0032L13.5578 4.06028C14.9246 2.69345 17.1407 2.69345 18.5075 4.06028C19.8744 5.42712 19.8744 7.64319 18.5075 9.01003L10.5766 16.941C9.89315 17.6244 8.78511 17.6244 8.10169 16.941C7.41827 16.2576 7.41827 15.1495 8.10169 14.4661L14.972 7.59582"
      stroke="#1570EF"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
);

const arrowIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 9L12 15L18 9"
      stroke="#1570EF"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default {
  /** Иконка вложения */
  attachmentIcon,
  /** Иконка раскрытия взаимодействия */
  arrowIcon,
}