import React, { useEffect, useState, useCallback } from "react";
import TabItem from "../../../../UIKit/Tabs/TabItem/TabItem.tsx";
import Scripts from "../../../shared/utils/clientScripts.ts";
import InsuredList, {
  InsuredListProps,
} from "../../InsuredList/InsuredList.tsx";

/** Список застрахованных */
export default function InsuredTab(props: InsuredListProps) {
  const {
    contractorsSearchData,
    selectedInsuredIds,
    setSelectedInsuredIds,
    selectedContractorsIds,
  } = props;

  // Общее количество застрахованных
  const [insuredCount, setInsuredCount] = useState<number>(0);

  const fetchInsuredCount = async () => {
    const count = await Scripts.getCountInsured(contractorsSearchData);
    setInsuredCount(count);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchInsuredCount().then(() => setIsLoading(false));
  }, [contractorsSearchData]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  function getCountString(count: number) {
    return isLoading ? "--" : `${count}`;
  }

  const countTitle = (
    <span className="count">{getCountString(insuredCount)}</span>
  );

  // Вкладка застрахованные
  return (
    <TabItem code={"insuredContragen"} name={<>Застрахованные {countTitle}</>}>
      <InsuredList
        selectedInsuredIds={selectedInsuredIds}
        setSelectedInsuredIds={setSelectedInsuredIds}
        contractorsSearchData={contractorsSearchData}
        selectedContractorsIds={selectedContractorsIds}
      />
    </TabItem>
  );
}
