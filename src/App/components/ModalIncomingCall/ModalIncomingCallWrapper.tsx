import React, { useEffect, useState } from "react";
import Scripts from "../../shared/utils/clientScripts";
import { ContractorsSearchData } from "../../shared/types.ts";
import ModalIncomingCall from "./ModalIncomingCall.tsx";
import Loader from "../../../UIKit/Loader/Loader";

/** Обёртка модального окна с контроллером видимости */
export default function ModalIncomingCallWrapper() {
  // Данные поиска контрагентов с одинаковым номером телефона
  const [contractorsSearchData, setContractorsSearchData] =
    useState<ContractorsSearchData>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Scripts.OnInit().then(() => {
      const currentURL = new URL(window.location.href);
      const phone = currentURL.searchParams.get("phone") || undefined;

      if (phone) {
        setContractorsSearchData({ phone });
      }
      setIsLoading(false);
    });
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <ModalIncomingCall contractorsSearchData={contractorsSearchData} />
  );
}
