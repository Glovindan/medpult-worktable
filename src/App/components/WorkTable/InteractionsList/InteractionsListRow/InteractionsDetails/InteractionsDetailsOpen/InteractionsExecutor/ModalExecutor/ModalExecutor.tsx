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
}

/** Модальное окно исполнителя */
export default function ModalExecutor({
  interactionId,
  closeModal,
  initialGroup,
  initialEmployee,
  onSave,
}: ModalExecutorProps) {
  const [groups, setGroups] = useState<ObjectItem[]>([]);
  const [employees, setEmployees] = useState<ObjectItem[]>([]);

  const [group, setGroup] = useState<ObjectItem | null>(initialGroup);
  const [employee, setEmployee] = useState<ObjectItem | null>(initialEmployee);

  useEffect(() => {
    const loadData = async () => {
      const groupsList = await Scripts.getUserGroups(employee?.code);
      const employeesList = await Scripts.getUsersInteraction(group?.code);

      setGroups(groupsList);
      setEmployees(employeesList);
    };
    loadData();
  }, []);

  // Обновляем сотрудников, когда выбираем группу
  useEffect(() => {
    const loadEmployees = async () => {
      const list = await Scripts.getUsersInteraction(group?.code);
      setEmployees(list);
    };
    loadEmployees();
  }, [group]);

  // Обновляем группы, когда выбираем сотрудника
  useEffect(() => {
    const loadGroups = async () => {
      const list = await Scripts.getUserGroups(employee?.code);
      setGroups(list);
      if (list.length === 1) setGroup(list[0]);
    };
    loadGroups();
  }, [employee]);

  const saveGroupExecutor = async () => {
    await Scripts.saveGroupExecutor(interactionId, group, employee);
    onSave?.();
  };

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
              label="Группа"
              placeholder="Введите название группы"
              items={groups}
              value={group}
              onSelect={setGroup}
            />

            <SearchableSelect
              label="Сотрудник"
              placeholder="Введите ФИО сотрудника"
              items={employees}
              value={employee}
              onSelect={setEmployee}
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
