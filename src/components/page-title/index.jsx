import { useDispatch, useSelector } from "react-redux";
import { UserType } from "../user-type";
import { useEffect, useState } from "react";
import { Modal } from "../modal";
import { Link, useNavigate } from "react-router-dom";
import { getDataFromJwtToken } from "../../helpers/get-data-from-jwt";
import { useTranslation } from "react-i18next";

export const PageTitle = () => {
  // ---------- states ----------
  const [isShowModal, setIsShowModal] = useState(false);
  const [isReload, setIsReload] = useState(false);

  // ----------store----------
  const { info: userType } = useSelector((state) => state.userTypeSlice);
  const { reload } = useSelector((state) => state.reloadPageSlice);
  const { editInfo, loading } = useSelector((state) => state.companySlice);

  // ---------- i18next ----------
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem("lng");

  // ----------hooks----------
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ---------lifecycle---------
  useEffect(() => {
    setIsReload(!isReload);
  }, [reload]);
  useEffect(() => {
    userType == 2 && navigate("userCompany");
  }, [userType]);

  // ------------ render jsx ------------
  return (
    <>
      <Modal state={isShowModal} onCloseModal={() => setIsShowModal(false)}>
        <div
          className="cursor-pointer dark:text-dark_custom-full-white ml-auto mr-2 mt-2"
          onClick={() => {
            setIsShowModal(false);
          }}
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
        {<UserType isShowModal={setIsShowModal} />}
      </Modal>
      <div className="w-full flex justify-between items-center">
        <div className="flex gap-6 items-center">
          <h2 className="text-18 font-bold dark:text-white hidden md:block">
            Dashboard
          </h2>
          <div
            onClick={() => setIsShowModal(true)}
            className={
              userType &&
              `md:px-4 p-2 py-2 ${
                userType == 1 ? "bg-custom-blue" : "bg-custom-orange"
              } text-white capitalize rounded-10 cursor-pointer`
            }
            title={userType == 1 ? "Startup" : "Investory"}
          >
            {userType ? (
              userType == 1 ? (
                <p className="md:block hidden">Startup</p>
              ) : (
                <p className="md:block hidden">Investory</p>
              )
            ) : (
              <p></p>
            )}
          </div>

          <Link to={"/userCompany"}>
            {getDataFromJwtToken("CompanyId") && editInfo.data ? (
              <div
                className={`md:px-4 px-2 text-sm md:text-base md:py-2 bg-custom-blue text-white capitalize rounded-10 cursor-pointer`}
              >
                <p>{editInfo && editInfo.data && editInfo.data[0]?.title}</p>
              </div>
            ) : null}
          </Link>
        </div>
      </div>
    </>
  );
};
