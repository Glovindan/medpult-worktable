import React, { useEffect, useState } from "react";
import CustomList from "../../../UIKit/CustomList/CustomList";
import {
  MyItemData,
  ListColumnData,
  FetchData,
  SortData,
} from "../../../UIKit/CustomList/CustomListTypes";
import { ContractorsSearchData, InsuredListData } from "../../shared/types";

import Scripts from "../../shared/utils/clientScripts";
import CustomInput from "../../../UIKit/CustomInput/CustomInput";
import utils, {
  openContractor,
  openContractorInEditMode,
  openNewRequest,
  redirectSPA,
  useDebounce,
} from "../../shared/utils/utils";
import Button from "../../../UIKit/Button/Button";
import icons from "../../shared/icons";
import CustomInputSelect from "../CustomInputSelect/CustomInputSelect";

/** Пропсы Модального окна */
export type InsuredListProps = {
  /** Идентификаторы выбранных застрахованных */
  selectedInsuredIds: string[];
  /** Установить идентификаторы выбранных застрахованных */
  setSelectedInsuredIds: React.Dispatch<React.SetStateAction<string[]>>;
  /** Поисковые данные контрагента */
  contractorsSearchData: ContractorsSearchData;
  /** Иденификаторы выбранных обратившихся */
  selectedContractorsIds: string[];
};

/** Данные поиска дубликатов застрахованного */
export interface InsuredSearchData extends ContractorsSearchData {
  /** Данные поисковой строки */
  searchQuery?: string;
  /** Поле, по которому выполняется поиск */
  searchField?: string;
}

/** Список застрахованных */
export default function InsuredList({
  selectedInsuredIds,
  setSelectedInsuredIds,
  contractorsSearchData,
  selectedContractorsIds,
}: InsuredListProps) {
  // Поисковый запрос
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Значение с debounce
  const searchQueryDebounced = useDebounce(searchQuery, 500);

  /** Обработчик нажатия на кнопку "Глобальный поиск"  */
  const onClickSearchContractor = async () => {
    // Открыть форму отбора застрахованных
    const link = Scripts.getSelectInsuredPagePath();
    const redirectUrl = new URL(window.location.origin + "/" + link);
    if (contractorsSearchData.phone)
      redirectUrl.searchParams.set("phone", contractorsSearchData.phone);
    utils.redirectSPA(redirectUrl.toString());
  };

  /** Обработчик нажатия на кнопку "Редактировать"  */
  const onClickEdit = async () => {
    if (!selectedInsuredIds.length) return;
    // Открыть контрагента в режиме изменения
    openContractorInEditMode(selectedInsuredIds[0]);
  };

  // Вспомогательная функция для показа ошибок
  const showErrorMessage = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(null), 3000);
  };

  /** Обработчик нажатия на кнопку "Создать обращение"  */
  const newRequest = async () => {
    if (!selectedContractorsIds.length) {
      showErrorMessage("Выберите обратившегося");
      return;
    }

    if (contractorsSearchData.phone)
      // Открыть форму создания обращения
      openNewRequest(
        contractorsSearchData.phone,
        selectedContractorsIds[0],
        selectedInsuredIds[0]
      );
  };

  /** Обработчик нажатия на застрахованного */
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
      name: "ФИО",
      code: "fullname",
      fr: 1,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Дата рождения",
      code: "birthdate",
      fr: 1,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Телефон",
      code: "phone",
      fr: 1,
    }),
    new ListColumnData({
      name: "Email",
      code: "email",
      fr: 1,
    }),
    new ListColumnData({
      name: "Полис",
      code: "policy",
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
  ];

  /** Данные поиска */
  const searchFieldsCode = columns.filter((col) =>
    ["fullname", "policy"].includes(col.code)
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
    useState<InsuredSearchData>({
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

  const handleGetData = async (
    page: number,
    sortData?: SortData,
    searchData?: InsuredSearchData
  ): Promise<FetchData<InsuredListData>> => {
    const response = await Scripts.getInsuredList(page, sortData, searchData);

    return response;
  };

  const isDisabledEdit = selectedInsuredIds.length === 0;
  const isDisabledAdd = selectedContractorsIds.length === 0;

  return (
    <>
      <div className="insured-list">
        <div className="insured-list__search">
          <div className="insured-list__search__button">
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
              title={"Глобальный поиск"}
              clickHandler={onClickSearchContractor}
            />
          </div>
          <div className="insured-list__button">
            <Button
              title={"Редактировать"}
              clickHandler={() => onClickEdit()}
              icon={icons.EditButton}
              buttonType="outline"
              style={{
                opacity: isDisabledEdit ? "0.4" : "1",
                cursor: isDisabledEdit ? "not-allowed" : "pointer",
              }}
            />
            <Button
              title={"Создать обращение"}
              clickHandler={newRequest}
              icon={icons.AddButton}
              style={{
                opacity: isDisabledAdd ? "0.4" : "1",
                cursor: isDisabledAdd ? "not-allowed" : "pointer",
              }}
            />
          </div>
        </div>
        <div className="insured-list__list">
          <CustomList<InsuredSearchData, InsuredListData>
            columnsSettings={columns}
            searchData={searchDataWithQuery}
            searchFields={selectedSearchField ? [selectedSearchField] : []}
            getDataHandler={handleGetData}
            isScrollable={true}
            isSelectable={true}
            isMultipleSelect={false}
            setSelectedItems={(ids: string[]) => setSelectedInsuredIds(ids)}
            selectedItems={selectedInsuredIds}
          />
        </div>
      </div>

      {/* Всплывашка */}
      {errorMessage && <div className="alert-error">{errorMessage}</div>}
    </>
  );
}
