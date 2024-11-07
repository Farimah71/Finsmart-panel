import { useEffect, useState } from "react";
import { Sidebar, HeaderWrapper } from "../components";
import { useDispatch } from "react-redux";
import { changeUserType } from "../redux/actions/user-type";
import { getDataFromJwtToken } from "../helpers/get-data-from-jwt";
import { getCompany } from "../redux/actions/settings/company";
import { Outlet, useLocation } from "react-router-dom";

export const PanelLayout = () => {
  // ----------hooks----------
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  // ---------- state ----------
  const [isShowSidebar, setIsShowSidebar] = useState(true);

  // ---------- functions ----------
  const toggleSidebar = () => setIsShowSidebar((currState) => !currState);

  // ----------lifecycle----------
  useEffect(() => {
    dispatch(changeUserType(localStorage.getItem("userType")));
    if (getDataFromJwtToken("CompanyId")) {
      dispatch(
        getCompany({
          filters: [
            {
              property: "CompanyId",
              operation: 5,
              values: [`${getDataFromJwtToken("CompanyId")}`],
            },
          ],
          includeProperties:
            "Country,CompanyActivityCategory,City,Sector,CompanyContacts",
        })
      );
    }
  }, []);
  useEffect(() => {
    const top_element = document.getElementById("top");
    top_element.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  // ---------- render jsx ----------
  return (
    <section className="h-screen flex flex-col overflow-hidden dark:bg-dark_custom-average-black">
      <HeaderWrapper
        toggleSidebar={toggleSidebar}
        isShowSidebar={isShowSidebar}
      />

      <section
        className={`relative w-full h-screen flex gap-y-12 overflow-y-auto`}
      >
        <Sidebar isShow={isShowSidebar} />
        <div
          id="top"
          className={`relative p-6 duration-500 ease-in-out w-full overflow-x-hidden dark:bg-[#343a40] ${
            !isShowSidebar ? "md:left-0" : "md:left-265 md:w-[calc(100%-265px)]"
          }`}
        >
          <Outlet />
        </div>
      </section>
    </section>
  );
};
