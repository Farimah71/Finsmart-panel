import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CgMenuGridO } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { IoAddCircleSharp } from "react-icons/io5";
import { Modal } from "../../../../../components";
import { CompanyInvest } from "./form/company-invest";
import { getUserCompanies } from "../../../../../redux/actions/user-company";
import { getCompanyInvests } from "../../../../../redux/actions/settings/company-invest";
import { clearInfo } from "../../../../../redux/reducers/user-company";
import { getDataFromJwtToken } from "../../../../../helpers/get-data-from-jwt";
import { PiUserCircleDuotone } from "react-icons/pi";

export const Overview = () => {
  // --------- store ---------
  const { info: userInfo } = useSelector((state) => state.userCompanySlice);
  const { info: investorInfo } = useSelector(
    (state) => state.companyInvestSlice
  );
  const { info: userType } = useSelector((state) => state.userTypeSlice);

  // ---------- states --------
  const [isShowModal, setIsShowModal] = useState(false);
  const [modalType, setModalType] = useState();
  const [isReload, setIsReload] = useState(false);

  // --------- hook -----------
  const dispatch = useDispatch();

  // ---------- i18next ----------
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem("lng");

  // --------- lifecycle ----------
  useEffect(() => {
    dispatch(
      getUserCompanies({
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
        includeProperties: "User",
      })
    );
    dispatch(
      getCompanyInvests({
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
        includeProperties: "",
      })
    );
  }, [isReload]);
  useEffect(
    () => () => {
      dispatch(clearInfo());
    },
    []
  );

  // ---------- render jsx ----------
  return (
    <>
      <Modal state={isShowModal} onCloseModal={() => setIsShowModal(false)}>
        {modalType === "companyInvest" && (
          <CompanyInvest
            onCloseModal={() => setIsShowModal(false)}
            isReload={() => setIsReload((prev) => !prev)}
          />
        )}
      </Modal>
      <div className="w-full flex items-start gap-5 dark:text-white">
        <div className="w-1/2 flex flex-col gap-5">
          {/* Key Members Section Start */}
          <div className="w-full flex flex-col gap-5 items-center border rounded-10 p-4">
            <div className="w-full flex justify-between">
              <p className="capitalize font-semibold text-lg mb-3">
                {t("text.key_members")}
              </p>
              <CgMenuGridO className="w-7 h-7 text-custom-blue" />
            </div>
            {userInfo.length > 0 &&
              userInfo.map((user) => (
                <div className="w-full flex gap-2" key={user.userCompanyId}>
                  <div>
                    <img
                      className="w-14 h-14 rounded-10"
                      src="https://media.licdn.com/dms/image/C4E03AQEDWldIzAaQXw/profile-displayphoto-shrink_400_400/0/1648990807111?e=2147483647&v=beta&t=npwmQd8BCD0YjIS1PNvUE6wpr1tgs0VaijzFQtSpXns"
                      alt="Avatar"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-base capitalize">
                      {user.user?.firstName} {user.user?.lastName}
                    </p>
                    <p className="text-base text-custom-gray-muted capitalize">
                      {user.user?.jobTitle}
                    </p>
                  </div>
                </div>
              ))}
          </div>
          {/* Key Members Section End */}

          {/* Investors Section Start */}
          <div className="w-full flex flex-col gap-2 justify-between items-center border rounded-10 p-4">
            <div className="w-full flex justify-between">
              <p className="capitalize flex gap-x-1 items-center font-semibold text-lg mb-3">
                {t("text.investors")}
                {userType == 1 && (
                  <IoAddCircleSharp
                    size={23}
                    className="opacity-50 cursor-pointer"
                    onClick={() => {
                      setModalType("companyInvest");
                      setIsShowModal(true);
                    }}
                  />
                )}
              </p>
              <CgMenuGridO className="w-7 h-7 text-custom-blue" />
            </div>
            {investorInfo.count > 0 &&
              investorInfo.data.map((investor) => (
                <div
                  className="w-full flex gap-2"
                  key={investor.companyInvestId}
                >
                  <div className="flex items-center gap-1">
                    <PiUserCircleDuotone size={40} />
                    <p className="text-base capitalize">
                      {investor.investorName}
                    </p>
                  </div>
                </div>
              ))}
          </div>
          {/* Investors Section End */}
        </div>

        <div className="w-1/2 flex gap-5">
          {/* Updates Section Start */}
          <div className="w-full border rounded-10 p-4">
            <div className="w-full flex justify-between items-center mb-10">
              <div className="flex flex-col gap-1">
                <p className="text-lg font-semibold capitalize">
                  {t("text.updates")}
                </p>
                <p className="text-base text-custom-gray-muted capitalize">
                  890,344 sales
                </p>
              </div>
              <CgMenuGridO className="w-7 h-7 text-custom-blue -mt-7" />
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex gap-2 items-center">
                <p className="w-10">08:42</p>
                <div className="w-4 h-4 shrink-0 rounded-full border-4 border-custom-yellow-dark relative">
                  <div className="w-1 h-[32px] absolute bg-custom-gray-light left-[2px] top-[12px]"></div>
                </div>
                <div className="text-sm text-custom-gray-muted capitalize">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Officia, doloremque.
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <p className="w-10">10:00</p>
                <div className="w-4 h-4 shrink-0 rounded-full border-4 border-custom-green-dark relative">
                  <div className="w-1 h-[32px] absolute bg-custom-gray-light left-[2px] top-[12px]"></div>
                </div>
                <div className="text-sm text-custom-gray-muted capitalize">
                  Lorem ipsum dolor sit amet.
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <p className="w-10">14:37</p>
                <div className="w-4 h-4 shrink-0 rounded-full border-4 border-custom-red-dark relative">
                  <div className="w-1 h-[32px] absolute bg-custom-gray-light left-[2px] top-[12px]"></div>
                </div>
                <div className="text-sm text-custom-gray-muted capitalize">
                  Lorem ipsum dolor sit amet consectetur.
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <p className="w-10">16:50</p>
                <div className="w-4 h-4 shrink-0 rounded-full border-4 border-custom-blue relative">
                  <div className="w-1 h-[32px] absolute bg-custom-gray-light left-[2px] top-[12px]"></div>
                </div>
                <div className="text-sm text-custom-gray-muted capitalize">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Officia, doloremque.
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <p className="w-10">21:03</p>
                <div className="w-4 h-4 shrink-0 rounded-full border-4 border-custom-red-dark relative">
                  <div className="w-1 h-[32px] absolute bg-custom-gray-light left-[2px] top-[12px]"></div>
                </div>
                <div className="text-sm text-custom-gray-muted capitalize">
                  Lorem ipsum dolor sit amet.
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <p className="w-10">16:50</p>
                <div className="w-4 h-4 shrink-0 rounded-full border-4 border-custom-blue relative">
                  <div className="w-1 h-[32px] absolute bg-custom-gray-light left-[2px] top-[12px]"></div>
                </div>
                <div className="text-sm text-custom-gray-muted capitalize">
                  Lorem ipsum dolor sit amet, consectetur adipisicing.
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <p className="w-10">21:03</p>
                <div className="w-4 h-4 shrink-0 rounded-full border-4 border-custom-red-dark relative"></div>
                <div className="text-sm text-custom-gray-muted capitalize">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Officia, doloremque.
                </div>
              </div>
            </div>
          </div>
          {/* Updates Section End */}
        </div>
      </div>
    </>
  );
};
