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

    const handleOpenReplyModal = async (interactionId: string) => {
        const data = await Scripts.getEmailDataByInteractionId(interactionId);

        setModalProps({
            interactionId: interactionId,
            closeModal: handleCloseModal,
            mode: "reply",
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

    const handleOpenForwardModal = async (interactionId: string, contractorId?: string) => {
        const contractorData = contractorId ? await Scripts.getEmailDataByContractorId(contractorId) : undefined;
        const data = await Scripts.getEmailDataByInteractionId(interactionId);
        
        setModalProps({
            interactionId: interactionId,
            closeModal: handleCloseModal,
            mode: "forward",
            saveState: saveState,
            initialData:  {
                contractor: contractorData?.contractor,
                text: data.text,
                topic: data.topic,
                filesData: data.filesData,
            }
        });
        
        setIsModalVisible(true);
    }

    return {
        modalProps,
        isModalVisible,
        handleOpenReplyModal,
        handleOpenForwardModal,
        handleCloseModal,
    }
}