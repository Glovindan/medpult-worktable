import React, { useEffect, useState } from "react";
import CustomList from "../../../UIKit/CustomList/CustomList";
import {
  MyItemData,
  ListColumnData,
} from "../../../UIKit/CustomList/CustomListTypes";
import { ContractorListData, ContractorsSearchData } from "../../shared/types";
import Scripts from "../../shared/utils/clientScripts";
import utils, {
  openContractor,
  openContractorInEditMode,
  redirectSPA,
  useDebounce,
} from "../../shared/utils/utils";
import CustomInput from "../../../UIKit/CustomInput/CustomInput";
import Button from "../../../UIKit/Button/Button";
import icons from "../../shared/icons";
import Panel from "../Panel/Panel";
import CustomInputSelect from "../CustomInputSelect/CustomInputSelect";

export interface ContractorListProps {
  /** Иденификаторы выбранных обратившихся */
  selectedContractorsIds: string[];
  /** Установить иденификаторы выбранных обратившихся */
  setSelectedContractorsIds: React.Dispatch<React.SetStateAction<string[]>>;
  /** Поисковые данные контрагента */
  contractorsSearchData: ContractorsSearchData;
}

/** Данные поиска дубликатов контрагента (с дополнительными полями) */
export interface ContractorsSearchDataExtended extends ContractorsSearchData {
  /** Данные поисковой строки */
  searchQuery?: string;
  /** Поле, по которому выполняется поиск */
  searchField?: string;
}

/** Список обратившихся */
export default function ContractorList({
  selectedContractorsIds,
  setSelectedContractorsIds,
  contractorsSearchData,
}: ContractorListProps) {
  // Поисковый запрос
  const [searchQuery, setSearchQuery] = useState<string>("");

  //Количество обратившихся
  const [contractorCount, setContractorCount] = useState<number>(0);
  const fetchElementsCount = async () => {
    const count = await Scripts.getCountConractor(contractorsSearchData);
    setContractorCount(count);
  };
  // Вычислить количество обратившихся
  useEffect(() => {
    fetchElementsCount();
  }, []);

  // Значение с debounce
  const searchQueryDebounced = useDebounce(searchQuery, 500);

  /** Обработчик нажатия на кнопку "Редактировать"  */
  const onClickEdit = async () => {
    if (!selectedContractorsIds.length) return;
    // Открыть контрагента
    openContractorInEditMode(selectedContractorsIds[0]);
  };

  /** Обработчик нажатия на контрагента*/
  const onClickContractor = async (contractor: MyItemData<string>) => {
    const contractorId = contractor.info;
    if (!contractorId) return;
    // Открыть контрагента
    openContractor(contractorId);
  };

  /** Колонки списка */
  const columns = [
    new ListColumnData({
      name: "",
      code: "isIntegration",
      fr: 0.2,
      isIcon: true,
    }),
    new ListColumnData({
      name: "Наименование",
      code: "fullname",
      fr: 1,
      isSortable: true,
      //isLink: true,
      // onClick: onClickContractor,
    }),
    new ListColumnData({
      name: "Дата рождения",
      code: "birthdate",
      fr: 1,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Полис",
      code: "policy",
      fr: 1,
    }),
    new ListColumnData({
      name: "Телефон",
      code: "phone",
      fr: 1,
    }),
    new ListColumnData({
      name: "Начало действия",
      code: "policyStartDate",
      fr: 1,
    }),
    new ListColumnData({
      name: "Окончание действия",
      code: "policyEndDate",
      fr: 1,
    }),
    new ListColumnData({
      name: "Вид контрагента",
      code: "type",
      isSortable: true,
      fr: 1,
    }),
    new ListColumnData({
      name: "Адрес",
      code: "adress",
      fr: 1,
    }),
  ];

  const searchFieldsCode = columns.filter((col) =>
    ["fullname", "policy", "adress"].includes(col.code)
  );
  const searchOptions = searchFieldsCode.map((col) => ({
    code: col.code,
    name: col.name,
  }));
  const [selectedSearchField, setSelectedSearchField] = useState<string>(
    searchOptions[0].code
  );
  const selectedFieldName = searchOptions.find(
    (o) => o.code === selectedSearchField
  )?.name;

  const [searchDataWithQuery, setSearchDataWithQuery] =
    useState<ContractorsSearchDataExtended>({
      ...contractorsSearchData,
      searchQuery: searchQueryDebounced,
      searchField: selectedSearchField,
    });
  useEffect(() => {
    setSearchDataWithQuery({
      ...contractorsSearchData,
      searchQuery: searchQueryDebounced,
      searchField: selectedSearchField,
    });
  }, [contractorsSearchData, searchQueryDebounced, selectedSearchField]);

  const isDisabled = selectedContractorsIds.length === 0;
  return (
    <Panel
      label={"Совпадения по номеру"}
      count={contractorCount}
      isOpen={false}
    >
      <div className="insured-list">
        <div className="insured-list__search">
          {/* Поле поиска */}
          <CustomInputSelect
            value={searchQuery}
            setValue={setSearchQuery}
            cursor="text"
            placeholder="Поиск"
            buttons={icons.Search}
            searchFields={searchOptions.map((o) => o.name)}
            selectedField={selectedFieldName}
            setSelectedField={(name) => {
              const col = searchOptions.find((o) => o.name === name);
              if (col) setSelectedSearchField(col.code);
            }}
          />
          <Button
            title={"Редактировать"}
            clickHandler={() => onClickEdit()}
            icon={icons.EditButton}
            buttonType="outline"
            style={{
              opacity: isDisabled ? "0.4" : "1",
              cursor: isDisabled ? "not-allowed" : "pointer",
            }}
          />
        </div>
        <div className="insured-list__list">
          <CustomList<ContractorsSearchDataExtended, ContractorListData>
            columnsSettings={columns}
            getDataHandler={Scripts.getContractorList}
            searchData={searchDataWithQuery}
            searchFields={selectedSearchField ? [selectedSearchField] : []}
            isSelectable={true}
            isMultipleSelect={false}
            setSelectedItems={(ids: string[]) => setSelectedContractorsIds(ids)}
            selectedItems={selectedContractorsIds}
            isScrollable={true}
          />
        </div>
      </div>
    </Panel>
  );
}
