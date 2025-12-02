import React, { FormEvent, useState } from "react";
import Button from "../../../../UIKit/Button/Button";
import CustomInput from "../../../../UIKit/CustomInput/CustomInput";
import icons from "../../../../UIKit/shared/icons";
import Scripts from "../../../shared/utils/clientScripts";
import { getMaskedPhone, redirectSPA } from "../../../shared/utils/utils";

/** Действия на рабочем столе */
export default function WorkTableTabsActions() {
  const createRequestIcon = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 1V19M19 10H1"
        stroke="#FDFDFD"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  );

  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  //Принять звонок
  const answerCall = async () => {
    if (phone === "") {
      setError("Укажите номер телефона");
      return;
    }
    //Переход на форму входящего звонка
    const link = Scripts.getIcomingCallLink();
    const redirectUrl = new URL(window.location.origin + "/" + link);
    if (phone) redirectUrl.searchParams.set("phone", phone);
    window.open(redirectUrl.toString(), "_blank");
  };

  const onInput = (e: FormEvent<HTMLInputElement>) => {
    if (error !== "") {
      setError("");
    }
    const maskedPhone = getMaskedPhone(e.currentTarget.value);
    setPhone(maskedPhone);
  };

  //Создать обращение
  const createAppeal = async () => {
    window.localStorage.removeItem("medpult-draft");

    const request_page_path = Scripts.getRequestPagePath();
    redirectSPA(request_page_path + "?mode=create");
  };

  return (
    <div className="tabs-actions">
      <div className="tabs-actions__call">
        <div className="tabs-actions__call_input">
          <CustomInput
            setValue={setPhone}
            value={phone}
            onInput={onInput}
            placeholder="+7 (000) 000-00-00"
          />
        </div>
        <Button
          buttonType={"outline"}
          clickHandler={answerCall}
          title={<>{icons.Phone} Принять вызов</>}
        />
        {error !== "" && (
          <span className="tabs-actions__call_error">{error}</span>
        )}
      </div>
      <div className="tabs-actions__create-request-buton">
        <Button
          clickHandler={createAppeal}
          title={<>{icons.BigAdd} Создать обращение</>}
        />
      </div>
    </div>
  );
}
