import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Footer } from "../components";
// ++++++++++ images import ++++++++++
import Logo from "../assets/images/logo.png";

export const MainLayout = () => {
  // ---------- hooks ----------
  const { t } = useTranslation();

  // ---------- render jsx ----------
  return (
    <div>
      <div className="flex h-screen overflow-hidden">
        <div className="w-full md:w-1/2 overflow-y-auto">
          <div className="bg-[url('assets/images/wave(2).png')] bg-no-repeat bg-contain relative min-h-screen overflow-hidden overflow-y-auto flex flex-col py-4 items-center justify-center gap-y-16">
            <Outlet />
            <img
              src={Logo}
              alt="logo"
              className="w-[30%] block mb-14 drop-shadow-xl md:hidden"
            />
          </div>
        </div>
        <div className="w-1/2 h-screen overflow-hidden hidden bg-custom-blue-light md:flex flex-col justify-center items-center gap-y-36">
          <img src={Logo} alt="logo" width={"400px"} className="w-[50%]" />
          <p className="px-16 text-center text-base md:text-21 text-[#0757b8]">
            {t("text.ad")}
          </p>
        </div>
      </div>
      <div className="w-full fixed bottom-0 p-4 bg-white lg:bg-opacity-50 z-50">
        <Footer />
      </div>
    </div>
  );
};
