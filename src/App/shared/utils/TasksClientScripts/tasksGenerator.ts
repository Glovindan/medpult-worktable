import { ITaskItem, TaskStatus, PolicyCategory } from "../../../components/WorkTable/TasksTab/TasksList/TasksListTypes";
import { generateFixedLengthString, randomSlaStatus } from "../InteractionsListScripts/interactionsGenerator";

// Генерация случайного значения для категории полиса
const randomPolicyCategory = () => {
    if(Math.round(Math.random())) return;
    
    switch (Math.floor(Math.random() * 3)) {
        case 0: return PolicyCategory.gold;
        case 1: return PolicyCategory.platinum;
        default: return PolicyCategory.silver;
    }
};

// Генерация случайного значения для срочности задачи
const randomUrgency = () => {
    const urgencies = ['Высокая', 'Средняя', 'Низкая'];
    return urgencies[Math.floor(Math.random() * urgencies.length)];
};

// Генерация случайного региона
const randomRegion = () => {
    const regions = [
        'Москва',
        'Санкт-Петербург',
        'Новосибирск',
        'Екатеринбург',
        'Нижний Новгород',
        'Казань',
        'Челябинск',
        'Омск',
        'Самара',
        'Ростов-на-Дону'
    ];
    return regions[Math.floor(Math.random() * regions.length)];
};

// Генерация случайного полного имени застрахованного
const randomFullName = () => {
    const firstNames = ['Иван', 'Марина', 'Алексей', 'Анна', 'Сергей', 'Ольга', 'Дмитрий', 'Елена', 'Андрей', 'Юлия'];
    const lastNames = ['Иванов', 'Петрова', 'Смирнов', 'Васильева', 'Попова', 'Кузнецов', 'Соколова', 'Федоров', 'Николаева', 'Зайцев'];
    const middleName = ['Иванович', 'Маринович', 'Алексеевич', 'Аннович', 'Сергеевич', 'Ольгович', 'Дмитриевич', 'Еленович', 'Андреевич', 'Юлиевич'];
    return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]} ${middleName[Math.floor(Math.random() * middleName.length)]}`;
};

// Генерация случайного номера полиса
const randomPolicyNumber = () => {
    return `00SB${generateFixedLengthString(12)}/1`;
};

// Генерация случайного типа и вида задачи
const randomTaskTypeData = () => {
    return {
        sort: `Вид_задачи_№${Math.ceil(Math.random() * 10)}`,
        type: `Тип_задачи_№${Math.ceil(Math.random() * 10)}`
    };
};

// Генерация случайного исполнителя
const randomExecutorData = () => {
    return {
        fullName: randomFullName(),
        groupName: `Группа №${Math.ceil(Math.random() * 10)}`
    };
};

// Генерация случайного статуса задачи
const randomTaskStatus = () => {
    switch (Math.floor(Math.random() * 7)) {
        case 0: return TaskStatus.queue;
        case 1: return TaskStatus.atWork;
        case 2: return TaskStatus.postpone;
        case 3: return TaskStatus.complete;
        case 4: return TaskStatus.control;
        case 5: return TaskStatus.returned;
        default: return TaskStatus.canceled;
    }
};

// Создание уникального идентификатора
const createUniqueId = () =>
    `${Date.now().toString(36)}${(Math.random() * 100000000).toFixed(0)}`;

// Генерация случайного объекта TaskData
const generateRandomTaskData = () => {
    return {
        number: `TS${generateFixedLengthString(8)}/21`, // Номер задачи
        id: createUniqueId(),                                // Идентификатор задачи
        requestId: `REQ-${Math.floor(Math.random() * 10000)}` // Идентификатор обращения
    };
};

// Генерация случайного объекта InsuredData
const randomInsuredData = () => {
    return {
        fullName: randomFullName(),
        policyCategory: randomPolicyCategory(),
        policyNumber: randomPolicyNumber()
    };
};

// Генерация случайного объекта ITaskItem
export const generateRandomTaskItem = (): ITaskItem => {
    return {
        id: createUniqueId(),                            // Уникальный идентификатор задачи
        task: generateRandomTaskData(),                  // Объект данных задачи
        slaStatus: randomSlaStatus(),                    // SLA статус
        urgency: randomUrgency(),                        // Уровень срочности
        insured: randomInsuredData(),                       // Имя застрахованного
        region: randomRegion(),                          // Регион
        createdAt: new Date(Date.now() + Math.random() * 86400000 * 30), // Случайная дата создания
        controlDate: new Date(Date.now() + Math.random() * 86400000 * 60), // Контрольная дата позже даты создания
        taskTypeData: randomTaskTypeData(),              // Данные о типе и виде задачи
        taskStatus: randomTaskStatus(),                  // Статус задачи
        executor: randomExecutorData()                   // Данные исполнителя
    };
};

// Генератор массива элементов ITaskItem[]
export const generateTasksArray = (count: number): ITaskItem[] => {
    return Array.from({ length: count }, (_, index) => generateRandomTaskItem());
};