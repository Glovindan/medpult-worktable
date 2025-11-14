import React, { useEffect, useState } from "react";
import StatusColumn from "./StatusColumn/StatusColumn";
import ChannelColumn from "./ChannelColumn/ChannelColumn";
import DoubleStrokeColumn from "./EntryPointColumn/EntryPointColumn";
import moment from "moment";
import ListColumn from "../../ListComponents/ListColumn/ListColumn";
import LinkColumn from "../../ListComponents/LinkColumn/LinkColumn";
import { MiddleEllipsisString } from "./MiddleEllipsisString/MiddleEllipsisString";
import icons from "../icons";
import { IInteractionItem } from "../InteractionsListTypes";
import Scripts from "../../../../shared/utils/clientScripts";
import { ObjectItem } from "../../../../../UIKit/Filters/FiltersTypes";

type InteractionsListRowProps = {
  /** Данные строки взаимодействия */
  item: IInteractionItem
}

/** Строка взаимодействия */
export default function InteractionsListRow({item}: InteractionsListRowProps) {

  /** Получить ссылку на страницу конкретного обращения */
  function getRequestHref(requestId: string) {
    const requestPageLink = Scripts.getRequestPagePath();
    const origin = window.location.origin
    const url = new URL(`${origin}/${requestPageLink}`)

    url.searchParams.set("requestId", requestId);

    const href = url.toString();

    return href;
  }

  /** Получить ссылку на страницу конкретной задачи */
  function getTaskHref(requestId: string, taskId: string) {
    const url = new URL(getRequestHref(requestId))

    url.searchParams.set("taskId", taskId);

    const href = url.toString();

    return href;
  }

  const emptyColumn = (<ListColumn>–</ListColumn>);
  const unknownColumn = (<ListColumn>Неизвестно</ListColumn>);

  return (
    <div className="interactions-list-row">
        <StatusColumn status={item.status} />
        <ChannelColumn channel={item.channelType} isIncoming={item.isIncoming}/>
        <DoubleStrokeColumn firstRowValue={item.entryPoint.channelSort} secondRowValue={item.entryPoint.marketingName}/>
        <ListColumn></ListColumn>
        <ListColumn tooltip={item.contactData}><MiddleEllipsisString startLength={7} endLength={5} value={item.contactData}/></ListColumn>
        <ListColumn>{moment(item.createdAt).format("DD.MM.YYYY HH:mm")}</ListColumn>
        { !!item.contractorName
          ? <ListColumn>{item.contractorName}</ListColumn>
          : unknownColumn
        }
        <ListColumn tooltip="">{item.hasAttachments && icons.attachmentIcon}</ListColumn>
        <ListColumn>{item.requestTopic}</ListColumn>
        { !!item.request
          ? <LinkColumn href={getRequestHref(item.request.code)} tooltip={item.request.value}><MiddleEllipsisString value={item.request.value}/></LinkColumn>
          : emptyColumn
        }
        { !!item.request && !!item.task
          ? <LinkColumn href={getTaskHref(item.request.code, item.task.code)} tooltip={item.task.value}><MiddleEllipsisString value={item.task.value}/></LinkColumn>
          : emptyColumn
        }
        { !!item.executor
          ? <DoubleStrokeColumn firstRowValue={item.executor.fullname} secondRowValue={item.executor.groupName}/>
          : emptyColumn
        }
        <ListColumn>{icons.arrowIcon}</ListColumn>
    </div>
  );
}
