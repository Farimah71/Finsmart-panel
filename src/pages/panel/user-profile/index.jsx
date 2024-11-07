import React, { useState } from "react";
import { Button } from "../../../components";
import { useTranslation } from "react-i18next";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { getDataFromLocalStorage } from "../../../helpers/get-data-from-local";
import { getDataFromJwtToken } from "../../../helpers/get-data-from-jwt";
import UserProfileImage from "../../../assets/images/avatars/user.jpg";
import { FaAngleDown } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";
import { RiFileAddFill } from "react-icons/ri";
import { VscSettings } from "react-icons/vsc";
import { FcGoogle } from "react-icons/fc";
import { FaToggleOn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid"

export const UserProfilePage = () => {
  // ----------store---------
  const [isShowDetail, setIsShowDetail] = useState(true);

  // ---------- i18next ----------
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem("lng");

  // ----------variables----------
  const data = [
    {
      Id: 1,
      Subject: 'Meeting',
      StartTime: new Date(2023, 1, 15, 10, 0),
      EndTime: new Date(2023, 1, 15, 12, 30),
    },
  ];

  // ----------render jsx----------
  return (
    <div className="dark:bg-dark_custom-light-black rounded-10 overflow-hidden">
      <div className="flex flex-col gap-y-8 w-full p-6 pb-4 bg-white dark:bg-dark_custom-light-black">
        <div className="flex justify-between items-center dark:bg-dark_custom-light-black">
          <div className="flex flex-col gap-y-1">
            <h4 className="text-19 text-custom-dark font-bold dark:text-dark_custom-full-white">
              {t("page_title.profile")}
            </h4>
            <h4 className="text-14 flex gap-x-2 text-custom-gray-muted dark:text-dark_custom-light-white">
              {t("text.dashboard")}-{t("text.profile")}
            </h4>
          </div>
          <div>
            <Button
              theme="dark"
              type="button"
              title={t("button.create_title")}
              classes="px-4"
            />
          </div>
        </div>
        <div className="w-full grid grid-cols-3 gap-10">
          <div className="w-full col-span-1">
            <div className="w-full h-fit p-6 pt-10 border rounded-10">
              <div className="w-full flex flex-col items-center">
                <img
                  className="w-24 h-24 rounded-full"
                  src={UserProfileImage}
                  alt=""
                />
                <p className="mt-4 text-xl font-semibold capitalize">
                  {getDataFromLocalStorage("userFullTitle")}
                </p>
                <div className="px-2 py-1 bg-custom-blue-light rounded-md mt-2">
                  <p className="text-sm text-custom-blue font-semibold capitalize">
                    Employee
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <div className="w-full flex justify-between items-center pb-4 border-b">
                  <div
                    onClick={() => setIsShowDetail(!isShowDetail)}
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    <p className="text-lg font-semibold">Detail</p>
                    {isShowDetail ? (
                      <IoIosArrowUp className="w-5 h-5 text-custom-gray-muted" />
                    ) : (
                      <IoIosArrowDown className="w-5 h-5 text-custom-gray-muted" />
                    )}
                  </div>
                  <div>
                    <Button
                      theme={"light"}
                      type="button"
                      title={t("popup.edit")}
                      classes="w-4 h-10 text-sm"
                    />
                  </div>
                </div>
                <div className={`${isShowDetail ? "block" : "hidden"}`}>
                  <div className="mt-4">
                    <p className="font-semibold capitalize">account id</p>
                    <p className="text-custom-gray-muted capitalize">id-454534</p>
                  </div>

                  <div className="mt-4">
                    <p className="font-semibold capitalize">email</p>
                    <p className="text-custom-gray-muted capitalize">
                      {getDataFromJwtToken("email")}
                    </p>
                  </div>

                  <div className="mt-4">
                    <p className="font-semibold capitalize">language</p>
                    <p className="text-custom-gray-muted capitalize">english</p>
                  </div>

                  <div className="mt-4">
                    <p className="font-semibold capitalize">address</p>
                    <p className="text-custom-gray-muted">101 collin street</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-fit p-4 border rounded-10 mt-10">
              <div>
                <p className="text-lg font-semibold capitalize">connected account</p>
              </div>
              <div className="w-full p-6 bg-custom-blue-light border border-dashed border-custom-blue mt-6 rounded-10">
                <p className="text-custom-gray-dark">by connecting an account , you hereby agree to our <span className="text-custom-blue">privacy policy</span> and <span className="text-custom-blue">terms of use</span></p>
              </div>
              <div className="w-full mt-6">
                <div className="w-full flex justify-between items-center py-4">
                  <div className="flex items-center gap-2">
                    <div>
                      <FcGoogle className="w-12 h-12" />
                    </div>
                    <div>
                      <div className="flex flex-col">
                        <p className="font-semibold capitalize">google</p>
                        <p className="text-sm text-custom-gray-muted">plan properly your work flow</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <FaToggleOn className="w-7 h-7 text-custom-blue" />
                  </div>
                </div>

                <div className="w-full flex justify-between items-center py-4 border-t border-dashed">
                  <div className="flex items-center gap-2">
                    <div>
                      <FaGithub className="w-12 h-12 text-purple-400" />
                    </div>
                    <div>
                      <div className="flex flex-col">
                        <p className="font-semibold capitalize">github</p>
                        <p className="text-sm text-custom-gray-muted">keep eye on your repositories</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <FaToggleOn className="w-7 h-7 text-custom-blue" />
                  </div>
                </div>

                <div className="w-full flex justify-center mt-6">
                  <Button
                  title={t("button.save_change")}
                  theme="light"
                   />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full col-span-2">
            <div className="w-full flex justify-between items-center">
              <div className="flex gap-6 items-center">
                <p className="text-lg text-custom-blue border-b-2 border-custom-blue capitalize pb-4">
                  overview
                </p>
                <p className="text-lg text-custom-gray-muted capitalize pb-4">
                  security
                </p>
                <p className="text-lg text-custom-gray-muted capitalize pb-4">
                  events & logs
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-10 bg-custom-blue">
                <p className="text-lg text-white capitalize">actions</p>
                <FaAngleDown className="w-4 h-4 text-white" />
              </div>
            </div>

            <div className="w-full mt-10">
              <div className="w-full flex justify-between items-center">
                <div className="flex flex-col">
                  <p className="text-xl font-semibold capitalize">users schedule</p>
                  <p className="text-base text-custom-gray-muted">2 upcoming meeting</p>
                </div>
                <div className="flex flex-row-reverse text-custom-blue items-center gap-2 px-4 py-2 rounded-10 bg-custom-blue-light">
                <p className="text-lg capitalize">actions</p>
                <RiPencilFill className="w-4 h-4" />
              </div>
              </div>

              <div className="w-full mt-6">
                <FullCalendar
                  plugins={[ dayGridPlugin , timeGridPlugin]}
                  initialView="dayGridMonth"
                  events={[{title:"Meeting" , start:new Date()}]}
                  headerToolbar={{
                    start:"dayGridMonth,timeGridWeek,timeGridDay",
                    center:"title",
                    end:"prevYear,prev,next,nextYear"
                  }}
                />
              </div>
            </div>

            <div className="w-full mt-14">
              <div className="w-full flex justify-between items-center">
                <div className="flex flex-col">
                  <p className="text-xl font-semibold capitalize">users tasks</p>
                  <p className="text-base text-custom-gray-muted">total 25 tasks in backlog</p>
                </div>
                <div className="flex flex-row-reverse text-custom-blue items-center gap-2 px-4 py-2 rounded-10 bg-custom-blue-light">
                <p className="text-lg capitalize">add task</p>
                <RiFileAddFill className="w-4 h-4" />
              </div>
              </div>

              <div className="w-full mt-10">
                <div className="mt-6 ml-4">
                  <div className="flex justify-between items-center mt-6">
                    <div className="flex flex-col">
                      <p className="text-base font-semibold capitalize">create FureStibe branding logo</p>
                      <p className="text-sm text-custom-gray-muted">due in 1 day
                      <span className="text-custom-blue">carina clark</span>
                      </p>
                    </div>
                    <div className="bg-custom-gray-light rounded-sm">
                      <VscSettings className="w-5 h-5 text-custom-gray-muted" />
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-6">
                    <div className="flex flex-col">
                      <p className="text-base font-semibold capitalize">schedule a meeting with fireBear CTO john</p>
                      <p className="text-sm text-custom-gray-muted">sue in 3 days
                      <span className="text-custom-blue">rober doe</span>
                      </p>
                    </div>
                    <div className="bg-custom-gray-light rounded-sm">
                      <VscSettings className="w-5 h-5 text-custom-gray-muted" />
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-6">
                    <div className="flex flex-col">
                      <p className="text-base font-semibold capitalize">9 degree project estimation</p>
                      <p className="text-sm text-custom-gray-muted">due in 1 week
                      <span className="text-custom-blue">neil owen</span>
                      </p>
                    </div>
                    <div className="bg-custom-gray-light rounded-sm">
                      <VscSettings className="w-5 h-5 text-custom-gray-muted" />
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-6">
                    <div className="flex flex-col">
                      <p className="text-base font-semibold capitalize">dashboard UI & UX for leafr CRM</p>
                      <p className="text-sm text-custom-gray-muted"> due in 1 week
                      <span className="text-custom-blue">olivia wild</span>
                      </p>
                    </div>
                    <div className="bg-custom-gray-light rounded-sm">
                      <VscSettings className="w-5 h-5 text-custom-gray-muted" />
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-6">
                    <div className="flex flex-col">
                      <p className="text-base font-semibold capitalize">mivy app R&D meeting with client</p>
                      <p className="text-sm text-custom-gray-muted">due in 2 weeks
                      <span className="text-custom-blue">sean bean</span>
                      </p>
                    </div>
                    <div className="bg-custom-gray-light rounded-sm">
                      <VscSettings className="w-5 h-5 text-custom-gray-muted" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};