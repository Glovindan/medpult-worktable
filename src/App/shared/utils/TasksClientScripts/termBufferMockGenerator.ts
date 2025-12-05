import { TermBuffer, TermBufferStatus } from "../../../components/WorkTable/TasksTab/TasksList/TasksListTypes";

/**
 * Генератор моковых данных для TermBuffer
 * @param overrides - Объект для переопределения значений по умолчанию
 * @returns Сгенерированный объект TermBuffer
 */
const generateTermBuffer = (overrides: Partial<TermBuffer> = {}): TermBuffer => {
    const id = (Math.floor(Math.random() * 1000) + 1).toString(); // ID как строка
    const hasSla = Math.random() < 0.5; // 50% шанс наличия SLA
    const slaId = hasSla ? Math.random().toString(36).substring(2, 15) : undefined;
    let slaValue: number | undefined = hasSla ? Math.floor(Math.random() * (60 * 24 - 30) + 30) : undefined; // Значение SLA в минутах (от 30 до 1440)
    let minutesRemaining: number;

    if (slaValue !== undefined) {
        minutesRemaining = Math.floor(Math.random() * (slaValue * 2 + 1)) - slaValue; // от -slaValue до slaValue
    } else {
        minutesRemaining = Math.floor(Math.random() * 60 * 24) - 30 * 24; // от -720 до 1440 если нет SLA
        slaValue = undefined;
    }

    const startDate = new Date(Date.now() - Math.floor(Math.random() * 86400000)); // Случайная дата в прошлом
    const endDate = new Date(startDate.getTime() + Math.floor(Math.random() * 86400000)); // Случайная дата в будущем относительно startDate

    const randomStatusNumber = Math.random();
    let randomStatus = TermBufferStatus.inactive
    if(randomStatusNumber > 0 && randomStatusNumber < 0.33) {
        randomStatus = TermBufferStatus.active
    } else if(randomStatusNumber > 0.33 && randomStatusNumber < 0.66) {
        randomStatus = TermBufferStatus.done
    } else {
        randomStatus = TermBufferStatus.pause
    }

    return {
        id: overrides.id ?? id,
        status: overrides.status ?? randomStatus,
        minutesRemaining: overrides.minutesRemaining ?? minutesRemaining,
        slaId: overrides.slaId ?? slaId,
        slaValue: overrides.slaValue ?? slaValue,
        startDate: overrides.startDate ?? startDate,
        endDate: overrides.endDate ?? endDate,
        ...overrides,
    };
};

function generateTermBufferList(tasksIds: string[]) {

    return tasksIds.map(taskId => generateTermBuffer({id: taskId}))
}

export { generateTermBuffer, generateTermBufferList };