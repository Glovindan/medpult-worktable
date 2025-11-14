import React from "react";
import ChannelColumnIcons from "./ChannelColumnIcons";
import { ChannelType } from "../../InteractionsListTypes";

/** Пропсы колонки канала */
interface ChannelColumnProps {
  /** Канал  */
  channel: ChannelType;
  /** Является входящим */
  isIncoming: boolean
}

/** Колонка с типом канала поступления */
function ChannelColumn(props: ChannelColumnProps) {
  const { channel, isIncoming } = props;

  /** Получение иконки по каналу взаимодействия */
  const getIcon = () => {
    switch (channel) {
      case ChannelType.email:
        if (isIncoming) return ChannelColumnIcons.imgIncomingEmail;
        return ChannelColumnIcons.imgOutgoingEmail;
      case ChannelType.call:
        if (isIncoming) return ChannelColumnIcons.imgIncomingCall;
        return ChannelColumnIcons.imgOutgoingCall;
      case ChannelType.sms:
        if (isIncoming) return ChannelColumnIcons.imgIncomingSms;
        return ChannelColumnIcons.imgOutgoingSms;
      default:
        return ChannelColumnIcons.imgComment;
    }
  };

  /** Получение title по каналу взаимодействия */
  const getTitle = () => {
    switch (channel) {
      case ChannelType.email:
        if (isIncoming) return "Входящий email";
        return "Исходящий email";
      case ChannelType.call:
        if (isIncoming) return "Входящий звонок";
        return "Исходящий звонок";
      case ChannelType.sms:
        if (isIncoming) return "Входящее СМС";
        return "Исходящее СМС";
      default:
        return "Ручной ввод";
    }
  };

  return (
    <div className="channel-column" title={getTitle()}>
      {getIcon()}
    </div>
  );
}

export default ChannelColumn;
