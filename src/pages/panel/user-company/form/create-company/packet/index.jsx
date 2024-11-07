import { useEffect } from "react";
import { getPackets } from "../../../../../../redux/actions/settings/packet";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { GiCheckMark } from "react-icons/gi";
import { Button, Spinner } from "../../../../../../components";
import {
  nextStep,
  previousStep,
} from "../../../../../../redux/reducers/user-company";

export const Packet = () => {
  // -------- store --------
  const packetData = useSelector((state) => state.packetSlice.info);
  const loading = useSelector((state) => state.loadingSlice.isLoading);

  // -------- hooks --------
  const dispatch = useDispatch();

  // ---------- i18next ----------
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem("lng");

  // -------- variables ---------
  const periods = ["Monthly", "Yearly"];

  // -------- lifecycle --------
  useEffect(() => {
    dispatch(
      getPackets({
        pageNumber: 0,
        pageSize: 0,
        filters: [],
        orderBy: "",
        includeProperties: "PacketPeriods.Period,Roles",
      })
    );
  }, []);

  // -------- render jsx --------
  return (
    <div className="text-center pr-1 p-4">
      {loading && <Spinner />}

      {packetData.count &&
        packetData.data.map((packet, index) => (
          <>
            <div
              className="flex justify-center gap-x-5 mt-4 dark:text-custom-gray-light"
              key={packet.packetId}
            >
              {packet.packetPeriods.map((period, index) => (
                <div
                  key={period.periodId}
                  className="border border-custom-blue p-5 rounded"
                >
                  <div className="flex justify-around mb-3">
                    <span className="font-bold">{periods[index]}</span>
                  </div>
                  <hr />

                  <div className="flex justify-around mt-5">
                    <div className="flex flex-col gap-y-4 text-sm font-semibold items-left">
                      {packet.roles.length > 0 &&
                        packet.roles.map((role) => (
                          <span className="flex gap-x-0.5">
                            <GiCheckMark color="#07b555" className="mt-0.5" />
                            <pre>{role.title}</pre>
                          </span>
                        ))}
                    </div>
                  </div>
                  <span className="flex flex-col gap-y-3 items-center mt-10">
                    <div className="font-semibold">
                      {t("text.price")}: {period.amount}$
                    </div>
                    <Button
                      //loading={loading}
                      onClick={() => {
                        localStorage.setItem(
                          "comp_packet_",
                          JSON.stringify({
                            // companyId: companyInfo.companyId,
                            packetId: packet.packetId,
                            periodId: period.periodId,
                            amount: period.amount,
                            isActice: true,
                          })
                        );

                        dispatch(nextStep());
                      }}
                    >
                      {t("button.select_title")}
                    </Button>
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-5">
              <Button
                theme={"light"}
                title={t("button.back_title")}
                onClick={() => dispatch(previousStep())}
              />
            </div>
          </>
        ))}
    </div>
  );
};
