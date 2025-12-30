import React, { useState, useEffect } from "react";
import ModalWrapper from "./ModalWrapper/ModalWrapper";
import icons from "../../../../../icons";
import ButtonModal from "./ButtonModal/ButtonModal";
import { SearchableSelect } from "./SearchableSelect/SearchableSelect";
import Scripts from "../../../../../../../../shared/utils/clientScripts";
import { ObjectItem } from "../../../../../../../../../UIKit/Filters/FiltersTypes";

interface ModalExecutorProps {
  interactionId: string;
  closeModal: () => void;
  initialGroup: ObjectItem | null;
  initialEmployee: ObjectItem | null;
  onSave?: () => void;
  reloadData: (id: string) => void;
  handleResetList: () => void;
  updateTabsItemsCounts?: () => Promise<void>;
}

/** Модальное окно исполнителя */
export default function ModalExecutor({
  interactionId,
  closeModal,
  initialGroup,
  initialEmployee,
  onSave,
  reloadData,
  handleResetList,
  updateTabsItemsCounts,
}: ModalExecutorProps) {
  const [group, setGroup] = useState<ObjectItem | null>(null);
  const [employee, setEmployee] = useState<ObjectItem | null>(null);

  // сохранить группу и email
  const saveGroupExecutor = async () => {
    const isStatusQueue = await Scripts.saveGroupExecutor(
      interactionId,
      group,
      employee
    );
    if (isStatusQueue) {
      handleResetList();
      if (updateTabsItemsCounts) await updateTabsItemsCounts();
    } else {
      onSave?.();
      reloadData?.(interactionId);
      closeModal();
    }
  };

  // функция для проверки принадлежности сотрудника к группе
  const validateEmployeeForGroup = async (selectedGroup: ObjectItem | null) => {
    if (!employee || !selectedGroup) return;
    // Список сотрудников для выбранной группы
    const employeesInGroup = await Scripts.validateEmployeeForGroup(
      selectedGroup.code,
      employee.code
    );
    // Если выбранный сотрудник не входит в эту группу — очищаем
    if (!employeesInGroup) {
      setEmployee(null);
    }
  };

  // при изменении группы
  const handleGroupSelect = async (selectedGroup: ObjectItem | null) => {
    setGroup(selectedGroup);
    await validateEmployeeForGroup(selectedGroup);
  };

  useEffect(() => {
    let cancelled = false;

    const autoSelectGroupForEmployee = async () => {
      if (!employee) return;

      // Получаем группы сотрудника
      const userGroups = await Scripts.getUserGroups([employee.code]);

      // Если групп одна — автоматически подставляем
      if (!cancelled && userGroups && userGroups.length === 1) {
        setGroup(userGroups[0]);
      }
    };

    autoSelectGroupForEmployee();

    return () => {
      cancelled = true;
    };
  }, [employee]);

  return (
    <ModalWrapper>
      <div className="modal-executor">
        <div className="modal-executor__content">
          <div className="modal-executor__content__header">
            <span className="modal-executor__content__header_title">
              Исполнитель
            </span>
            <span onClick={closeModal} style={{ cursor: "pointer" }}>
              {icons.closeIcon}
            </span>
          </div>
          <div className="modal-executor__content__input">
            <SearchableSelect
              key={employee?.code ?? "no-employee"}
              label="Группа"
              placeholder="Введите название группы"
              value={group}
              onSelect={handleGroupSelect}
              getDataHandler={async () => {
                return employee
                  ? Scripts.getUserGroups([employee.code])
                  : Scripts.getUserGroups();
              }}
            />

            <SearchableSelect
              key={group?.code ?? "no-group"}
              label="Сотрудник"
              placeholder="Введите ФИО сотрудника"
              value={employee}
              onSelect={setEmployee}
              getDataHandler={async () => {
                return group
                  ? Scripts.getUsersInteraction([group.code])
                  : Scripts.getUsersInteraction();
              }}
            />
          </div>

          <div className="modal-executor__content__button">
            <ButtonModal
              title="Отменить"
              buttonType="outline"
              clickHandler={closeModal}
              style={{ width: "194px" }}
            />
            <ButtonModal
              title="Сохранить"
              clickHandler={saveGroupExecutor}
              style={{ width: "194px" }}
              disabled={!group?.code}
            />
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}
