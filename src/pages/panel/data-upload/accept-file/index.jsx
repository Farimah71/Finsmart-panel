import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Input, Table, Spinner } from "../../../../components";
import { getCompanyTransactions } from "../../../../redux/actions/settings/company-transaction";
import { acceptCompanyFile } from "../../../../redux/actions/settings/company-file";

export const AcceptFile = () => {
  // ---------- states ----------
  const [data, setData] = useState();
  const [modifiedData, setModifiedData] = useState();
  const [row, setRow] = useState("");
  const [isShowTable, setIsShowTable] = useState(false);

  // ---------- store ----------
  const { isLoading } = useSelector((state) => state.loadingSlice);
  const { loading: companyFileLoading } = useSelector(
    (state) => state.companyFileSlice
  );
  const { info: companyTransactionData } = useSelector(
    (state) => state.companyTransactionSlice
  );

  // ---------- i18next ----------
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem("lng");

  // ------------- hooks ------------
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  // ---------- lifeCycle -----------
  useEffect(() => {
    dispatch(
      getCompanyTransactions({
        pageNumber: 1,
        pageSize: 50,
        filters: [
          {
            property: "CompanyFileId",
            operation: 5,
            values: [`${id}`],
          },
          {
            property: "AccountNumber",
            operation: 5,
            values: ["1.1.1"],
          },
        ],
      })
    );
  }, []);
  useEffect(() => {
    if (companyTransactionData) {
      const values = companyTransactionData.data?.map((item, index) => ({
        rowId: index + 1,
        id: item.companyTransactionId,
        accountNumber: item.accountNumber,
        refrenceDiscription: item.refrenceDiscription,
      }));
      setData(values);
    }
  }, [companyTransactionData]);

  // ---------- variables ----------
  const cols = [
    {
      name: t("table.col.no"),
      selector: (row) => (
        <div className="dark:text-dark_custom-full-white">{row.rowId}</div>
      ),
      width: modifiedData ? "50px" : "100px",
    },
    {
      name: t("table.col.account_number"),
      selector: (row) => (
        <div className="dark:text-dark_custom-full-white">
          {row.accountNumber}
        </div>
      ),
      width: modifiedData ? "130px" : "200px",
    },
    {
      name: t("table.col.reference_description"),
      selector: (row) => (
        <div
          className="dark:text-dark_custom-full-white hover:cursor-help"
          title={row.refrenceDiscription}
        >
          {row.refrenceDiscription.length > 50
            ? row.refrenceDiscription.substring(0, 50) + "..."
            : row.refrenceDiscription}
        </div>
      ),
    },
  ];

  // --------- functions ----------
  const rowHandler = (row) => {
    setIsShowTable(true);
    const newData = data.slice(row - 1, data.length);
    setModifiedData(newData);
  };
  const reloadPageHandler = (status) => {
    status && navigate("/dataUpload");
  };
  console.log(data);
  // ---------- render jsx ----------
  return (
    <div className="flex flex-col gap-y-8 w-full p-6 pb-4 bg-white dark:bg-dark_custom-light-black rounded-11">
      <div className="w-full flex justify-between items-center dark:bg-dark_custom-light-black">
        <div className="flex flex-col gap-y-1">
          <h4 className="text-19 text-custom-dark font-bold dark:text-dark_custom-full-white">
            {t("page_title.accept_file")}
          </h4>
          <span className="text-14 flex gap-x-2 text-custom-gray-muted dark:text-dark_custom-light-white">
            {t("text.dashboard")} - {t("page_title.data_upload")} -{" "}
            {t("page_title.accept_file")}
          </span>
        </div>
        <div className="flex gap-x-2">
          <Button
            title={t("button.back_title")}
            onClick={() => navigate("/dataUpload")}
            theme="light"
          />
          <Button
            title={t("button.accept_file")}
            loading={companyFileLoading}
            onClick={() =>
              dispatch(
                acceptCompanyFile(id, (status) => reloadPageHandler(status))
              )
            }
          />
        </div>
      </div>
      <div className="flex gap-x-1 xl:w-[30%] ml-auto">
        <Input
          type="number"
          placeholder={t("input.start_row.placeholder")}
          onChange={(e) => setRow(e.target.value)}
          disabled={!data}
        />
        <Button
          title={t("button.apply")}
          onClick={() => rowHandler(row)}
          disabled={!row}
        />
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={`${isShowTable && "flex gap-2 lg:flex-row flex-col"}`}>
          <div className="w-full border rounded-10 shadow-lg p-1 pr-1 max-h-[800px] overflow-auto">
            <Table cols={cols} data={data} />
          </div>

          <div
            className={`${
              isShowTable
                ? "w-full visible  border rounded-10 shadow-lg p-1 max-h-[800px] overflow-auto"
                : "w-0 h-0"
            } duration-700 transition-all`}
          >
            <Table cols={cols} data={modifiedData} />
          </div>
        </div>
      )}
    </div>
  );
};
