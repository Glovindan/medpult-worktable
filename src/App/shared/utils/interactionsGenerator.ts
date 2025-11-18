import { ChannelType, IInteractionItem, InteractionStatus } from '../../components/WorkTable/InteractionsList/InteractionsListTypes';
import { ObjectItem } from '../../../UIKit/Filters/FiltersTypes';
import { SlaStatus } from '../../components/WorkTable/WorkTableTypes';

// Специальные методы для каждого перечисления
const randomInteractionStatus = () => {
  switch (Math.floor(Math.random() * 5)) {
    case 0:
      return InteractionStatus.new;
    case 1:
      return InteractionStatus.queue;
    case 2:
      return InteractionStatus.atWork;
    case 3:
      return InteractionStatus.missed;
    default:
      return InteractionStatus.processed;
  }
};

const randomChannelType = () => {
  switch (Math.floor(Math.random() * 4)) {
    case 0:
      return ChannelType.email;
    case 1:
      return ChannelType.call;
    case 2:
      return ChannelType.sms;
    default:
      return ChannelType.manual;
  }
};

export const randomSlaStatus = () => {
    switch (Math.floor(Math.random() * 3)) {
        case 0: return SlaStatus.ok;
        case 1: return SlaStatus.warning;
        default: return SlaStatus.overdue;
    }
};

// Генерация случайного объекта IEntryPoint
const generateRandomEntryPoint = () => ({
  channelSort: `channel${Math.ceil(Math.random() * 10)}@mail.ru`,
  marketingName: `Marketing Name ${Math.ceil(Math.random() * 10)}`,
});

// Генерация случайного объекта IExecutorData
const generateRandomExecutorData = () => {
  if (Math.random() > 0.5) return;

  return {
    fullname: `Исполнитель ${Math.ceil(Math.random() * 10)}`,
    groupName: `Группа ${Math.ceil(Math.random() * 10)}`,
  };
};

// Новый метод генерации экземпляра ObjectItem
const generateRandomObjectItem = () => {
  return new ObjectItem({
    value: Math.random().toString(),
    code: `CODE-${Math.ceil(Math.random() * 1000)}`,
  });
};

// Генерация случайной строки заданной длины с дополнением ведущими нулями
export function generateFixedLengthString(length: number): string {
    const randomNumber = Math.floor(Math.random() * 10); // Случайное число от 0 до 9
    const leadingZerosCount = length - 1; // Ведущие нули занимают всю строку кроме последнего символа
    const result = '0'.repeat(leadingZerosCount) + randomNumber.toString();

  return result;
}

// Новый метод генерации экземпляра ObjectItem
const generateRandomRequest = () => {
  if (Math.random() > 0.5) return;

  return new ObjectItem({
    value: `RQ${generateFixedLengthString(8)}/21`,
    code: `CODE-${Math.ceil(Math.random() * 1000)}`,
  });
};

// Новый метод генерации экземпляра ObjectItem
const generateRandomTask = (hasRequest: boolean) => {
  if (!hasRequest) return;
  if (Math.random() > 0.5) return;

  return new ObjectItem({
    value: `TS${generateFixedLengthString(8)}/21`,
    code: `CODE-${Math.ceil(Math.random() * 1000)}`,
  });
};

const generateRandomContractorName = () => {
  if (Math.random() > 0.5) return;

  return `Контрагент №${Math.ceil(Math.random() * 10)}`;
};

/**
 * Генерирует случайную строку заданной длины.
 * @param length - Длина генерируемой строки.
 * @returns Случайная строка.
 */
function generateRandomString(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

/**
 * Генерирует случайный email-адрес.
 * @param domain - Необязательный домен для email. Если не указан, будет сгенерирован случайный.
 * @returns Случайный email-адрес.
 */
function generateRandomEmail(domain?: string): string {
  const usernameLength = Math.floor(Math.random() * 10) + 5; // Длина имени пользователя от 5 до 14 символов
  const username = generateRandomString(usernameLength);

  const emailDomain =
    domain || `${generateRandomString(Math.floor(Math.random() * 5) + 3)}.com`;

  return `${username}@${emailDomain}`;
}

/**
 * Генерирует случайный номер телефона в заданном формате.
 * @param format - Необязательный формат номера телефона. По умолчанию "+7 (XXX) XXX-XX-XX".
 *                  Используйте 'X' для обозначения цифры.
 * @returns Случайный номер телефона.
 */
function generateRandomPhoneNumber(format?: string): string {
  const defaultFormat = "+7 (XXX) XXX-XX-XX";
  const selectedFormat = format || defaultFormat;

  let phoneNumber = "";
  for (let i = 0; i < selectedFormat.length; i++) {
    if (selectedFormat[i] === "X") {
      phoneNumber += Math.floor(Math.random() * 10);
    } else {
      phoneNumber += selectedFormat[i];
    }
  }
  return phoneNumber;
}

const generateRandomContactData = () => {
  if (Math.random() > 0.5) return generateRandomPhoneNumber();

  return generateRandomEmail();
};

// Создание простого псевдо-уникального ID
const createUniqueId = () =>
  `${Date.now().toString(36)}${(Math.random() * 100000000).toFixed(0)}`;

// Генерация случайного объекта IInteractionItem
export const generateRandomInteractionItem = (): IInteractionItem => {
  const request = generateRandomRequest();
  const task = generateRandomTask(!!request);
  return {
    id: createUniqueId(),
    status: randomInteractionStatus(),
    channelType: randomChannelType(),
    entryPoint: generateRandomEntryPoint(),
    slaStatus: randomSlaStatus(),
    contactData: generateRandomContactData(),
    createdAt: new Date(Date.now() + Math.random() * 86400000 * 30), // Случайная дата в пределах последних 30 дней
    contractorName: generateRandomContractorName(),
    hasAttachments: Boolean(Math.round(Math.random())),
    requestTopic: `Тема №${Math.ceil(Math.random() * 10)}`,
    request: request,
    task: task,
    executor: generateRandomExecutorData(),
    isIncoming: Math.random() > 0.5,
  };
};

// Генератор массива элементов IInteractionItem[]
export const generateInteractionsArray = (
  count: number
): IInteractionItem[] => {
  return Array.from({ length: count }, (_, index) =>
    generateRandomInteractionItem()
  );
};
