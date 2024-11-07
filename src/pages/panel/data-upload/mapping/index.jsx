import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { mapCompanyFile } from "../../../../redux/actions/settings/company-file";
import { useSelector } from "react-redux";
import { BarLoader } from "react-spinners";
import { getFinsmartCodings } from "../../../../redux/actions/settings/Finsmart-coding";
import { getCompanyFinsmartCodingHeaders } from "../../../../redux/actions/settings/company-Finsmart-coding-header";
import { getDataFromJwtToken } from "../../../../helpers/get-data-from-jwt";
import { CompanyPlanningDetail } from "./company-planning-detail";
import { CodeMapper } from "./code-mappers";
import { TempTransaction } from "./temp-transaction";
import { Button } from "../../../../components";
import { clearMappingResult } from "../../../../redux/reducers/settings/company-file";
import { SiMicrosoftexcel } from "react-icons/si";
import { exportToExcel } from "../../../../helpers/export-to-Excel";

export const FileMapping = () => {
  // -------- store -----------
  const { info: companyHeaderData } = useSelector(
    (state) => state.companyFinsmartCodingHeaderSlice
  );
  const { info: planningData, loading: planningLoading } = useSelector(
    (state) => state.FinsmartCodingSlice
  );
  const { mappingResult: fileData, loading: fileLoading } = useSelector(
    (state) => state.companyFileSlice
  );
  const { isLoading } = useSelector((state) => state.loadingSlice);

  // ----------- states ----------
  const [progress, setProgress] = useState(0);
  const [codingId, setCodingId] = useState();
  const [isDisabled, setIsDisabled] = useState(false);

  // ---------- i18next ----------
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem("lng");

  // ----------- hooks ----------
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    state: { id },
  } = useLocation();

  // ----------- lifecycle ----------
  useEffect(() => {
    dispatch(clearMappingResult());
    dispatch(
      getCompanyFinsmartCodingHeaders({
        filters: [
          {
            property: "CompanyId",
            operation: 5,
            values: [getDataFromJwtToken("CompanyId")],
          },
        ],
      })
    );
  }, []);
  useEffect(() => {
    if (companyHeaderData !== null && companyHeaderData.count === 0) {
      alert("Please choose a template");
      setIsDisabled(true);
    } else if (companyHeaderData !== null && companyHeaderData.count) {
      dispatch(
        getFinsmartCodings({
          pageNumber: 0,
          pageSize: 0,
          filters: [
            {
              property: "FinsmartCodingHeaderId",
              operation: 5,
              values: [`${companyHeaderData.data[0].finsmartCodingHeaderId}`],
            },
          ],
          orderBy: "",
          includeProperties: "",
        })
      );
    }
  }, [companyHeaderData]);
  useEffect(() => {
    if (fileData.count === 1 && fileData.data?.fileStatus === 3) {
      setIsDisabled(true);
    }
  }, [fileData]);
  useEffect(() => {
    if (isDisabled) {
      navigate("/dataUpload");
    }
  }, [isDisabled]);

  // ---------- functions ---------
  const reloadPageHandler = (status) => {
    if (status) {
      dispatch(
        getFinsmartCodings({
          pageNumber: 0,
          pageSize: 0,
          filters: [
            {
              property: "FinsmartCodingHeaderId",
              operation: 5,
              values: [`${companyHeaderData.data[0].finsmartCodingHeaderId}`],
            },
          ],
          orderBy: "",
          includeProperties: "",
        })
      );
    }
  };
  const codingIdHandler = (id) => {
    setCodingId(id);
  };
  const exportExcelHandler = () => {
    fileData.count && exportToExcel(fileData.data, "Transaction");
  };

  // --------- render jsx ----------
  return (
    <div className="rounded-11 p-5 bg-white dark:bg-dark_custom-light-black">
      <div className="flex justify-between">
        <div className="flex flex-col gap-y-1">
          <h4 className="text-19 text-custom-dark font-bold dark:text-dark_custom-full-white">
            {t("page_title.mapping")}
          </h4>
          <span className="text-14 flex gap-x-2 text-custom-gray-muted dark:text-dark_custom-light-white">
            {t("text.dashboard")} - {t("page_title.data_upload")} -{" "}
            {t("page_title.mapping")}
          </span>
        </div>
        {fileLoading && (
          <span className="bg-custom-blue mt-1 -ml-8 animate-pulse py-2 px-4 h-10 rounded text-white">
            {t("text.please_wait")}
          </span>
        )}
        {progress > 0 && progress < 100 && (
          <div className="flex flex-col mt-8">
            <progress
              value={progress}
              max={100}
              className=" self-center"
            ></progress>
            <span className="mx-auto">{progress}%</span>
          </div>
        )}
        <Button
          title={t("button.start_mapping_title")}
          onClick={() =>
            dispatch(
              mapCompanyFile(
                id,
                (status) => reloadPageHandler(status),
                (progress) => setProgress(progress)
              )
            )
          }
          disabled={isDisabled}
        />
      </div>

      <p className="mt-10 mb-5 text-custom-blue">
        {fileData.count > 0 &&
          fileData.count + " " + t("text.items_not_mapped")}
      </p>
      <div className="flex gap-x-5">
        <div
          className={`w-1/2 border p-5 shadow-md rounded-10 ${
            fileData.count ? "h-[750px]" : "h-auto"
          } `}
        >
          <p className="mb-2 font-semibold bg-blue-200 py-2 px-5 rounded">
            <div className="flex justify-between">
              <span>{t("text.temp_transactions")}</span>
              <span onClick={exportExcelHandler}>
                <SiMicrosoftexcel
                  className={`opacity-60 mt-0.5 ${
                    fileData.count && "cursor-pointer"
                  }`}
                  size={20}
                />
              </span>
            </div>
          </p>
          {isLoading ? (
            <BarLoader color="#3b88d1" className="mx-auto" />
          ) : (
            <TempTransaction data={fileData.count && fileData} />
          )}
        </div>
        <div className="w-1/2 flex flex-col gap-y-5">
          <div className="shadow-md rounded-10 p-5 border">
            <p className="mb-2 font-semibold bg-blue-200 py-2 px-5 rounded">
              {t("text.account_planning")}
            </p>
            {isLoading ? (
              <BarLoader color="#3b88d1" className="mx-auto" />
            ) : (
              <CompanyPlanningDetail
                data={planningData}
                codingIdHandler={codingIdHandler}
              />
            )}
          </div>
          <div className="shadow-md rounded-10 p-5 border">
            <p className="mb-2 font-semibold bg-blue-200 py-2 px-5 rounded">
              {t("text.maps")}
            </p>
            {isLoading ? (
              <BarLoader color="#3b88d1" className="mx-auto" />
            ) : (
              <CodeMapper id={codingId} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
