import { useEffect, useState } from "react";
import Scripts from "../../../../shared/utils/clientScripts";
import { TermBuffer } from "./TasksListTypes";

export function useTaskSlaBuffer(tasksIds: string[]) {

  const [slaBuffers, setSlaBuffers] = useState<TermBuffer[]>([])

  // Получить данные SLA по одной задаче
  const getSlaBufferByTaskId = (taskId: string) => {
    return slaBuffers.find(buffer => buffer.id == taskId);
  }

  // Обновить сроки
  const updateSlaBuffer = async() => {
    if(!tasksIds.length) return setSlaBuffers([])
    const terms = await Scripts.getTasksResolutionTerms(tasksIds)
    setSlaBuffers(terms)
  }

  let interval: NodeJS.Timeout;
  // Обновление сроков раз в минуту или при подгрузке новых элементов
  useEffect(() => {
    if(interval) clearInterval(interval);

    updateSlaBuffer();
    interval = setInterval(() => {
      try {
        updateSlaBuffer();
      } catch(e) {
        clearInterval(interval);
      }
    }, 60 * 1000)

    return () => clearInterval(interval);
  }, [tasksIds])

  return {
    slaBuffers,
    getSlaBufferByTaskId
  }
}