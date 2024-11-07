import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageBox } from "../../..";
import { useDispatch } from "react-redux";
import { logOut } from "../../../../redux/actions/auth";
import { useComponentToggle } from "../../../../hooks/useComponentToggle";
import UserProfileImage from "../../../../assets/images/avatars/user.jpg";

export const ProfileMenu = ({
  fullName,
  userEmail,
  isShow,
  onClickOutside,
  classes,
}) => {
  // ---------- hooks ----------
  const ref = useRef(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useComponentToggle(ref, onClickOutside);

  // ---------- functions ----------
  const logOutHandler = () => dispatch(logOut(navigate));

  // ---------- render jsx ----------
  return (
    <div
      className={`${classes} fixed md:translate-x-52 bg-white duration-200 ease-in-out w-72 shadow-custom-box rounded-lg inset-box z-[1000] ${
        isShow
          ? "visible opacity-100 translate-y-6"
          : "translate-y-12 opacity-0 invisible"
      }`}
      ref={ref}
    >
      <div className="flex items-start gap-x-2 border-b border-custom-gray-light p-4 rounded-t-md dark:bg-dark_custom-light-black">
        <img
          src={UserProfileImage}
          alt="user"
          className="w-12 h-12 rounded-md"
        />
        <div className="flex flex-col gap-y-1">
          <h4 className="text-16 text-custom-dark font-bold dark:text-dark_custom-full-white">
            {fullName}
          </h4>
          <span className="text-14 text-custom-gray-muted dark:text-dark_custom-light-white">
            {userEmail}
          </span>
        </div>
      </div>
      <div className="dark:bg-dark_custom-light-black rounded-b-md">
        <ul className="flex flex-col gap-y-1 border-b border-custom-gray-light p-4">
          <li>
            <Link
              to="/userProfile"
              className="block p-2 rounded-md text-14 text-custom-dark duration-200 ease-in-out hover:bg-custom-gray-light hover:text-custom-blue dark:text-dark_custom-full-white dark:hover:bg-dark_custom-full-black"
            >
              {t("profile_menu.my_profile")}
            </Link>
          </li>
          <li>
            <Link
              to=""
              className="block p-2 rounded-md text-14 text-custom-dark duration-200 ease-in-out hover:bg-custom-gray-light hover:text-custom-blue dark:text-dark_custom-full-white dark:hover:bg-dark_custom-full-black"
            >
              {t("profile_menu.my_projects")}
            </Link>
          </li>
          <li>
            <Link
              to=""
              className="block p-2 rounded-md text-14 text-custom-dark duration-200 ease-in-out hover:bg-custom-gray-light hover:text-custom-blue dark:text-dark_custom-full-white dark:hover:bg-dark_custom-full-black"
            >
              {t("profile_menu.my_statements")}
            </Link>
          </li>
        </ul>
        <ul className="flex flex-col gap-y-1 p-4 dark:bg-dark_custom-light-black rounded-b-md">
          <li className="w-full p-2 flex items-center justify-between text-14 dark:text-dark_custom-full-white">
            {t("profile_menu.language")} <LanguageBox />
          </li>
          <li>
            <Link
              to=""
              className="block p-2 rounded-md text-14 text-custom-dark duration-200 ease-in-out hover:bg-custom-gray-light hover:text-custom-blue dark:text-dark_custom-light-white dark:hover:bg-dark_custom-full-black"
            >
              {t("profile_menu.account_setting")}
            </Link>
          </li>
          <li onClick={logOutHandler} className="cursor-pointer">
            <div className="block p-2 rounded-md text-14 text-custom-dark duration-200 ease-in-out hover:bg-custom-gray-light hover:text-custom-blue dark:text-dark_custom-light-white dark:hover:bg-dark_custom-full-black">
              {t("profile_menu.sign_out")}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
