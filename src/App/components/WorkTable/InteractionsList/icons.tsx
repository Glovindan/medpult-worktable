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
const copyIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.4 12.8C3.63 12.8 3 12.17 3 11.4V4.4C3 3.63 3.63 3 4.4 3H11.4C12.17 3 12.8 3.63 12.8 4.4M8.6002 7.19995H15.6002C16.3734 7.19995 17.0002 7.82675 17.0002 8.59995V15.6C17.0002 16.3731 16.3734 17 15.6002 17H8.6002C7.827 17 7.2002 16.3731 7.2002 15.6V8.59995C7.2002 7.82675 7.827 7.19995 8.6002 7.19995Z"
      stroke="#A4A7AE"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const editIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 5.9997L18 8.9997M5 15.9997L4 19.9997L8 18.9997L19.586 7.4137C19.9609 7.03864 20.1716 6.53003 20.1716 5.9997C20.1716 5.46937 19.9609 4.96075 19.586 4.5857L19.414 4.4137C19.0389 4.03876 18.5303 3.82812 18 3.82812C17.4697 3.82813 16.9611 4.03876 16.586 4.4137L5 15.9997Z"
      stroke="#1570EF"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
const bindIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.0002 17.0002L10.5002 18.5002C9.83708 19.1631 8.93783 19.5355 8.00018 19.5355C7.06254 19.5355 6.16329 19.1631 5.50018 18.5002C4.83726 17.8371 4.46484 16.9378 4.46484 16.0002C4.46484 15.0625 4.83726 14.1633 5.50018 13.5002L8.50018 10.5002C9.16329 9.83726 10.0625 9.46484 11.0002 9.46484C11.9378 9.46484 12.8371 9.83726 13.5002 10.5002M12.0002 7.00018L13.5002 5.50018C14.1633 4.83726 15.0626 4.46484 16.0002 4.46484C16.9379 4.46484 17.8371 4.83726 18.5002 5.50018C19.1632 6.16329 19.5356 7.06254 19.5356 8.00018C19.5356 8.93783 19.1632 9.83708 18.5002 10.5002L15.5002 13.5002C14.8371 14.1631 13.9379 14.5355 13.0002 14.5355C12.0626 14.5355 11.1633 14.1631 10.5002 13.5002"
      stroke="#FDFDFD"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
);

const checkIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 12L9 17L19 7"
      stroke="#FDFDFD"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const nextIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 19L19 12M19 12L12 5M19 12H5"
      stroke="#FDFDFD"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
const replyIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.6222 10.6783C3.2686 10.2952 3.2686 9.70478 3.6222 9.32172L8.12869 4.43968C8.43742 4.10523 8.99609 4.32367 8.99609 4.77883V7.5C15.499 7.5 16.9961 12 16.9961 16.5C14.999 13.9961 13.543 12.5 8.99609 12.5V15.2212C8.99609 15.6763 8.43741 15.8948 8.12869 15.5603L3.6222 10.6783Z"
      stroke="#1570EF"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
  </svg>
);

const replyAllIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.99749 7.99962V4.77809C6.99749 4.32294 6.43881 4.10485 6.13009 4.4393L1.6236 9.32134C1.27 9.7044 1.27 10.2948 1.62359 10.6779L6.13009 15.5599C6.43881 15.8944 6.99749 15.6759 6.99749 15.2208V11.9996M10.9975 7.49962V4.77844C10.9975 4.32329 10.4388 4.10485 10.1301 4.4393L5.6236 9.32134C5.27 9.7044 5.27 10.2948 5.62359 10.6779L10.1301 15.5599C10.4388 15.8944 10.9975 15.6759 10.9975 15.2208V12.4996C15.5444 12.4996 17.0004 13.9957 18.9975 16.4996C18.9975 11.9996 17.5004 7.49962 10.9975 7.49962Z"
      stroke="#1570EF"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
  </svg>
);
const forwardIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.37 10.6783C16.7236 10.2952 16.7236 9.70478 16.37 9.32172L11.8635 4.43968C11.5548 4.10523 10.9961 4.32367 10.9961 4.77883V7.5C4.49316 7.5 2.99609 12 2.99609 16.5C4.99316 13.9961 6.44922 12.5 10.9961 12.5V15.2212C10.9961 15.6763 11.5548 15.8948 11.8635 15.5603L16.37 10.6783Z"
      stroke="#1570EF"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
  </svg>
);

const downloadIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.01172 11L3.01868 15.3333C3.01868 15.7754 3.19428 16.1993 3.50684 16.5118C3.8194 16.8244 4.24332 17 4.68535 17H15.3401C15.7821 17 16.206 16.8244 16.5186 16.5118C16.8312 16.1993 17.0068 15.7754 17.0068 15.3333L16.9998 11M9.99996 2V12M9.99996 12L7 9M9.99996 12L13 9"
      stroke="#1570EF"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const download24Icon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 13V19C4 19.5304 4.21071 20.0391 4.58579 20.4142C4.96086 20.7893 5.46957 21 6 21H18C18.5304 21 19.0391 20.7893 19.4142 20.4142C19.7893 20.0391 20 19.5304 20 19V13M12 3V15M12 15L8.5 11.5M12 15L15.5 11.5"
      stroke="#1570EF"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
const changeIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.9987 15.9988V12.2496H12.2494M4.00098 4.00116V7.75044H7.75025M15.9522 9.25015C15.7952 8.00344 15.2508 6.83748 14.3957 5.91677C13.5406 4.99605 12.418 4.36706 11.1862 4.11853C9.9545 3.87 8.67583 4.01447 7.53061 4.53157C6.38539 5.04866 5.43143 5.91228 4.80332 7.00058M4.04747 10.7499C4.20443 11.9966 4.74887 13.1625 5.60398 14.0832C6.45908 15.0039 7.58168 15.6329 8.81341 15.8815C10.0451 16.13 11.3238 15.9855 12.469 15.4684C13.6142 14.9513 14.5682 14.0877 15.1963 12.9994"
      stroke="#1570EF"
      stroke-width="1.49971"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const addIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 3V17M17 10H3"
      stroke="#1570EF"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
);
const closeIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.0006 5L5 19.0001M19.0006 19.0001L5.00037 5"
      stroke="#565A62"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
);

const notSelectedIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0.5" y="0.5" width="19" height="19" rx="3.5" fill="white" />
    <rect x="0.5" y="0.5" width="19" height="19" rx="3.5" stroke="#D5D7DA" />
  </svg>
);

const selectedIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0.5" y="0.5" width="19" height="19" rx="3.5" fill="#1570EF" />
    <rect x="0.5" y="0.5" width="19" height="19" rx="3.5" stroke="#1570EF" />
    <path
      d="M15 6.5L8 13.5L5 10.5"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
const InteracrionNew = (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="4" cy="4" r="4" fill="#1570EF" />
  </svg>
);
const InteracrionAtWork = (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="4" cy="4" r="4" fill="#DC7703" />
  </svg>
);
const InteracrionQueue = (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="4" cy="4" r="4" fill="#A4A7AE" />
  </svg>
);
const InteracrionProcessed = (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="4" cy="4" r="4" fill="#21A038" />
  </svg>
);
const InteracrionMissed = (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="4" cy="4" r="4" fill="#D92D20" />
  </svg>
);

const arrowGreyIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 9L12 15L18 9"
      stroke="#565A62"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const fileEmailModal = (
  <svg
    width="18"
    height="16"
    viewBox="0 0 18 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.9999 15.2L0.33965 8.00001L17.6602 8.00001L8.9999 15.2Z"
      fill="#949494"
      fill-opacity="0.7"
    />
    <rect x="5" width="8" height="8" fill="#949494" fill-opacity="0.7" />
  </svg>
);

const Wastebasket = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 6H20M19 6L18.1245 19.133C18.0544 20.1836 17.1818 21 16.1289 21H7.87111C6.81818 21 5.94558 20.1836 5.87554 19.133L5 6M16 6L15.4558 4.36754C15.1836 3.55086 14.4193 3 13.5585 3H10.4415C9.58066 3 8.81638 3.55086 8.54415 4.36754L8 6M14 11V16M10 11V16"
      stroke="#FF4545"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
);

export default {
  /** Иконка вложения */
  attachmentIcon,
  /** Иконка раскрытия взаимодействия */
  arrowIcon,
  /** Иконка скопировать */
  copyIcon,
  /** Иконка редактироваить */
  editIcon,
  /** Иконка привязать */
  bindIcon,
  /** Иконка галочка */
  checkIcon,
  /** Иконка стрелка */
  nextIcon,
  /** Иконка ответить */
  replyIcon,
  /** Иконка ответить всем */
  replyAllIcon,
  /** Иконка переслать */
  forwardIcon,
  /** Иконка скачать размером 20*20 */
  downloadIcon,
  /** Иконка скачать размером 24*24 */
  download24Icon,
  /** Иконка изменить */
  changeIcon,
  /** Иконка добавить */
  addIcon,
  /** Иконка крестик */
  closeIcon,
  /** Иконка не выбранный чекбокс */
  notSelectedIcon,
  /** Иконка выбранный чекбокс */
  selectedIcon,
  /**Статусы Взаимодействия*/
  InteracrionNew,
  InteracrionAtWork,
  InteracrionQueue,
  InteracrionProcessed,
  InteracrionMissed,
  /** Иконка раскрытия списка статусов телефонии */
  arrowGreyIcon,

  fileEmailModal,
  Wastebasket,
};
