import { ChannelType, IInteractionItem, InteractionStatus, SlaStatus } from '../../components/WorkTable/InteractionsList/InteractionsListTypes';
import { ObjectItem } from '../../../UIKit/Filters/FiltersTypes';

// Специальные методы для каждого перечисления
const randomInteractionStatus = () => {
    switch (Math.floor(Math.random() * 5)) {
        case 0: return InteractionStatus.new;
        case 1: return InteractionStatus.queue;
        case 2: return InteractionStatus.atWork;
        case 3: return InteractionStatus.missed;
        default: return InteractionStatus.processed;
    }
};

const randomChannelType = () => {
    switch (Math.floor(Math.random() * 4)) {
        case 0: return ChannelType.email;
        case 1: return ChannelType.call;
        case 2: return ChannelType.sms;
        default: return ChannelType.manual;
    }
};

const randomSlaStatus = () => {
    switch (Math.floor(Math.random() * 3)) {
        case 0: return SlaStatus.ok;
        case 1: return SlaStatus.warning;
        default: return SlaStatus.overdue;
    }
};

// Генерация случайного объекта IEntryPoint
const generateRandomEntryPoint = () => ({
    channelSort: `channel${Math.ceil(Math.random() * 10)}@mail.ru`,
    marketingName: `Marketing Name ${Math.ceil(Math.random() * 10)}`
});

// Генерация случайного объекта IExecutorData
const generateRandomExecutorData = () => ({
    fullname: `Исполнитель ${Math.ceil(Math.random() * 10)}`,
    groupName: `Группа ${Math.ceil(Math.random() * 10)}`
});

// Новый метод генерации экземпляра ObjectItem
const generateRandomObjectItem = () => {
    return new ObjectItem({
        value: Math.random().toString(),
        code: `CODE-${Math.ceil(Math.random() * 1000)}`
    });
};

// Генерация случайной строки заданной длины с дополнением ведущими нулями
function generateFixedLengthString(length: number): string {
    const randomNumber = Math.floor(Math.random() * 10); // Случайное число от 0 до 9
    const leadingZerosCount = length - 1; // Ведущие нули занимают всю строку кроме последнего символа
    const result = '0'.repeat(leadingZerosCount) + randomNumber.toString();

    return result;
}

// Новый метод генерации экземпляра ObjectItem
const generateRandomRequest = () => {
    return new ObjectItem({
        value: `RQ${generateFixedLengthString(8)}/21`,
        code: `CODE-${Math.ceil(Math.random() * 1000)}`
    });
};

// Новый метод генерации экземпляра ObjectItem
const generateRandomTask = () => {
    return new ObjectItem({
        value: `TS${generateFixedLengthString(8)}/21`,
        code: `CODE-${Math.ceil(Math.random() * 1000)}`
    });
};

// Создание простого псевдо-уникального ID
const createUniqueId = () =>
    `${Date.now().toString(36)}${(Math.random() * 100000000).toFixed(0)}`;

// Генерация случайного объекта IInteractionItem
const generateRandomInteractionItem = () => ({
    id: createUniqueId(),
    status: randomInteractionStatus(),
    channelType: randomChannelType(),
    entryPoint: generateRandomEntryPoint(),
    slaStatus: randomSlaStatus(),
    contactData: `Контакт №${Math.ceil(Math.random() * 10)}`,
    createdAt: new Date(Date.now() + Math.random() * 86400000 * 30), // Случайная дата в пределах последних 30 дней
    contractorName: `Контрагент №${Math.ceil(Math.random() * 10)}`,
    hasAttachments: Boolean(Math.round(Math.random())),
    requestTopic: `Тема №${Math.ceil(Math.random() * 10)}`,
    request: generateRandomRequest(),
    task: generateRandomTask(),
    executor: generateRandomExecutorData(),
    isIncoming: Math.random() > 0.5
});

// Генератор массива элементов IInteractionItem[]
export const generateInteractionsArray = (count: number): IInteractionItem[] => {
    return Array.from({ length: count }, (_, index) => generateRandomInteractionItem());
};