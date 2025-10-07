import React from "react";
import { RequestListData } from "../../../shared/types";
import { MyItemData } from "../../../../UIKit/CustomList/CustomListTypes";
import Scripts from "../../../shared/utils/clientScripts";
import utils, { getStatusRequestColor } from "../../../shared/utils/utils";

interface RequestDetailsProps {
  rowData: RequestListData;
  onClickRowHandler?: () => void;
  reloadData?: () => void;
  onClickNumberRequest: (taskId: string) => void;
}

function RequestDetails({
  rowData,
  onClickNumberRequest,
}: RequestDetailsProps) {
  return (
    <div className="request-details">
      <div className="request-details__row">
        <div className="request-details__column">
          <span className="request-details__column__title">
            Номер обращения
          </span>
          <span
            onClick={() => onClickNumberRequest(rowData.id.value)}
            className="request-details__column__value request-details__link"
          >
            {rowData.number?.value}
          </span>
        </div>

        <div className="request-details__column">
          <span className="request-details__column__title">Дата создания</span>
          <span className="request-details__column__value">
            {rowData.createdAt?.value}
          </span>
        </div>

        <div className="request-details__column">
          <span className="request-details__column__title">Канал</span>
          <span className="request-details__column__value">
            {rowData.channel?.value}
          </span>
        </div>

        <div className="request-details__column">
          <span className="request-details__column__title">Тема обращения</span>
          <span className="request-details__column__value">
            {rowData.topic?.value}
          </span>
        </div>

        <div className="request-details__column">
          <span className="request-details__column__title">Статус</span>

          <span className="request-details__column__value">
            <span
              style={{
                backgroundColor: getStatusRequestColor(
                  rowData.statusRequest?.info
                ),
                padding: "3px 16px",
                borderRadius: "12px",
                display: "inline-block",
              }}
            >
              {rowData.statusRequest?.value}
            </span>
          </span>
        </div>
      </div>
      <div className="request-details__column2">
        <span className="request-details__column__title">
          Причина обращения
        </span>
        <span className="request-details__column__value">
          {rowData.reason?.value}
        </span>
      </div>
    </div>
  );
}

export default RequestDetails;
