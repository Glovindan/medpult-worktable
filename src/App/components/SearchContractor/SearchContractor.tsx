import React, { useEffect, useState } from "react";
import Scripts from "../../shared/utils/clientScripts";
import { ContractorListData } from "../../shared/types";
import icons from "../../shared/icons";
import utils, { redirectSPA, openContractor } from "../../shared/utils/utils";

type SearchContractorProps = {
  phone: any;
};
export default function SearchContractor({ phone }: SearchContractorProps) {
  const [contractors, setContractors] = useState<ContractorListData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContractors() {
      setLoading(true);
      const result = await Scripts.getContractorList(1, undefined, { phone });
      const items = result.items.map((i) => i.data);
      setContractors(items);
      setLoading(false);
    }
    fetchContractors();
  }, [phone]);

  /** Обработчик нажатия на контрагента*/
  const onClickContractor = async (contractor: ContractorListData) => {
    const contractorId = contractor.id?.value;
    if (!contractorId) return;
    // Открыть контрагента
    openContractor(contractorId);
  };
  // Перейти на форму отбора контрагентов
  const searchContractor = () => {
    const link = Scripts.getSelectContractorPagePath();
    const redirectUrl = new URL(window.location.origin + "/" + link);
    if (phone) redirectUrl.searchParams.set("phone", phone);
    utils.redirectSPA(redirectUrl.toString());
  };

  const contractor = contractors.length === 1 ? contractors[0] : undefined;
  return (
    <div className="search-contractor">
      <span className="search-contractor__title">Обратившийся</span>
      <div className="search-contractor__content">
        {contractor ? (
          <>
            <div className="search-contractor__field">
              <span className="search-contractor__field__label">
                Наименование
              </span>
              <div className="search-contractor__field__group">
                <span
                  className="search-contractor__field__value search-contractor__field__value__link"
                  title={contractor?.fullname?.value}
                  onClick={() => onClickContractor(contractor)}
                >
                  {contractor?.fullname?.value}
                </span>
                <span
                  className="search-contractor__field__button"
                  onClick={() => searchContractor()}
                >
                  {icons.Change} <span>Заменить</span>
                </span>
              </div>
            </div>

            <div className="search-contractor__field">
              <span className="search-contractor__field__label">Телефон</span>
              <span
                className="search-contractor__field__value"
                title={contractor?.phone?.value}
              >
                {contractor?.phone?.value}
              </span>
            </div>

            <div className="search-contractor__field">
              <span className="search-contractor__field__label">
                Дата рождения
              </span>
              <span
                className="search-contractor__field__value"
                title={contractor?.birthdate?.value}
              >
                {contractor?.birthdate?.value}
              </span>
            </div>

            <div className="search-contractor__field">
              <span className="search-contractor__field__label">Полис</span>
              <span
                className="search-contractor__field__value"
                title={contractor?.policy?.value}
              >
                {contractor?.policy?.value}
              </span>
            </div>

            <div className="search-contractor__field">
              <span className="search-contractor__field__label">
                Начало действия
              </span>
              <span
                className="search-contractor__field__value"
                title={contractor?.policyStartDate?.value}
              >
                {contractor?.policyStartDate?.value}
              </span>
            </div>

            <div className="search-contractor__field">
              <span className="search-contractor__field__label">
                Окончание действия
              </span>
              <span
                className="search-contractor__field__value"
                title={contractor?.policyEndDate?.value}
              >
                {contractor?.policyEndDate?.value}
              </span>
            </div>

            <div className="search-contractor__field">
              <span className="search-contractor__field__label">
                Вид контрагента
              </span>
              <span
                className="search-contractor__field__value"
                title={contractor?.type?.value}
              >
                {contractor?.type?.value}
              </span>
            </div>

            <div className="search-contractor__field">
              <span className="search-contractor__field__label">Адрес</span>
              <span
                className="search-contractor__field__value"
                title={contractor?.adress?.value}
              >
                {contractor?.adress?.value}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="search-contractor__field">
              <span className="search-contractor__field__label">
                Наименование
              </span>
              <div className="search-contractor__field__group">
                <span
                  className="search-contractor__field__button"
                  onClick={() => searchContractor()}
                >
                  {icons.Search} <span>Поиск</span>
                </span>
              </div>
            </div>

            <div className="search-contractor__field">
              <span className="search-contractor__field__label">Телефон</span>
              <span className="search-contractor__field__value" title={phone}>
                {phone}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
