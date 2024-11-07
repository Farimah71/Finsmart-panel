import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getDataFromLocalStorage } from "../../helpers/get-data-from-local";
import { useEffect, useState } from "react";
import { getDataFromJwtToken } from "../../helpers/get-data-from-jwt";
// ++++++++++ images import ++++++++++
// import ArrowBottomIcon from "../../assets/icons/arrows/arrow-bottom.svg";

export const Navbar = () => {
  // ----------store----------
  const { info: userType } = useSelector((state) => state.userTypeSlice);
  const { reload } = useSelector((state) => state.reloadPageSlice);

  // ---------- hooks ----------
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  // ---------- variables ----------
  const lng = i18n.language;

  // ---------- state ----------
  const [isReload, setIsReload] = useState(false);
  const [isActiveMenu, setIsActiveMenu] = useState();

  // ---------- functions ----------
  const toggleMenuItem = (index) => {
    index !== isActiveMenu ? setIsActiveMenu(index) : setIsActiveMenu(null);
  };

  // ---------- lifecycle-----------
  useEffect(() => {
    setIsReload(!isReload);
  }, [reload]);

  // ---------- render jsx ----------
  return (
    <nav className="flex flex-col px-4">
      <ul className="flex flex-col gap-y-1">
        {!getDataFromJwtToken("CompanyId") && (
          <li className="rounded-11 h-12">
            <NavLink
              to="/userCompany"
              className={({ isActive }) =>
                isActive
                  ? "block pl-5 text-16 rounded-md py-2 bg-custom-blue text-white dark:text-dark_custom-full-white md:dark:bg-dark_custom-full-black dark:bg-slate-800"
                  : "block pl-5 text-16 rounded-md py-2 md:text-custom-dark text-white dark:text-dark_custom-full-white"
              }
            >
              {t("navbar.user_company_title")}
            </NavLink>
          </li>
        )}

        {getDataFromLocalStorage("isFullAdmin") &&
          !getDataFromJwtToken("CompanyId") && (
            <li className="rounded-11 h-12">
              <NavLink
                to="/accountPlanning"
                className={({ isActive }) =>
                  isActive
                    ? "block pl-5 text-16 rounded-md py-2 bg-custom-blue text-white dark:text-dark_custom-full-white md:dark:bg-dark_custom-full-black dark:bg-slate-800"
                    : "block pl-5 text-16 rounded-md py-2 md:text-custom-dark text-white dark:text-dark_custom-full-white"
                }
              >
                {t("navbar.account_planning_title")}
              </NavLink>
            </li>
          )}

        {getDataFromJwtToken("CompanyId") && userType == 1 && (
          <>
            <li className="rounded-11 h-12">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "block pl-5 text-16 rounded-md py-2 bg-custom-blue text-white dark:text-dark_custom-full-white md:dark:bg-dark_custom-full-black dark:bg-slate-800"
                    : "block pl-5 text-16 rounded-md py-2 md:text-custom-dark text-white dark:text-dark_custom-full-white"
                }
              >
                {t("navbar.dashboard_title")}
              </NavLink>
            </li>

            <li className="rounded-11 h-12">
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? "block pl-5 text-16 rounded-md py-2 bg-custom-blue text-white dark:text-dark_custom-full-white md:dark:bg-dark_custom-full-black dark:bg-slate-800"
                    : "block pl-5 text-16 rounded-md py-2 md:text-custom-dark text-white dark:text-dark_custom-full-white"
                }
              >
                {t("navbar.profile_title")}
              </NavLink>
            </li>

            <li className="rounded-11 h-12">
              <NavLink
                to="/companyAccountPlanning"
                className={({ isActive }) =>
                  isActive
                    ? "block pl-5 text-16 rounded-md py-2 bg-custom-blue text-white dark:text-dark_custom-full-white md:dark:bg-dark_custom-full-black dark:bg-slate-800"
                    : "block pl-5 text-16 rounded-md py-2 md:text-custom-dark text-white dark:text-dark_custom-full-white"
                }
              >
                {t("navbar.account_planning_title")}
              </NavLink>
            </li>

            <li className="rounded-11 h-12">
              <NavLink
                to="/dataUpload"
                className={({ isActive }) =>
                  isActive
                    ? "block pl-5 text-16 rounded-md py-2 bg-custom-blue text-white dark:text-dark_custom-full-white md:dark:bg-dark_custom-full-black dark:bg-slate-800"
                    : "block pl-5 text-16 rounded-md py-2 md:text-custom-dark text-white dark:text-dark_custom-full-white"
                }
              >
                {t("navbar.dataUpload_title")}
              </NavLink>
            </li>
          </>
        )}

        {getDataFromJwtToken("CompanyId") && userType == 2 && (
          <>
            <li className="rounded-11 h-12">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "block pl-5 text-16 rounded-md py-2 bg-custom-blue text-white dark:text-dark_custom-full-white md:dark:bg-dark_custom-full-black dark:bg-slate-800"
                    : "block pl-5 text-16 rounded-md py-2 md:text-custom-dark text-white dark:text-dark_custom-full-white"
                }
              >
                {t("navbar.dashboard_title")}
              </NavLink>
            </li>
          </>
        )}

        {getDataFromJwtToken("CompanyId") && (
          <>
            <li className="rounded-11 h-12">
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  isActive
                    ? "block pl-5 text-16 rounded-md py-2 bg-custom-blue text-white dark:text-dark_custom-full-white md:dark:bg-dark_custom-full-black dark:bg-slate-800"
                    : "block pl-5 text-16 rounded-md py-2 md:text-custom-dark text-white dark:text-dark_custom-full-white"
                }
              >
                {t("navbar.users_title")}
              </NavLink>
            </li>

            <li className="rounded-11 h-12">
              <NavLink
                to="/budget"
                className={({ isActive }) =>
                  isActive
                    ? "block pl-5 text-16 rounded-md py-2 bg-custom-blue text-white dark:text-dark_custom-full-white md:dark:bg-dark_custom-full-black dark:bg-slate-800"
                    : "block pl-5 text-16 rounded-md py-2 md:text-custom-dark text-white dark:text-dark_custom-full-white"
                }
              >
                {t("navbar.budget_title")}
              </NavLink>
            </li>

            <li className="rounded-11 h-12">
              <NavLink
                to="/definition"
                className={({ isActive }) =>
                  isActive
                    ? "block pl-5 text-16 rounded-md py-2 bg-custom-blue text-white dark:text-dark_custom-full-white dark:bg-dark_custom-full-black"
                    : "block pl-5 text-16 rounded-md py-2 md:text-custom-dark text-white dark:text-dark_custom-full-white"
                }
              >
                {t("navbar.definition_title")}
              </NavLink>
            </li>

            <li className="rounded-11 h-12">
              <NavLink
                to="/customer"
                className={({ isActive }) =>
                  isActive
                    ? "block pl-5 text-16 rounded-md py-2 bg-custom-blue text-white dark:text-dark_custom-full-white dark:bg-dark_custom-full-black"
                    : "block pl-5 text-16 rounded-md py-2 md:text-custom-dark text-white dark:text-dark_custom-full-white"
                }
              >
                {t("navbar.customer_title")}
              </NavLink>
            </li>

            <li className="rounded-11 h-12">
              <NavLink
                to="/personnel"
                className={({ isActive }) =>
                  isActive
                    ? "block pl-5 text-16 rounded-md py-2 bg-custom-blue text-white dark:text-dark_custom-full-white dark:bg-dark_custom-full-black"
                    : "block pl-5 text-16 rounded-md py-2 md:text-custom-dark text-white dark:text-dark_custom-full-white"
                }
              >
                {t("navbar.personnel_title")}
              </NavLink>
            </li>

            <li className="rounded-11 h-12">
              <NavLink
                to="/stock"
                className={({ isActive }) =>
                  isActive
                    ? "block pl-5 text-16 rounded-md py-2 bg-custom-blue text-white dark:text-dark_custom-full-white dark:bg-dark_custom-full-black"
                    : "block pl-5 text-16 rounded-md py-2 md:text-custom-dark text-white dark:text-dark_custom-full-white"
                }
              >
                {t("navbar.stock_title")}
              </NavLink>
            </li>

            <li className="rounded-11 h-12">
              <NavLink
                to="/helpDesk"
                className={({ isActive }) =>
                  isActive
                    ? "block pl-5 text-16 rounded-md py-2 bg-custom-blue text-white dark:text-dark_custom-full-white md:dark:bg-dark_custom-full-black dark:bg-slate-800"
                    : "block pl-5 text-16 rounded-md py-2 md:text-custom-dark text-white dark:text-dark_custom-full-white"
                }
              >
                {t("navbar.helpDesk_title")}
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
