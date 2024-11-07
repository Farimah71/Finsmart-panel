import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { FaRegSquarePlus } from "react-icons/fa6";
import { FiMinusSquare } from "react-icons/fi";
import { Button, Modal, DeleteConfirmation } from "../../../../components";
import { EditCoding } from "./edit";
import { CreateCoding } from "./create";
// import { SiOpenstreetmap } from "react-icons/si";
import {
  errorNotification,
  successNotification,
} from "../../../../helpers/notification";
import { CodeMapper } from "../code-mapper";
import { getCompanyFinsmartCodingHeaders } from "../../../../redux/actions/settings/company-Finsmart-coding-header";
import { getDataFromJwtToken } from "../../../../helpers/get-data-from-jwt";
import { getFinsmartCodingHeaders } from "../../../../redux/actions/settings/Finsmart-coding-header";
import { ChooseHeader } from "./choose-header";
import { LuFlagTriangleRight } from "react-icons/lu";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { getFinsmartCodings } from "../../../../redux/actions/settings/Finsmart-coding";
import { CodingFlag } from "../../account-planning/coding-flag";
import { VscCollapseAll, VscExpandAll } from "react-icons/vsc";
import {
  setClearInfo,
  setLoading,
} from "../../../../redux/reducers/settings/Finsmart-coding";
import { getCodeMappers } from "../../../../redux/actions/settings/code-mapper";
import { clearInfo } from "../../../../redux/reducers/settings/code-mapper";
import { setEmptyInfo } from "../../../../redux/reducers/settings/company-Finsmart-coding-header";
import { api } from "../../../../api";
import axios from "axios";

