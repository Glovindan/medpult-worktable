import React, { useEffect, useState } from "react";
import CustomButton from "../../../../../../../../UIKit/Button/CustomButton/CustomButton";
import InteractionField from "../InteractionsField/InteractionField";
import icons from "../../../../icons";
import {
  IInteractionDetailsItem,
  InteractionStatus,
} from "../../../../InteractionsListTypes";
import ModalExecutor from "./ModalExecutor/ModalExecutor";
import Scripts from "../../../../../../../shared/utils/clientScripts";
import utils from "../../../../../../../shared/utils/utils";

/** Пропсы */
interface InteractionsExecutorProps {
  data: IInteractionDetailsItem;
  onSave?: () => void;
  duplicateCount?: number;
  reloadData: (id: string) => void;
  handleResetList: () => void;
  updateTabsItemsCounts?: () => Promise<void>;
}

function InteractionsExecutor({
  data,
  onSave,
  duplicateCount,
  reloadData,
  handleResetList,
  updateTabsItemsCounts,
}: InteractionsExecutorProps) {
  // Состояние для открытия модального окна
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isDisabled = data.status.code === InteractionStatus.processed;
  /** Обработка нажатия на кнопку добавить Исполнителя */
  const AddExecutorClick = async () => {
    if (isDisabled) return;
    setIsModalOpen(true);
  };
  // Закрытие модалки
  const closeModal = () => {
    setIsModalOpen(false);
  };

  /** Обработчик нажатия на номер обращения */
  const onClickNumberRequest = async () => {
    const requestId = data.request?.code;
    await openRequest(requestId);
  };
  /** Открыть обращение */
  const openRequest = async (requestId?: string) => {
    if (!requestId) return;
    utils.setRequest(requestId);
    const link = Scripts.getRequestPagePath();
    const redirectUrl = new URL(window.location.origin + "/" + link);
    if (requestId) redirectUrl.searchParams.set("request_id", requestId);
    window.open(redirectUrl.toString(), "_blank");
  };

  /** Обработчик нажатия на номер задачи */
  const onClickNumberTask = async () => {
    const taskId = data.task?.code;
    if (!taskId) return;

    const requestId = await Scripts.getRequestIdByTaskId(taskId);
    localStorage.setItem("taskId", taskId);
    // Переход
    const link = await Scripts.getRequestPagePath();
    const redirectUrl = new URL(window.location.origin + "/" + link);
    if (requestId) redirectUrl.searchParams.set("request_id", requestId);
    if (taskId) redirectUrl.searchParams.set("task_id", taskId);
    window.open(redirectUrl.toString(), "_blank");
  };

  return (
    <div className="interactions-open-panel-executor">
      <div className="interactions-open-panel-executor__title">Исполнитель</div>
      <div className="interactions-open-panel-executor__group">
        <InteractionField label="Группа">
          {data.group?.code ? (
            <div className="interactions-open-panel-executor__group_group">
              <span className="interactions-open-panel-executor__group__value">
                {data.group.value}
              </span>
              <div
                onClick={AddExecutorClick}
                className={`interactions-open-panel-executor__group__buttons_button ${
                  isDisabled ? "disabled" : ""
                }`}
              >
                {icons.changeIcon}Изменить
                {duplicateCount ? ` (${duplicateCount})` : ""}
              </div>
            </div>
          ) : (
            <div
              onClick={AddExecutorClick}
              className={`interactions-open-panel-executor__group__buttons_button ${
                isDisabled ? "disabled" : ""
              }`}
            >
              {icons.addIcon}Добавить
              {duplicateCount ? ` (${duplicateCount})` : ""}
            </div>
          )}
        </InteractionField>

        <InteractionField label="Сотрудник">
          {data.employee?.code ? (
            <div className="interactions-open-panel-executor__group_group">
              <span className="interactions-open-panel-executor__group__value">
                {data.employee.value}
              </span>
              <div
                onClick={AddExecutorClick}
                className={`interactions-open-panel-executor__group__buttons_button ${
                  isDisabled ? "disabled" : ""
                }`}
              >
                {icons.changeIcon}Изменить
                {duplicateCount ? ` (${duplicateCount})` : ""}
              </div>
            </div>
          ) : (
            <div
              onClick={AddExecutorClick}
              className={`interactions-open-panel-executor__group__buttons_button ${
                isDisabled ? "disabled" : ""
              }`}
            >
              {icons.addIcon}Добавить
              {duplicateCount ? ` (${duplicateCount})` : ""}
            </div>
          )}
        </InteractionField>

        <InteractionField label="Обращение">
          <span
            className={`interactions-open-panel-executor__group__value ${
              data.request?.code ? "link" : ""
            }`}
            onClick={onClickNumberRequest}
          >
            {data.request?.value}
          </span>
        </InteractionField>

        <InteractionField label="Задача">
          <span
            className={`interactions-open-panel-executor__group__value ${
              data.task?.code ? "link" : ""
            }`}
            onClick={onClickNumberTask}
          >
            {data.task?.value}
          </span>
        </InteractionField>
      </div>

      {/* Модальное окно */}
      {isModalOpen && (
        <ModalExecutor
          interactionId={data.id}
          closeModal={closeModal}
          initialGroup={data.group || null}
          initialEmployee={data.employee || null}
          onSave={() => {
            closeModal();
            onSave?.();
          }}
          reloadData={reloadData}
          handleResetList={handleResetList}
          updateTabsItemsCounts={updateTabsItemsCounts}
        />
      )}
    </div>
  );
}

export default InteractionsExecutor;
