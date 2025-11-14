import React, { useEffect, useState } from "react";
import InteractionsHeader from "./InteractionsHeader/InteractionsHeader";
import InteractionsContent from "./InteractionsContent/InteractionsContent";
import InteractionsExecutor from "./InteractionsExecutor/InteractionsExecutor";
import InteractionField from "./InteractionsField/InteractionField";
import { IInteractionDetailsItem } from "../../../InteractionsListTypes";
import Scripts from "../../../../../../shared/utils/clientScripts";

interface InteractionsDetailsOpenProps {
  data: IInteractionDetailsItem;
  /** id Взаимодействия */
  interactionId: string;
  /** Идентификатор задачи */
  taskId?: string;
  onSave?: () => void;
  reloadData?: () => void;
}

/** Проект комментария */
function InteractionsDetailsOpen({
  data,
  interactionId,
  taskId,
  onSave,
  reloadData,
}: InteractionsDetailsOpenProps) {
  //Количетсво дублей
  const [countDuplicate, setCountDuplicate] = useState<number | null>(null);
  useEffect(() => {
    const fetchDuplicateCount = async () => {
      try {
        const count = await Scripts.getInteractionsDublicateCount();
        setCountDuplicate(count);
      } catch (error) {
        console.error("Ошибка в функции fetchDuplicateCount:", error);
      }
    };

    fetchDuplicateCount();
  }, []);
  return (
    <div className="interactions-open-panel">
      {/* Шапка */}
      <InteractionsHeader
        data={data}
        onSave={onSave}
        reloadData={reloadData}
        duplicateCount={countDuplicate ? countDuplicate : undefined}
      />

      {/* Контент */}
      <InteractionsContent
        data={data}
        interactionId={interactionId}
        taskId={taskId}
      />
      <span className="interactions-open-panel__line"></span>

      {/* Исполнитель */}
      <InteractionsExecutor
        data={data}
        onSave={onSave}
        duplicateCount={countDuplicate ? countDuplicate : undefined}
      />
      <span className="interactions-open-panel__line"></span>

      {/* Причина обращения и Описание задачи*/}
      {data.request?.code != "" && (
        <>
          <InteractionField label="Причина обращения">
            <span className="interactions-open-panel__value">
              {data.reasonRequest}
            </span>
          </InteractionField>
          <InteractionField label="Описание задачи">
            <span className="interactions-open-panel__value">
              {data.descriptionTask}
            </span>
          </InteractionField>
          <span className="interactions-open-panel__line"></span>
        </>
      )}

      {/* Письмо */}
      <span className="interactions-open-panel__title">Письмо</span>
      <InteractionField label="Тема обращения">
        <span className="interactions-open-panel__value">{data.topic}</span>
      </InteractionField>
      <InteractionField label="Текст письма">
        <span className="interactions-open-panel__value">{data.text}</span>
      </InteractionField>
    </div>
  );
}

export default InteractionsDetailsOpen;
