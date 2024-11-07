import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { getDataFromJwtToken } from "../../helpers/get-data-from-jwt";
import { saveDataToLocalStorage } from "../../helpers/save-data-to-local";
//++++++++++++++ image import +++++++++++++
import NotifBackground from "../../assets/images/notif-bg.png";

export const NotificationAlert = () => {
  // ----------- store ---------
  const { requested: userCompanyRequests } = useSelector(
    (state) => state.userCompanySlice
  );
  // ---------- states ----------
  const [requestCount, setRequestCount] = useState(0);
  const [isShowNotif, setIsShowNotif] = useState(false);
  const [isMouseOnPopup, setIsMouseOnPopup] = useState(false);

  // ---------- i18next ----------
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem("lng");

  // ----------hooks----------
  const navigate = useNavigate();

  // --------- variables -----------
  const requestedCompany =
    localStorage.requested_comp_ && JSON.parse(localStorage.requested_comp_);
  const companyId = getDataFromJwtToken("CompanyId");

  // ---------- lifecycle ----------
  useEffect(() => {
    if (userCompanyRequests.length > 0) {
      const requests = userCompanyRequests.filter(
        (request) =>
          request.isActive === false &&
          request.companyId == getDataFromJwtToken("CompanyId")
      );
      saveDataToLocalStorage("requested_comp_", requests);
    }
  }, [userCompanyRequests]);
  useEffect(() => {
    requestedCompany?.length > 0 && setRequestCount(requestedCompany.length);
  }, [requestedCompany]);

  // --------- render jsx ----------
  return (
    <>
      {requestedCompany && !requestedCompany?.length && companyId && (
        <MdOutlineNotificationsNone size={21} color="grey" />
      )}
      {requestedCompany && requestedCompany?.length > 0 && companyId &&(
        <div className="relative">
          <MdOutlineNotificationsActive
            size={21}
            className="cursor-pointer"
            color={"#16a34a"}
            onMouseOver={() => setIsShowNotif(true)}
            // onMouseLeave={() => !isMouseOnPopup && setIsShowNotif(false)}
          />
          <div className="bg-green-500 w-1.5 h-1.5 align-middle text-center rounded-full text-white text-xs absolute -top-1.5 -left-1">
            {/* {requestCount} */}
          </div>

          {/* Notification popup start */}
          <div
            className={`absolute shadow-md md:w-[300px] transition-all duration-500 bg-white dark:bg-dark_custom-header-table-black text-white z-30 rounded-10 overflow-hidden -left-48 md:-left-72 top-8 ${
              isShowNotif
                ? "translate-y-0 opacity-100 visible"
                : "translate-y-5 opacity-0 invisible"
            }`}
            onMouseEnter={() => isShowNotif && setIsMouseOnPopup(true)}
            onMouseLeave={() => {
              setIsShowNotif(false);
              setIsMouseOnPopup(false);
            }}
          >
            <div className="flex gap-x-5 h-1/3 text-21 select-none bg-custom-blue-dark p-6 font-bold bg-[url('assets/images/digital-bg.png')] bg-no-repeat bg-cover">
              <span className="text-sm md:text-base">{t("notif_popup.notifications")}</span>
              <span className="text-xs self-center bg-green-500 rounded-full w-4 h-4 text-center content-center">
                {requestCount}
              </span>
            </div>
            <div>
              <p className="p-5 flex gap-x-3 font-semibold">
                <span className="bg-green-100 select-none rounded-10 px-4 h-6 self-center text-green-500 text-14">
                  {t("badge.new")}
                </span>
                <span
                  className="rounded-10 p-2 text-gray-500 text-14 cursor-pointer hover:text-custom-blue"
                  onClick={() => {
                    navigate("/users");
                    setIsShowNotif(false);
                  }}
                >
                  {requestCount} {t("notif_popup.request")}
                </span>
              </p>
            </div>
            <div className="mt-4">
              <img
                src={NotifBackground}
                alt=""
                width={"200px"}
                className="mx-auto"
              />
            </div>
          </div>
          {/* Notification popup end */}
        </div>
      )}
    </>
  );
};
