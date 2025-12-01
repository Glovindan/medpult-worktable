import { useEffect, useState } from "react";
import { SendEmailModalProps } from "./SendEmailModalTypes";
import Scripts from "../../../../shared/utils/clientScripts";

export function useEmailModalController() {
    const defaultModalProps: SendEmailModalProps = {
        interactionId: "",
        closeModal: () => {},
        mode: null,
        saveState: () => {}
    }

    // Параметры модалки
    const [modalProps, setModalProps] = useState<SendEmailModalProps>(defaultModalProps);
    // Параметр видимости модалки
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    
    const saveState = () => {
        // TODO: Реализация
    }

    const handleCloseModal = () => {
        setModalProps(defaultModalProps);
        setIsModalVisible(false);
    }

    const handleOpenModal = async (interactionId: string, mode: "reply" | "forward" | null) => {
        const data = await Scripts.getEmailDataByInteractionId(interactionId);
        setModalProps({
            interactionId: interactionId,
            closeModal: handleCloseModal,
            mode: mode,
            saveState: saveState,
            initialData:  {
                text: data.text,
                contractor: data.contractor,
                session: data.session,
                topic: data.topic
            }
        });

        setIsModalVisible(true);
    }

    const handleOpenReplyModal = async (interactionId: string) => {
        return handleOpenModal(interactionId, "reply")
    }

    const handleOpenForwardModal = async (interactionId: string) => {
        return handleOpenModal(interactionId, "forward")
    }

    return {
        modalProps,
        isModalVisible,
        handleOpenReplyModal,
        handleOpenForwardModal,
        handleCloseModal,
    }
}