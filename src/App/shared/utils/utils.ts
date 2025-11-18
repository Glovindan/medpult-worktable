import { useEffect, useState } from "react";
import { localStorageDraftKey } from "./constants";
import icons from "../icons";
import Scripts from "./clientScripts";

/** Маршрутизация по SPA */
export const redirectSPA = (href: string) => {
  let element = document.createElement("a");
  element.href = href;
  element.style.display = "none";
  document.querySelector("body")?.appendChild(element);
  element.click();
  element.remove();
};

/** Маршрутизация по SPA с использовнием URL и проверкой текущего пути */
export const redirectSPAWithURL = (redirectUrl: URL) => {
  if (window.location.pathname == redirectUrl.pathname) {
    // Если ссылка с тем же путем, то перезагрузить страницу
    window.history.pushState(null, "", redirectUrl.toString());
    window.location.reload();
  } else {
    // Иначе стандартная логика
    redirectSPA(redirectUrl.toString());
  }
};

/** Запись идентификатора обращения в localStorage
 * @param id Идентификатор обращения
 */
async function setRequest(id: string) {
  localStorage.setItem("currentRequestId", id);
  localStorage.setItem("currentContractorId", "");
  localStorage.setItem("currentContractorPhone", "");
}

async function setTask(id: string) {
  localStorage.setItem("currentTaskId", id);
  localStorage.setItem("currentContractorId", "");
  localStorage.setItem("currentContractorPhone", "");
}

/** Получение данных формы из черновика */
export function getDataFromDraft() {
  // Получение данных из черновика
  const draftData = localStorage.getItem(localStorageDraftKey);
  localStorage.removeItem(localStorageDraftKey);
  if (draftData) {
    return JSON.parse(draftData);
  }
}

export function useDebounce<ValueType = any>(
  value: ValueType,
  delay: number
): ValueType {
  // Состояние и сеттер для отложенного значения
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Выставить debouncedValue равным value (переданное значение)
      // после заданной задержки
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Вернуть функцию очистки, которая будет вызываться каждый раз, когда ...
      // ... useEffect вызван снова. useEffect будет вызван снова, только если ...
      // ... value будет изменено (смотри ниже массив зависимостей).
      // Так мы избегаем изменений debouncedValue, если значение value ...
      // ... поменялось в рамках интервала задержки.
      // Таймаут очищается и стартует снова.
      // Что бы сложить это воедино: если пользователь печатает что-то внутри ...
      // ... нашего приложения в поле поиска, мы не хотим, чтобы debouncedValue...
      // ... не менялось до тех пор, пока он не прекратит печатать дольше, чем 500ms.
      return () => {
        clearTimeout(handler);
      };
    },
    // Вызывается снова, только если значение изменится
    // мы так же можем добавить переменную "delay" в массива зависимостей ...
    // ... если вы собираетесь менять ее динамически.
    [value]
  );

  return debouncedValue;
}

export function saveState<ValueType>(state: ValueType) {
  let stateStr: string;

  try {
    stateStr = JSON.stringify(state);
  } catch (e) {
    throw new Error("Ошибка приведения состояния к строке: " + e);
  }

  localStorage.setItem(localStorageDraftKey, stateStr);
}

export function getStatusRequestColor(status: any) {
  switch (status) {
    case "sozdano":
      return "#E7F5B6";
    case "vrabote":
      return "#C5CBE9";
    case "utochnenie-zaprosa":
      return "#B3EAD0";
    case "v-ozhidanii":
      return "#D1D8DC";
    case "zakryto":
      return "#BCE0FB";
    case "otkryto":
      return "#BCE0FB";
    default:
      "#2d2e2f";
  }
}

export function getStatusTaskIcon(status: any) {
  switch (status) {
    case "queue":
      return icons.StatusQueue;
    case "atWork":
      return icons.StatusAtWork;
    case "control":
      return icons.StatusControl;
    case "postpone":
      return icons.StatusPostpone;
    case "complete":
      return icons.StatusComplete;
    case "returned":
      return icons.StatusComplete;
    default:
      return;
  }
}

/** Скачать файл по URL */
export async function onClickDownloadFileByUrl(
  url?: string,
  fileName?: string
) {
  if (!url) return;

  let blob: Blob;

  if (url.startsWith("data:")) {
    const res = await fetch(url);
    blob = await res.blob();
  } else {
    const response = await Scripts.downloadFileBucket(url, fileName || "file");
    blob = new Blob([response.arrayBuffer], { type: response.contentType });
  }

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName || "file";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}


/** Получить ссылку на страницу конкретного обращения */
export function getRequestHref(requestId: string) {
  const requestPageLink = Scripts.getRequestPagePath();
  const origin = window.location.origin;
  const url = new URL(`${origin}/${requestPageLink}`);

  url.searchParams.set("requestId", requestId);

  const href = url.toString();

  return href;
}

/** Получить ссылку на страницу конкретной задачи */
export function getTaskHref(requestId: string, taskId: string) {
  const url = new URL(getRequestHref(requestId));

  url.searchParams.set("taskId", taskId);

  const href = url.toString();

  return href;
}

export default {
  redirectSPA,
  setRequest,
  setTask,
  getDataFromDraft,
  saveState,
  getStatusRequestColor,
  getStatusTaskIcon,
};
