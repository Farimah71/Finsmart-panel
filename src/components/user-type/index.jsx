import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { changeUserType } from "../../redux/actions/user-type";

export const UserType = ({ setFormNumber, isShowModal }) => {
  // ----------hooks----------
  let navigate = useNavigate();
  const dispatch = useDispatch();

  // ---------- i18next ----------
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem("lng");

  // ----------functions----------
  const setUserType = (type) => {
    localStorage.setItem("userType", type);
    setFormNumber && setFormNumber(type);
  };

  // ----------render jsx----------
  return (
    <div className="bg-[url('assets/images/wave(2).png')] bg-no-repeat bg-contai dark:bg-none relative rounded-10">
      <div className="w-full flex justify-center items-center py-20">
        <div
          style={{
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
          }}
          className="w-[600px] h-[400px] bg-white rounded-10 grid grid-cols-2 dark:bg-transparent"
        >
          <div className="border-r-2 dark:border-none border-gray-200 flex justify-center items-center overflow-hidden">
            <motion.div
              onClick={() => {
                isShowModal(false);
                setUserType("1");
                dispatch(changeUserType("1"));
                localStorage.setItem("userType", 1);
              }}
              whileHover={{
                width: "100%",
                height: "100%",
                borderRadius: "0px",
                fontSize: "40px",
              }}
              className="text-2xl bg-[#0466c8] w-[70%] h-[50%] flex justify-center items-center rounded-30 cursor-pointer shadow-lg"
            >
              <p className="capitalize text-white">{t("text.startup")}</p>
            </motion.div>
          </div>
          <div className="border-gray-200 flex justify-center items-center">
            <motion.div
              onClick={() => {
                isShowModal(false);
                setUserType("2");
                dispatch(changeUserType("2"));
                localStorage.setItem("userType", 2);
              }}
              whileHover={{
                width: "100%",
                height: "100%",
                borderRadius: "0px",
                fontSize: "40px",
              }}
              whileTap={{}}
              className="text-2xl bg-custom-orange outline-none w-[70%] h-[50%] flex justify-center items-center rounded-30 cursor-pointer shadow-lg"
            >
              <p className="capitalize text-white">{t("text.investor")}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
