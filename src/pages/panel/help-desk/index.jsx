import { useState, useEffect } from "react";
import { Button, SearchBox } from "../../../components";
import { useTranslation } from "react-i18next";
import { VscArrowRight } from "react-icons/vsc";
import { CgChevronRight } from "react-icons/cg";
// ++++++++++ image import +++++++++++
import helpImg from "../../../assets/images/help.png";

export const HelpDesk = () => {
  // ---------- state -----------
  const [isShow, setIsShow] = useState(false);

  // ---------- i18next ----------
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem("lng");

  // --------- variable ----------
  const navItems = [
    { label: t("navbar.overview_title"), idle: true },
    { label: t("navbar.tickets_title"), idle: false },
    { label: t("navbar.tutorials_title"), idle: false },
    { label: t("navbar.FAQ_title"), idle: false },
    { label: t("navbar.licenses_title"), idle: false },
    { label: t("navbar.contact_us_title"), idle: false },
  ];

  // --------- render jsx ------------
  return (
    <div className="bg-white rounded-10 py-10 px-10 dark:bg-dark_custom-full-black flex flex-col gap-y-10">
      <div className="flex flex-col gap-y-1">
        <h4 className="text-19 text-custom-dark font-bold dark:text-dark_custom-full-white">
          {t("page_title.help_desk")}
        </h4>
        <span className="text-14 flex gap-x-2 text-custom-gray-muted dark:text-dark_custom-light-white text-xs text-opacity-90 lg:text-base">
          {t("text.dashboard")} - {t("page_title.help_desk")}
        </span>
      </div>
      {/********** First row ************/}
      <div className="bg-white rounded-10 shadow-md dark:shadow-gray-800 border border-gray-100 dark:border-gray-700 dark:bg-dark_custom-light-black">
        <div className="flex flex-col lg:flex-row mt-8 mx-14 justify-between">
          <div className="flex flex-col lg:w-1/3 gap-y-4 mt-20">
            <span className="font-semibold text-base md:text-xl text-gray-800 dark:text-custom-gray-light mb-5">
              {t("text.help_question")}
            </span>
            <SearchBox
              classes={"w-full"}
              placeholder={t("text.ask_a_question")}
            />
          </div>
          <div className="md:w-auto lg:w-96 lg:pe-16 lg:self-end self-center">
            <img src={helpImg} alt="help" />
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-dark_custom-light-white dark:bg-opacity-5 p-6 rounded-10 flex flex-col lg:flex-row-reverse justify-between items-baseline">
          <Button
            classes={"self-center"}
            title={t("button.create_ticket_title")}
          />
          <div className="flex flex-col items-center w-full lg:flex-row lg:gap-x-3">
            {navItems.map((item) => (
              <span
                key={item.label}
                className={`uppercase text-xs lg:text-sm font-bold cursor-pointer hover:text-custom-blue dark:hover:text-custom-blue xl:px-7 py-3 dark:rounded-md ${
                  item.idle
                    ? "text-custom-blue dark:bg-dark_custom-full-white dark:bg-opacity-5"
                    : "text-gray-600 text-opacity-70 dark:text-gray-400 dark:hover:bg-dark_custom-full-white dark:hover:bg-opacity-5"
                }`}
              >
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/********** Second row ************/}
      <div className="flex flex-col lg:flex-row justify-between gap-10">
        {/*************** left card *************/}
        <div className="w-full lg:w-1/2 bg-white rounded-10 lg:px-16 px-5 pb-14 shadow-md dark:shadow-gray-800 border border-gray-100 dark:border-gray-700 dark:bg-dark_custom-light-black">
          <div className="py-10 flex justify-between">
            <span className="font-semibold text-base lg:text-xl text-gray-800 dark:text-custom-gray-light capitalize">
              Popular tickets
            </span>
            <div className="flex gap-x-2 mt-2 cursor-pointer">
              <span className="text-custom-blue text-sm font-semibold">
                Support
              </span>
              <VscArrowRight color="#049CDB" className="mt-0.5" />
            </div>
          </div>
          <div className="flex flex-col gap-y-8">
            <div className="flex flex-col">
              <div className="flex gap-x-2" onClick={() => setIsShow(!isShow)}>
                <CgChevronRight
                  color={isShow ? "#049CDB" : "gray"}
                  size={20}
                  className={`mt-1 ${isShow && "rotate-90"}`}
                />
                <p className="dark:text-dark_custom-light-white text-sm lg:text-base cursor-pointer">
                  What admin theme does?
                </p>
                <span className="h-fit py-1 px-2 bg-gray-100 rounded-xl text-xs lg:text-sm dark:text-gray-400 dark:bg-gray-700">
                  React
                </span>
              </div>
              <p
                className={`text-gray-400 pl-7 text-sm lg:text-base ease duration-500 transition-all max-h-0 overflow-hidden ${
                  isShow && "max-h-20 duration-700"
                }`}
              >
                By Keenthemes to save tons and more to time money projects are
                listed and outstanding{" "}
                <span className="text-custom-blue cursor-pointer">
                  Check Out
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-y-3">
              <div
                className="flex gap-x-2"
                // onClick={() => setIsShow(!isShow)}
              >
                <CgChevronRight
                  // color={isShow ? "#049CDB" : "gray"}
                  color="gray"
                  size={20}
                  // className={`mt-1 ${isShow && "rotate-90"}`}
                  className="mt-1"
                />
                <p className="dark:text-dark_custom-light-white text-sm lg:text-base cursor-pointer">
                  How Extended Licese works?
                </p>
                <span className="h-fit py-1 px-2 bg-gray-100 rounded-xl text-xs lg:text-sm dark:text-gray-400 dark:bg-gray-700">
                  Laravel
                </span>
              </div>
              {/* {isShow && ( */}
              {/* <p className="text-gray-400 pl-7">
                By Keenthemes to save tons and more to time money projects are
                listed and outstanding{" "}
                <span className="text-custom-blue cursor-pointer">
                  Check Out
                </span>
              </p> */}
              {/* )} */}
            </div>
            <div className="flex flex-col gap-y-3">
              <div
                className="flex gap-x-2"
                // onClick={() => setIsShow(!isShow)}
              >
                <CgChevronRight
                  // color={isShow ? "#049CDB" : "gray"}
                  color="gray"
                  size={20}
                  // className={`mt-1 ${isShow && "rotate-90"}`}
                  className="mt-1"
                />
                <p className="dark:text-dark_custom-light-white text-sm lg:text-base cursor-pointer">
                  How to install on a local machine?{" "}
                </p>
                <span className="h-fit py-1 px-2 bg-gray-100 rounded-xl text-xs lg:text-sm dark:text-gray-400 dark:bg-gray-700">
                  VueJS
                </span>
              </div>
              {/* {isShow && ( */}
              {/* <p className="text-gray-400 pl-7">
                By Keenthemes to save tons and more to time money projects are
                listed and outstanding{" "}
                <span className="text-custom-blue cursor-pointer">
                  Check Out
                </span>
              </p> */}
              {/* )} */}
            </div>
            <div className="flex flex-col gap-y-3">
              <div
                className="flex gap-x-2"
                // onClick={() => setIsShow(!isShow)}
              >
                <CgChevronRight
                  // color={isShow ? "#049CDB" : "gray"}
                  color="gray"
                  size={20}
                  // className={`mt-1 ${isShow && "rotate-90"}`}
                  className="mt-1"
                />
                <p className="dark:text-dark_custom-light-white text-sm lg:text-base cursor-pointer">
                  How can I import Google fonts?
                </p>
                <span className="h-fit py-1 px-2 bg-gray-100 rounded-xl text-xs lg:text-sm dark:text-gray-400 dark:bg-gray-700">
                  Angular 9
                </span>
              </div>
              {/* {isShow && ( */}
              {/* <p className="text-gray-400 pl-7">
                By Keenthemes to save tons and more to time money projects are
                listed and outstanding{" "}
                <span className="text-custom-blue cursor-pointer">
                  Check Out
                </span>
              </p> */}
              {/*  )} */}
            </div>
            <div className="flex flex-col gap-y-3">
              <div
                className="flex gap-x-2"
                // onClick={() => setIsShow(!isShow)}
              >
                <CgChevronRight
                  // color={isShow ? "#049CDB" : "gray"}
                  color="gray"
                  size={20}
                  // className={`mt-1 ${isShow && "rotate-90"}`}
                  className="mt-1"
                />
                <p className="dark:text-dark_custom-light-white text-sm lg:text-base cursor-pointer">
                  How long the license is valid?{" "}
                </p>
                <span className="h-fit py-1 px-2 bg-gray-100 rounded-xl text-xs lg:text-sm dark:text-gray-400 dark:bg-gray-700">
                  Bootstrap 5
                </span>
              </div>
              {/* {isShow && ( */}
              {/* <p className="text-gray-400 pl-7">
                By Keenthemes to save tons and more to time money projects are
                listed and outstanding{" "}
                <span className="text-custom-blue cursor-pointer">
                  Check Out
                </span>
              </p> */}
              {/* )} */}
            </div>
          </div>
        </div>
        {/*************** right card *************/}
        <div className="w-full lg:w-1/2 bg-white rounded-10 lg:px-16 px-5 pb-14 shadow-md dark:shadow-gray-800 border border-gray-100 dark:border-gray-700 dark:bg-dark_custom-light-black">
          <div className="py-10 flex justify-between">
            <span className="font-semibold text-base lg:text-xl text-gray-800 dark:text-custom-gray-light capitalize">
              FAQ
            </span>
            <div className="flex gap-x-2 mt-2 cursor-pointer">
              <span className="text-custom-blue text-sm font-semibold">
                Full FAQ
              </span>
              <VscArrowRight color="#049CDB" className="mt-0.5" />
            </div>
          </div>
          <div className="flex flex-col gap-y-8">
            <div className="flex flex-col gap-y-3">
              <div className="flex gap-x-2">
                <CgChevronRight
                  // color={isShow ? "#049CDB" : "gray"}
                  color="gray"
                  size={20}
                  // className={`mt-1 ${isShow && "rotate-90"}`}
                  className="mt-1"
                />
                <p className="dark:text-dark_custom-light-white text-sm lg:text-base cursor-pointer">
                  What admin theme does?
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-3">
              <div
                className="flex gap-x-2"
                // onClick={() => setIsShow(!isShow)}
              >
                <CgChevronRight
                  // color={isShow ? "#049CDB" : "gray"}
                  color="gray"
                  size={20}
                  // className={`mt-1 ${isShow && "rotate-90"}`}
                  className="mt-1"
                />
                <p className="dark:text-dark_custom-light-white text-sm lg:text-base cursor-pointer">
                  How Extended Licese works?
                </p>
              </div>
              {/* {isShow && ( */}
              {/* <p className="text-gray-400 pl-7">
                By Keenthemes to save tons and more to time money projects are
                listed and outstanding{" "}
                <span className="text-custom-blue cursor-pointer">
                  Check Out
                </span>
              </p> */}
              {/* )} */}
            </div>
            <div className="flex flex-col gap-y-3">
              <div
                className="flex gap-x-2"
                // onClick={() => setIsShow(!isShow)}
              >
                <CgChevronRight
                  // color={isShow ? "#049CDB" : "gray"}
                  color="gray"
                  size={20}
                  // className={`mt-1 ${isShow && "rotate-90"}`}
                  className="mt-1"
                />
                <p className="dark:text-dark_custom-light-white text-sm lg:text-base cursor-pointer">
                  How to install on a local machine?
                </p>
              </div>
              {/* {isShow && ( */}
              {/* <p className="text-gray-400 pl-7">
                By Keenthemes to save tons and more to time money projects are
                listed and outstanding{" "}
                <span className="text-custom-blue cursor-pointer">
                  Check Out
                </span>
              </p> */}
              {/* )} */}
            </div>
            <div className="flex flex-col gap-y-3">
              <div
                className="flex gap-x-2"
                // onClick={() => setIsShow(!isShow)}
              >
                <CgChevronRight
                  // color={isShow ? "#049CDB" : "gray"}
                  color="gray"
                  size={20}
                  // className={`mt-1 ${isShow && "rotate-90"}`}
                  className="mt-1"
                />
                <p className="dark:text-dark_custom-light-white text-sm lg:text-base cursor-pointer">
                  How can I import Google fonts?
                </p>
              </div>
              {/* {isShow && ( */}
              {/* <p className="text-gray-400 pl-7">
                By Keenthemes to save tons and more to time money projects are
                listed and outstanding{" "}
                <span className="text-custom-blue cursor-pointer">
                  Check Out
                </span>
              </p> */}
              {/*  )} */}
            </div>
            <div className="flex flex-col gap-y-3">
              <div
                className="flex gap-x-2"
                // onClick={() => setIsShow(!isShow)}
              >
                <CgChevronRight
                  // color={isShow ? "#049CDB" : "gray"}
                  color="gray"
                  size={20}
                  // className={`mt-1 ${isShow && "rotate-90"}`}
                  className="mt-1"
                />
                <p className="dark:text-dark_custom-light-white text-sm lg:text-base cursor-pointer">
                  How long the license is valid?
                </p>
              </div>
              {/* {isShow && ( */}
              {/* <p className="text-gray-400 pl-7">
                By Keenthemes to save tons and more to time money projects are
                listed and outstanding{" "}
                <span className="text-custom-blue cursor-pointer">
                  Check Out
                </span>
              </p> */}
              {/* )} */}
            </div>
          </div>
        </div>
      </div>

      {/********** Third row ************/}
      <div className="flex flex-col lg:flex-row justify-between gap-10">
        {/*************** left card *************/}
        <div className="w-full lg:w-1/2 bg-white rounded-10 lg:px-16 px-5 pb-14 shadow-md dark:shadow-gray-800 border border-gray-100 dark:border-gray-700 dark:bg-dark_custom-light-black">
          <div className="py-10 flex justify-between">
            <span className="font-semibold text-base lg:text-xl text-gray-800 dark:text-custom-gray-light capitalize">
              Tutorials
            </span>
            <div className="flex gap-x-2 mt-2 cursor-pointer">
              <span className="text-custom-blue text-sm font-semibold">
                All Tutorials
              </span>
              <VscArrowRight color="#049CDB" className="mt-0.5" />
            </div>
          </div>
          <div className="flex flex-col gap-y-8">
            <div className="flex flex-col gap-y-3">
              <div className="flex gap-x-2">
                <CgChevronRight
                  // color={isShow ? "#049CDB" : "gray"}
                  color="gray"
                  size={20}
                  // className={`mt-1 ${isShow && "rotate-90"}`}
                  className="mt-1"
                />
                <p className="dark:text-dark_custom-light-white text-sm lg:text-base cursor-pointer">
                  What admin theme does?
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-3">
              <div
                className="flex gap-x-2"
                // onClick={() => setIsShow(!isShow)}
              >
                <CgChevronRight
                  // color={isShow ? "#049CDB" : "gray"}
                  color="gray"
                  size={20}
                  // className={`mt-1 ${isShow && "rotate-90"}`}
                  className="mt-1"
                />
                <p className="dark:text-dark_custom-light-white text-sm lg:text-base cursor-pointer">
                  How Extended Licese works?
                </p>
              </div>
              {/* {isShow && ( */}
              {/* <p className="text-gray-400 pl-7">
                By Keenthemes to save tons and more to time money projects are
                listed and outstanding{" "}
                <span className="text-custom-blue cursor-pointer">
                  Check Out
                </span>
              </p> */}
              {/* )} */}
            </div>
            <div className="flex flex-col gap-y-3">
              <div
                className="flex gap-x-2"
                // onClick={() => setIsShow(!isShow)}
              >
                <CgChevronRight
                  // color={isShow ? "#049CDB" : "gray"}
                  color="gray"
                  size={20}
                  // className={`mt-1 ${isShow && "rotate-90"}`}
                  className="mt-1"
                />
                <p className="dark:text-dark_custom-light-white text-sm lg:text-base cursor-pointer">
                  How to install on a local machine?
                </p>
              </div>
              {/* {isShow && ( */}
              {/* <p className="text-gray-400 pl-7">
                By Keenthemes to save tons and more to time money projects are
                listed and outstanding{" "}
                <span className="text-custom-blue cursor-pointer">
                  Check Out
                </span>
              </p> */}
              {/* )} */}
            </div>
            <div className="flex flex-col gap-y-3">
              <div
                className="flex gap-x-2"
                // onClick={() => setIsShow(!isShow)}
              >
                <CgChevronRight
                  // color={isShow ? "#049CDB" : "gray"}
                  color="gray"
                  size={20}
                  // className={`mt-1 ${isShow && "rotate-90"}`}
                  className="mt-1"
                />
                <p className="dark:text-dark_custom-light-white text-sm lg:text-base cursor-pointer">
                  How can I import Google fonts?
                </p>
              </div>
              {/* {isShow && ( */}
              {/* <p className="text-gray-400 pl-7">
                By Keenthemes to save tons and more to time money projects are
                listed and outstanding{" "}
                <span className="text-custom-blue cursor-pointer">
                  Check Out
                </span>
              </p> */}
              {/*  )} */}
            </div>
            <div className="flex flex-col gap-y-3">
              <div
                className="flex gap-x-2"
                // onClick={() => setIsShow(!isShow)}
              >
                <CgChevronRight
                  // color={isShow ? "#049CDB" : "gray"}
                  color="gray"
                  size={20}
                  // className={`mt-1 ${isShow && "rotate-90"}`}
                  className="mt-1"
                />
                <p className="dark:text-dark_custom-light-white text-sm lg:text-base cursor-pointer">
                  How long the license is valid?
                </p>
              </div>
              {/* {isShow && ( */}
              {/* <p className="text-gray-400 pl-7">
                By Keenthemes to save tons and more to time money projects are
                listed and outstanding{" "}
                <span className="text-custom-blue cursor-pointer">
                  Check Out
                </span>
              </p> */}
              {/* )} */}
            </div>
          </div>
        </div>
        {/*************** right card *************/}
        <div className="w-full lg:w-1/2 bg-white rounded-10 lg:px-16 px-5 pb-14 shadow-md dark:shadow-gray-800 border border-gray-100 dark:border-gray-700 dark:bg-dark_custom-light-black">
          <div className="py-10 flex justify-between">
            <span className="text-base lg:text-xl font-semibold text-gray-800 dark:text-custom-gray-light capitalize">
              Videos
            </span>
            <div className="flex gap-x-2 mt-2 cursor-pointer">
              <span className="text-custom-blue text-sm font-semibold">
                All Videos
              </span>
              <VscArrowRight color="#049CDB" className="mt-0.5" />
            </div>
          </div>
          <div className="flex flex-col gap-y-8">
            <video className="w-full h-full" controls>
              {/* <source src="movie.mp4" type="video/mp4" />
              <source src="movie.ogg" type="video/ogg" /> */}
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>

      {/********** Fourth row ************/}
      <div className="bg-white rounded-10 lg:px-16 px-5 pb-14 shadow-md dark:shadow-gray-800 border border-gray-100 dark:border-gray-700 dark:bg-dark_custom-light-black">
        <p className="mt-8 font-semibold text-base lg:text-xl text-gray-800 dark:text-custom-gray-light capitalize">
          Products Documentation
        </p>
        <div className="flex flex-col md:flex-row md:gap-x-5 mt-8 gap-y-5">
          <div className="w-full flex flex-col gap-y-5">
            <div className="flex gap-x-2">
              <CgChevronRight color="gray" size={20} className="mt-1" />
              <p className=" dark:text-dark_custom-light-white text-xs lg:text-base cursor-pointer hover:text-custom-blue dark:hover:text-custom-blue">
                Free Admin Dashboard
              </p>
            </div>
            <div className="flex gap-x-2">
              <CgChevronRight color="gray" size={20} className="mt-1" />
              <p className=" dark:text-dark_custom-light-white text-xs lg:text-base cursor-pointer hover:text-custom-blue dark:hover:text-custom-blue">
                Bootstrap 5 Admin Template
              </p>
            </div>
            <div className="flex gap-x-2">
              <CgChevronRight color="gray" size={20} className="mt-1" />
              <p className=" dark:text-dark_custom-light-white text-xs lg:text-base cursor-pointer hover:text-custom-blue dark:hover:text-custom-blue">
                Google Admin Dashboard
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col gap-y-5">
            <div className="flex gap-x-2">
              <CgChevronRight color="gray" size={20} className="mt-1" />
              <p className=" dark:text-dark_custom-light-white text-xs lg:text-base cursor-pointer hover:text-custom-blue dark:hover:text-custom-blue">
                Free Vector Laravel Starter Kit
              </p>
            </div>
            <div className="flex gap-x-2">
              <CgChevronRight color="gray" size={20} className="mt-1" />
              <p className=" dark:text-dark_custom-light-white text-xs lg:text-base cursor-pointer hover:text-custom-blue dark:hover:text-custom-blue">
                React Admin Dashboard
              </p>
            </div>
            <div className="flex gap-x-2">
              <CgChevronRight color="gray" size={20} className="mt-1" />
              <p className=" dark:text-dark_custom-light-white text-xs lg:text-base cursor-pointer hover:text-custom-blue dark:hover:text-custom-blue">
                HTML Admin Dashboard
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col gap-y-5">
            <div className="flex gap-x-2">
              <CgChevronRight color="gray" size={20} className="mt-1" />
              <p className=" dark:text-dark_custom-light-white text-xs lg:text-base cursor-pointer hover:text-custom-blue dark:hover:text-custom-blue">
                Best VueJS Admin Template
              </p>
            </div>
            <div className="flex gap-x-2">
              <CgChevronRight color="gray" size={20} className="mt-1" />
              <p className=" dark:text-dark_custom-light-white text-xs lg:text-base cursor-pointer hover:text-custom-blue dark:hover:text-custom-blue">
                Forest Front-end Template
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
