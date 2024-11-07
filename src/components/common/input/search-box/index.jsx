import { Input, Button } from "../../..";
import { RiSearch2Line } from "react-icons/ri";
// ++++++++++ images import ++++++++++
// import NextArrowIcon from "../../../../assets/images/next-arrow.png";
// import SearchIcon from "../../../../assets/images/search.png";

export const SearchBox = ({
  placeholder,
  classes,
  onChange,
  disabled,
  onSearch,
}) => {
  // ---------- render jsx ----------
  return (
    <div className={`relative w-full flex items-center ${classes}`}>
      {/* <svg
            width="22"
            height="22"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-2 top-1/2 -translate-y-1/2"
          >
            <path
              opacity="0.3"
              d="M16.9167 15.1833L14.275 12.6833C13.7728 13.33 13.1708 13.8926 12.4917 14.35L15.2084 16.9333C15.3226 17.0668 15.4638 17.1744 15.6228 17.2492C15.7817 17.324 15.9547 17.3643 16.1303 17.3673C16.3059 17.3703 16.4801 17.336 16.6415 17.2667C16.8029 17.1974 16.9478 17.0946 17.0665 16.9652C17.1852 16.8358 17.2752 16.6826 17.3303 16.5159C17.3855 16.3491 17.4047 16.1726 17.3866 15.9979C17.3685 15.8231 17.3136 15.6543 17.2254 15.5024C17.1372 15.3505 17.0178 15.219 16.875 15.1167L16.9167 15.1833Z"
              fill="#7E8299"
            />
            <path
              d="M8.28321 0.666668C6.79985 0.666668 5.3498 1.10654 4.11643 1.93065C2.88306 2.75476 1.92177 3.9261 1.35411 5.29654C0.786453 6.66699 0.637928 8.17499 0.927317 9.62985C1.21671 11.0847 1.93101 12.4211 2.97991 13.47C4.0288 14.5189 5.36517 15.2332 6.82003 15.5226C8.27489 15.8119 9.78289 15.6634 11.1533 15.0958C12.5238 14.5281 13.6951 13.5668 14.5192 12.3334C15.3433 11.1001 15.7832 9.65003 15.7832 8.16667C15.7832 6.17754 14.993 4.26989 13.5865 2.86337C12.18 1.45684 10.2723 0.666668 8.28321 0.666668ZM8.28321 13.4667C7.23697 13.4667 6.21421 13.1565 5.34418 12.5754C4.47415 11.9943 3.7959 11.1684 3.39515 10.202C2.99439 9.23551 2.88911 8.17196 3.09262 7.14571C3.29612 6.11945 3.79928 5.17656 4.5385 4.43617C5.27772 3.69579 6.21982 3.19115 7.24575 2.98603C8.27169 2.78091 9.3354 2.88451 10.3025 3.28375C11.2695 3.68299 12.0966 4.35994 12.679 5.22905C13.2615 6.09816 13.5732 7.12043 13.5749 8.16667C13.5771 8.86259 13.4418 9.55209 13.1767 10.1956C12.9117 10.839 12.5221 11.4238 12.0304 11.9163C11.5387 12.4088 10.9545 12.7992 10.3115 13.0653C9.66841 13.3314 8.97913 13.4678 8.28321 13.4667Z"
              fill="#7E8299"
            />
          </svg> */}
      <Input
        placeholder={placeholder}
        classes="!h-8 lg:!h-10 md:placeholder:text-base sm:pl-12"
        onChange={onChange}
        disabled={disabled}
        complex
      />
      {/* <Button theme="light" classes="absolute right-0 top-0 !w-20 h-full border-none rounded-48 shadow-custom-orange-light flex items-center justify-center" icon={NextArrowIcon}/> */}
      <div className="sm:flex absolute hidden left-5 top-0 h-full rounded-48 items-center justify-center shadow-custom-blue-light">
        <RiSearch2Line size={20} color="#4287f5" />
      </div>
    </div>
  );
};
