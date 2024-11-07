import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "../navbar";
import Popup from "reactjs-popup";

export const CurtainMenu = ({ isShow, closeModalHandler }) => {
  // ----------- hooks ----------
  const location = useLocation();

  // ----------- lifeCycle ----------
  useEffect(() => {
    closeModalHandler();
  }, [location.pathname]);

  // ---------- render JSX ----------
  return (
    <Popup
      open={isShow}
      onClose={closeModalHandler}
      closeOnDocumentClick
      className="dark:bg-dark_custom-average-black z-[2000]"
      contentStyle={{
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <div
        className="cursor-pointer text-dark_custom-light-white md:text-black dark:text-dark_custom-full-white"
        onClick={closeModalHandler}
      >
        <svg
          className="dark:text-dark_custom-full-white"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            opacity="0.5"
            x="6"
            y="17.3137"
            width="16"
            height="2"
            rx="1"
            transform="rotate(-45 6 17.3137)"
            fill="currentColor"
          />
          <rect
            x="7.41422"
            y="6"
            width="16"
            height="2"
            rx="1"
            transform="rotate(45 7.41422 6)"
            fill="currentColor"
          />
        </svg>
      </div>
      <div className="md:w-1/2 mx-auto mt-10 overflow-y-scroll no-scroll h-full">
        <Navbar />
      </div>
    </Popup>
  );
};
