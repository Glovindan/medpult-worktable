import React, { useEffect, useState } from "react";
import Button from "../../../../UIKit/Button/Button";
import CustomInput from "../../../../UIKit/CustomInput/CustomInput";
import icons from "../../../../UIKit/shared/icons";

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

  return (
    <div className="tabs-actions">
      <div className="tabs-actions__call">
        <div className="tabs-actions__call_input">
            <CustomInput setValue={() => {}} value="" placeholder="+7 (000) 000-00-00"/>
        </div>
        <Button buttonType={"outline"} clickHandler={() => {}} title={<>{icons.Phone} Принять вызов</>} />
      </div>
      <div className="tabs-actions__create-request-buton">
        <Button clickHandler={() => {}} title={<>{icons.BigAdd} Создать обращение</>} />
      </div>
    </div>
  );
}
