import { useCallback, useEffect, useState } from "react";
import { FORWARD_INTERACTION_SESSION_KEY, ForwardInteractionData, ForwardInteractionSessionBuffer, SendEmailModalProps } from "./SendEmailModalTypes";
import Scripts from "../../../../shared/utils/clientScripts";

export function useEmailModalController() {
  const defaultModalProps: SendEmailModalProps = {
    interactionId: "",
    closeModal: () => {},
    mode: null,
    saveState: () => {},
  };

  // Параметры модалки
  const [modalProps, setModalProps] =
    useState<SendEmailModalProps>(defaultModalProps);
  // Параметр видимости модалки
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const saveState = useCallback(() => {
    console.log(modalProps)
    alert(modalProps.interactionId)

    const strData = sessionStorage.getItem(FORWARD_INTERACTION_SESSION_KEY);
    const data: ForwardInteractionSessionBuffer = strData 
    ? JSON.parse(strData)
    : {}

    data[modalProps.interactionId] = {
      requestId: modalProps.requestId,
      taskId: modalProps.taskId,
    }

    sessionStorage.setItem(FORWARD_INTERACTION_SESSION_KEY, JSON.stringify(data));
  }, [modalProps])

  const getState = (interactionId: string): ForwardInteractionData => {
    const strData = sessionStorage.getItem(FORWARD_INTERACTION_SESSION_KEY);
    if(!strData) return {}

    const data: ForwardInteractionSessionBuffer = JSON.parse(strData);
    const interactionData = data[interactionId];
    delete data[interactionId]

    sessionStorage.setItem(FORWARD_INTERACTION_SESSION_KEY, JSON.stringify(data));

    return interactionData ?? {};
  };

  const handleCloseModal = () => {
    setModalProps(defaultModalProps);
    setIsModalVisible(false);
  };

  const handleOpenReplyModal = async (interactionId: string, taskId?: string, requestId?: string) => {
    const data = await Scripts.getEmailDataByInteractionId(interactionId);

    setModalProps({
      interactionId: interactionId,
      closeModal: handleCloseModal,
      mode: "reply",
      saveState: saveState,
      initialData: {
        text: data.text,
        contractor: data.contractor,
        session: data.session,
        topic: data.topic,
        emailsCopy: data.emailsCopy,
      },
      taskId: taskId,
      requestId: requestId,
    });

    setIsModalVisible(true);
  };

  const handleOpenForwardModal = async (
    interactionId: string,
    contractorId?: string, 
    taskId?: string, 
    requestId?: string
  ) => {
    const contractorData = contractorId
      ? await Scripts.getEmailDataByContractorId(contractorId)
      : undefined;
    const data = await Scripts.getEmailDataByInteractionId(interactionId);

    setModalProps({
      interactionId: interactionId,
      closeModal: handleCloseModal,
      mode: "forward",
      saveState: saveState,
      initialData: {
        contractor: contractorData?.contractor,
        text: data.text,
        topic: data.topic,
        filesData: data.filesData,
      },
      taskId: taskId,
      requestId: requestId,
    });

    setIsModalVisible(true);
  };

  return {
    modalProps,
    isModalVisible,
    handleOpenReplyModal,
    handleOpenForwardModal,
    handleCloseModal,
    getState,
    saveState,
  };
}
