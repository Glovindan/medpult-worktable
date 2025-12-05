import { ObjectItem } from "../../../../../UIKit/Filters/FiltersTypes";

// Данные файла
interface FileData {
  /** Название */
  name: string;
  /** Идентификатор */
  id: string;
}

interface ContractorData {
  /** Идентификатор */
  id?: string;
  /** ФИО */
  fullname?: string;
  /** Электронные почты */
  emails?: string[];
  /** Электронная почта (по-умолчанию) */
  email?: string;
}

/** Аргументы, передаваемые в функцию ответа/пересылки email */
export interface SendEmailAction {
  /** Сессия */
  session?: ObjectItem;
  /** Текст сообщения */
  text?: string;
  /** Контактное лицо */
  contractor?: ContractorData;
  /** Данные вложений */
  filesData?: FileData[];
  /** Тема письма */
  topic?: string;
  /** Почты получателей копии */
  emailsCopy?: string;
}

export interface SendEmailModalProps {
  interactionId: string;
  closeModal: () => void;
  mode: "reply" | "forward" | null;
  initialData?: Partial<SendEmailAction>;
  /** Сохранение состояния вкладки */
  saveState: () => void;
  openTabCode?: string;
}
