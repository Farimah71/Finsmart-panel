import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaRegSquarePlus } from "react-icons/fa6";
import { FiMinusSquare } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { getCodeMappers } from "../../../../../redux/actions/settings/code-mapper";
import { VscCollapseAll, VscExpandAll } from "react-icons/vsc";

export const CompanyPlanningDetail = ({ data, codingIdHandler }) => {
  // ------------ states ----------
  const [show, setShow] = useState({});
  const [isActive, setIsActive] = useState({ parent: null, child: null });

  // ---------- i18next ----------
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem("lng");

  // --------- hooks --------------
  const dispatch = useDispatch();

  // ------------ functions -------------
  const collapseHandler = () => {
    setShow({});
  };
  const expandHandler = () => {
    const lists = data.data.map((data) => {
      return data.finsmartCodingId;
    });
    lists.map((list) => {
      setShow((prev) => ({ ...prev, [list]: true }));
    });
  };
  const planningDetailNewData = useMemo(() => {
    return (
      data.data &&
      data.data.map((detail) => {
        return {
          ...detail,
          inverseParent: data.data.filter((plan) => {
            return plan.parentId == detail.finsmartCodingId;
          }),
        };
      })
    );
  }, [data]);
  const renderInverseParent = (inverseParent) => {
    let mainInverseParent =
      inverseParent &&
      inverseParent.map((planningDetail) => {
        return {
          ...planningDetail,
          inverseParent: data.data.filter((detail) => {
            return detail.parentId == planningDetail.finsmartCodingId;
          }),
          parent: data.data.filter((detail) => {
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
                className={`border-b-2 border-dotted -mt-4 w-7 h-10 ${
                  !subDetail.parent.parentId > 0 ? "-ml-2" : "-ml-4"
                }`}
              ></span>
            )}
          <div className="w-full">
            <li
              className="w-full dark:text-dark_custom-full-white relative"
              key={subDetail.finsmartCodingId}
            >
              <div
                className={`flex items-center py-2 pl-2 dark:hover:bg-gray-700 ${
                  subDetail.parent.parentId
                    ? "hover:bg-green-50"
                    : "hover:bg-blue-50"
                }`}
              >
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

                    subDetail.parent.parentId &&
                      codingIdHandler(subDetail.finsmartCodingId);
                  }}
                  className={"flex items-center gap-x-2 w-full cursor-pointer"}
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
                    className={`${
                      !subDetail.parent.parentId ? "lg:w-[28.5%]" : "lg:w-[27%]"
                    }`}
                  >
                    {subDetail.accountCode}
                  </span>
                  <div className="">{subDetail.accountName}</div>
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
    <div className="rounded-11 p-5 bg-white dark:bg-dark_custom-light-black">
      <div>
        {data.count > 0 ? (
          <div className="flex border-b-2 border-custom-gray mt-5 pb-5 -ml-1 font-semibold dark:text-dark_custom-full-white">
            <div className="mt-1 flex">
              <span className="cursor-pointer" onClick={collapseHandler}>
                <VscExpandAll size={20} title="Collapse all" color="#3b88d1" />
              </span>
              <span className="cursor-pointer" onClick={expandHandler}>
                <VscCollapseAll size={20} title="Expand all" color="#3b88d1" />
              </span>
            </div>
            <span className="w-[317px]">{t("table.col.account_code")}</span>
            <span className="w-[310px]">{t("table.col.account_name")}</span>
            <span className="w-[320px]">{t("table.col.budget_type")}</span>
            {/*<span className="w-[320px]">{t("table.col.action")}</span> */}
          </div>
        ) : (
          <div className="text-center text-custom-blue">
            {t("text.no_data")}
          </div>
        )}
        <ul
          className={`flex flex-col overflow-hidden ${
            Object.keys(show).length && "h-[300px] overflow-y-scroll"
          }`}
        >
          {data.count
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
                          <span className="lg:w-[31%]">
                            {planningDetail.accountCode}
                          </span>
                          <div className="">{planningDetail.accountName}</div>
                          {/* <div className="w-[300px]">-</div> */}
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
                            {renderInverseParent(planningDetail.inverseParent)}
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
  );
};
