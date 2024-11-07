import { useState, useEffect } from "react";
import { HeaderToolbar, ProfileMenu } from "..";
import { CurtainMenu } from "../curtain-menu";
import { getDataFromJwtToken } from "../../helpers/get-data-from-jwt";
import { getDataFromLocalStorage } from "../../helpers/get-data-from-local";
// ++++++++++ images import ++++++++++
import { IoMenu } from "react-icons/io5";
import { FaUserCog } from "react-icons/fa";
import Logo from "../../assets/images/logo.png";

export const HeaderWrapper = ({ toggleSidebar, isShowSidebar }) => {
  // ----------- states ----------
  const [isShowOverlay, setIsShowOverlay] = useState(false);
  const [isShowProfileMenu, setIsShowProfileMenu] = useState(false);
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
  });

  // ---------- lifeCycle ----------
  useEffect(() => {
    setUserInfo({
      fullName: getDataFromLocalStorage("userFullTitle"),
      email: getDataFromJwtToken("email"),
    });
  }, []);

  // ----------- functions ---------
  const closeModalHandler = () => {
    setIsShowOverlay(false);
  };
  const toggleProfileMenu = () => {
    setIsShowProfileMenu((currState) => !currState);
  };

  // ----------- render jsx ---------
  return (
    <>
      <CurtainMenu
        isShow={isShowOverlay}
        closeModalHandler={closeModalHandler}
      />
      <ProfileMenu
        classes={"top-8"}
        fullName={userInfo.fullName}
        userEmail={userInfo.email}
        isShow={isShowProfileMenu}
        onClickOutside={() => setIsShowProfileMenu(false)}
      />

      <header className="w-full h-74 flex items-stretch gap-x-2 bg-white shadow-custom-box dark:bg-dark_custom-light-black">
        <span className="self-center ml-6 md:hidden dark:text-gray-400 cursor-pointer">
          <IoMenu size={20} onClick={() => setIsShowOverlay(true)} />
        </span>
        <span className="md:hidden self-center cursor-pointer">
          <FaUserCog size={22} color="gray" onClick={toggleProfileMenu} />
        </span>
        <div className="w-265 md:flex hidden border-r border-b border-custom-gray-light items-center justify-between px-4 dark:bg-dark_custom-average-black dark:border-r-0 dark:border-b-0">
          <img src={Logo} alt="logo" className="w-32" />
          <div className="cursor-pointer" onClick={toggleSidebar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="23"
              viewBox="0 0 17 18"
              fill="none"
              className={`${isShowSidebar ? "rotate-0" : "rotate-180"}`}
            >
              <path
                opacity="0.3"
                d="M5.625 3.99961C5.66401 3.12424 6.04613 2.29944 6.68868 1.70368C7.33123 1.10792 8.18252 0.789123 9.05833 0.816279H12.6667C13.5481 0.78013 14.408 1.09489 15.0578 1.69159C15.7076 2.28829 16.0944 3.11826 16.1333 3.99961V13.9996C16.0965 14.8824 15.7107 15.7145 15.0606 16.313C14.4106 16.9115 13.5495 17.2274 12.6667 17.1913H9.05833C8.18113 17.2184 7.32863 16.8985 6.68585 16.3009C6.04307 15.7034 5.66188 14.8765 5.625 13.9996V3.99961Z"
                fill="#A1A5B7"
              />
              <path
                d="M11.2583 8.37446H2.99997L4.37497 7.00779C4.49201 6.8906 4.55775 6.73175 4.55775 6.56612C4.55775 6.4005 4.49201 6.24164 4.37497 6.12446C4.31766 6.06676 4.24949 6.02097 4.17441 5.98972C4.09932 5.95847 4.0188 5.94238 3.93747 5.94238C3.85614 5.94238 3.77562 5.95847 3.70053 5.98972C3.62545 6.02097 3.55729 6.06676 3.49997 6.12446L1.04997 8.55779C0.932929 8.67498 0.867188 8.83383 0.867188 8.99946C0.867188 9.16508 0.932929 9.32393 1.04997 9.44112L3.49997 11.8745C3.55739 11.9333 3.62612 11.9798 3.70203 12.0113C3.77794 12.0429 3.85945 12.0587 3.94164 12.0578C4.02375 12.0582 4.10512 12.0422 4.18097 12.0107C4.25681 11.9792 4.3256 11.9329 4.3833 11.8745C4.50035 11.7573 4.56609 11.5984 4.56609 11.4328C4.56609 11.2672 4.50035 11.1083 4.3833 10.9911L2.99997 9.62446H11.2583C11.4241 9.62446 11.583 9.55861 11.7002 9.4414C11.8175 9.32419 11.8833 9.16522 11.8833 8.99946C11.8833 8.8337 11.8175 8.67472 11.7002 8.55751C11.583 8.4403 11.4241 8.37446 11.2583 8.37446Z"
                fill="#A1A5B7"
              />
            </svg>
          </div>
        </div>
        <HeaderToolbar />
      </header>
    </>
  );
};
