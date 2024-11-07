import { useEffect, useState } from "react";
import { ProfileMenu } from "../..";
import { getDataFromJwtToken } from "../../../helpers/get-data-from-jwt";
import { getDataFromLocalStorage } from "../../../helpers/get-data-from-local";
// ++++++++++ images import ++++++++++
import UserProfileImage from "../../../assets/images/avatars/user.jpg";

export const UserProfile = ({ userName, role }) => {
  // ---------- state ----------
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
  });
  const [isShowProfileMenu, setIsShowProfileMenu] = useState(false);

  // ---------- lifeCycle ----------
  useEffect(() => {
    setUserInfo({
      fullName: getDataFromLocalStorage("userFullTitle"),
      email: getDataFromJwtToken("email"),
    });
  }, []);

  // ---------- functions ----------
  const toggleProfileMenu = () => {
    setIsShowProfileMenu((currState) => !currState);
  };

  // ---------- render jsx ----------
  return (
    <div className="flex items-center gap-x-2 pb-4 px-4 border-b border-custom-gray-light select-none">
      <ProfileMenu
        fullName={userInfo.fullName}
        userEmail={userInfo.email}
        isShow={isShowProfileMenu}
        onClickOutside={() => setIsShowProfileMenu(false)}
      />
      <div className="rounded-md w-12 h-12 overflow-hidden">
        <img src={UserProfileImage} alt="profile" className="w-full" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="text-16 text-custom-dark font-semibold dark:text-dark_custom-full-white">
            {userInfo.fullName}
          </h4>
          <div className="cursor-pointer" onClick={toggleProfileMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                opacity="0.3"
                d="M13.4533 6.16048H12.5266C12.3614 5.74577 12.1369 5.35726 11.8599 5.00715L12.3133 4.22048C12.4755 3.93639 12.5188 3.59971 12.4339 3.28379C12.349 2.96787 12.1427 2.6983 11.8599 2.53381L10.7733 1.90715C10.6328 1.82595 10.4777 1.77326 10.3169 1.7521C10.156 1.73094 9.99255 1.74172 9.83587 1.78383C9.67919 1.82594 9.53236 1.89856 9.40379 1.99751C9.27521 2.09646 9.16743 2.2198 9.0866 2.36048L8.6266 3.16048C8.41908 3.12921 8.20976 3.11139 7.99994 3.10715C7.79026 3.10919 7.58094 3.12477 7.37327 3.15381L6.9266 2.36048C6.76563 2.0759 6.49824 1.86688 6.18321 1.77937C5.86818 1.69186 5.53129 1.73303 5.2466 1.89381L4.15327 2.51381C3.86869 2.67479 3.65967 2.94218 3.57216 3.25721C3.48466 3.57224 3.52582 3.90912 3.6866 4.19381L4.13994 5.00048C3.86695 5.34842 3.64266 5.73195 3.47327 6.14048H2.57327C2.41082 6.13781 2.24947 6.16762 2.0987 6.22816C1.94793 6.28869 1.81076 6.37873 1.69526 6.49299C1.57975 6.60726 1.48823 6.74344 1.42607 6.89355C1.36391 7.04366 1.33236 7.20468 1.33327 7.36715V8.62048C1.33239 8.78244 1.36343 8.943 1.4246 9.09297C1.48577 9.24294 1.57588 9.37939 1.68979 9.49454C1.80369 9.60968 1.93917 9.70126 2.08847 9.76405C2.23777 9.82684 2.39797 9.85961 2.55994 9.86048H3.47327C3.64033 10.2702 3.8648 10.654 4.13994 11.0005L3.67994 11.7871C3.59889 11.9271 3.54632 12.0817 3.52525 12.242C3.50418 12.4024 3.51502 12.5653 3.55715 12.7214C3.59928 12.8776 3.67188 13.0238 3.77075 13.1518C3.86962 13.2798 3.99283 13.387 4.13327 13.4671L5.21994 14.1005C5.3604 14.1817 5.5155 14.2344 5.67635 14.2555C5.83721 14.2767 6.00066 14.2659 6.15734 14.2238C6.31402 14.1817 6.46085 14.1091 6.58942 14.0101C6.71799 13.9112 6.82578 13.7878 6.9066 13.6471L7.3666 12.8471C7.57615 12.8795 7.78792 12.8951 7.99994 12.8938C8.22291 12.8921 8.44556 12.8765 8.6666 12.8471L9.11994 13.6338C9.20012 13.7743 9.30728 13.8975 9.43526 13.9963C9.56324 14.0952 9.7095 14.1678 9.86564 14.2099C10.0218 14.2521 10.1847 14.2629 10.3451 14.2418C10.5054 14.2208 10.66 14.1682 10.7999 14.0871L11.8866 13.4605C12.0276 13.3809 12.1515 13.2741 12.251 13.1464C12.3505 13.0187 12.4238 12.8725 12.4666 12.7163C12.5093 12.5601 12.5207 12.397 12.5001 12.2364C12.4796 12.0758 12.4274 11.9208 12.3466 11.7805L11.8866 10.9805C12.1539 10.6407 12.3779 10.2689 12.5533 9.87381H13.4533C13.7713 9.86547 14.0741 9.73586 14.2997 9.51153C14.5252 9.2872 14.6565 8.98512 14.6666 8.66715V7.40715C14.6702 7.08118 14.5445 6.76706 14.3172 6.53345C14.0898 6.29984 13.7792 6.16575 13.4533 6.16048Z"
                fill="#A1A5B7"
              />
              <path
                d="M7.99333 10.1673C9.18994 10.1673 10.16 9.19727 10.16 8.00065C10.16 6.80403 9.18994 5.83398 7.99333 5.83398C6.79671 5.83398 5.82666 6.80403 5.82666 8.00065C5.82666 9.19727 6.79671 10.1673 7.99333 10.1673Z"
                fill="#A1A5B7"
              />
            </svg>
          </div>
        </div>
        <span className="text-14 text-custom-gray-muted dark:text-dark_custom-light-white">
          Employee
        </span>
      </div>
    </div>
  );
};
