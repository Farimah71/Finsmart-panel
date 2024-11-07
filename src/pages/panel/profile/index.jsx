import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Button, Modal, Spinner } from "../../../components";
import { FaUserCircle, FaHeart } from "react-icons/fa";
import { FaLocationDot, FaPeopleRoof } from "react-icons/fa6";
import {
  MdEmail,
  MdLocationOn,
  MdMyLocation,
  MdOutlineContactPhone,
  MdAdd,
} from "react-icons/md";
// import { CgMenuGridO } from "react-icons/cg";
import { BiCommentDetail } from "react-icons/bi";
import { ImAttachment } from "react-icons/im";
import { TbWorld, TbBrandTelegram } from "react-icons/tb";
import { FaLinkedinIn } from "react-icons/fa";
import { MdWhatsapp } from "react-icons/md";
import { AiOutlinePartition } from "react-icons/ai";
import { GiMoneyStack } from "react-icons/gi";
import { IoMdPerson, IoMdPersonAdd, IoMdArrowUp } from "react-icons/io";
import { WiTime4 } from "react-icons/wi";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { EditCompany } from "./edit";
import { useDispatch } from "react-redux";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Overview } from "./tabs/overview/overview";
import { ContactInfo } from "./contact-info";
import { getCompany } from "../../../redux/actions/settings/company";
import { getDataFromJwtToken } from "../../../helpers/get-data-from-jwt";
import { Tooltip } from "react-tooltip";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const Profile = ({ onCloseModal }) => {
  // ---------- states --------
  const [isShowModal, setIsShowModal] = useState(false);
  const [modalType, setModalType] = useState();
  const [isReload, setIsReload] = useState(false);

  // ---------- store ---------
  const { editInfo, loading, investoryProfile } = useSelector(
    (state) => state.companySlice
  );
  const { info: userType } = useSelector((state) => state.userTypeSlice);

  // --------- hook -----------
  const dispatch = useDispatch();

  // ---------- i18next ----------
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem("lng");

  // ---------variables----------
  const info =
    userType == 1 && Object.keys(editInfo).length
      ? editInfo.data[0]
      : userType == 2 &&
        Object.keys(investoryProfile).length &&
        investoryProfile;
  const data = [
    {
      name: "Feb",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Mar",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Apr",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "May",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Jun",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Jul",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
  ];

  // --------- lifecycle ----------
  useEffect(() => {
    dispatch(
      getCompany({
        pageNumber: 0,
        pageSize: 0,
        filters: [
          {
            property: "CompanyId",
            operation: 5,
            values: [`${getDataFromJwtToken("CompanyId")}`],
          },
        ],
        orderBy: "",
        includeProperties:
          "Country,CompanyActivityCategory,City,Sector,CompanyContacts",
      })
    );
  }, [isReload]);

  // --------- render jsx ---------
  return (
    <>
      <Modal state={isShowModal} onCloseModal={() => setIsShowModal(false)}>
        {modalType === "editCompany" && (
          <EditCompany
            onCloseModal={() => {
              setIsShowModal(false);
              setIsReload((prev) => !prev);
            }}
          />
        )}
        {modalType === "addContactInfo" && (
          <ContactInfo
            onCloseModal={() => setIsShowModal(false)}
            isReload={() => setIsReload((prev) => !prev)}
          />
        )}
      </Modal>
      <div className="flex flex-col gap-y-8 rounded-10 p-6 pb-4 bg-white dark:bg-dark_custom-light-black overflow-y-scroll">
        <div className="flex justify-between items-center dark:bg-dark_custom-light-black">
          <div className="flex flex-col gap-y-1">
            <h4 className="text-19 text-custom-dark font-bold dark:text-dark_custom-full-white">
              {t("page_title.profile")}
            </h4>
            <h4 className="text-14 flex gap-x-2 text-custom-gray-muted dark:text-dark_custom-light-white">
              {t("text.dashboard")} - {t("page_title.profile")}
            </h4>
          </div>
          {userType == 2 && (
            <div
              className="cursor-pointer dark:text-dark_custom-full-white mr-2"
              onClick={onCloseModal}
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
          )}
          {userType == 1 && (
            <div>
              <Button
                theme="dark"
                title={t("button.edit_title")}
                classes="px-4"
                onClick={() => {
                  setIsShowModal(true);
                  setModalType("editCompany");
                }}
              />
            </div>
          )}
        </div>
        <div>
          <div className="pb-6 p-6 border rounded-10 relative overflow-hidden">
            <div className="select-none">
              <div className="flex gap-6">
                <div className="flex flex-col gap-4">
                  <div className="h-auto rounded-10 overflow-hidden">
                    {loading ? (
                      <Skeleton width={300} height={250} />
                    ) : (
                      <img
                        src={"data:image/jpeg;base64," + info.logo}
                        alt="logo"
                        // height={"300px"}
                        width={"300px"}
                        className="rounded-10"
                      />
                    )}
                  </div>
                  <Button
                    title={t("button.follow_title")}
                    theme={"light"}
                    icon={<IoMdPersonAdd size={19} />}
                  />
                </div>

                <div className="w-full flex dark:text-white">
                  <div className="w-full">
                    <div className="w-full">
                      <p className="text-2xl capitalize font-semibold">
                        {loading ? <Skeleton width={100} /> : info.title}
                      </p>
                      {loading ? (
                        <Skeleton />
                      ) : (
                        info.bio && (
                          <p className="mt-1 text-base text-gray-500 dark:text-dark_custom-light-white">
                            {info.bio}
                          </p>
                        )
                      )}
                    </div>

                    <div className="flex flex-wrap gap-4 mt-4">
                      <div className="flex items-center gap-1">
                        <FaUserCircle className="w-5 h-5 text-custom-gray-muted" />
                        <p className="text-base text-custom-gray-muted capitalize">
                          {loading ? (
                            <Skeleton width={50} />
                          ) : (
                            info.companyActivityCategory?.titleEn
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaLocationDot className="w-5 h-5 text-custom-gray-muted" />
                        <p className="text-base text-custom-gray-muted capitalize">
                          {loading ? (
                            <Skeleton width={70} />
                          ) : (
                            `${info.country?.title}, ${info.city?.title}`
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <MdEmail className="w-5 h-5 text-custom-gray-muted" />
                        <p className="text-base text-custom-gray-muted capitalize">
                          max@kt.com
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <WiTime4 className="w-5 h-5 text-custom-gray-muted" />
                        <p className="text-base text-custom-gray-muted capitalize">
                          {loading ? (
                            <Skeleton width={50} />
                          ) : (
                            info.establishmentYear
                          )}
                        </p>
                      </div>
                      {info.sectorId && (
                        <div className="flex items-center gap-1">
                          <AiOutlinePartition className="w-5 h-5 text-custom-gray-muted" />
                          <p className="text-base text-custom-gray-muted capitalize">
                            {loading ? (
                              <Skeleton width={50} />
                            ) : (
                              info.sector?.title
                            )}
                          </p>
                        </div>
                      )}
                      {userType == 1 && (
                        <div
                          className="cursor-pointer relative ml-auto mr-6"
                          onClick={() => {
                            setModalType("addContactInfo");
                            setIsShowModal(true);
                          }}
                        >
                          <MdAdd className="text-custom-blue absolute top-1 -left-1" />
                          <MdOutlineContactPhone
                            size={25}
                            className="ml-auto text-custom-blue absolute top-4"
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between">
                      <div>
                        <div className="flex gap-6 mt-10">
                          <div
                            className="px-6 py-2 border-2 border-dashed min-w-[100px] rounded-10"
                            title={t("tooltip.employees")}
                          >
                            <div className="flex flex-col items-center gap-1">
                              <p className="text-xl font-semibold">
                                {loading ? (
                                  <Skeleton width={50} />
                                ) : info.numberOfEmployees !== null ? (
                                  info.numberOfEmployees
                                ) : (
                                  "-"
                                )}
                              </p>
                              <FaPeopleRoof className="w-7 h-7 text-custom-blue-dark" />
                            </div>
                          </div>

                          <div className="px-6 py-2 border-2 border-dashed min-w-[100px] rounded-10">
                            <div className="flex flex-col items-center gap-1">
                              <p className="text-xl font-semibold">
                                {loading && <Skeleton width={50} />}
                                {info.investPrice > 0 && "$"}

                                {!loading && !info.investPrice && "-"}

                                {info.investPrice >= 1000
                                  ? info.investPrice / 1000 + "K"
                                  : info.investPrice > 0 &&
                                    info.investPrice < 1000
                                  ? info.investPrice
                                  : null}
                              </p>
                              <GiMoneyStack className="w-8 h-8 text-custom-blue-dark" />
                            </div>
                          </div>

                          <div
                            className="px-6 py-2 border-2 border-dashed min-w-[100px] rounded-10"
                            title={t("tooltip.followers")}
                          >
                            <div className="flex flex-col items-center gap-1">
                              <p className="text-xl font-semibold">
                                {loading ? (
                                  <Skeleton width={50} />
                                ) : (
                                  info.numberOfEmployees + 50
                                )}
                              </p>
                              <IoMdPerson className="w-7 h-7 text-custom-blue-dark" />
                            </div>
                          </div>
                        </div>
                        <div className="w-full flex justify-between mt-10">
                          {info.address && (
                            <div className="flex gap-x-1">
                              <MdMyLocation className="w-5 h-5 text-custom-gray-muted mt-0.5" />
                              <p className="text-base text-custom-gray-muted">
                                {info.address}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      {info.companyContacts?.length > 0 && (
                        <div className="mt-10 p-1">
                          <ul className="capitalize">
                            {t("text.contact_info")}:
                            {info.companyContacts?.length > 0 &&
                              info.companyContacts.map((contact) => (
                                <li
                                  key={contact.companyContactId}
                                  className="mt-2 text-custom-blue normal-case flex gap-x-2 items-center"
                                >
                                  {contact.logoTitle === "Website" ? (
                                    <TbWorld color="gray" />
                                  ) : contact.logoTitle === "LinkedIn" ? (
                                    <FaLinkedinIn color="gray" />
                                  ) : contact.logoTitle === "Telegram" ? (
                                    <TbBrandTelegram color="gray" />
                                  ) : contact.logoTitle === "WhatsApp" ? (
                                    <MdWhatsapp color="gray" />
                                  ) : null}
                                  {isNaN(+contact.value) ? (
                                    <a
                                      href={contact.value}
                                      target="_blank"
                                      className={"hover:underline"}
                                    >
                                      {contact.value.length > 25
                                        ? (
                                            contact.value.substring(0, 25) +
                                            "..."
                                          ).split("//")[1]
                                        : contact.value.split("//")[1]}
                                    </a>
                                  ) : (
                                    <span>{contact.value}</span>
                                  )}
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ------- colorful company flag --------- */}
            <div
              className={`w-20 h-20 absolute top-0 translate-x-[50%] -translate-y-[50%] right-0 z-20 rotate-45 ${
                !info.openForInvestor && info.investPrice
                  ? "bg-green-400"
                  : info.openForInvestor
                  ? "bg-yellow-400"
                  : !info.openForInvestor && !info.investPrice
                  ? "bg-red-500"
                  : "bg-black"
              }`}
            ></div>

            {/* Tabs */}
            <Tabs className={"mt-20"}>
              <TabList
                className={
                  "capitalize text-lg text-custom-gray-muted font-semibold mb-5"
                }
              >
                <Tab>{t("tab.overview")}</Tab>
                <Tab>projects</Tab>
                <Tab>campaigns</Tab>
                <Tab>documents</Tab>
                <Tab>followers</Tab>
                <Tab>activity</Tab>
              </TabList>

              <TabPanel>
                <Overview />
              </TabPanel>

              <TabPanel>
                <h2>Any content 2</h2>
              </TabPanel>
              <TabPanel>
                <h2>Any content 3</h2>
              </TabPanel>
              <TabPanel>
                <h2>Any content 4</h2>
              </TabPanel>
              <TabPanel>
                <h2>Any content 5</h2>
              </TabPanel>
              <TabPanel>
                <h2>Any content 6</h2>
              </TabPanel>
            </Tabs>
          </div>

          {/* <div>
                <div>
                  <div className="w-full grid grid-cols-2 gap-10 mt-14">
                    {/* ----------cards container---------- 
                    <div className="w-full">                      

                      {/* ----------card---------- *
                      <div className="w-full border rounded-10 p-4 mb-10">
                        <div className="w-full flex justify-between items-center">
                          <div className="flex gap-2">
                            <div>
                              <img
                                className="w-14 h-14 rounded-10"
                                src="https://media.licdn.com/dms/image/C4E03AQEDWldIzAaQXw/profile-displayphoto-shrink_400_400/0/1648990807111?e=2147483647&v=beta&t=npwmQd8BCD0YjIS1PNvUE6wpr1tgs0VaijzFQtSpXns"
                                alt=""
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-base capitalize">nick logan</p>
                              <p className="text-base text-custom-gray-muted capitalize">
                                php , sglite
                              </p>
                            </div>
                          </div>
                          <div>
                            <CgMenuGridO className="w-7 h-7 text-custom-blue" />
                          </div>
                        </div>

                        <div className="text-sm capitalize mt-4">
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit. Aliquid aperiam cumque doloribus quo molestiae
                          ullam optio voluptate, non officiis expedita?
                        </div>

                        <div className="flex gap-4 mt-4">
                          <div className="flex gap-1 items-center px-2 py-1 rounded-10 bg-custom-gray-light">
                            <BiCommentDetail className="w-4 h-4 text-custom-gray-muted" />
                            <p className="text-sm text-custom-gray-muted">
                              120
                            </p>
                          </div>

                          <div className="flex gap-1 items-center px-2 py-1 rounded-10 bg-custom-gray-light">
                            <FaHeart className="w-4 h-4 text-custom-gray-muted" />
                            <p className="text-sm text-custom-gray-muted">15</p>
                          </div>
                        </div>

                        <div className="w-full flex justify-between mt-6 p-2 pt-4 border-t">
                          <div>
                            <input
                              className="w-full border-none outline-none text-sm"
                              type="text"
                              placeholder="Reply..."
                            />
                          </div>
                          <div className="flex items-center gap-4">
                            <ImAttachment className="w-4 h-4 text-custom-gray-muted" />
                            <MdLocationOn className="w-5 h-5 text-custom-gray-muted" />
                          </div>
                        </div>
                      </div>

                      {/* ----------card---------- 
                      <div className="w-full border rounded-10 p-4 mb-10">
                        <div className="w-full flex justify-between items-center">
                          <div className="flex gap-2">
                            <div>
                              <img
                                className="w-14 h-14 rounded-10"
                                src="https://media.licdn.com/dms/image/C4E03AQEDWldIzAaQXw/profile-displayphoto-shrink_400_400/0/1648990807111?e=2147483647&v=beta&t=npwmQd8BCD0YjIS1PNvUE6wpr1tgs0VaijzFQtSpXns"
                                alt=""
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-base capitalize">nick logan</p>
                              <p className="text-base text-custom-gray-muted capitalize">
                                php , sglite
                              </p>
                            </div>
                          </div>
                          <div>
                            <CgMenuGridO className="w-7 h-7 text-custom-blue" />
                          </div>
                        </div>

                        <div className="w-full h-full mt-6">
                          <img
                            className="w-full h-full rounded-10"
                            src="https://img.freepik.com/premium-photo/modern-corporate-architecture-can-be-seen-cityscape-office-buildings_410516-276.jpg"
                            alt=""
                          />
                        </div>

                        <div className="text-sm capitalize mt-4">
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit. Aliquid aperiam cumque doloribus quo molestiae
                          ullam optio voluptate, non officiis expedita?
                        </div>

                        <div className="flex gap-4 mt-4">
                          <div className="flex gap-1 items-center px-2 py-1 rounded-10 bg-custom-gray-light">
                            <BiCommentDetail className="w-4 h-4 text-custom-gray-muted" />
                            <p className="text-sm text-custom-gray-muted">
                              120
                            </p>
                          </div>

                          <div className="flex gap-1 items-center px-2 py-1 rounded-10 bg-custom-gray-light">
                            <FaHeart className="w-4 h-4 text-custom-gray-muted" />
                            <p className="text-sm text-custom-gray-muted">15</p>
                          </div>
                        </div>

                        <div className="w-full flex justify-between mt-6 p-2 pt-4 border-t">
                          <div>
                            <input
                              className="w-full border-none outline-none text-sm"
                              type="text"
                              placeholder="Reply..."
                            />
                          </div>
                          <div className="flex items-center gap-4">
                            <ImAttachment className="w-4 h-4 text-custom-gray-muted" />
                            <MdLocationOn className="w-5 h-5 text-custom-gray-muted" />
                          </div>
                        </div>
                      </div>

                      {/* ----------card---------- 
                      <div className="w-full border rounded-10 p-4 mb-10">
                        <div className="w-full flex justify-between items-center">
                          <div className="flex gap-2">
                            <div>
                              <img
                                className="w-14 h-14 rounded-10"
                                src="https://dwpdigital.blog.gov.uk/wp-content/uploads/sites/197/2016/07/P1090594-1.jpeg"
                                alt=""
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-base capitalize">nick logan</p>
                              <p className="text-base text-custom-gray-muted capitalize">
                                php , sglite
                              </p>
                            </div>
                          </div>
                          <div>
                            <CgMenuGridO className="w-7 h-7 text-custom-blue" />
                          </div>
                        </div>

                        <div className="text-sm capitalize mt-4">
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit. Aliquid aperiam cumque doloribus quo molestiae
                          ullam optio voluptate, non officiis expedita?
                        </div>

                        <div className="flex gap-4 mt-4">
                          <div className="flex gap-1 items-center px-2 py-1 rounded-10 bg-custom-gray-light">
                            <BiCommentDetail className="w-4 h-4 text-custom-gray-muted" />
                            <p className="text-sm text-custom-gray-muted">
                              120
                            </p>
                          </div>

                          <div className="flex gap-1 items-center px-2 py-1 rounded-10 bg-custom-gray-light">
                            <FaHeart className="w-4 h-4 text-custom-gray-muted" />
                            <p className="text-sm text-custom-gray-muted">15</p>
                          </div>
                        </div>

                        <div className="w-full flex justify-between mt-6 p-2 pt-4 border-t">
                          <div>
                            <input
                              className="w-full border-none outline-none text-sm"
                              type="text"
                              placeholder="Reply..."
                            />
                          </div>
                          <div className="flex items-center gap-4">
                            <ImAttachment className="w-4 h-4 text-custom-gray-muted" />
                            <MdLocationOn className="w-5 h-5 text-custom-gray-muted" />
                          </div>
                        </div>
                      </div>

                      {/* ----------card---------- 
                      <div className="w-full border rounded-10 p-4 mb-10">
                        <div className="w-full flex justify-between items-center">
                          <div className="flex gap-2">
                            <div>
                              <img
                                className="w-14 h-14 rounded-10"
                                src="https://media.nngroup.com/media/people/photos/2022-portrait-page-3.jpg.600x600_q75_autocrop_crop-smart_upscale.jpg"
                                alt=""
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-base capitalize">nick logan</p>
                              <p className="text-base text-custom-gray-muted capitalize">
                                php , sglite
                              </p>
                            </div>
                          </div>
                          <div>
                            <CgMenuGridO className="w-7 h-7 text-custom-blue" />
                          </div>
                        </div>

                        <div className="w-full h-full mt-6">
                          <img
                            className="w-full h-full rounded-10"
                            src="https://cdn.vox-cdn.com/thumbor/heF3c7rMfzf16zHjlIr1pXYD1H0=/0x0:2040x1360/1400x788/filters:focal(1020x680:1021x681)/cdn.vox-cdn.com/uploads/chorus_asset/file/23986638/acastro_STK092_02.jpg"
                            alt=""
                          />
                        </div>

                        <div className="text-sm capitalize mt-4">
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit. Aliquid aperiam cumque doloribus quo molestiae
                          ullam optio voluptate, non officiis expedita?
                        </div>

                        <div className="flex gap-4 mt-4">
                          <div className="flex gap-1 items-center px-2 py-1 rounded-10 bg-custom-gray-light">
                            <BiCommentDetail className="w-4 h-4 text-custom-gray-muted" />
                            <p className="text-sm text-custom-gray-muted">
                              120
                            </p>
                          </div>

                          <div className="flex gap-1 items-center px-2 py-1 rounded-10 bg-custom-gray-light">
                            <FaHeart className="w-4 h-4 text-custom-gray-muted" />
                            <p className="text-sm text-custom-gray-muted">15</p>
                          </div>
                        </div>

                        <div className="w-full flex justify-between mt-6 p-2 pt-4 border-t">
                          <div>
                            <input
                              className="w-full border-none outline-none text-sm"
                              type="text"
                              placeholder="Reply..."
                            />
                          </div>
                          <div className="flex items-center gap-4">
                            <ImAttachment className="w-4 h-4 text-custom-gray-muted" />
                            <MdLocationOn className="w-5 h-5 text-custom-gray-muted" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="w-full">
                        <div className="w-full flex justify-between items-center mb-10">
                          <div className="flex flex-col gap-1">
                            <p className="text-xl font-semibold capitalize">
                              recent statistics
                            </p>
                            <p className="text-base text-custom-gray-muted capitalize">
                              php , sglite
                            </p>
                          </div>
                          <div className="h-full">
                            <CgMenuGridO className="w-7 h-7 text-custom-blue" />
                          </div>
                        </div>
                        <div className="w-full">
                          <ResponsiveContainer width="100%" height={500}>
                            <BarChart
                              width={500}
                              height={300}
                              data={data}
                              margin={{
                                top: 10,
                                right: 30,
                                left: 20,
                                bottom: 5,
                              }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar
                                dataKey="pv"
                                fill="#1b84ff"
                                className="rounded-10"
                                activeBar={<Rectangle fill="#1b84ff" />}
                              />
                              <Bar
                                dataKey="uv"
                                fill="#dbdfe9"
                                activeBar={<Rectangle fill="#dbdfe9" />}
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      <div className="w-full mt-14">
                        <div className="w-full flex justify-between items-center mb-10">
                          <div className="flex flex-col gap-1">
                            <p className="text-xl font-semibold capitalize">
                              authors
                            </p>
                          </div>
                          <div className="h-full">
                            <CgMenuGridO className="w-7 h-7 text-custom-blue" />
                          </div>
                        </div>
                        <div>
                          <div>
                            <div className="flex gap-2">
                              <div>
                                <img
                                  className="w-14 h-14 rounded-10"
                                  src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1351"
                                  alt=""
                                />
                              </div>
                              <div className="flex flex-col gap-1">
                                <p className="text-base capitalize">
                                  nick logan
                                </p>
                                <p className="text-base text-custom-gray-muted capitalize">
                                  php , sglite
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="mt-6">
                            <div className="flex gap-2">
                              <div>
                                <img
                                  className="w-14 h-14 rounded-10"
                                  src="https://media.licdn.com/dms/image/C4E03AQEDWldIzAaQXw/profile-displayphoto-shrink_400_400/0/1648990807111?e=2147483647&v=beta&t=npwmQd8BCD0YjIS1PNvUE6wpr1tgs0VaijzFQtSpXns"
                                  alt=""
                                />
                              </div>
                              <div className="flex flex-col gap-1">
                                <p className="text-base capitalize">ean bean</p>
                                <p className="text-base text-custom-gray-muted capitalize">
                                  project manager
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="mt-6">
                            <div className="flex gap-2">
                              <div>
                                <img
                                  className="w-14 h-14 rounded-10"
                                  src="https://en.bbv.ch/wp-content/uploads/2022/07/Marco-Ravicini-bbv-Portrait.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="flex flex-col gap-1">
                                <p className="text-base capitalize">
                                  brain cox
                                </p>
                                <p className="text-base text-custom-gray-muted capitalize">
                                  php , sglite , artisan cli
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="mt-6">
                            <div className="flex gap-2">
                              <div>
                                <img
                                  className="w-14 h-14 rounded-10"
                                  src="https://media.nngroup.com/media/people/photos/2022-portrait-page-3.jpg.600x600_q75_autocrop_crop-smart_upscale.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="flex flex-col gap-1">
                                <p className="text-base capitalize">
                                  francis mitcham
                                </p>
                                <p className="text-base text-custom-gray-muted capitalize">
                                  php , sglite , artisan cli
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="mt-6">
                            <div className="flex gap-2">
                              <div>
                                <img
                                  className="w-14 h-14 rounded-10"
                                  src="https://wp.rudn-sochi.ru/wp-content/uploads/2020/03/admin_spo.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="flex flex-col gap-1">
                                <p className="text-base capitalize">
                                  dan wilson
                                </p>
                                <p className="text-base text-custom-gray-muted capitalize">
                                  php , sglite , artisan cli
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
        </div>
      </div>
    </>
  );
};
