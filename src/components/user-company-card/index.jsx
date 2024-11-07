import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../button";
import { TiLocation } from "react-icons/ti";
import { PiBuildingsFill } from "react-icons/pi";
import { RiScissorsCutFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { changeCompany } from "../../redux/actions/user-company";
import { useNavigate } from "react-router-dom";
import { getDataFromLocalStorage } from "../../helpers/get-data-from-local";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const UserCompanyCard = ({
  info,
  type,
  userCompanyHandler,
  openModalHandler,
  loading,
}) => {
  // -----------store---------
  const { isLoading } = useSelector((state) => state.loadingSlice);

  // ---------- i18next ----------
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem("lng");

  // ---------- hooks ----------
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ---------- functions ----------
  const changeCompanyHandler = (id) => {
    dispatch(
      changeCompany(
        {
          companyId: id,
          token: getDataFromLocalStorage("token"),
          accessToken: getDataFromLocalStorage("accessToken"),
        },
        type === "startup" && navigate
      )
    );
  };

  // ----------render jsx----------
  return (
    <>
      <div
        style={{
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
        }}
        className="h-[380px] p-4 bg-white dark:bg-dark_custom-average-black dark:text-custom-gray-light rounded-10 relative overflow-x-hidden"
      >
        {isLoading ? (
          <>
            <p>
              <Skeleton circle width={50} height={50} className="mb-3" />
              <Skeleton count={3.5} className="mb-4" />
              <div className="flex flex-col gap-y-2 mt-6">
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </div>
            </p>
          </>
        ) : (
          <>
            <div className="w-full flex items-center gap-2 min-h-[60px]">
              <div>
                <img
                  src={`data:image/jpeg;base64,${info.logo && info.logo}`}
                  alt="Logo"
                  width={"80px"}
                  height={"80px"}
                  className="rounded-11"
                />
              </div>
              <div className="w-full">
                <span className="text-lg capitalize font-bold">
                  {info?.title}
                </span>
              </div>
            </div>
            <div className="mt-6 px-2 flex flex-col gap-y-3">
              <p className="h-[76px] pb-5 line-clamp-3 text-ellipsis">
                {info?.bio}
              </p>
              <div className="mt-4">
                <div className="flex flex-col gap-y-3">
                  <p className="flex gap-x-1">
                    <TiLocation className="mt-1" />
                    {info?.country.title}
                  </p>
                  <p className="flex gap-x-1">
                    <PiBuildingsFill className="mt-1" />
                    {lng === "tr"
                      ? info?.companyActivityCategory.titleTr
                      : info?.companyActivityCategory.titleEn}
                  </p>
                  <span className="flex gap-x-1">
                    <RiScissorsCutFill className="mt-1" />
                    {info?.establishmentYear}
                  </span>
                </div>
              </div>
            </div>
            {type === "startup" ? (
              <div className="w-full flex justify-center mt-4">
                <Button
                  onClick={() => changeCompanyHandler(info?.companyId)}
                  title={t("button.select_title")}
                  classes={"w-full"}
                />
              </div>
            ) : (
              <div className="w-full flex justify-center mt-4 gap-x-2">
                <Button
                  onClick={() => openModalHandler(info?.companyId)}
                  title={t("button.profile_title")}
                  theme={"light"}
                  classes={"w-full"}
                />
                <Button
                  onClick={() => userCompanyHandler(info?.companyId)}
                  title={t("button.request_title")}
                  classes={"w-full"}
                  loading={loading}
                />
              </div>
            )}
            <div
              className={`w-20 h-20 absolute top-0 translate-x-[50%] -translate-y-[50%] right-0 z-20 rotate-45 ${
                !info?.openForInvestor && info?.investPrice
                  ? "bg-green-400"
                  : info?.openForInvestor
                  ? "bg-yellow-400"
                  : !info?.openForInvestor && !info?.investPrice
                  ? "bg-red-500"
                  : "bg-black"
              }`}
            ></div>
          </>
        )}
      </div>
    </>
  );
};
