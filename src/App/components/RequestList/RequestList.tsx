import React, { useEffect, useState, useCallback } from "react";
import CustomList from "../../../UIKit/CustomList/CustomList";
import {
  MyItemData,
  ItemDataString,
  ListColumnData,
  SortData,
} from "../../../UIKit/CustomList/CustomListTypes";
import { ContractorsSearchData, RequestListData } from "../../shared/types";
import { FetchData } from "../../../UIKit/CustomList/CustomListTypes.ts";
import Scripts from "../../shared/utils/clientScripts";
import CustomInput from "../../../UIKit/CustomInput/CustomInput";
import SliderPanel from "../SliderPanel/SliderPanel";
import RequestDetails from "./RequestDetails/RequestDetails.tsx";
import utils, { useDebounce, openNewRequest } from "../../shared/utils/utils";
import Button from "../../../UIKit/Button/Button";
import icons from "../../shared/icons";
import CustomInputSelect from "../CustomInputSelect/CustomInputSelect";

export type RequestListProps = {
  /** Идентификаторы выбранных застрахованных */
  selectedInsuredIds: string[];
  /** Поисковые данные контрагента */
  contractorsSearchData: ContractorsSearchData;
  /** Выбранные обращения */
  selectedRequestsIds: string[];
  /** Установить выбранные обращения */
  setSelectedRequestsIds: React.Dispatch<React.SetStateAction<string[]>>;
  /** Показывать закрытые задачи */
  sliderActive?: boolean;
  /** Изменить значение показывать закрытые задачи */
  setSliderActive?: React.Dispatch<React.SetStateAction<boolean>>;
  /** Иденификаторы выбранных обратившихся */
  selectedContractorsIds: string[];
};

/** Данные поиска обращений */
export interface RequestSearchData extends ContractorsSearchData {
  /** Поисковый запрос */
  searchQuery?: string;
  /** Идентификаторы выбранных застрахованных */
  insuredIds?: string[];
  /** Показывать закрытые задачи */
  isShowClosed?: boolean;
  /** Поле, по которому выполняется поиск */
  searchField?: string;
}

/** Список обращений */
export default function RequestList({
  selectedInsuredIds,
  contractorsSearchData,
  selectedRequestsIds,
  setSelectedRequestsIds,
  sliderActive,
  setSliderActive,
  selectedContractorsIds,
}: RequestListProps) {
  // Поисковый запрос
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Значение с debounce
  const searchQueryDebounced = useDebounce(searchQuery, 500);

  /** Обработчик нажатия на номер обращения */
  const onClickNumberRequest = async (requestInfo: MyItemData) => {
    const requestId = requestInfo.info;
    await openRequest(requestId);
  };

  /** Открыть обращение */
  const openRequest = async (requestId?: string) => {
    if (!requestId) return;

    utils.setRequest(requestId);

    const link = Scripts.getRequestPagePath();
    const redirectUrl = new URL(window.location.origin + "/" + link);
    if (requestId) redirectUrl.searchParams.set("request_id", requestId);
    // utils.redirectSPA(redirectUrl.toString());
    window.open(redirectUrl.toString(), "_blank");
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

  /** Обработчик нажатия на кнопку "Привязать обращение"  */
  const bindRequest = async () => {
    if (
      !selectedRequestsIds ||
      !selectedContractorsIds ||
      !contractorsSearchData.phone
    )
      return;
    await Scripts.createInteractionByRequestId(
      selectedRequestsIds[0],
      selectedContractorsIds[0],
      contractorsSearchData.phone
    );
    utils.setRequest(selectedRequestsIds[0]);

    const link = Scripts.getRequestPagePath();
    const redirectUrl = new URL(window.location.origin + "/" + link);
    if (selectedRequestsIds[0])
      redirectUrl.searchParams.set("request_id", selectedRequestsIds[0]);
    utils.redirectSPA(redirectUrl.toString());
  };
  //Детальная информация обращений
  const getDetailsLayout = ({
    rowData,
    onClickRowHandler,
    reloadData,
  }: {
    rowData: RequestListData;
    onClickRowHandler?: () => void;
    reloadData?: () => void;
  }) => {
    return (
      <RequestDetails
        rowData={rowData}
        onClickRowHandler={onClickRowHandler}
        reloadData={reloadData}
        onClickNumberRequest={openRequest}
      />
    );
  };

  /** Колонки списка */
  const columns = [
    new ListColumnData({
      name: "Номер обращения",
      code: "number",
      fr: 1,
      isSortable: true,
      isLink: true,
      onClick: onClickNumberRequest,
    }),
    new ListColumnData({
      name: "Дата создания",
      code: "createdAt",
      fr: 1,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Канал",
      code: "channel",
      fr: 1,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Тема обращения",
      code: "topic",
      fr: 1,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Статус",
      code: "statusRequest",
      fr: 1,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Причина обращения",
      code: "reason",
      fr: 2,
    }),
    // Кнопка разворачивания
    new ListColumnData({
      code: "isOpen",
      name: "",
      fr: 1,
      fixedWidth: "56px",
      isIcon: true,
    }),
  ];

  /** Данные поиска */
  const getSearchDataWithQuery = (): RequestSearchData => {
    return {
      ...contractorsSearchData,
      searchQuery: searchQueryDebounced,
      insuredIds: selectedInsuredIds,
      isShowClosed: sliderActive,
      searchField: selectedSearchField,
    };
  };

  const searchFieldsCode = columns.filter((col) =>
    ["number", "reason"].includes(col.code)
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
    useState<RequestSearchData>(() => getSearchDataWithQuery());

  const isDisabled = selectedRequestsIds.length === 0;

  useEffect(() => {
    setSearchDataWithQuery(getSearchDataWithQuery());
  }, [
    searchQueryDebounced,
    selectedInsuredIds,
    contractorsSearchData,
    sliderActive,
  ]);

  const isDisabledAdd = selectedContractorsIds.length === 0;

  return (
    <>
      <div className="request-list">
        <div className="request-list__search">
          <div className="request-list__search__button">
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
            <SliderPanel
              title="Закрытые обращения"
              isVisible={sliderActive ?? false}
              setIsVisible={(isActive) => {
                if (setSliderActive) setSliderActive(isActive);
              }}
            />
          </div>
          <div className="request-list__button">
            <Button
              title={"Привязать к обращению"}
              clickHandler={bindRequest}
              icon={icons.AddLink}
              style={{
                backgroundColor: "#21A038",
                opacity: isDisabled ? "0.4" : "1",
                cursor: isDisabled ? "not-allowed" : "pointer",
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
        <div className="request-list__list">
          <CustomList<RequestSearchData, RequestListData>
            columnsSettings={columns}
            getDataHandler={Scripts.getRequestList}
            getDetailsLayout={getDetailsLayout}
            isScrollable={true}
            searchFields={selectedSearchField ? [selectedSearchField] : []}
            searchData={searchDataWithQuery}
            isSelectable={true}
            isMultipleSelect={false}
            setSelectedItems={(ids: string[]) => setSelectedRequestsIds(ids)}
            selectedItems={selectedRequestsIds}
          />
        </div>
      </div>
      {/* Всплывашка */}
      {errorMessage && <div className="alert-error">{errorMessage}</div>}
    </>
  );
}
