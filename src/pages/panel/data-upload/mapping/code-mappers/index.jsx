import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCodeMappers } from "../../../../../redux/actions/settings/code-mapper";
import { Button, Table, Modal } from "../../../../../components";
import { CreateCodeMapper } from "../code-mappers/create";
import { PulseLoader } from "react-spinners";
import { clearInfo } from "../../../../../redux/reducers/settings/code-mapper";
import { setLoading } from "../../../../../redux/reducers/settings/code-mapper";
import { api } from "../../../../../api";
import {
  successNotification,
  errorNotification,
} from "../../../../../helpers/notification";
import axios from "axios";

export const CodeMapper = ({ id }) => {
  // ---------- states ----------
  const [isReload, setIsReload] = useState(false);
  const [data, setData] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState();

  // ---------- store ----------
  const { info: mapperData, loading } = useSelector(
    (state) => state.codeMapperSlice
  );

  // ---------- i18next ----------
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem("lng");

  // ---------- hooks ----------
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ---------- variables ----------
  const cols = [
    {
      name: t("table.col.no"),
      cell: (row) => (
        <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
          {row.rowId}
        </div>
      ),
    },
    {
      name: t("table.col.account_code"),
      selector: (row) => (
        <div className="dark:text-dark_custom-full-white">
          {row.accountCode}
        </div>
      ),
    },
    {
      name: t("table.col.search_item"),
      selector: (row) => (
        <div className="dark:text-dark_custom-full-white">{row.searchItem}</div>
      ),
    },
    {
      name: t("table.col.action"),
      cell: (row) => (
        <div>
          {actions?.map(
            (action, index) =>
              action.type === "delete" && (
                <div
                  key={index}
                  className="p-2 rounded-md bg-custom-gray-light cursor-pointer"
                  onClick={() => {
                    dispatch(setLoading(true));
                    axios
                      .delete(api.SettingsApi.deleteCodeMapper + row.id)
                      .then((res) => {
                        dispatch(setLoading(false));
                        if (res.data.statusCode === "200") {
                          successNotification(t("toast.success_delete"));
                          setIsReload((currState) => !currState);
                        }
                      })
                      .catch(() => {
                        dispatch(setLoading(false));
                        errorNotification(t("toast.error"));
                      });
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.3">
                      <path
                        d="M10.5797 14.6075L5.54634 14.6675C5.11031 14.6737 4.68845 14.5127 4.36736 14.2176C4.04626 13.9226 3.85029 13.5158 3.81968 13.0808L3.33301 6.12081C3.32556 6.01899 3.33946 5.91673 3.37381 5.82058C3.40816 5.72444 3.46221 5.63652 3.5325 5.56247C3.60278 5.48842 3.68776 5.42986 3.78198 5.39054C3.8762 5.35123 3.9776 5.33202 4.07967 5.33414H11.9197C12.0211 5.33209 12.1219 5.35113 12.2157 5.39004C12.3094 5.42896 12.3941 5.48691 12.4642 5.56022C12.5344 5.63354 12.5886 5.72063 12.6234 5.81598C12.6582 5.91132 12.6728 6.01286 12.6663 6.11414L12.273 12.9941C12.2492 13.4281 12.0608 13.8367 11.7461 14.1365C11.4315 14.4363 11.0143 14.6047 10.5797 14.6075Z"
                        fill="#A1A5B7"
                      />
                    </g>
                    <path
                      d="M9.487 9.06641H6.51367C6.38106 9.06641 6.25389 9.01373 6.16012 8.91996C6.06635 8.82619 6.01367 8.69901 6.01367 8.56641C6.01367 8.4338 6.06635 8.30662 6.16012 8.21285C6.25389 8.11908 6.38106 8.06641 6.51367 8.06641H9.487C9.61961 8.06641 9.74679 8.11908 9.84056 8.21285C9.93433 8.30662 9.987 8.4338 9.987 8.56641C9.987 8.69901 9.93433 8.82619 9.84056 8.91996C9.74679 9.01373 9.61961 9.06641 9.487 9.06641Z"
                      fill="#A1A5B7"
                    />
                    <path
                      d="M8.96654 11.5332H7.0332C6.90059 11.5332 6.77342 11.4805 6.67965 11.3868C6.58588 11.293 6.5332 11.1658 6.5332 11.0332C6.5332 10.9006 6.58588 10.7734 6.67965 10.6796C6.77342 10.5859 6.90059 10.5332 7.0332 10.5332H8.96654C9.09914 10.5332 9.22632 10.5859 9.32009 10.6796C9.41386 10.7734 9.46654 10.9006 9.46654 11.0332C9.46654 11.1658 9.41386 11.293 9.32009 11.3868C9.22632 11.4805 9.09914 11.5332 8.96654 11.5332Z"
                      fill="#A1A5B7"
                    />
                    <path
                      d="M13.4999 4.7738H13.4266C9.82798 4.27899 6.17856 4.27899 2.57994 4.7738C2.45102 4.79078 2.32056 4.75687 2.21624 4.67926C2.11191 4.60166 2.04191 4.48647 2.0211 4.35812C2.00028 4.22976 2.03029 4.09835 2.10475 3.99176C2.17921 3.88516 2.29226 3.81176 2.41994 3.78713C6.11947 3.26627 9.87373 3.26627 13.5733 3.78713C13.6965 3.80737 13.8077 3.87301 13.885 3.97114C13.9623 4.06927 14.0001 4.19277 13.9909 4.31734C13.9817 4.44191 13.9262 4.55852 13.8353 4.64424C13.7445 4.72995 13.6248 4.77855 13.4999 4.78047V4.7738Z"
                      fill="#A1A5B7"
                    />
                    <path
                      d="M10.6663 3.89398H5.33301L5.63301 2.34732C5.68647 2.0664 5.83489 1.81241 6.05336 1.62792C6.27184 1.44342 6.54711 1.33965 6.83301 1.33398H9.18634C9.47744 1.33509 9.75908 1.43749 9.98292 1.62361C10.2067 1.80974 10.3588 2.06797 10.413 2.35398L10.6663 3.89398Z"
                      fill="#A1A5B7"
                    />
                  </svg>
                </div>
              )
          )}
        </div>
      ),
    },
  ];
  const actions = [
    {
      type: "delete",
      path: "",
    },
  ];

  // --------- lifecycles ---------
  useEffect(() => {
    if (mapperData) {
      const values = mapperData.data?.map((item, index) => ({
        rowId: index + 1,
        id: item.codeMapperId,
        accountCode: item.accountCode,
        accountName: item.accountName,
        searchItem: item.searchItem,
      }));
      setData(values);
    }
  }, [mapperData]);
  useEffect(() => {
    id &&
      dispatch(
        getCodeMappers({
          pageNumber: 0,
          pageSize: 0,
          filters: [
            {
              property: "FinsmartCodingId",
              operation: 5,
              values: [`${id}`],
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

  // ------------ functions ----------
  const openModalHandler = (modal) => {
    setOpenModal(true);
    setModalType(modal);
  };
  const closeModalHandler = () => setOpenModal(false);
  // ---------- render jsx ----------
  return (
    <>
      <Modal state={openModal} onCloseModal={closeModalHandler}>
        {modalType === "create" && (
          <CreateCodeMapper
            id={id}
            onCloseModal={closeModalHandler}
            isReloadPage={() => setIsReload((currState) => !currState)}
          />
        )}
      </Modal>
      <div
        className={`dark:bg-dark_custom-light-black rounded-10 overflow-hidden overflow-y-scroll ${
          mapperData.count ? "h-[500px]" : "h-auto"
        }`}
      >
        <div className="flex flex-col gap-y-8 w-full p-4 bg-white dark:bg-dark_custom-light-black">
          {Object.keys(mapperData).length > 0 && (
            <div className="flex justify-between items-center dark:bg-dark_custom-light-black ml-auto">
              <Button
                title={t("button.create_title")}
                classes="px-4"
                onClick={() => openModalHandler("create")}
              />
            </div>
          )}
          {loading && (
            <div className="text-center">
              <PulseLoader size={8} color="#95ebf5" />
            </div>
          )}
          {mapperData.count > 0 ? (
            <Table cols={cols} data={data} />
          ) : (
            <span className="mx-auto text-purple-300">
              {t("text.select_coding")}
            </span>
          )}
        </div>
      </div>
    </>
  );
};
