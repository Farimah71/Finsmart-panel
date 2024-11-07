import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Table } from "../../../../../components";

export const TempTransaction = ({ data }) => {
  // ---------- state ----------
  const [tableData, setTableData] = useState();

  // ---------- i18next ----------
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem("lng");

  // ------------ lifecycle -----------
  useEffect(() => {
    if (data && data.count > 1) {
      const values = data.data?.map((item, index) => ({
        rowId: index + 1,
        id: item.tempTransactionId,
        accountNumber: item.accountNumber,
        accountTitle: item.accountTitle,
        refrenceDiscription: item.refrenceDiscription,
      }));
      setTableData(values);
    }
  }, [data]);

  // ----------- variables ----------
  const cols = [
    {
      name: t("table.col.account_number"),
      selector: (row) => (
        <div className="dark:text-dark_custom-full-white">
          {row.accountNumber}
        </div>
      ),
    },
    {
      name: t("table.col.account_title"),
      selector: (row) => (
        <div className="dark:text-dark_custom-full-white">
          {row.accountTitle.length > 15
            ? `${row.accountTitle.substring(0, 15)}...`
            : row.accountTitle}
        </div>
      ),
    },
    {
      name: t("table.col.reference_description"),
      selector: (row) => (
        <div className="dark:text-dark_custom-full-white">
          {row.refrenceDiscription.substring(0, 40)}
        </div>
      ),
    },
  ];

  // ----------- return jsx ----------
  return (
    <div className="h-[90%] overflow-hidden overflow-y-scroll">
      {!data?.count ? (
        <p className="w-fit m-auto pt-10 flex items-center text-purple-300">
          {t("text.start_mapping")}
        </p>
      ) : (
        <Table cols={cols} data={tableData} />
      )}
    </div>
  );
};
