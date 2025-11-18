import React from "react";
import StatusColumn from "./StatusColumn/StatusColumn";
import ChannelColumn from "./ChannelColumn/ChannelColumn";
import DoubleStrokeColumn from "./EntryPointColumn/EntryPointColumn";
import moment from "moment";
import ListColumn from "../../ListComponents/ListColumn/ListColumn";
import LinkColumn from "../../ListComponents/LinkColumn/LinkColumn";
import { MiddleEllipsisString } from "../../ListComponents/MiddleEllipsisString/MiddleEllipsisString";
import icons from "../icons";
import { IInteractionItem } from "../InteractionsListTypes";
import InteractionsDetails from "./InteractionsDetails/InteractionsDetails";
import { getRequestHref, getTaskHref } from "../../../../shared/utils/utils";

type InteractionsListRowProps = {
  /** Данные строки взаимодействия */
  item: IInteractionItem;
  openRowIndex: string | undefined;
  setOpenRowIndex: React.Dispatch<React.SetStateAction<string | undefined>>;
  reloadData: (id: string) => void;
  items: IInteractionItem[];
  setItems: React.Dispatch<React.SetStateAction<IInteractionItem[]>>;
};

/** Строка взаимодействия */
export default function InteractionsListRow({
  item,
  openRowIndex,
  setOpenRowIndex,
  reloadData,
  items,
  setItems,
}: InteractionsListRowProps) {
  const emptyColumn = <ListColumn>–</ListColumn>;
  const unknownColumn = <ListColumn>Неизвестно</ListColumn>;

  /** Показать детальную информацию */
  const toggleShowDetails = () => {
    if (!item.id) return;
    if (String(item.id) === openRowIndex) {
      setOpenRowIndex(undefined);
      return;
    }
    setOpenRowIndex(String(item.id));
  };
  const isShowDetails = String(item.id) === openRowIndex;

  return (
    <>
      <div className="interactions-list-row" onClick={toggleShowDetails}>
        <StatusColumn status={item.status} />
        <ChannelColumn
          channel={item.channelType}
          isIncoming={item.isIncoming}
        />
        <DoubleStrokeColumn
          firstRowValue={item.entryPoint.channelSort}
          secondRowValue={item.entryPoint.marketingName}
        />
        <ListColumn></ListColumn>
        <ListColumn tooltip={item.contactData}>
          <MiddleEllipsisString
            startLength={7}
            endLength={5}
            value={item.contactData}
          />
        </ListColumn>
        <ListColumn>
          {moment(item.createdAt).format("DD.MM.YYYY HH:mm")}
        </ListColumn>
        {!!item.contractorName ? (
          <ListColumn>{item.contractorName}</ListColumn>
        ) : (
          unknownColumn
        )}
        <ListColumn tooltip="">
          {item.hasAttachments && icons.attachmentIcon}
        </ListColumn>
        <ListColumn>{item.requestTopic}</ListColumn>
        {!!item.request ? (
          <LinkColumn
            href={getRequestHref(item.request.code)}
            tooltip={item.request.value}
          >
            <MiddleEllipsisString value={item.request.value} />
          </LinkColumn>
        ) : (
          emptyColumn
        )}
        {!!item.request && !!item.task ? (
          <LinkColumn
            href={getTaskHref(item.request.code, item.task.code)}
            tooltip={item.task.value}
          >
            <MiddleEllipsisString value={item.task.value} />
          </LinkColumn>
        ) : (
          emptyColumn
        )}
        {!!item.executor ? (
          <DoubleStrokeColumn
            firstRowValue={item.executor.fullname}
            secondRowValue={item.executor.groupName}
          />
        ) : (
          emptyColumn
        )}
        <ListColumn>
          <div
            style={{
              transform: isShowDetails ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            {icons.arrowIcon}
          </div>
        </ListColumn>
      </div>
      {/* Детальная информация */}
      {isShowDetails && (
        <InteractionsDetails
          reloadData={reloadData}
          data={item}
          onClickRowHandler={toggleShowDetails}
          items={items}
          setItems={setItems}
        />
      )}
    </>
  );
}
