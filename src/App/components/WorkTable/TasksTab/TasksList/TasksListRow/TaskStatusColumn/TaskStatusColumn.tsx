import React from "react";
import { TaskStatus } from "../../TasksListTypes";
import Scripts from "../../../../../../shared/utils/clientScripts";

type TaskStatusColumnProps = {
  /** Статус задачи */
  taskStatus: TaskStatus;
};

/** Колонка статуса задачи */
export default function TaskStatusColumn({taskStatus}: TaskStatusColumnProps) {
	const statusName = Scripts.getTaskStatusName(taskStatus);

	const getBadgeColor = () => {
		switch (taskStatus) {
			case TaskStatus.queue:  return "#1570EF"
			case TaskStatus.atWork:  return "#DC7703"
			case TaskStatus.complete:  return "#21A038"
			case TaskStatus.control:  return "#7A5AF8"
			case TaskStatus.returned:  return "#D92D20"
			default: return "#717680"
		}
	}

	const badgeColorStyle: React.CSSProperties = {backgroundColor: getBadgeColor()}

  return (
    <div className="task-status-column" title={statusName}>
			<div className="task-status-column__badge" style={badgeColorStyle}>
				{statusName}
			</div>
    </div>
  );
}
