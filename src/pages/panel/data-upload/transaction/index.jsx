import { useLocation, useNavigate } from "react-router-dom";
import { Button, Table, Spinner } from "../../../../components";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getExcelTempDatas } from "../../../../redux/actions/settings/ExcelTempData";
import { getTempTransactions } from "../../../../redux/actions/settings/temp-transaction";
import { getCompanyTransactions } from "../../../../redux/actions/settings/company-transaction";
import { useSelector } from "react-redux";
import { FcPrevious, FcNext } from "react-icons/fc";
import { clearExcelInfo } from "../../../../redux/reducers/settings/ExcelTempData";
import { clearTempInfo } from "../../../../redux/reducers/settings/temp-transaction";
import { clearTransactionInfo } from "../../../../redux/reducers/settings/company-transaction";

export const Transaction = () => {
  // ---------- states ----------
  const [ExcelData, setExcelData] = useState();
  const [tempData, setTempData] = useState();
  const [transData, setTransData] = useState();
  const [rowsCount, setRowsCount] = useState(50);
  const [pageNumber, setPageNumber] = useState(1);

  // ------------- hooks ------------
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    state: { id, fileStatus },
  } = useLocation();

  // ---------- store -----------
  const { isLoading } = useSelector((state) => state.loadingSlice);
  const ExcelTempData = useSelector((state) => state.ExcelTempDataSlice.info);
  const tempTransactionData = useSelector(
    (state) => state.tempTransactionSlice.info
  );
  const companyTransactionData = useSelector(
    (state) => state.companyTransactionSlice.info
  );

  // ---------- i18next ----------
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem("lng");

  // -------------- variables -----------
  const options = {
    pageNumber: pageNumber,
    pageSize: rowsCount,
    filters: [
      {
        property: "CompanyFileId",
        operation: 5,
        values: [`${id}`],
      },
    ],
    orderBy: "",
    includeProperties: "",
  };
  const cols = [
    {
      name: t("table.col.no"),
      selector: (row) => (
        <div className="dark:text-dark_custom-full-white">{row.rowId}</div>
      ),
    },
    {
      name: t("table.col.column") + " 1",
      selector: (row) => (
        <div className="dark:text-dark_custom-full-white">{row.column1}</div>
      ),
    },
    {
      name: t("table.col.column") + " 2",
      selector: (row) => (
        <div className="dark:text-dark_custom-full-white">{row.column2}</div>
      ),
    },
    {
      name: t("table.col.column") + " 3",
      selector: (row) => (
        <div className="dark:text-dark_custom-full-white">{row.column3}</div>
      ),
    },
    {
      name: t("table.col.column") + " 4",
      selector: (row) => (
        <div className="dark:text-dark_custom-full-white">{row.column4}</div>
      ),
    },
    {
      name: t("table.col.column") + " 5",
      selector: (row) => (
        <div className="dark:text-dark_custom-full-white">{row.column5}</div>
      ),
    },
    {
      name: t("table.col.column") + " 6",
      selector: (row) => (
        <div className="dark:text-dark_custom-full-white">{row.column6}</div>
      ),
    },
    {
      name: t("table.col.column") + " 7",
      selector: (row) => (
        <div className="dark:text-dark_custom-full-white">{row.column7}</div>
      ),
    },
  ];
  const tempCol = [
    {
      name: t("table.col.account_number"),
      selector: (row) => (
        <div className="dark:text-dark_custom-full-white">
          {row.accountNumber}
        </div>
      ),
    },
    {
      name: t("table.col.reference_number"),
      selector: (row) => (
        <div className="dark:text-dark_custom-full-white">
          {row.refrenceNumber}
        </div>
      ),
    },
    {
      name: t("table.col.reference_description"),
      selector: (row) => (
        <div className="dark:text-dark_custom-full-white">
          {row.refrenceDiscription}
        </div>
      ),
    },
    {
      name: t("table.col.credit"),
      selector: (row) => (
        <div className="dark:text-dark_custom-full-white">{row.credit}</div>
      ),
    },
    {
      name: t("table.col.debit"),
      selector: (row) => (
        <div className="dark:text-dark_custom-full-white">{row.debit}</div>
      ),
    },
  ];

  // ------------ lifecycles ------------
  useEffect(() => {
    if (fileStatus === 1) {
      dispatch(getExcelTempDatas(options));
    } else if (fileStatus === 2 || fileStatus === 3) {
      dispatch(getTempTransactions(options));
    } else if (fileStatus === 4) {
      dispatch(getCompanyTransactions(options));
    }
    return () => {
      dispatch(clearExcelInfo());
      dispatch(clearTempInfo());
      dispatch(clearTransactionInfo());
    };
  }, []);
  useEffect(() => {
    if (fileStatus === 1) {
      dispatch(getExcelTempDatas(options));
    } else if (fileStatus === 2 || fileStatus === 3) {
      dispatch(getTempTransactions(options));
    } else if (fileStatus === 4) {
      dispatch(getCompanyTransactions(options));
    }
  }, [pageNumber]);
  useEffect(() => {
    if (ExcelTempData) {
      const values = ExcelTempData.data?.map((item, index) => ({
        rowId: index + 1,
        id: item.excelTempDataId,
        column1: item.column1,
        column2: item.column2,
        column3: item.column3,
        column4: item.column4,
        column5: item.column5,
        column6: item.column6,
        column7: item.column7,
      }));
      setExcelData(values);
    }
  }, [ExcelTempData]);
  useEffect(() => {
    if (tempTransactionData) {
      const values = tempTransactionData.data?.map((item, index) => ({
        rowId: index + 1,
        id: item.companyTransactionId,
        accountNumber: item.accountNumber,
        refrenceDiscription: item.refrenceDiscription,
        accountTitle: item.accountTitle,
        refrenceNumber: item.refrenceNumber,
        refrenceType: item.refrenceType,
        accountNumber: item.accountNumber,
        credit: item.credit,
        debit: item.debit,
      }));
      setTempData(values);
    }
  }, [tempTransactionData]);
  useEffect(() => {
    if (companyTransactionData) {
      const values = companyTransactionData.data?.map((item, index) => ({
        rowId: index + 1,
        id: item.companyTransactionId,
        accountNumber: item.accountNumber,
        refrenceDiscription: item.refrenceDiscription,
        accountTitle: item.accountTitle,
        refrenceNumber: item.refrenceNumber,
        refrenceType: item.refrenceType,
        accountNumber: item.accountNumber,
        credit: item.credit,
        debit: item.debit,
      }));
      setTransData(values);
    }
  }, [companyTransactionData]);

  // ----------- functions -------------
  const handlePageChange = (pageNumber) => {
    setPageNumber(pageNumber);
  };

  // ------------- render jsx ------------
  return (
    <div className="flex flex-col gap-y-8 w-full p-6 pb-4 bg-white dark:bg-dark_custom-light-black rounded-11">
      <div className="w-full flex justify-between items-center dark:bg-dark_custom-light-black">
        <div className="flex flex-col gap-y-1">
          <h4 className="text-19 text-custom-dark font-bold dark:text-dark_custom-full-white">
            {t("page_title.transactions")}
          </h4>
          <span className="text-14 flex gap-x-2 text-custom-gray-muted dark:text-dark_custom-light-white">
            {t("text.dashboard")} - {t("page_title.data_upload")} -{" "}
            {t("page_title.transactions")}
          </span>
        </div>
        <Button
          title={t("button.back_title")}
          onClick={() => navigate(-1)}
          theme={"light"}
        />
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {ExcelData?.length > 0 ||
          tempData?.length > 0 ||
          transData?.length > 0 ? (
            <div className="ml-auto pr-2 flex gap-x-2">
              <span className="text-custom-blue mt-2 cursor-default">
                {t("button.previous_title")}
              </span>
              <FcPrevious
                size={20}
                className="rounded-full hover:bg-gray-200 w-10 h-10 p-3"
                onClick={() =>
                  pageNumber > 1 && handlePageChange(pageNumber - 1)
                }
              />
              <FcNext
                size={20}
                className="rounded-full hover:bg-gray-200 w-10 h-10 p-3"
                onClick={() => handlePageChange(pageNumber + 1)}
              />
              <span className="text-custom-blue mt-2 cursor-default">
                {t("button.next_title")}
              </span>
            </div>
          ) : null}
          <Table
            cols={tempTransactionData.count || transData ? tempCol : cols}
            data={
              ExcelTempData.count
                ? ExcelData
                : tempTransactionData.count
                ? tempData
                : transData
            }
          />
        </>
      )}
    </div>
  );
};
