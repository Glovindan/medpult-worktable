import { ObjectItem } from "../../../../UIKit/Filters/FiltersTypes";
import { SendEmailAction } from "../../../components/WorkTable/InteractionsList/SendEmailModal/SendEmailModalTypes";

/** Заглушка ожидания ответа сервера */
function randomDelay() {
  const delay = Math.random() * 1000;
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

/** Получить ссылку формы отбора контрагентов */
function getSelectContractorLink(): string {
  return "#selectRequestTest";
}

async function sendEmail(
  email: string,
  emailsCopy: string,
  text: string,
  recipientId: string,
  files: any,
  lineId?: string,
  sessionId?: string,
  topic?: string
): Promise<string | undefined> {
  return;
}

/** Получение Email  */
async function getEmails(): Promise<ObjectItem[]> {
  await randomDelay();
  const emails: ObjectItem[] = [
    new ObjectItem({ code: "test", value: "Телефон" }),
    new ObjectItem({ code: "test1", value: "Email (103@sberins.ru)" }),
  ];
  return emails;
}

async function getEmailDataByInteractionId(
  interactionId: string
): Promise<SendEmailAction> {
  return {
    session: { value: "11", code: "11" },
    topic: "Lorem Ipsum",
    text: "Lorem Ipsum",
    filesData: [],
    contractor: {
      id: "contractorId",
      fullname: "Иванов Иван",
      emails: ["foo@gmail.com", "bar@gmail.com"],
      email: "foo@gmail.com",
    },
  };
}

/** Получение данных контрагента по его идентификатору */
async function getEmailDataByContractorId(
  contractorId: string
): Promise<SendEmailAction> {
  return {
    contractor: {
      id: "contractorId",
      fullname: "Иванов Иван",
      emails: ["foo@gmail.com", "bar@gmail.com"],
      email: "foo@gmail.com",
    },
  };
}

export default {
    getSelectContractorLink,
    sendEmail,
    getEmails,
    getEmailDataByInteractionId,
    getEmailDataByContractorId,
}