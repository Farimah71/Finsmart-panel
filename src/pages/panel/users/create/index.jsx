import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Field } from "formik";
import {
  Button,
  MyForm,
  Error,
  Input,
  PhoneNumberInput,
} from "../../../../components";
// import { getCountries } from "../../../../../redux/actions/settings/country";
import { getDataFromJwtToken } from "../../../../helpers/get-data-from-jwt";
import {
  getUserInfoByPhone,
  setUserInfo,
} from "../../../../redux/actions/auth";
import {
  createUserCompany,
  getUserCompanies,
} from "../../../../redux/actions/user-company";
import { clearFetchedUser, clearInfo } from "../../../../redux/reducers/auth";
import * as Yup from "yup";

export const CreateUserCompany = ({ onCloseModal, countries }) => {
  // ---------- store ----------
  const {
    fetchedUser,
    loading: userLoading,
    userInfo,
    getByPhoneLoading,
  } = useSelector((state) => state.authSlice);
  const { loading: userCompanyLoading } = useSelector(
    (state) => state.userCompanySlice
  );

  // ---------- state ----------
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [currentPhone, setCurrentPhone] = useState("");
  const [isUserCompany, setIsUserCompany] = useState(false);
  const [isUserInfo, setIsUserInfo] = useState(false);
  const [id, setId] = useState(null);
  const [formValue1, setFormValue1] = useState({
    UserCategoryId: 1,
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    email: "",
    mobileNo: "",
    nationalCode: "",
    avatar: "",
    activationCode: "",
    isActive: false,
    isLock: false,
    fromTime: null,
    toTime: null,
    fromDate: null,
    toDate: null,
  });
  const [formValue2, setFormValue2] = useState({
    companyId: getDataFromJwtToken("CompanyId"),
    userCategoryId: 1,
    userId: 0,
    isActive: false,
    isPartner: false,
    activationCode: "",
    siteUrl: "",
  });

  // ---------- hooks ----------
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // ---------- variables ----------
  const dataSchema = Yup.object({
    firstName: Yup.string().required(t("error.name_required")),
    email: Yup.string().required(t("error.email_required")),
  });

  // ---------- functions ----------
  const userInfoHandler = (status) => {
    if (status) {
      // console.log("user info handler");
    }
  };
  const reloadPageHandler = (status) => {
    if (status) {
      dispatch(clearInfo());
      dispatch(clearFetchedUser());
      onCloseModal();
    }
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
  };
  const handleChangeMobile = (value) => {
    setCurrentPhone(value);
    if (value.length >= 11) {
      dispatch(
        getUserInfoByPhone({
          pageNumber: 0,
          pageSize: 0,
          filters: [
            {
              property: "MobileNo",
              operation: 7,
              values: [value],
            },
          ],
          includeProperties: "UserCompanies",
        })
      );
    }
  };
  const closeHandler = () => {
    dispatch(clearFetchedUser());
    onCloseModal();
  };
  const onSubmit = (values) => {
    const data = { ...values, userName: values.email };
    if (isUserInfo && isUserCompany) {
      dispatch(
        setUserInfo(data, (status) => userInfoHandler(status), null, null, true)
      );
    } else {
      dispatch(
        createUserCompany({ ...formValue2, userId: id }, (status) =>
          reloadPageHandler(status)
        )
      );
    }
  };

  // ---------- lifeCycles ----------
  useEffect(() => {
    if (fetchedUser.length > 0) {
      if (
        !fetchedUser[0].userCompanies?.length ||
        fetchedUser[0].userCompanies[0]?.companyId !=
          getDataFromJwtToken("CompanyId")
      ) {
        setIsUserCompany(true);
      }
      setFormValue1((prevValues) => ({
        ...prevValues,
        firstName: fetchedUser[0].firstName,
        lastName: fetchedUser[0].lastName,
        email: fetchedUser[0].email,
        mobileNo: fetchedUser[0].mobileNo,
      }));
      setId(fetchedUser[0].userInfoId);
    }
    if (fetchedUser.length === 0) {
      setFormValue1({
        firstName: "",
        lastName: "",
        userName: "",
        password: "",
        email: "",
        mobileNo: currentPhone,
        nationalCode: "",
        avatar: "",
        activationCode: "",
        isActive: false,
        isLock: false,
        fromTime: null,
        toTime: null,
        fromDate: null,
        toDate: null,
      });
      setIsInputDisabled(false);
      setIsUserInfo(true);
      setIsUserCompany(true);
    }
  }, [fetchedUser]);
  useEffect(() => {
    if (Object.keys(userInfo).length > 0) {
      setId(userInfo.userInfoId);
      setIsInputDisabled(true);
    }
  }, [userInfo]);
  useEffect(() => {
    if (id) {
      isUserCompany &&
        isUserInfo &&
        dispatch(
          createUserCompany({ ...formValue2, userId: id }, (status) =>
            reloadPageHandler(status)
          )
        );
    }
  }, [id]);

  // ---------- render jsx ----------
  return (
    <>
      <div className="flex items-center justify-between p-4 select-none border-b border-custom-gray-light dark:bg-dark_custom-average-black rounded-t-10">
        <h4 className="text-18 font-bold dark:text-dark_custom-full-white rounded-10">
          {t("page_title.create_user")}
        </h4>
        <div
          className="cursor-pointer dark:text-dark_custom-full-white"
          onClick={closeHandler}
        >
          <svg
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
      </div>
      <div className="flex-grow overflow-y-auto rounded-b-10">
        <MyForm
          initialValues={formValue1}
          validation={dataSchema}
          submit={onSubmit}
          classes="flex flex-col gap-y-10 p-4 select-none"
        >
          <div className="flex flex-col gap-y-4">
            <div className="w-full flex gap-4">
              <div className="w-1/2 dark:bg-dark_custom-average-black">
                <Field
                  component={PhoneNumberInput}
                  label={t("input.phone_number_title.label")}
                  countries={countries}
                  name="mobileNo"
                  onChange={handleChangeMobile}
                  autocomplete="off"
                  loading={getByPhoneLoading}
                  disabled={isUserCompany}
                />
              </div>
              <div className="w-1/2">
                <Field
                  component={Input}
                  placeholder={t("input.first_name_title.placeholder")}
                  label={t("input.name.label")}
                  name="firstName"
                  disabled={isInputDisabled}
                />
                <Error name="firstName" />
              </div>
            </div>
            <div className="w-full flex gap-4">
              <div className="w-1/2">
                <Field
                  component={Input}
                  placeholder={t("input.last_name_title.placeholder")}
                  label={t("input.last_name_title.label")}
                  name="lastName"
                  disabled={isInputDisabled}
                />
              </div>
              <div className="w-1/2">
                <Field
                  component={Input}
                  placeholder={t("input.email_title.placeholder")}
                  label={t("input.email_title.label")}
                  name="email"
                  disabled={isInputDisabled}
                  complex
                />
                <Error name={"email"} />
              </div>
            </div>
          </div>
          {isUserCompany && (
            <div className="w-full flex gap-x-2 items-center justify-end">
              <div className="flex items-center gap-x-2">
                <Field
                  component={Button}
                  title={t("button.save_title")}
                  loading={userLoading ? userLoading : userCompanyLoading}
                  type="submit"
                />
              </div>
            </div>
          )}
        </MyForm>
      </div>
    </>
  );
};
