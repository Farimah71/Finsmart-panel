import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserCompany,
  getUserCompanies,
} from "../../../redux/actions/user-company";
import { useTranslation } from "react-i18next";
import { AiOutlinePlus } from "react-icons/ai";
import { Modal, Spinner, UserCompanyCard, UserType } from "../../../components";
import { CreateCompany } from "./form/create-company";
import { getDataFromLocalStorage } from "../../../helpers/get-data-from-local";
import { changeUserType } from "../../../redux/actions/user-type";
import { UpdateAxiosHeaders } from "../../../helpers/update-axios-headers";
import {
  getCompanies,
  getInvestoryCompany,
} from "../../../redux/actions/settings/company";
import { errorNotification } from "../../../helpers/notification";
import { getCompanyInvests } from "../../../redux/actions/settings/company-invest";
import { Profile } from "../profile";

export const UserCompany = () => {
  // --------- states -----------
  const [isShowModal, setIsShowModal] = useState(
    !Boolean(localStorage.getItem("userType"))
  );
  const [type, setType] = useState(null);
  const [isShowCreateForm, setIsShowCreateForm] = useState();
  const [isReload, setIsReload] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState();

  // ---------- store ----------
  const loading = useSelector((state) => state.loadingSlice.isLoading);
  const { info: userType } = useSelector((state) => state.userTypeSlice);
  const { info: userCompany, loading: userCompanyLoading } = useSelector(
    (state) => state.userCompanySlice
  );
  const { info: company, loading: companyLoading } = useSelector(
    (state) => state.companySlice
  );

  // ---------- hooks ---------
  const dispatch = useDispatch();

  // ---------- i18next ----------
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem("lng");

  // ---------- lifecycles ----------
  useEffect(() => {
    UpdateAxiosHeaders();
    dispatch(changeUserType(localStorage.getItem("userType")));
    localStorage.userType == 2 &&
      dispatch(
        getUserCompanies({
          pageNumber: 0,
          pageSize: 0,
          filters: [
            {
              property: "UserId",
              operation: 5,
              values: [getDataFromLocalStorage("userInfoId").toString()],
            },
          ],
          orderBy: "",
          includeProperties: "Company.Country,Company.CompanyActivityCategory",
        })
      );
  }, []);
  useEffect(() => {
    userType == 1 &&
      dispatch(
        getUserCompanies({
          pageNumber: 0,
          pageSize: 0,
          filters: [
            {
              property: "UserId",
              operation: 5,
              values: [getDataFromLocalStorage("userInfoId").toString()],
            },
          ],
          orderBy: "",
          includeProperties: "Company.Country,Company.CompanyActivityCategory",
        })
      );
    userType == 2 &&
      dispatch(
        getCompanies({
          pageNumber: 0,
          pageSize: 0,
          filters: [
            {
              property: "UserId",
              operation: 5,
              values: [getDataFromLocalStorage("userInfoId").toString()],
            },
          ],
          orderBy: "",
          includeProperties: "Company.Country,Company.CompanyActivityCategory",
        })
      );
  }, [isReload]);
  useEffect(() => {
    if (!isShowModal) {
      setIsShowCreateForm(false);
      setProfileModal(false);
    }
  }, [isShowModal]);
  useEffect(() => {
    setType(userType);
    userType == 1 &&
      dispatch(
        getUserCompanies({
          pageNumber: 0,
          pageSize: 0,
          filters: [
            {
              property: "UserId",
              operation: 5,
              values: [getDataFromLocalStorage("userInfoId").toString()],
            },
          ],
          orderBy: "",
          includeProperties: "Company.Country,Company.CompanyActivityCategory",
        })
      );
    userType == 2 &&
      dispatch(
        getCompanies({
          filters: [],
          orderBy: "",
          includeProperties: "Country,CompanyActivityCategory",
        })
      );
  }, [userType]);
  useEffect(() => {
    !profileModal &&
      userType == 2 &&
      dispatch(
        getCompanies({
          pageNumber: 0,
          pageSize: 0,
          filters: [
            {
              property: "UserId",
              operation: 5,
              values: [getDataFromLocalStorage("userInfoId").toString()],
            },
          ],
          orderBy: "",
          includeProperties: "Company.Country,Company.CompanyActivityCategory",
        })
      );
  }, [profileModal]);

  // ----------- functions ---------
  const userCompanyHandler = (id) => {
    setLoadingIndex(id);
    if (userCompany.length > 0) {
      const data = userCompany.filter((data) => data.companyId === id);
      const dataLength = data.length;
      if (dataLength == 0) {
        dispatch(
          createUserCompany(
            {
              companyId: id,
              userId: getDataFromLocalStorage("userInfoId"),
              isActive: false,
              activationCode: "",
              userCategoryId: 1,
              siteUrl: "",
            },
            () => setIsReload((prev) => !prev)
          )
        );
      } else {
        setLoadingIndex();
        errorNotification(t("toast.duplicate_user_company"));
      }
    } else if (userCompany.length == 0) {
      dispatch(
        createUserCompany(
          {
            companyId: id,
            userId: getDataFromLocalStorage("userInfoId"),
            isActive: false,
            activationCode: "",
            userCategoryId: 1,
            siteUrl: "",
          },
          () => setIsReload((prev) => !prev)
        )
      );
    }
  };
  const openModalHandler = (companyId) => {
    dispatch(
      getInvestoryCompany(
        companyId,
        "Country,CompanyActivityCategory,City,Sector,CompanyContacts"
      )
    );
    dispatch(
      getUserCompanies({
        pageNumber: 0,
        pageSize: 0,
        filters: [
          {
            property: "CompanyId",
            operation: 5,
            values: [`${companyId}`],
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
            values: [`${companyId}`],
          },
        ],
        orderBy: "",
        includeProperties: "",
      })
    );
    setProfileModal(true);
    setIsShowModal(true);
  };
  const closeModalHandler = () => {
    setProfileModal(false);
    setIsShowModal(false);
  };

  // ----------- render jsx -----------
  return (
    <>
      <Modal state={isShowModal} onCloseModal={() => setIsShowModal(false)}>
        {!localStorage.getItem("userType") && (
          <UserType isShowModal={setIsShowModal} />
        )}
        {isShowCreateForm && type && (
          <CreateCompany
            onCloseModal={() => setIsShowModal(false)}
            isReload={() => setIsReload((prev) => !prev)}
          />
        )}
        {profileModal && <Profile onCloseModal={closeModalHandler} />}
      </Modal>

      <div className="w-full bg-gray-50 rounded-10 overflow-hidden p-10 dark:bg-dark_custom-light-black">
        {companyLoading || loading ? (
          <div className="text-center">
            <Spinner />
          </div>
        ) : null}

        <div className="w-full grid grid-cols-4 gap-6 bg-gray-50 p-10 overflow-y-scroll dark:bg-transparent">
          {type == 1 &&
            userCompany.length > 0 &&
            userCompany.map((company, index) => (
              <UserCompanyCard
                key={index}
                type={"startup"}
                info={company.company}
              />
            ))}
          {type == 2 &&
            company.count > 0 &&
            company.data.map((company, index) => (
              <UserCompanyCard
                key={index}
                type={"investory"}
                info={company}
                userCompanyHandler={userCompanyHandler}
                openModalHandler={openModalHandler}
                loading={
                  loadingIndex == company.companyId && userCompanyLoading
                }
              />
            ))}

          {type != 2 && (
            <span
              style={{
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
              }}
              className="w-[100%] h-[380px] p-4 bg-gray-100 dark:bg-dark_custom-header-table-black rounded-10 flex border-[6px] border-dashed dark:border-custom-gray-muted justify-center items-center"
            >
              <div
                className="p-2 rounded-full bg-gray-200 dark:bg-custom-gray-muted cursor-pointer"
                onClick={() => {
                  setIsShowModal(true);
                  setIsShowCreateForm(true);
                }}
              >
                <AiOutlinePlus
                  size={25}
                  className="text-gray-400 dark:text-custom-gray-light"
                />
              </div>
            </span>
          )}
        </div>
      </div>
    </>
  );
};
