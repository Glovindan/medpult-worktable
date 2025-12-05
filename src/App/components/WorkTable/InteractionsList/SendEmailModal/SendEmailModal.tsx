import React, { useRef, useState, useEffect } from "react";
import CustomInput from "../../../../../UIKit/CustomInput/CustomInput";
import CustomInputAppItem from "../../../../../UIKit/CustomInputAppItem/CustomInputAppItem";
import CustomSelect from "../../../../../UIKit/CustomSelect/CustomSelect";
import Button from "../../../../../UIKit/Button/Button";
import TextEditor from "./TextEditor/TextEditor";
import FileUploader from "./FileUploader/FileUploader";
import { ObjectItem } from "../../../../../UIKit/Filters/FiltersTypes";
import { SendEmailAction, SendEmailModalProps } from "./SendEmailModalTypes";
import Scripts from "../../../../shared/utils/clientScripts";
import ModalWrapper from "../InteractionsListRow/InteractionsDetails/InteractionsDetailsOpen/InteractionsExecutor/ModalExecutor/ModalWrapper/ModalWrapper";
import icons from "../icons";

export default function SendEmailModal({
  interactionId,
  closeModal,
  mode,
  initialData,
  saveState,
  openTabCode,
}: SendEmailModalProps) {
  /** Локальное состояние формы */
  const [recipient, setRecipient] = useState("");
  const [email, setEmail] = useState<ObjectItem | null>(null);
  const [copyEmails, setCopyEmails] = useState("");
  const [topic, setTopic] = useState("");
  const [line, setLine] = useState<ObjectItem | null>(null);
  const [session, setSession] = useState<ObjectItem | null>(null);
  const [text, setText] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const [emailOptions, setEmailOptions] = useState<ObjectItem[]>([]);
  const [sessionOptions, setSessionOptions] = useState<ObjectItem[]>([]);

  /** Начальная загрузка*/
  useEffect(() => {
    if (!initialData) return;

    setText(initialData.text || "");

    if (mode === "forward") {
      setRecipient(initialData.contractor?.fullname || "");
      setFiles(initialData.filesData?.map((f) => new File([], f.name)) || []);
      setTopic(initialData.topic || "");
    }

    if (mode === "reply") {
      setRecipient(initialData.contractor?.fullname || "");
      const emails = initialData.contractor?.emails || [];
      setEmailOptions(emails.map((e) => ({ value: e, code: e })));
      setEmail(
        initialData.contractor?.email
          ? { value: initialData.contractor.email, code: "" }
          : emails.length > 0
          ? { value: emails[0], code: emails[0] }
          : null
      );
      const sessionValue = initialData.session || null;
      const sessionsList = sessionValue ? [sessionValue] : [];
      setSessionOptions([...sessionsList, { value: "Новая сессия", code: "" }]);
      setSession(sessionValue);
      setCopyEmails(initialData.emailsCopy || "");
    }
  }, [initialData, mode]);

  /** Сохранение состояния формы */
  const saveStateHandler = () => {
    const formState = {
      recipient,
      email,
      copyEmails,
      topic,
      line,
      session,
      text,
      files,
    };
    console.log("Сохранено состояние:", formState);
  };

  const getSelectContractorHref = () => {
    const baseLink = Scripts.getSelectContractorLink();
    const url = new URL(window.location.origin + "/" + baseLink);

    url.searchParams.set("field_id", "worktable-send-email");
    if (openTabCode) url.searchParams.set("tab_code", openTabCode);
    url.searchParams.set("interaction_id", interactionId);

    return url.toString();
  };

  /** Ссылка на форму отбора контрагентов */
  const selectContractorHref = getSelectContractorHref();

  // Валидация окна отправки Email
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isRecipientInvalid, setIsRecipientInvalid] = useState(false);
  const [isSessionInvalid, setIsSessionInvalid] = useState(false);
  const [isTextInvalid, setIsTextInvalid] = useState(false);
  const validateEmailFields = () => {
    let isValid = true;
    // Почта
    if (!email?.value) {
      isValid = false;
      setIsEmailInvalid(true);
    } else {
      setIsEmailInvalid(false);
    }
    // Получатель
    if (!recipient) {
      isValid = false;
      setIsRecipientInvalid(true);
    } else {
      setIsRecipientInvalid(false);
    }
    // Линия (если новая сессия)
    if (!line?.value && (session?.value === "Новая сессия" || !session)) {
      isValid = false;
      setIsSessionInvalid(true);
    } else {
      setIsSessionInvalid(false);
    }
    // Текст сообщения
    if (!text) {
      isValid = false;
      setIsTextInvalid(true);
    } else {
      setIsTextInvalid(false);
    }
    return isValid;
  };

  /** Отправка письма */
  const sendEmail = async () => {
    try {
      const isValid = validateEmailFields();
      if (!isValid) return;

      const emailValue = email?.value ?? "";
      const copyEmailsValue = copyEmails;
      const textValue = text;
      const recipientId = initialData?.contractor?.id ?? "";
      const filesValue = files;
      const lineId = line?.code ?? undefined;
      const sessionId = session?.code ?? undefined;
      const topicValue = topic;

      await Scripts.sendEmail(
        emailValue,
        copyEmailsValue,
        textValue,
        recipientId,
        filesValue,
        lineId,
        sessionId,
        topicValue
      );
      closeModal();
    } catch (error) {
      console.error("Ошибка в функции sendEmail:", error);
    }
  };

  return (
    <ModalWrapper>
      <div className="email-modal">
        {/* Шапка */}
        <div className="email-modal__header">
          <span className="email-modal__header__title">Отправить Email</span>
          <span onClick={closeModal} style={{ cursor: "pointer" }}>
            {icons.closeIcon}
          </span>
        </div>
        {/* Поля */}
        <div className="email-modal__content">
          <div className="email-modal__content__input">
            <span className="email-modal__content__input__label">
              Получатель
            </span>

            {mode === "forward" ? (
              <CustomInputAppItem
                value={recipient}
                setValue={setRecipient}
                href={selectContractorHref}
                saveStateHandler={saveState}
                style={{ border: "2px solid #d9d9d9", height: "29px" }}
                isInvalid={isRecipientInvalid}
                removeValueHandler={() => setRecipient("")}
              />
            ) : (
              <CustomInput
                value={recipient}
                setValue={setRecipient}
                disabled
                style={{ backgroundColor: "#EBEBEB", height: "29px" }}
              />
            )}
          </div>

          <div className="email-modal__content__input">
            <span className="email-modal__content__input__label">Почта</span>
            <CustomSelect
              value={email?.value ?? ""}
              setValue={(value, code) => {
                setEmail({ value: value, code: code ?? "" });
              }}
              getDataHandler={async () => emailOptions}
              style={{ border: "2px solid #d9d9d9", height: "29px" }}
              isInvalid={isEmailInvalid}
              isEmail={true}
            />
          </div>

          <div className="email-modal__content__input">
            <span className="email-modal__content__input__label">
              Почты получателей копии
            </span>
            <CustomInput
              value={copyEmails}
              setValue={setCopyEmails}
              placeholder="example@mail.com, example1@mail.com"
              style={{ border: "2px solid #d9d9d9", height: "28px" }}
            />
          </div>
          {mode === "forward" && (
            <div className="email-modal__content__input">
              <span className="email-modal__content__input__label">
                Тема письма
              </span>
              <CustomInput
                value={topic}
                setValue={setTopic}
                style={{ border: "2px solid #d9d9d9", height: "28px" }}
              />
            </div>
          )}
          {mode === "reply" && (
            <div className="email-modal__content__input">
              <span className="email-modal__content__input__label">Сессия</span>
              <CustomSelect
                value={session?.value ?? ""}
                setValue={(value, code) => {
                  setSession({ value: value, code: code ?? "" });
                }}
                getDataHandler={async () => sessionOptions}
                style={{ border: "2px solid #d9d9d9", height: "28px" }}
              />
            </div>
          )}
          {(session?.value === "Новая сессия" || !session) && (
            <div className="email-modal__content__input">
              <span className="email-modal__content__input__label">Линия</span>
              <CustomSelect
                value={line?.value ?? ""}
                setValue={(value, code) => {
                  setLine({ value: value, code: code ?? "" });
                }}
                getDataHandler={Scripts.getEmails}
                style={{ border: "2px solid #d9d9d9", height: "28px" }}
                isInvalid={isSessionInvalid}
              />
            </div>
          )}
          {/* Текст с редакторами */}
          <div
            className="email-modal__content__text"
            style={{ height: "200px" }}
          >
            <TextEditor
              text={text}
              setText={setText}
              isInvalid={isTextInvalid}
            />
          </div>
          {/* Файлы */}
          <FileUploader files={files} setFiles={setFiles} />
          {/* Кнопки */}
          <div className="email-modal__content__buttons">
            <Button
              title="ОТПРАВИТЬ"
              clickHandler={sendEmail}
              style={{
                width: "100%",
                backgroundColor: "#21A038",
                fontWeight: "600",
              }}
            />
            <Button
              title="ОТМЕНА"
              buttonType="outline"
              clickHandler={closeModal}
              style={{
                width: "100%",
                color: "#21A038",
                border: "2px solid #21A038",
                fontWeight: "600",
              }}
            />
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}