export const CompanyPlanningDetail = () => {
  // ------------ states ----------
  const [show, setShow] = useState({});
  const [isActive, setIsActive] = useState({ parent: null, child: null });
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState();
  const [dataModal, setDataModal] = useState("");
  const [itemId, setItemId] = useState();
  const [deleteId, setDeleteId] = useState();
  const [code, setCode] = useState();
  const [isReload, setIsReload] = useState(false);
  const [noHeaders, setNoHeaders] = useState(false);
  const [reloadMappers, setReloadMappers] = useState();

  // ----------- store ----------
  const companyHeaderData = useSelector(
    (state) => state.companyFinsmartCodingHeaderSlice.info
  );
  const headerData = useSelector(
    (state) => state.FinsmartCodingHeaderSlice.info
  );
  const { info: planningDetailData, loading } = useSelector(
    (state) => state.FinsmartCodingSlice
  );
  const isLoading = useSelector((state) => state.loadingSlice.isLoading);

  // ---------- i18next ----------
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem("lng");

  // ----------- hooks ----------
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ---------- variable ------------
  const actions = [
    {
      type: "flag",
      path: "",
    },
    {
      type: "add",
      path: "",
    },
    // {
    //   type: "map",
    //   path: "",
    // },
    {
      type: "edit",
      path: "",
    },
    {
      type: "delete",
      path: "",
    },
  ];

  // ----------- lifecycles ------------
  useEffect(() => {
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
  }, [isReload]);
  useEffect(() => {
    dispatch(
      getCodeMappers({
        filters: [
          {
            property: "FinsmartCodingId",
            operation: 5,
            values: [`${dataModal}`],
          },
        ],
      })
    );
  }, [reloadMappers]);
  useEffect(() => {
    if (companyHeaderData !== null && companyHeaderData.count === 0) {
      setNoHeaders(true);
      dispatch(
        getFinsmartCodingHeaders({
          filters: [
            {
              property: "CompanyId",
              operation: 5,
              values: [null],
            },
          ],
        })
      );
    } else if (companyHeaderData !== null && companyHeaderData.count) {
      setNoHeaders(false);
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
          includeProperties: "CodeMappers",
        })
      );
    }
  }, [companyHeaderData]);
  useEffect(() => {
    if (headerData.count) {
      setDataModal(headerData);
    }
  }, [headerData]);
  useEffect(
    () => () => {
      dispatch(setClearInfo());
      dispatch(clearInfo());
      dispatch(setEmptyInfo());
    },
    []
  );

  // ------------ functions -------------
  const deleteHandler = (id) => {
    dispatch(setLoading(true));

    axios
      .delete(api.SettingsApi.deleteFinsmartCoding + id)
      .then((res) => {
        dispatch(setLoading(false));
        if (res.data.statusCode === "200") {
          successNotification(t("toast.success_delete"));
          setIsReload((currState) => !currState);
          setOpenModal(false);
        }
      })
      .catch(() => {
        dispatch(setLoading(false));
        errorNotification(t("toast.error"));
      });
  };
  const openModalHandler = (modal, id) => {
    setOpenModal(true);
    setModalType(modal);
    setItemId(id);
  };
  const closeModalHandler = () => setOpenModal(false);
  const collapseHandler = () => {
    setShow({});
  };
  const expandHandler = () => {
    const lists = planningDetailData.data.map((data) => {
      return data.finsmartCodingId;
    });
    lists.map((list) => {
      setShow((prev) => ({ ...prev, [list]: true }));
    });
  };
  const planningDetailNewData = useMemo(() => {
    return (
      planningDetailData.data &&
      planningDetailData.data.map((detail) => {
        return {
          ...detail,
          inverseParent: planningDetailData.data.filter((plan) => {
            return plan.parentId == detail.finsmartCodingId;
          }),
        };
      })
    );
  }, [planningDetailData.data]);
  const renderInverseParent = (inverseParent) => {
    let mainInverseParent =
      inverseParent &&
      inverseParent.map((planningDetail) => {
        return {
          ...planningDetail,
          inverseParent: planningDetailData.data.filter((detail) => {
            return detail.parentId == planningDetail.finsmartCodingId;
          }),
          parent: planningDetailData.data.filter((detail) => {
            return detail.finsmartCodingId == planningDetail.parentId;
          })[0],
        };
      });

    return mainInverseParent.map((subDetail, index) => {
      return (
        <div className="flex" key={subDetail.finsmartCodingId}>
          {subDetail.inverseParent.length === 0 &&
            subDetail.parent.parentId > 0 && (
              <span
                className={`border-b-2 border-dotted -mt-4 w-7 h-10 shrink-0 ${
                  !subDetail.parent.parentId > 0 ? "-ml-2" : "-ml-4"
                }`}
              ></span>
            )}
          <div className="w-full">
            <li
              className="w-full dark:text-dark_custom-full-white relative"
              key={subDetail.finsmartCodingId}
            >
              <div className="flex items-center py-2 pl-2 hover:bg-blue-50 dark:hover:bg-gray-700">
                <div
                  onClick={() => {
                    !subDetail.parent.parentId &&
                      setShow({
                        ...show,
                        [subDetail.finsmartCodingId]:
                          !show[subDetail.finsmartCodingId],
                      });
                    !subDetail.parent.parentId &&
                      setIsActive((prev) => ({
                        ...prev,
                        child: !isActive.child,
                      }));
                    subDetail.parent.parentId &&
                      dispatch(
                        getCodeMappers({
                          filters: [
                            {
                              property: "FinsmartCodingId",
                              operation: 5,
                              values: [`${subDetail.finsmartCodingId}`],
                            },
                          ],
                        })
                      );
                    setDataModal(subDetail.finsmartCodingId);
                  }}
                  className={`flex items-center gap-x-2 w-full cursor-pointer`}
                >
                  {!subDetail.parent.parentId && (
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
                      !subDetail.parent.parentId ? "w-[95px]" : "w-[74px]"
                    } ${
                      subDetail.parent.parentId &&
                      !subDetail.codeMappers.length &&
                      "text-red-400"
                    }`}
                  >
                    {subDetail.accountCode}
                  </span>
                  <div
                    className={`w-[80px] lg:w-[150px] xl:w-[250px] flex-shrink-0
                     ${
                       subDetail.parent.parentId &&
                       !subDetail.codeMappers.length &&
                       "text-red-400"
                     }`}
                    title={subDetail.accountName}
                  >
                    {subDetail.accountName.length > 20
                      ? subDetail.accountName.substring(0, 20) + "..."
                      : subDetail.accountName}
                  </div>
                </div>
                <div
                  className={`xl:hidden relative flex xl:px-2 items-center gap-x-1 group cursor-pointer`}
                >
                  <PiDotsThreeOutlineFill color="gray" />
                  <span className="absolute top-4 -left-6 sm:-left-4 border rounded-10 bg-white z-20 shadow-sm opacity-0 invisible p-1 transition-opacity duration-400 group-hover:opacity-100 group-hover:visible flex flex-col gap-1">
                    {actions.map((action) => (
                      <>
                        {action.type === "delete" &&
                          subDetail.parent.parentId && (
                            <div
                              className="xl:w-7 xl:h-7 lg:w-6 lg:h-6 w-5 h-5 p-0.5 rounded-md bg-custom-gray flex items-center justify-center cursor-pointer"
                              onClick={() => {
                                setDeleteId(subDetail.finsmartCodingId);
                                openModalHandler("deleteConfirm");
                              }}
                            >
                              <svg
                                width="19"
                                height="19"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g opacity="0.5">
                                  <path
                                    d="M10.5797 14.6075L5.54634 14.6675C5.11031 14.6737 4.68845 14.5127 4.36736 14.2176C4.04626 13.9226 3.85029 13.5158 3.81968 13.0808L3.33301 6.12081C3.32556 6.01899 3.33946 5.91673 3.37381 5.82058C3.40816 5.72444 3.46221 5.63652 3.5325 5.56247C3.60278 5.48842 3.68776 5.42986 3.78198 5.39054C3.8762 5.35123 3.9776 5.33202 4.07967 5.33414H11.9197C12.0211 5.33209 12.1219 5.35113 12.2157 5.39004C12.3094 5.42896 12.3941 5.48691 12.4642 5.56022C12.5344 5.63354 12.5886 5.72063 12.6234 5.81598C12.6582 5.91132 12.6728 6.01286 12.6663 6.11414L12.273 12.9941C12.2492 13.4281 12.0608 13.8367 11.7461 14.1365C11.4315 14.4363 11.0143 14.6047 10.5797 14.6075Z"
                                    fill="#A1A5B7"
                                  />
                                </g>
                                <path
                                  d="M9.487 9.06641H6.51367C6.38106 9.06641 6.25389 9.01373 6.16012 8.91996C6.06635 8.82619 6.01367 8.69901 6.01367 8.56641C6.01367 8.4338 6.06635 8.30662 6.16012 8.21285C6.25389 8.11908 6.38106 8.06641 6.51367 8.06641H9.487C9.61961 8.06641 9.74679 8.11908 9.84056 8.21285C9.93433 8.30662 9.987 8.4338 9.987 8.56641C9.987 8.69901 9.93433 8.82619 9.84056 8.91996C9.74679 9.01373 9.61961 9.06641 9.487 9.06641Z"
                                  fill="#A1A5B7"
                                />
                                <path
                                  d="M8.96654 11.5332H7.0332C6.90059 11.5332 6.77342 11.4805 6.67965 11.3868C6.58588 11.293 6.5332 11.1658 6.5332 11.0332C6.5332 10.9006 6.58588 10.7734 6.67965 10.6796C6.77342 10.5859 6.90059 10.5332 7.0332 10.5332H8.96654C9.09914 10.5332 9.22632 10.5859 9.32009 10.6796C9.41386 10.7734 9.46654 10.9006 9.46654 11.0332C9.46654 11.1658 9.41386 11.293 9.32009 11.3868C9.22632 11.4805 9.09914 11.5332 8.96654 11.5332Z"
                                  fill="#A1A5B7"
                                />
                                <path
                                  d="M13.4999 4.7738H13.4266C9.82798 4.27899 6.17856 4.27899 2.57994 4.7738C2.45102 4.79078 2.32056 4.75687 2.21624 4.67926C2.11191 4.60166 2.04191 4.48647 2.0211 4.35812C2.00028 4.22976 2.03029 4.09835 2.10475 3.99176C2.17921 3.88516 2.29226 3.81176 2.41994 3.78713C6.11947 3.26627 9.87373 3.26627 13.5733 3.78713C13.6965 3.80737 13.8077 3.87301 13.885 3.97114C13.9623 4.06927 14.0001 4.19277 13.9909 4.31734C13.9817 4.44191 13.9262 4.55852 13.8353 4.64424C13.7445 4.72995 13.6248 4.77855 13.4999 4.78047V4.7738Z"
                                  fill="#A1A5B7"
                                />
                                <path
                                  d="M10.6663 3.89398H5.33301L5.63301 2.34732C5.68647 2.0664 5.83489 1.81241 6.05336 1.62792C6.27184 1.44342 6.54711 1.33965 6.83301 1.33398H9.18634C9.47744 1.33509 9.75908 1.43749 9.98292 1.62361C10.2067 1.80974 10.3588 2.06797 10.413 2.35398L10.6663 3.89398Z"
                                  fill="#A1A5B7"
                                />
                              </svg>
                            </div>
                          )}
                        {action.type === "edit" &&
                          subDetail.parent.parentId && (
                            <div
                              className="xl:w-7 xl:h-7 lg:w-6 lg:h-6 w-5 h-5 p-0.5 rounded-md bg-custom-gray flex items-center justify-center cursor-pointer"
                              onClick={() => {
                                openModalHandler(
                                  "edit",
                                  subDetail.finsmartCodingId
                                );
                                setCode(subDetail.accountCode);
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
                        {action.type === "flag" && (
                          <div
                            className="xl:w-7 xl:h-7 lg:w-6 lg:h-6 w-5 h-5 p-0.5 rounded-md bg-custom-gray flex items-center justify-center cursor-pointer"
                            onClick={() => {
                              openModalHandler("flag");
                              setDataModal(subDetail.finsmartCodingId);
                            }}
                          >
                            <LuFlagTriangleRight
                              className="opacity-30"
                              color="black"
                            />
                          </div>
                        )}
                        {action.type === "add" &&
                          !subDetail.parent.parentId && (
                            <div
                              className="xl:w-7 xl:h-7 lg:w-6 lg:h-6 w-5 h-5 rounded-md bg-custom-gray flex items-center justify-center cursor-pointer"
                              onClick={() => {
                                openModalHandler(
                                  "create",
                                  subDetail.finsmartCodingId
                                );
                                setCode(subDetail.accountCode);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="15"
                                viewBox="0 0 10 10"
                                fill="none"
                              >
                                <path
                                  d="M9.16667 4.16667H5.83333V0.833333C5.83333 0.61232 5.74554 0.400358 5.58926 0.244078C5.43297 0.0877975 5.22101 0 5 0C4.77899 0 4.56702 0.0877975 4.41074 0.244078C4.25446 0.400358 4.16667 0.61232 4.16667 0.833333V4.16667H0.833333C0.61232 4.16667 0.400358 4.25446 0.244078 4.41074C0.0877975 4.56702 0 4.77899 0 5C0 5.22101 0.0877975 5.43297 0.244078 5.58926C0.400358 5.74554 0.61232 5.83333 0.833333 5.83333H4.16667V9.16667C4.16667 9.38768 4.25446 9.59964 4.41074 9.75592C4.56702 9.9122 4.77899 10 5 10C5.22101 10 5.43297 9.9122 5.58926 9.75592C5.74554 9.59964 5.83333 9.38768 5.83333 9.16667V5.83333H9.16667C9.38768 5.83333 9.59964 5.74554 9.75592 5.58926C9.9122 5.43297 10 5.22101 10 5C10 4.77899 9.9122 4.56702 9.75592 4.41074C9.59964 4.25446 9.38768 4.16667 9.16667 4.16667Z"
                                  fill="#A1A5B7"
                                />
                              </svg>
                            </div>
                          )}
                      </>
                    ))}
                  </span>
                </div>
                <div className={`hidden xl:flex items-center gap-x-1`}>
                  {actions.map((action) => (
                    <>
                      {action.type === "delete" &&
                        subDetail.parent.parentId && (
                          <div
                            className="xl:w-7 xl:h-7 lg:w-6 lg:h-6 w-5 h-5 p-0.5 rounded-md bg-custom-gray flex items-center justify-center cursor-pointer"
                            onClick={() => {
                              setDeleteId(subDetail.finsmartCodingId);
                              openModalHandler("deleteConfirm");
                            }}
                          >
                            <svg
                              width="19"
                              height="19"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g opacity="0.5">
                                <path
                                  d="M10.5797 14.6075L5.54634 14.6675C5.11031 14.6737 4.68845 14.5127 4.36736 14.2176C4.04626 13.9226 3.85029 13.5158 3.81968 13.0808L3.33301 6.12081C3.32556 6.01899 3.33946 5.91673 3.37381 5.82058C3.40816 5.72444 3.46221 5.63652 3.5325 5.56247C3.60278 5.48842 3.68776 5.42986 3.78198 5.39054C3.8762 5.35123 3.9776 5.33202 4.07967 5.33414H11.9197C12.0211 5.33209 12.1219 5.35113 12.2157 5.39004C12.3094 5.42896 12.3941 5.48691 12.4642 5.56022C12.5344 5.63354 12.5886 5.72063 12.6234 5.81598C12.6582 5.91132 12.6728 6.01286 12.6663 6.11414L12.273 12.9941C12.2492 13.4281 12.0608 13.8367 11.7461 14.1365C11.4315 14.4363 11.0143 14.6047 10.5797 14.6075Z"
                                  fill="#A1A5B7"
                                />
                              </g>
                              <path
                                d="M9.487 9.06641H6.51367C6.38106 9.06641 6.25389 9.01373 6.16012 8.91996C6.06635 8.82619 6.01367 8.69901 6.01367 8.56641C6.01367 8.4338 6.06635 8.30662 6.16012 8.21285C6.25389 8.11908 6.38106 8.06641 6.51367 8.06641H9.487C9.61961 8.06641 9.74679 8.11908 9.84056 8.21285C9.93433 8.30662 9.987 8.4338 9.987 8.56641C9.987 8.69901 9.93433 8.82619 9.84056 8.91996C9.74679 9.01373 9.61961 9.06641 9.487 9.06641Z"
                                fill="#A1A5B7"
                              />
                              <path
                                d="M8.96654 11.5332H7.0332C6.90059 11.5332 6.77342 11.4805 6.67965 11.3868C6.58588 11.293 6.5332 11.1658 6.5332 11.0332C6.5332 10.9006 6.58588 10.7734 6.67965 10.6796C6.77342 10.5859 6.90059 10.5332 7.0332 10.5332H8.96654C9.09914 10.5332 9.22632 10.5859 9.32009 10.6796C9.41386 10.7734 9.46654 10.9006 9.46654 11.0332C9.46654 11.1658 9.41386 11.293 9.32009 11.3868C9.22632 11.4805 9.09914 11.5332 8.96654 11.5332Z"
                                fill="#A1A5B7"
                              />
                              <path
                                d="M13.4999 4.7738H13.4266C9.82798 4.27899 6.17856 4.27899 2.57994 4.7738C2.45102 4.79078 2.32056 4.75687 2.21624 4.67926C2.11191 4.60166 2.04191 4.48647 2.0211 4.35812C2.00028 4.22976 2.03029 4.09835 2.10475 3.99176C2.17921 3.88516 2.29226 3.81176 2.41994 3.78713C6.11947 3.26627 9.87373 3.26627 13.5733 3.78713C13.6965 3.80737 13.8077 3.87301 13.885 3.97114C13.9623 4.06927 14.0001 4.19277 13.9909 4.31734C13.9817 4.44191 13.9262 4.55852 13.8353 4.64424C13.7445 4.72995 13.6248 4.77855 13.4999 4.78047V4.7738Z"
                                fill="#A1A5B7"
                              />
                              <path
                                d="M10.6663 3.89398H5.33301L5.63301 2.34732C5.68647 2.0664 5.83489 1.81241 6.05336 1.62792C6.27184 1.44342 6.54711 1.33965 6.83301 1.33398H9.18634C9.47744 1.33509 9.75908 1.43749 9.98292 1.62361C10.2067 1.80974 10.3588 2.06797 10.413 2.35398L10.6663 3.89398Z"
                                fill="#A1A5B7"
                              />
                            </svg>
                          </div>
                        )}
                      {action.type === "edit" && subDetail.parent.parentId && (
                        <div
                          className="xl:w-7 xl:h-7 lg:w-6 lg:h-6 w-5 h-5 p-0.5 rounded-md bg-custom-gray flex items-center justify-center cursor-pointer"
                          onClick={() => {
                            openModalHandler(
                              "edit",
                              subDetail.finsmartCodingId
                            );
                            setCode(subDetail.accountCode);
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
                      {action.type === "flag" && (
                        <div
                          className="xl:w-7 xl:h-7 lg:w-6 lg:h-6 w-5 h-5 p-0.5 rounded-md bg-custom-gray flex items-center justify-center cursor-pointer"
                          onClick={() => {
                            openModalHandler("flag");
                            setDataModal(subDetail.finsmartCodingId);
                          }}
                        >
                          <LuFlagTriangleRight
                            className="opacity-30"
                            color="black"
                          />
                        </div>
                      )}
                      {action.type === "add" && !subDetail.parent.parentId && (
                        <div
                          className="xl:w-7 xl:h-7 lg:w-6 lg:h-6 w-5 h-5 rounded-md bg-custom-gray flex items-center justify-center cursor-pointer"
                          onClick={() => {
                            openModalHandler(
                              "create",
                              subDetail.finsmartCodingId
                            );
                            setCode(subDetail.accountCode);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="15"
                            viewBox="0 0 10 10"
                            fill="none"
                          >
                            <path
                              d="M9.16667 4.16667H5.83333V0.833333C5.83333 0.61232 5.74554 0.400358 5.58926 0.244078C5.43297 0.0877975 5.22101 0 5 0C4.77899 0 4.56702 0.0877975 4.41074 0.244078C4.25446 0.400358 4.16667 0.61232 4.16667 0.833333V4.16667H0.833333C0.61232 4.16667 0.400358 4.25446 0.244078 4.41074C0.0877975 4.56702 0 4.77899 0 5C0 5.22101 0.0877975 5.43297 0.244078 5.58926C0.400358 5.74554 0.61232 5.83333 0.833333 5.83333H4.16667V9.16667C4.16667 9.38768 4.25446 9.59964 4.41074 9.75592C4.56702 9.9122 4.77899 10 5 10C5.22101 10 5.43297 9.9122 5.58926 9.75592C5.74554 9.59964 5.83333 9.38768 5.83333 9.16667V5.83333H9.16667C9.38768 5.83333 9.59964 5.74554 9.75592 5.58926C9.9122 5.43297 10 5.22101 10 5C10 4.77899 9.9122 4.56702 9.75592 4.41074C9.59964 4.25446 9.38768 4.16667 9.16667 4.16667Z"
                              fill="#A1A5B7"
                            />
                          </svg>
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

  // ---------- render jsx ------------
  return (
    <div className="rounded-11 p-5 text-sm xl:text-base bg-white h-auto dark:bg-dark_custom-light-black">
      <Modal
        state={openModal}
        onCloseModal={closeModalHandler}
        small={modalType === "deleteConfirm"}
      >
        {modalType === "create" && (
          <CreateCoding
            headerId={companyHeaderData.data[0].finsmartCodingHeaderId}
            parentId={itemId}
            parentCode={code}
            onCloseModal={closeModalHandler}
            isReloadPage={() => setIsReload((currState) => !currState)}
          />
        )}
        {modalType === "edit" && (
          <EditCoding
            onCloseModal={closeModalHandler}
            isReloadPage={() => setIsReload((currState) => !currState)}
            editId={itemId}
            parentCode={code}
          />
        )}
        {/* {modalType === "mapper" && (
          <CodeMapper
            state={dataModal}
            isReloadPage={() => setIsReload((currState) => !currState)}
            onCloseModal={closeModalHandler}
          />
        )} */}
        {modalType === "headersList" && (
          <ChooseHeader
            state={dataModal}
            isReloadPage={() => setIsReload((currState) => !currState)}
            onCloseModal={closeModalHandler}
          />
        )}
        {modalType === "flag" && (
          <CodingFlag
            state={dataModal}
            isReloadPage={() => setIsReload((currState) => !currState)}
            onCloseModal={closeModalHandler}
          />
        )}
        {modalType === "deleteConfirm" && (
          <DeleteConfirmation
            onCloseModal={closeModalHandler}
            deleteConfirm={() => deleteHandler(deleteId)}
            loading={loading}
          />
        )}
      </Modal>
      <div className="flex justify-between p-1">
        <div className="flex flex-col gap-y-1 mb-10">
          <h4 className="text-19 text-custom-dark font-bold dark:text-dark_custom-full-white">
            {t("page_title.planning_detail")}
          </h4>
          <h4 className="text-14 flex gap-x-2 text-custom-gray-muted dark:text-dark_custom-light-white">
            {t("text.dashboard")} - {t("page_title.account_planning")}
          </h4>
        </div>
        {noHeaders && (
          <Button
            title={t("button.select_header_title")}
            onClick={() => openModalHandler("headersList", null)}
          />
        )}
      </div>

      {companyHeaderData?.count > 0 ? (
        <div className="flex gap-x-2">
          <div className="w-1/2 border rounded-10 p-2">
            {isLoading && (
              <div className="text-center">
                <ClipLoader color="#95ebf5" />
              </div>
            )}
            {planningDetailData.count > 0 ? (
              <div className="flex border-b-2 border-custom-gray mt-5 -ml-1 pb-5 font-semibold dark:text-dark_custom-full-white">
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
                <span className="w-[130px] flex-shrink-0 whitespace-nowrap">
                  {t("table.col.account_code")}
                </span>
                <span className="w-[310px] whitespace-nowrap">
                  {t("table.col.account_name")}
                </span>
                {/* <span className="w-[320px]">{t("table.col.budget_type")}</span> */}
                {/*<span className="w-[320px]">{t("table.col.action")}</span> */}
              </div>
            ) : !planningDetailData ? (
              <div className="text-center text-custom-blue">
                {t("text.no_data")}
              </div>
            ) : null}
            <ul className="flex flex-col overflow-hidden overflow-y-scroll pr-1 h-[700px]">
              {planningDetailData.count
                ? planningDetailNewData.map(
                    (planningDetail, index) =>
                      !planningDetail.parentId && (
                        <li key={planningDetail.finsmartCodingId}>
                          <div className="flex items-center hover:bg-blue-50 dark:hover:bg-gray-700">
                            <div
                              className="w-full p-2 flex items-center gap-x-2 cursor-pointer dark:text-dark_custom-full-white"
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
                                {planningDetail.accountCode}
                              </span>
                              <div
                                className="w-[80px] lg:w-[150px] xl:w-[250px] whitespace-nowrap overflow-hidden flex-shrink-0"
                                title={planningDetail.accountName}
                              >
                                {planningDetail.accountName.length > 20
                                  ? planningDetail.accountName.substring(
                                      0,
                                      20
                                    ) + "..."
                                  : planningDetail.accountName}
                              </div>
                              {/* <div className="w-[300px]">-</div> */}
                            </div>
                            <div
                              className={`xl:hidden relative flex xl:px-2 items-center gap-x-1 group cursor-pointer`}
                            >
                              <PiDotsThreeOutlineFill color="gray" />
                              <span className="absolute top-4 -left-6 sm:-left-4 border rounded-10 bg-white z-20 shadow-sm opacity-0 invisible p-1 transition-opacity duration-400 group-hover:opacity-100 group-hover:visible flex flex-col gap-1">
                                {actions.map((action) => (
                                  <>
                                    {action.type === "flag" && (
                                      <div
                                        className="xl:w-7 xl:h-7 lg:w-6 lg:h-6 w-5 h-5 p-0.5 rounded-md bg-custom-gray flex items-center justify-center cursor-pointer"
                                        onClick={() => {
                                          openModalHandler("flag");
                                          setDataModal(
                                            subDetail.finsmartCodingId
                                          );
                                        }}
                                      >
                                        <LuFlagTriangleRight
                                          className="opacity-30"
                                          color="black"
                                        />
                                      </div>
                                    )}
                                  </>
                                ))}
                              </span>
                            </div>
                            <div className="hidden xl:flex items-center gap-x-2">
                              {actions.map((action) => (
                                <>
                                  {action.type === "flag" && (
                                    <div
                                      className="xl:w-7 xl:h-7 lg:w-6 lg:h-6 w-5 h-5 rounded-md bg-custom-gray flex items-center justify-center cursor-pointer"
                                      onClick={() => {
                                        openModalHandler("flag");
                                        setDataModal(
                                          planningDetail.finsmartCodingId
                                        );
                                      }}
                                    >
                                      <LuFlagTriangleRight
                                        className="opacity-30"
                                        color="black"
                                      />
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
          <div className="w-1/2 border rounded-10 p-3">
            <CodeMapper
              id={dataModal}
              isReloadPage={() => {
                setReloadMappers((prev) => !prev);
                setIsReload((prev) => !prev);
              }}
            />
          </div>
        </div>
      ) : (
        <div className="text-center text-custom-blue">
          {t("text.choose_header")}
        </div>
      )}
    </div>
  );
};
