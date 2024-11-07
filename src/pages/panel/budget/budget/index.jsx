import { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Button, Spinner, Modal } from "../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getByIdCompanyBudget,
  getCompanyBudgets,
  editCompanyBudget,
} from "../../../../redux/actions/settings/company-budget";
import { getCompanyFinsmartCodingHeaders } from "../../../../redux/actions/settings/company-Finsmart-coding-header";
import { getFinsmartCodings } from "../../../../redux/actions/settings/Finsmart-coding";
import { getDataFromJwtToken } from "../../../../helpers/get-data-from-jwt";
import { exportToExcel } from "../../../../helpers/export-to-Excel";
import { LiaCheckCircle } from "react-icons/lia";
import { VscCollapseAll, VscExpandAll } from "react-icons/vsc";
import { FaRegSquarePlus } from "react-icons/fa6";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { FiMinusSquare } from "react-icons/fi";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { BiMessageDetail } from "react-icons/bi";
import { MdOutlinePostAdd } from "react-icons/md";
import { SlClose } from "react-icons/sl";
import { UploadBudgetFile } from "./upload";
import { ImportBudgetFile } from "./import";
// import { Tooltip } from "react-tooltip";

export const CompanyBudget = () => {
  // ---------- store ----------
  const {
    info: companyBudgetData,
    editInfo,
    loading,
  } = useSelector((state) => state.companyBudgetSlice);
  const companyHeaderData = useSelector(
    (state) => state.companyFinsmartCodingHeaderSlice.info
  );
  const planningDetailData = useSelector(
    (state) => state.FinsmartCodingSlice.info
  );
  const isLoading = useSelector((state) => state.loadingSlice.isLoading);

  // --------- states --------
  const [show, setShow] = useState({});
  const [pageNum, setPageNum] = useState(0);
  const [isActive, setIsActive] = useState({ parent: null, child: null });
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState();
  const [modalData, setModalData] = useState();
  const [progress, setProgress] = useState(0);
  const [shouldDownload, setShouldDownload] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formValue, setFormValue] = useState({
    companyBudgetId: 0,
    companyId: 0,
    year: 0,
    companyBudgetHeaderId: 0,
    finsmartCodingId: 0,
    jan: 0,
    feb: 0,
    mar: 0,
    apr: 0,
    may: 0,
    jun: 0,
    jul: 0,
    aug: 0,
    sep: 0,
    oct: 0,
    nov: 0,
    dec: 0,
  });

  // ---------- hooks ----------
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    state: { headerId },
  } = useLocation();

  // ---------- i18next ----------
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem("lng");

  //   ---------- variables ----------

  const actions = [
    {
      type: "edit",
      path: "",
    },
    {
      type: "detail",
      path: "",
    },
  ];

  //   ---------- lifecycle ----------
  useEffect(() => {
    dispatch(
      getCompanyBudgets({
        filters: [
          {
            property: "CompanyBudgetHeaderId",
            operation: 5,
            values: [`${headerId}`],
          },
        ],
        includeProperties: "FinsmartCoding",
      })
    );
  }, []);
  useEffect(() => {
    if (editInfo.data) {
      setFormValue({
        companyBudgetId: editInfo.data.companyBudgetId,
        companyId: editInfo.data.companyId,
        year: editInfo.data.year,
        companyBudgetHeaderId: editInfo.data.companyBudgetHeaderId,
        finsmartCodingId: editInfo.data.finsmartCodingId,
        jan: editInfo.data.jan,
        feb: editInfo.data.feb,
        mar: editInfo.data.mar,
        apr: editInfo.data.apr,
        may: editInfo.data.may,
        jun: editInfo.data.jun,
        jul: editInfo.data.jul,
        aug: editInfo.data.aug,
        sep: editInfo.data.sep,
        oct: editInfo.data.oct,
        nov: editInfo.data.nov,
        dec: editInfo.data.dec,
      });
    }
  }, [editInfo]);
  useEffect(() => {
    if (shouldDownload) {
      companyHeaderData.count
        ? dispatch(
            getFinsmartCodings({
              filters: [
                {
                  property: "FinsmartCodingHeaderId",
                  operation: 5,
                  values: [
                    `${companyHeaderData.data[0].finsmartCodingHeaderId}`,
                  ],
                },
              ],
            })
          )
        : alert("Company has no Finsmart headers!");
    }
  }, [companyHeaderData]);
  useEffect(() => {
    if (shouldDownload && planningDetailData.count) {
      const formattedData = planningDetailData.data?.map((data) => ({
        AccountCode: data.accountCode,
        AcoountName: data.accountName,
        Jan: "-",
        Feb: "-",
        Mar: "-",
        Apr: "-",
        May: "-",
        Jun: "-",
        Jul: "-",
        Aug: "-",
        Sep: "-",
        Oct: "-",
        Nov: "-",
        Dec: "-",
      }));
      exportToExcel(formattedData, "Sample");
    }
    return () => setShouldDownload(false);
  }, [planningDetailData]);

  // ----------- function ----------
  const reloadPageHandler = (status) => {
    if (status) {
      setOpenModal(false);
      setPageNum(0);
      dispatch(
        getCompanyBudgets({
          filters: [
            {
              property: "CompanyBudgetHeaderId",
              operation: 5,
              values: [`${headerId}`],
            },
          ],
          includeProperties: "FinsmartCoding",
        })
      );
    }
  };
  const openModalHandler = (modal, id) => {
    setOpenModal(true);
    setModalType(modal);
    setModalData(id);
  };
  const FinsmartHeaderHandler = () => {
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
    setShouldDownload(true);
  };
  const closeModalHandler = () => setOpenModal(false);
  const importTypeHandler = (type) => {
    type === "new" && setModalType("upload");
  };
  const collapseHandler = () => {
    setShow({});
  };
  const expandHandler = () => {
    const lists = companyBudgetData.data.map((data) => {
      return data.finsmartCodingId;
    });
    lists.map((list) => {
      setShow((prev) => ({ ...prev, [list]: true }));
    });
  };
  const planningDetailNewData = useMemo(() => {
    return (
      companyBudgetData.data &&
      companyBudgetData.data.map((detail) => {
        return {
          ...detail,
          inverseParent: companyBudgetData.data.filter((plan) => {
            return plan.finsmartCoding.parentId == detail.finsmartCodingId;
          }),
        };
      })
    );
  }, [companyBudgetData.data]);
  const renderInverseParent = (inverseParent) => {
    let mainInverseParent =
      inverseParent &&
      inverseParent.map((planningDetail) => {
        return {
          ...planningDetail,
          inverseParent: companyBudgetData.data.filter((detail) => {
            return (
              detail.finsmartCoding.parentId == planningDetail.finsmartCodingId
            );
          }),
          parent: companyBudgetData.data.filter((detail) => {
            return (
              detail.finsmartCodingId == planningDetail.finsmartCoding.parentId
            );
          })[0],
        };
      });

    return mainInverseParent.map((subDetail) => {
      return (
        <div className="flex" key={subDetail.finsmartCodingId}>
          {subDetail.inverseParent.length === 0 &&
            subDetail.parent.finsmartCoding.parentId > 0 && (
              <span
                className={`border-b-2 border-dotted -mt-4 w-7 h-10 shrink-0 ${
                  !subDetail.parent.finsmartCoding.parentId > 0
                    ? "-ml-2"
                    : "-ml-4"
                }`}
              ></span>
            )}
          <div className="w-full">
            <li
              className="w-full dark:text-dark_custom-full-white relative"
              key={subDetail.finsmartCodingId}
            >
              <div className="flex items-center text-sm xl:text-base py-2 pl-2 hover:bg-blue-50 dark:hover:bg-gray-700">
                <div
                  onClick={() => {
                    !subDetail.parent.finsmartCoding.parentId &&
                      setShow({
                        ...show,
                        [subDetail.finsmartCodingId]:
                          !show[subDetail.finsmartCodingId],
                      });
                    !subDetail.parent.finsmartCoding.parentId &&
                      setIsActive((prev) => ({
                        ...prev,
                        child: !isActive.child,
                      }));
                  }}
                  className={`flex items-center gap-x-2 w-full cursor-pointer`}
                >
                  {!subDetail.parent.finsmartCoding.parentId && (
                    <span className="bg-white dark:bg-custom-dark z-10">
                      {show[subDetail.finsmartCodingId] ? (
                        <FiMinusSquare size={15} />
                      ) : (
                        <FaRegSquarePlus size={15} />
                      )}
                    </span>
                  )}
                  <span
                    className={`flex-shrink-0 ${
                      !subDetail.parent.finsmartCoding.parentId
                        ? "w-[95px]"
                        : "w-[74px]"
                    }`}
                  >
                    {subDetail.finsmartCoding.accountCode}
                  </span>
                  <div
                    className={`w-[80px] lg:w-[150px] xl:w-[250px] flex-shrink-0`}
                    title={subDetail.finsmartCoding.accountName}
                  >
                    {subDetail.finsmartCoding.accountName.length > 20
                      ? subDetail.finsmartCoding.accountName.substring(0, 20) +
                        "..."
                      : subDetail.finsmartCoding.accountName}
                  </div>
                  {pageNum == 0 && (
                    <div className="flex w-[450px] justify-between ml-5">
                      <div className="w-[100%] text-center whitespace-nowrap">
                        {(editIndex !== subDetail.companyBudgetId ||
                          !isEditable) && (
                          <div className="dark:text-dark_custom-full-white">
                            {subDetail.jan}
                          </div>
                        )}
                        {isEditable &&
                          editIndex === subDetail.companyBudgetId && (
                            <input
                              type="text"
                              name="jan"
                              defaultValue={subDetail.jan}
                              className="rounded-md outline-none w-16 h-6 p-1 border-blue-200 border-2 focus:border-blue-400 dark:border-gray-600 dark:focus:border-gray-400 dark:bg-dark_custom-header-table-black dark:text-dark_custom-light-white"
                              onChange={(e) =>
                                setFormValue((prev) => ({
                                  ...prev,
                                  jan: e.target.value,
                                }))
                              }
                            />
                          )}
                      </div>
                      <div className="w-[100%] text-center whitespace-nowrap">
                        {(editIndex !== subDetail.companyBudgetId ||
                          !isEditable) && (
                          <div className="dark:text-dark_custom-full-white">
                            {subDetail.feb}
                          </div>
                        )}
                        {isEditable &&
                          editIndex === subDetail.companyBudgetId && (
                            <input
                              type="text"
                              name="feb"
                              defaultValue={subDetail.feb}
                              className="rounded-md outline-none w-16 h-6 p-1 border-blue-200 border-2 focus:border-blue-400 dark:border-gray-600 dark:focus:border-gray-400 dark:bg-dark_custom-header-table-black dark:text-dark_custom-light-white"
                              onChange={(e) =>
                                setFormValue((prev) => ({
                                  ...prev,
                                  feb: e.target.value,
                                }))
                              }
                            />
                          )}
                      </div>
                      <div className="w-[100%] text-center whitespace-nowrap">
                        {(editIndex !== subDetail.companyBudgetId ||
                          !isEditable) && (
                          <div className="dark:text-dark_custom-full-white">
                            {subDetail.mar}
                          </div>
                        )}
                        {isEditable &&
                          editIndex === subDetail.companyBudgetId && (
                            <input
                              type="text"
                              name="mar"
                              defaultValue={subDetail.mar}
                              className="rounded-md outline-none w-16 h-6 p-1 border-blue-200 border-2 focus:border-blue-400 dark:border-gray-600 dark:focus:border-gray-400 dark:bg-dark_custom-header-table-black dark:text-dark_custom-light-white"
                              onChange={(e) =>
                                setFormValue((prev) => ({
                                  ...prev,
                                  mar: e.target.value,
                                }))
                              }
                            />
                          )}
                      </div>
                    </div>
                  )}
                  {pageNum == 1 && (
                    <div className="flex w-[450px] justify-between ml-5">
                      <div className="w-[100%] text-center whitespace-nowrap">
                        {(editIndex !== subDetail.companyBudgetId ||
                          !isEditable) && (
                          <div className="dark:text-dark_custom-full-white">
                            {subDetail.apr}
                          </div>
                        )}
                        {isEditable &&
                          editIndex === subDetail.companyBudgetId && (
                            <input
                              type="text"
                              name="apr"
                              defaultValue={subDetail.apr}
                              className="rounded-md outline-none w-16 h-6 p-1 border-blue-200 border-2 focus:border-blue-400 dark:border-gray-600 dark:focus:border-gray-400 dark:bg-dark_custom-header-table-black dark:text-dark_custom-light-white"
                              onChange={(e) =>
                                setFormValue((prev) => ({
                                  ...prev,
                                  apr: e.target.value,
                                }))
                              }
                            />
                          )}
                      </div>
                      <div className="w-[100%] text-center whitespace-nowrap">
                        {(editIndex !== subDetail.companyBudgetId ||
                          !isEditable) && (
                          <div className="dark:text-dark_custom-full-white">
                            {subDetail.may}
                          </div>
                        )}
                        {isEditable &&
                          editIndex === subDetail.companyBudgetId && (
                            <input
                              type="text"
                              name="may"
                              defaultValue={subDetail.may}
                              className="rounded-md outline-none w-16 h-6 p-1 border-blue-200 border-2 focus:border-blue-400 dark:border-gray-600 dark:focus:border-gray-400 dark:bg-dark_custom-header-table-black dark:text-dark_custom-light-white"
                              onChange={(e) =>
                                setFormValue((prev) => ({
                                  ...prev,
                                  may: e.target.value,
                                }))
                              }
                            />
                          )}{" "}
                      </div>
                      <div className="w-[100%] text-center whitespace-nowrap">
                        {(editIndex !== subDetail.companyBudgetId ||
                          !isEditable) && (
                          <div className="dark:text-dark_custom-full-white">
                            {subDetail.jun}
                          </div>
                        )}
                        {isEditable &&
                          editIndex === subDetail.companyBudgetId && (
                            <input
                              type="text"
                              name="jun"
                              defaultValue={subDetail.jun}
                              className="rounded-md outline-none w-16 h-6 p-1 border-blue-200 border-2 focus:border-blue-400 dark:border-gray-600 dark:focus:border-gray-400 dark:bg-dark_custom-header-table-black dark:text-dark_custom-light-white"
                              onChange={(e) =>
                                setFormValue((prev) => ({
                                  ...prev,
                                  jun: e.target.value,
                                }))
                              }
                            />
                          )}{" "}
                      </div>
                    </div>
                  )}
                  {pageNum == 2 && (
                    <div className="flex w-[450px] justify-between ml-5">
                      <div className="w-[100%] text-center whitespace-nowrap">
                        {(editIndex !== subDetail.companyBudgetId ||
                          !isEditable) && (
                          <div className="dark:text-dark_custom-full-white">
                            {subDetail.jul}
                          </div>
                        )}
                        {isEditable &&
                          editIndex === subDetail.companyBudgetId && (
                            <input
                              type="text"
                              name="jul"
                              defaultValue={subDetail.jul}
                              className="rounded-md outline-none w-16 h-6 p-1 border-blue-200 border-2 focus:border-blue-400 dark:border-gray-600 dark:focus:border-gray-400 dark:bg-dark_custom-header-table-black dark:text-dark_custom-light-white"
                              onChange={(e) =>
                                setFormValue((prev) => ({
                                  ...prev,
                                  jul: e.target.value,
                                }))
                              }
                            />
                          )}{" "}
                      </div>
                      <div className="w-[100%] text-center whitespace-nowrap">
                        {(editIndex !== subDetail.companyBudgetId ||
                          !isEditable) && (
                          <div className="dark:text-dark_custom-full-white">
                            {subDetail.aug}
                          </div>
                        )}
                        {isEditable &&
                          editIndex === subDetail.companyBudgetId && (
                            <input
                              type="text"
                              name="aug"
                              defaultValue={subDetail.aug}
                              className="rounded-md outline-none w-16 h-6 p-1 border-blue-200 border-2 focus:border-blue-400 dark:border-gray-600 dark:focus:border-gray-400 dark:bg-dark_custom-header-table-black dark:text-dark_custom-light-white"
                              onChange={(e) =>
                                setFormValue((prev) => ({
                                  ...prev,
                                  aug: e.target.value,
                                }))
                              }
                            />
                          )}{" "}
                      </div>
                      <div className="w-[100%] text-center whitespace-nowrap">
                        {(editIndex !== subDetail.companyBudgetId ||
                          !isEditable) && (
                          <div className="dark:text-dark_custom-full-white">
                            {subDetail.sep}
                          </div>
                        )}
                        {isEditable &&
                          editIndex === subDetail.companyBudgetId && (
                            <input
                              type="text"
                              name="sep"
                              defaultValue={subDetail.sep}
                              className="rounded-md outline-none w-16 h-6 p-1 border-blue-200 border-2 focus:border-blue-400 dark:border-gray-600 dark:focus:border-gray-400 dark:bg-dark_custom-header-table-black dark:text-dark_custom-light-white"
                              onChange={(e) =>
                                setFormValue((prev) => ({
                                  ...prev,
                                  sep: e.target.value,
                                }))
                              }
                            />
                          )}{" "}
                      </div>
                    </div>
                  )}
                  {pageNum == 3 && (
                    <div className="flex w-[450px] justify-between ml-5">
                      <div className="w-[100%] text-center whitespace-nowrap">
                        {(editIndex !== subDetail.companyBudgetId ||
                          !isEditable) && (
                          <div className="dark:text-dark_custom-full-white">
                            {subDetail.oct}
                          </div>
                        )}
                        {isEditable &&
                          editIndex === subDetail.companyBudgetId && (
                            <input
                              type="text"
                              name="oct"
                              defaultValue={subDetail.oct}
                              className="rounded-md outline-none w-16 h-6 p-1 border-blue-200 border-2 focus:border-blue-400 dark:border-gray-600 dark:focus:border-gray-400 dark:bg-dark_custom-header-table-black dark:text-dark_custom-light-white"
                              onChange={(e) =>
                                setFormValue((prev) => ({
                                  ...prev,
                                  oct: e.target.value,
                                }))
                              }
                            />
                          )}{" "}
                      </div>
                      <div className="w-[100%] text-center whitespace-nowrap">
                        {(editIndex !== subDetail.companyBudgetId ||
                          !isEditable) && (
                          <div className="dark:text-dark_custom-full-white">
                            {subDetail.nov}
                          </div>
                        )}
                        {isEditable &&
                          editIndex === subDetail.companyBudgetId && (
                            <input
                              type="text"
                              name="nov"
                              defaultValue={subDetail.nov}
                              className="rounded-md outline-none w-16 h-6 p-1 border-blue-200 border-2 focus:border-blue-400 dark:border-gray-600 dark:focus:border-gray-400 dark:bg-dark_custom-header-table-black dark:text-dark_custom-light-white"
                              onChange={(e) =>
                                setFormValue((prev) => ({
                                  ...prev,
                                  nov: e.target.value,
                                }))
                              }
                            />
                          )}{" "}
                      </div>
                      <div className="w-[100%] text-center whitespace-nowrap">
                        {(editIndex !== subDetail.companyBudgetId ||
                          !isEditable) && (
                          <div className="dark:text-dark_custom-full-white">
                            {subDetail.dec}
                          </div>
                        )}
                        {isEditable &&
                          editIndex === subDetail.companyBudgetId && (
                            <input
                              type="text"
                              name="dec"
                              defaultValue={subDetail.dec}
                              className="rounded-md outline-none w-16 h-6 p-1 border-blue-200 border-2 focus:border-blue-400 dark:border-gray-600 dark:focus:border-gray-400 dark:bg-dark_custom-header-table-black dark:text-dark_custom-light-white"
                              onChange={(e) =>
                                setFormValue((prev) => ({
                                  ...prev,
                                  dec: e.target.value,
                                }))
                              }
                            />
                          )}{" "}
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className={`xl:hidden relative flex xl:px-2 items-center gap-x-1 group cursor-pointer`}
                >
                  {subDetail.finsmartCoding.budgetType >= 2 &&
                    subDetail.finsmartCoding.budgetType <= 4 &&
                    !isEditable && <PiDotsThreeOutlineFill color="gray" />}
                  {isEditable && editIndex === subDetail.companyBudgetId && (
                    <div className="flex gap-x-1">
                      <button
                        onClick={() => {
                          dispatch(
                            editCompanyBudget(
                              subDetail.companyBudgetId,
                              formValue,
                              (status) => reloadPageHandler(status)
                            )
                          );
                          setIsEditable(false);
                        }}
                      >
                        <LiaCheckCircle
                          color="green"
                          className="text-lg md:text-21"
                        />
                      </button>
                      <button
                        onClick={() => {
                          setIsEditable(false);
                        }}
                      >
                        <SlClose color="red" className="text-md md:text-lg" />
                      </button>
                    </div>
                  )}
                  {!isEditable && (
                    <span className="absolute top-3 -left-6 sm:-left-4 border rounded-10 bg-white z-20 shadow-sm opacity-0 invisible p-1 transition-opacity duration-400 group-hover:opacity-100 group-hover:visible flex flex-col gap-1">
                      {actions.map((action) => (
                        <>
                          {action.type === "edit" &&
                            subDetail.finsmartCoding.budgetType >= 2 &&
                            subDetail.finsmartCoding.budgetType <= 4 && (
                              <div
                                className="xl:w-7 xl:h-7 lg:w-6 lg:h-6 w-5 h-5 p-0.5 rounded-md bg-custom-gray flex items-center justify-center cursor-pointer"
                                onClick={() => {
                                  setEditIndex(subDetail.companyBudgetId);
                                  setIsEditable(true);
                                  dispatch(
                                    getByIdCompanyBudget(
                                      subDetail.companyBudgetId
                                    )
                                  );
                                }}
                              >
                                <svg
                                  width="19"
                                  height="19"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    opacity="0.4"
                                    d="M14.2667 5.56754L12.8334 7.00754L8.99337 3.16754L10.4334 1.73421C10.5577 1.60516 10.7069 1.50252 10.8718 1.43241C11.0368 1.36231 11.2141 1.32617 11.3934 1.32617C11.5726 1.32617 11.75 1.36231 11.9149 1.43241C12.0799 1.50252 12.229 1.60516 12.3534 1.73421L14.2667 3.64754C14.3957 3.77192 14.4984 3.92104 14.5685 4.08598C14.6386 4.25093 14.6747 4.42831 14.6747 4.60754C14.6747 4.78677 14.6386 4.96415 14.5685 5.1291C14.4984 5.29404 14.3957 5.44316 14.2667 5.56754ZM2.46003 14.6209L6.59337 13.2475L2.75337 9.40754L1.38003 13.5409C1.3297 13.6913 1.32229 13.8528 1.35865 14.0072C1.39501 14.1616 1.4737 14.3029 1.58587 14.415C1.69805 14.5272 1.83927 14.6059 1.99368 14.6423C2.1481 14.6786 2.30959 14.6712 2.46003 14.6209Z"
                                    fill="#A1A5B7"
                                  />
                                  <path
                                    d="M3.71337 14.2013L2.46003 14.6213C2.30959 14.6716 2.1481 14.679 1.99368 14.6427C1.83927 14.6063 1.69805 14.5276 1.58587 14.4155C1.4737 14.3033 1.39501 14.1621 1.35865 14.0077C1.32229 13.8532 1.3297 13.6917 1.38003 13.5413L1.80003 12.288L3.71337 14.2013ZM2.75337 9.40797L6.59337 13.248L12.8334 7.00797L8.99337 3.16797L2.75337 9.40797Z"
                                    fill="#A1A5B7"
                                  />
                                </svg>
                              </div>
                            )}
                          {action.type === "detail" &&
                            subDetail.finsmartCoding.budgetType >= 2 &&
                            subDetail.finsmartCoding.budgetType <= 4 && (
                              <div
                                className="xl:w-7 xl:h-7 lg:w-6 lg:h-6 w-5 h-5 p-0.5 rounded-md bg-custom-gray flex items-center justify-center cursor-pointer"
                                onClick={() => {
                                  navigate("/budget/details/info", {
                                    state: {
                                      companyBudgetId:
                                        subDetail.companyBudgetId,
                                      budgetType:
                                        subDetail.finsmartCoding.budgetType,
                                    },
                                  });
                                }}
                              >
                                <MdOutlinePostAdd
                                  color="gray"
                                  // data-tooltip-id="detail"
                                  className="outline-none"
                                />
                                {/* <Tooltip id="detail">
                                  {t("tooltip.add_detail")}
                                </Tooltip> */}
                              </div>
                            )}
                        </>
                      ))}
                    </span>
                  )}
                </div>
                <div className={`hidden xl:flex items-center gap-x-1`}>
                  {isEditable && editIndex === subDetail.companyBudgetId && (
                    <div className="flex gap-x-1">
                      <button
                        onClick={() => {
                          dispatch(
                            editCompanyBudget(
                              subDetail.companyBudgetId,
                              formValue,
                              (status) => reloadPageHandler(status)
                            )
                          );
                          setIsEditable(false);
                        }}
                      >
                        <LiaCheckCircle color="green" size={32} />
                      </button>
                      <button
                        onClick={() => {
                          setIsEditable(false);
                        }}
                      >
                        <SlClose color="red" size={26} />
                      </button>
                    </div>
                  )}
                  {!isEditable &&
                    actions.map((action) => (
                      <>
                        {action.type === "edit" &&
                          subDetail.finsmartCoding.budgetType >= 2 &&
                          subDetail.finsmartCoding.budgetType <= 4 && (
                            <div
                              className="xl:w-7 xl:h-7 lg:w-6 lg:h-6 w-5 h-5 p-0.5 rounded-md bg-custom-gray flex items-center justify-center cursor-pointer"
                              onClick={() => {
                                setEditIndex(subDetail.companyBudgetId);
                                setIsEditable(true);
                                dispatch(
                                  getByIdCompanyBudget(
                                    subDetail.companyBudgetId
                                  )
                                );
                              }}
                            >
                              <svg
                                width="19"
                                height="19"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  opacity="0.4"
                                  d="M14.2667 5.56754L12.8334 7.00754L8.99337 3.16754L10.4334 1.73421C10.5577 1.60516 10.7069 1.50252 10.8718 1.43241C11.0368 1.36231 11.2141 1.32617 11.3934 1.32617C11.5726 1.32617 11.75 1.36231 11.9149 1.43241C12.0799 1.50252 12.229 1.60516 12.3534 1.73421L14.2667 3.64754C14.3957 3.77192 14.4984 3.92104 14.5685 4.08598C14.6386 4.25093 14.6747 4.42831 14.6747 4.60754C14.6747 4.78677 14.6386 4.96415 14.5685 5.1291C14.4984 5.29404 14.3957 5.44316 14.2667 5.56754ZM2.46003 14.6209L6.59337 13.2475L2.75337 9.40754L1.38003 13.5409C1.3297 13.6913 1.32229 13.8528 1.35865 14.0072C1.39501 14.1616 1.4737 14.3029 1.58587 14.415C1.69805 14.5272 1.83927 14.6059 1.99368 14.6423C2.1481 14.6786 2.30959 14.6712 2.46003 14.6209Z"
                                  fill="#A1A5B7"
                                />
                                <path
                                  d="M3.71337 14.2013L2.46003 14.6213C2.30959 14.6716 2.1481 14.679 1.99368 14.6427C1.83927 14.6063 1.69805 14.5276 1.58587 14.4155C1.4737 14.3033 1.39501 14.1621 1.35865 14.0077C1.32229 13.8532 1.3297 13.6917 1.38003 13.5413L1.80003 12.288L3.71337 14.2013ZM2.75337 9.40797L6.59337 13.248L12.8334 7.00797L8.99337 3.16797L2.75337 9.40797Z"
                                  fill="#A1A5B7"
                                />
                              </svg>
                            </div>
                          )}
                        {action.type === "detail" &&
                          subDetail.finsmartCoding.budgetType >= 2 &&
                          subDetail.finsmartCoding.budgetType <= 4 && (
                            <div
                              className="xl:w-7 xl:h-7 lg:w-6 lg:h-6 w-5 h-5 p-0.5 rounded-md bg-custom-gray flex items-center justify-center cursor-pointer"
                              onClick={() => {
                                navigate("/budget/details/info", {
                                  state: {
                                    companyBudgetId: subDetail.companyBudgetId,
                                    budgetType:
                                      subDetail.finsmartCoding.budgetType,
                                  },
                                });
                              }}
                            >
                              <MdOutlinePostAdd
                                color="gray"
                                // data-tooltip-id="detail"
                                className="outline-none"
                              />
                              {/* <Tooltip id="detail">
                                {t("tooltip.add_detail")}
                              </Tooltip> */}
                            </div>
                          )}
                      </>
                    ))}
                </div>
              </div>
              <hr
                className={`${
                  subDetail.inverseParent.length ? "ml-8" : "ml-2"
                }`}
              />
              {!!subDetail.inverseParent.length && (
                <>
                  {/* {parentsCount(planningDetailData) !== index + 1 && (
                    <span className="border-l-2 border-dotted h-[calc(100%+30px)] -left-7 absolute -top-4">q</span>
                  )} */}
                  <div
                    className={`ml-8 relative ${
                      show && show[subDetail.finsmartCodingId]
                        ? "block"
                        : "hidden"
                    }`}
                  >
                    {subDetail.inverseParent.length > 0 && (
                      <span className="absolute border-dotted border-l-2 h-full top-[-20px] left-[-17px] z-0 last:hidden"></span>
                    )}
                    <ul className="flex flex-col relative">
                      {renderInverseParent(subDetail.inverseParent)}
                    </ul>
                  </div>
                </>
              )}
            </li>
          </div>
        </div>
      );
    });
  };

  //   ----------render jsx----------
  return (
    <>
      {modalType === "upload" && (
        <Modal state={openModal} onCloseModal={closeModalHandler}>
          <UploadBudgetFile
            headerId={headerId}
            onCloseModal={closeModalHandler}
            isReloadPage={() => reloadPageHandler((currState) => !currState)}
          />
        </Modal>
      )}
      {modalType === "import" && (
        <Modal state={openModal} onCloseModal={closeModalHandler} small>
          <ImportBudgetFile
            onCloseModal={closeModalHandler}
            importTypeHandler={importTypeHandler}
          />
        </Modal>
      )}
      <div className="dark:bg-dark_custom-light-black rounded-10 overflow-hidden">
        <div className="flex flex-col gap-y-6 w-full p-6 pb-4 bg-white dark:bg-dark_custom-light-black">
          <div className="w-full flex justify-between items-center dark:bg-dark_custom-light-black">
            <div className="flex flex-col gap-y-1">
              <h4 className="text-19 text-custom-dark font-bold dark:text-dark_custom-full-white">
                {t("page_title.company_budget")}
              </h4>
              <span className="text-14 flex gap-x-2 text-custom-gray-muted dark:text-dark_custom-light-white">
                {t("text.dashboard")} - {t("page_title.budget")} -{" "}
                {t("page_title.company_budget")}
              </span>
            </div>
            {isLoading && (
              <span className="animate-pulse bg-custom-blue p-2 px-4 rounded-md text-white">
                {t("text.please_wait")}
              </span>
            )}
            {progress > 0 && progress < 100 && (
              <progress value={progress} max={100}></progress>
            )}
            <div className="flex gap-x-2">
              <Button
                title={t("button.download_sample_file")}
                theme="light"
                onClick={FinsmartHeaderHandler}
              />
              <Button
                title={t("button.import_title")}
                onClick={() => openModalHandler("import")}
              />
            </div>
          </div>
          {loading && <Spinner />}
          {companyBudgetData.count > 0 ? (
            <div className="flex border-b-2 text-sm xl:text-base border-custom-gray mt-5 -ml-1 pb-5 font-semibold dark:text-dark_custom-full-white">
              <div className="mt-1 flex">
                <span className="cursor-pointer" onClick={collapseHandler}>
                  <VscExpandAll
                    size={20}
                    title="Collapse all"
                    color="#3b88d1"
                  />
                </span>
                <span className="cursor-pointer" onClick={expandHandler}>
                  <VscCollapseAll
                    size={20}
                    title="Expand all"
                    color="#3b88d1"
                  />
                </span>
              </div>
              <span className="w-[130px] select-none flex-shrink-0 whitespace-nowrap">
                {t("table.col.account_code")}
              </span>
              <span className="w-[80px] lg:w-[150px] xl:w-[250px] select-none flex-shrink-0 whitespace-nowrap">
                {t("table.col.account_name")}
              </span>
              {/* <span className="w-[320px]">{t("table.col.budget_type")}</span> */}
              {/*<span className="w-[320px]">{t("table.col.action")}</span> */}
              <GoChevronLeft
                size={20}
                color="gray"
                className={`w-6 h-6 rounded-full ${
                  pageNum == 0
                    ? "cursor-default opacity-30"
                    : "hover:bg-gray-100 cursor-pointer"
                }`}
                onClick={() => pageNum > 0 && setPageNum((num) => num - 1)}
              />
              {pageNum == 0 && (
                <div className="w-[450px] flex select-none justify-between">
                  <span className="w-[100%] text-center whitespace-nowrap">
                    {t("table.col.jan")}
                  </span>
                  <span className="w-[100%] text-center whitespace-nowrap">
                    {t("table.col.feb")}
                  </span>
                  <span className="w-[100%] text-center whitespace-nowrap">
                    {t("table.col.mar")}
                  </span>
                </div>
              )}
              {pageNum == 1 && (
                <div className="w-[450px] flex select-none justify-between">
                  <span className="w-[100%] text-center whitespace-nowrap">
                    {t("table.col.apr")}
                  </span>
                  <span className="w-[100%] text-center whitespace-nowrap">
                    {t("table.col.may")}
                  </span>
                  <span className="w-[100%] text-center whitespace-nowrap">
                    {t("table.col.jun")}
                  </span>
                </div>
              )}
              {pageNum == 2 && (
                <div className="w-[450px] flex select-none justify-between">
                  <span className="w-[100%] text-center whitespace-nowrap">
                    {t("table.col.jul")}
                  </span>
                  <span className="w-[100%] text-center whitespace-nowrap">
                    {t("table.col.aug")}
                  </span>
                  <span className="w-[100%] text-center whitespace-nowrap">
                    {t("table.col.sep")}
                  </span>
                </div>
              )}
              {pageNum == 3 && (
                <div className="w-[450px] flex select-none justify-between">
                  <span className="w-[100%] text-center whitespace-nowrap">
                    {t("table.col.oct")}
                  </span>
                  <span className="w-[100%] text-center whitespace-nowrap">
                    {t("table.col.nov")}
                  </span>
                  <span className="w-[100%] text-center whitespace-nowrap">
                    {t("table.col.dec")}
                  </span>
                </div>
              )}
              <GoChevronRight
                size={20}
                color="gray"
                className={`w-6 h-6 rounded-full ${
                  pageNum == 3
                    ? "cursor-default opacity-30"
                    : "hover:bg-gray-100 cursor-pointer"
                }`}
                onClick={() => pageNum < 3 && setPageNum((num) => num + 1)}
              />
            </div>
          ) : !companyBudgetData ? (
            <div className="text-center text-custom-blue">
              {t("text.no_data")}
            </div>
          ) : null}
          <ul className="flex flex-col overflow-hidden overflow-y-scroll pr-1 h-[700px]">
            {companyBudgetData.count
              ? planningDetailNewData.map(
                  (planningDetail) =>
                    !planningDetail.finsmartCoding.parentId && (
                      <li key={planningDetail.finsmartCodingId}>
                        <div className="flex items-center hover:bg-blue-50 dark:hover:bg-gray-700">
                          <div
                            className="w-full text-sm xl:text-base p-2 flex items-center gap-x-2 cursor-pointer dark:text-dark_custom-full-white"
                            onClick={() => {
                              setShow({
                                ...show,
                                [planningDetail.finsmartCodingId]:
                                  !show[planningDetail.finsmartCodingId],
                              });
                              setIsActive((prev) => ({
                                ...prev,
                                parent: !isActive.parent,
                              }));
                            }}
                          >
                            <span className="ml-2 bg-white dark:bg-custom-dark">
                              {show[planningDetail.finsmartCodingId] ? (
                                <FiMinusSquare size={15} />
                              ) : (
                                <FaRegSquarePlus size={15} />
                              )}
                            </span>
                            <span className="w-[120px] flex-shrink-0">
                              {planningDetail.finsmartCoding.accountCode}
                            </span>
                            <div
                              className="w-[80px] lg:w-[150px] xl:w-[250px] text-sm xl:text-base whitespace-nowrap overflow-hidden flex-shrink-0"
                              title={planningDetail.finsmartCoding.accountName}
                            >
                              {planningDetail.finsmartCoding.accountName
                                .length > 20
                                ? planningDetail.finsmartCoding.accountName.substring(
                                    0,
                                    20
                                  ) + "..."
                                : planningDetail.finsmartCoding.accountName}
                            </div>

                            {pageNum == 0 && (
                              <div className="flex w-[450px] justify-between ml-5">
                                <div className="w-[100%] text-center duration-1000 whitespace-nowrap">
                                  {(editIndex !==
                                    planningDetail.companyBudgetId ||
                                    !isEditable) && (
                                    <div className="dark:text-dark_custom-full-white">
                                      {planningDetail.jan}
                                    </div>
                                  )}
                                  {isEditable &&
                                    editIndex ===
                                      planningDetail.companyBudgetId && (
                                      <input
                                        type="text"
                                        name="jan"
                                        defaultValue={planningDetail.jan}
                                        className="rounded-md outline-none w-16 h-6 p-1 border-blue-200 border-2 focus:border-blue-400 dark:border-gray-600 dark:focus:border-gray-400 dark:bg-dark_custom-header-table-black dark:text-dark_custom-light-white"
                                        onChange={(e) =>
                                          setFormValue((prev) => ({
                                            ...prev,
                                            jan: e.target.value,
                                          }))
                                        }
                                      />
                                    )}
                                </div>
                                <div className="w-[100%] text-center whitespace-nowrap">
                                  {(editIndex !==
                                    planningDetail.companyBudgetId ||
                                    !isEditable) && (
                                    <div className="dark:text-dark_custom-full-white">
                                      {planningDetail.feb}
                                    </div>
                                  )}
                                  {isEditable &&
                                    editIndex ===
                                      planningDetail.companyBudgetId && (
                                      <input
                                        type="text"
                                        name="feb"
                                        defaultValue={planningDetail.feb}
                                        className="rounded-md outline-none w-16 h-6 p-1 border-blue-200 border-2 focus:border-blue-400 dark:border-gray-600 dark:focus:border-gray-400 dark:bg-dark_custom-header-table-black dark:text-dark_custom-light-white"
                                        onChange={(e) =>
                                          setFormValue((prev) => ({
                                            ...prev,
                                            feb: e.target.value,
                                          }))
                                        }
                                      />
                                    )}{" "}
                                </div>
                                <div className="w-[100%] text-center whitespace-nowrap">
                                  {(editIndex !==
                                    planningDetail.companyBudgetId ||
                                    !isEditable) && (
                                    <div className="dark:text-dark_custom-full-white">
                                      {planningDetail.mar}
                                    </div>
                                  )}
                                  {isEditable &&
                                    editIndex ===
                                      planningDetail.companyBudgetId && (
                                      <input
                                        type="text"
                                        name="mar"
                                        defaultValue={planningDetail.mar}
                                        className="rounded-md outline-none w-16 h-6 p-1 border-blue-200 border-2 focus:border-blue-400 dark:border-gray-600 dark:focus:border-gray-400 dark:bg-dark_custom-header-table-black dark:text-dark_custom-light-white"
                                        onChange={(e) =>
                                          setFormValue((prev) => ({
                                            ...prev,
                                            mar: e.target.value,
                                          }))
                                        }
                                      />
                                    )}{" "}
                                </div>
                              </div>
                            )}
                            {pageNum == 1 && (
                              <div className="flex w-[450px] justify-between ml-5">
                                <div className="w-[100%] text-center whitespace-nowrap">
                                  {(editIndex !==
                                    planningDetail.companyBudgetId ||
                                    !isEditable) && (
                                    <div className="dark:text-dark_custom-full-white">
                                      {planningDetail.apr}
                                    </div>
                                  )}
                                  {isEditable &&
                                    editIndex ===
                                      planningDetail.companyBudgetId && (
                                      <input
                                        type="text"
                                        name="apr"
                                        defaultValue={planningDetail.apr}
                                        className="rounded-md outline-none w-16 h-6 p-1 border-blue-200 border-2 focus:border-blue-400 dark:border-gray-600 dark:focus:border-gray-400 dark:bg-dark_custom-header-table-black dark:text-dark_custom-light-white"
                                        onChange={(e) =>
                                          setFormValue((prev) => ({
                                            ...prev,
                                            apr: e.target.value,
                                          }))
                                        }
                                      />
                                    )}{" "}
                                </div>
                                <div className="w-[100%] text-center whitespace-nowrap">
                                  {(editIndex !==
                                    planningDetail.companyBudgetId ||
                                    !isEditable) && (
                                    <div className="dark:text-dark_custom-full-white">
                                      {planningDetail.may}
                                    </div>
                                  )}
                                  {isEditable &&
                                    editIndex ===
                                      planningDetail.companyBudgetId && (
                                      <input
                                        type="text"
                                        name="may"
                                        defaultValue={planningDetail.may}
                                        className="rounded-md outline-none w-16 h-6 p-1 border-blue-200 border-2 focus:border-blue-400 dark:border-gray-600 dark:focus:border-gray-400 dark:bg-dark_custom-header-table-black dark:text-dark_custom-light-white"
                                        onChange={(e) =>
                                          setFormValue((prev) => ({
                                            ...prev,
                                            may: e.target.value,
                                          }))
                                        }
                                      />
                                    )}{" "}
                                </div>
                                <div className="w-[100%] text-center whitespace-nowrap">
                                  {(editIndex !==
                                    planningDetail.companyBudgetId ||
                                    !isEditable) && (
                                    <div className="dark:text-dark_custom-full-white">
                                      {planningDetail.jun}
                                    </div>
                                  )}
                                  {isEditable &&
                                    editIndex ===
                                      planningDetail.companyBudgetId && (
                                      <input
                                        type="text"
                                        name="jun"
                                        defaultValue={planningDetail.jun}
                                        className="rounded-md outline-none w-16 h-6 p-1 border-blue-200 border-2 focus:border-blue-400 dark:border-gray-600 dark:focus:border-gray-400 dark:bg-dark_custom-header-table-black dark:text-dark_custom-light-white"
                                        onChange={(e) =>
                                          setFormValue((prev) => ({
                                            ...prev,
                                            jun: e.target.value,
                                          }))
                                        }
                                      />
                                    )}{" "}
                                </div>
                              </div>
                            )}
                            {pageNum == 2 && (
                              <div className="flex w-[450px] justify-between ml-5">
                                <div className="w-[100%] text-center whitespace-nowrap">
                                  {(editIndex !==
                                    planningDetail.companyBudgetId ||
                                    !isEditable) && (
                                    <div className="dark:text-dark_custom-full-white">
                                      {planningDetail.jul}
                                    </div>
                                  )}
                                  {isEditable &&
                                    editIndex ===
                                      planningDetail.companyBudgetId && (
                                      <input
                                        type="text"
                                        name="jul"
                                        defaultValue={planningDetail.jul}
                                        className="rounded-md outline-none w-16 h-6 p-1 border-blue-200 border-2 focus:border-blue-400 dark:border-gray-600 dark:focus:border-gray-400 dark:bg-dark_custom-header-table-black dark:text-dark_custom-light-white"
                                        onChange={(e) =>
                                          setFormValue((prev) => ({
                                            ...prev,
                                            jul: e.target.value,
                                          }))
                                        }
                                      />
                                    )}{" "}
                                </div>
                                <div className="w-[100%] text-center whitespace-nowrap">
                                  {(editIndex !==
                                    planningDetail.companyBudgetId ||
                                    !isEditable) && (
                                    <div className="dark:text-dark_custom-full-white">
                                      {planningDetail.aug}
                                    </div>
                                  )}
                                  {isEditable &&
                                    editIndex ===
                                      planningDetail.companyBudgetId && (
                                      <input
                                        type="text"
                                        name="aug"
                                        defaultValue={planningDetail.aug}
                                        className="rounded-md outline-none w-16 h-6 p-1 border-blue-200 border-2 focus:border-blue-400 dark:border-gray-600 dark:focus:border-gray-400 dark:bg-dark_custom-header-table-black dark:text-dark_custom-light-white"
                                        onChange={(e) =>
                                          setFormValue((prev) => ({
                                            ...prev,
                                            aug: e.target.value,
                                          }))
                                        }
                                      />
                                    )}{" "}
                                </div>
                                <div className="w-[100%] text-center whitespace-nowrap">
                                  {(editIndex !==
                                    planningDetail.companyBudgetId ||
                                    !isEditable) && (
                                    <div className="dark:text-dark_custom-full-white">
                                      {planningDetail.sep}
                                    </div>
                                  )}
                                  {isEditable &&
                                    editIndex ===
                                      planningDetail.companyBudgetId && (
                                      <input
                                        type="text"
                                        name="sep"
                                        defaultValue={planningDetail.sep}
                                        className="rounded-md outline-none w-16 h-6 p-1 border-blue-200 border-2 focus:border-blue-400 dark:border-gray-600 dark:focus:border-gray-400 dark:bg-dark_custom-header-table-black dark:text-dark_custom-light-white"
                                        onChange={(e) =>
                                          setFormValue((prev) => ({
                                            ...prev,
                                            sep: e.target.value,
                                          }))
                                        }
                                      />
                                    )}{" "}
                                </div>
                              </div>
                            )}
                            {pageNum == 3 && (
                              <div className="flex w-[450px] justify-between ml-5">
                                <div className="w-[100%] text-center whitespace-nowrap">
                                  {(editIndex !==
                                    planningDetail.companyBudgetId ||
                                    !isEditable) && (
                                    <div className="dark:text-dark_custom-full-white">
                                      {planningDetail.oct}
                                    </div>
                                  )}
                                  {isEditable &&
                                    editIndex ===
                                      planningDetail.companyBudgetId && (
                                      <input
                                        type="text"
                                        name="oct"
                                        defaultValue={planningDetail.oct}
                                        className="rounded-md outline-none w-16 h-6 p-1 border-blue-200 border-2 focus:border-blue-400 dark:border-gray-600 dark:focus:border-gray-400 dark:bg-dark_custom-header-table-black dark:text-dark_custom-light-white"
                                        onChange={(e) =>
                                          setFormValue((prev) => ({
                                            ...prev,
                                            oct: e.target.value,
                                          }))
                                        }
                                      />
                                    )}{" "}
                                </div>
                                <div className="w-[100%] text-center whitespace-nowrap">
                                  {(editIndex !==
                                    planningDetail.companyBudgetId ||
                                    !isEditable) && (
                                    <div className="dark:text-dark_custom-full-white">
                                      {planningDetail.nov}
                                    </div>
                                  )}
                                  {isEditable &&
                                    editIndex ===
                                      planningDetail.companyBudgetId && (
                                      <input
                                        type="text"
                                        name="nov"
                                        defaultValue={planningDetail.nov}
                                        className="rounded-md outline-none w-16 h-6 p-1 border-blue-200 border-2 focus:border-blue-400 dark:border-gray-600 dark:focus:border-gray-400 dark:bg-dark_custom-header-table-black dark:text-dark_custom-light-white"
                                        onChange={(e) =>
                                          setFormValue((prev) => ({
                                            ...prev,
                                            nov: e.target.value,
                                          }))
                                        }
                                      />
                                    )}{" "}
                                </div>
                                <div className="w-[100%] text-center whitespace-nowrap">
                                  {(editIndex !==
                                    planningDetail.companyBudgetId ||
                                    !isEditable) && (
                                    <div className="dark:text-dark_custom-full-white">
                                      {planningDetail.dec}
                                    </div>
                                  )}
                                  {isEditable &&
                                    editIndex ===
                                      planningDetail.companyBudgetId && (
                                      <input
                                        type="text"
                                        name="dec"
                                        defaultValue={planningDetail.dec}
                                        className="rounded-md outline-none w-16 h-6 p-1 border-blue-200 border-2 focus:border-blue-400 dark:border-gray-600 dark:focus:border-gray-400 dark:bg-dark_custom-header-table-black dark:text-dark_custom-light-white"
                                        onChange={(e) =>
                                          setFormValue((prev) => ({
                                            ...prev,
                                            dec: e.target.value,
                                          }))
                                        }
                                      />
                                    )}{" "}
                                </div>
                              </div>
                            )}

                            {/* <div className="w-[300px]">-</div> */}
                          </div>
                          <div
                            className={`xl:hidden relative flex xl:px-2 items-center gap-x-1 group cursor-pointer`}
                          >
                            {planningDetail.finsmartCoding.budgetType >= 2 &&
                              planningDetail.finsmartCoding.budgetType <= 4 &&
                              !isEditable && (
                                <PiDotsThreeOutlineFill color="gray" />
                              )}
                          </div>
                          <div className="hidden xl:flex items-center gap-x-2">
                            {isEditable &&
                              editIndex === planningDetail.companyBudgetId && (
                                <div className="flex gap-x-1">
                                  <button
                                    onClick={() => {
                                      dispatch(
                                        editCompanyBudget(
                                          planningDetail.companyBudgetId,
                                          formValue,
                                          (status) => reloadPageHandler(status)
                                        )
                                      );
                                      setIsEditable(false);
                                    }}
                                  >
                                    <LiaCheckCircle color="green" size={32} />
                                  </button>
                                  <button
                                    onClick={() => {
                                      setIsEditable(false);
                                    }}
                                  >
                                    <SlClose color="red" size={26} />
                                  </button>
                                </div>
                              )}
                            {actions.map((action) => (
                              <>
                                {action.type === "edit" &&
                                  !isEditable &&
                                  planningDetail.finsmartCoding.budgetType >=
                                    2 &&
                                  planningDetail.finsmartCoding.budgetType <=
                                    4 && (
                                    <div
                                      className="xl:w-7 xl:h-7 lg:w-6 lg:h-6 w-5 h-5 p-0.5 rounded-md bg-custom-gray flex items-center justify-center cursor-pointer"
                                      onClick={() => {
                                        setEditIndex(
                                          planningDetail.companyBudgetId
                                        );
                                        setIsEditable(true);
                                        dispatch(
                                          getByIdCompanyBudget(
                                            planningDetail.companyBudgetId
                                          )
                                        );
                                      }}
                                    >
                                      <svg
                                        width="19"
                                        height="19"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          opacity="0.4"
                                          d="M14.2667 5.56754L12.8334 7.00754L8.99337 3.16754L10.4334 1.73421C10.5577 1.60516 10.7069 1.50252 10.8718 1.43241C11.0368 1.36231 11.2141 1.32617 11.3934 1.32617C11.5726 1.32617 11.75 1.36231 11.9149 1.43241C12.0799 1.50252 12.229 1.60516 12.3534 1.73421L14.2667 3.64754C14.3957 3.77192 14.4984 3.92104 14.5685 4.08598C14.6386 4.25093 14.6747 4.42831 14.6747 4.60754C14.6747 4.78677 14.6386 4.96415 14.5685 5.1291C14.4984 5.29404 14.3957 5.44316 14.2667 5.56754ZM2.46003 14.6209L6.59337 13.2475L2.75337 9.40754L1.38003 13.5409C1.3297 13.6913 1.32229 13.8528 1.35865 14.0072C1.39501 14.1616 1.4737 14.3029 1.58587 14.415C1.69805 14.5272 1.83927 14.6059 1.99368 14.6423C2.1481 14.6786 2.30959 14.6712 2.46003 14.6209Z"
                                          fill="#A1A5B7"
                                        />
                                        <path
                                          d="M3.71337 14.2013L2.46003 14.6213C2.30959 14.6716 2.1481 14.679 1.99368 14.6427C1.83927 14.6063 1.69805 14.5276 1.58587 14.4155C1.4737 14.3033 1.39501 14.1621 1.35865 14.0077C1.32229 13.8532 1.3297 13.6917 1.38003 13.5413L1.80003 12.288L3.71337 14.2013ZM2.75337 9.40797L6.59337 13.248L12.8334 7.00797L8.99337 3.16797L2.75337 9.40797Z"
                                          fill="#A1A5B7"
                                        />
                                      </svg>
                                    </div>
                                  )}
                                {action.type === "detail" &&
                                  !isEditable &&
                                  planningDetail.finsmartCoding.budgetType >=
                                    2 &&
                                  planningDetail.finsmartCoding.budgetType <=
                                    4 && (
                                    <div
                                      className="xl:w-7 xl:h-7 lg:w-6 lg:h-6 w-5 h-5 p-0.5 rounded-md bg-custom-gray flex items-center justify-center cursor-pointer"
                                      onClick={() => {
                                        navigate("/budget/details/info", {
                                          state: {
                                            companyBudgetId:
                                              planningDetail.companyBudgetId,
                                            budgetType:
                                              planningDetail.finsmartCoding
                                                .budgetType,
                                          },
                                        });
                                      }}
                                    >
                                      <BiMessageDetail
                                        color="gray"
                                        // data-tooltip-id="detail"
                                        className="outline-none"
                                      />
                                      {/* <Tooltip id="detail">
                                        {t("tooltip.add_detail")}
                                      </Tooltip> */}
                                    </div>
                                  )}
                              </>
                            ))}
                          </div>
                        </div>
                        <hr className="ml-10" />
                        {!planningDetail.parentId && (
                          <div
                            className={`ml-8 ${
                              show && show[planningDetail.finsmartCodingId]
                                ? "block"
                                : "hidden"
                            }`}
                          >
                            <ul className="flex flex-col">
                              {renderInverseParent(
                                planningDetail.inverseParent
                              )}
                            </ul>
                          </div>
                        )}
                      </li>
                    )
                )
              : null}
          </ul>
        </div>
      </div>
    </>
  );
};
