import { useTranslation } from "react-i18next";
import { Button } from "..";
import { TbArrowBackUp } from "react-icons/tb";
// ++++++++++ images import ++++++++++
// import FailIcon from "../../assets/images/fail.png";

export const PaymentFail = () => {
  // ---------- hooks ----------
  const { t } = useTranslation();

  // ---------- render jsx ----------
  return (
    <div className="flex flex-col gap-y-12">
      {/* <img src={FailIcon} alt="fail" /> */}
      <div className="flex flex-col items-center gap-y-6">
        <h2 className="text-49 text-custom-orange">
          {t("error.payment_fail_title")}
        </h2>
        <h4 className="text-21 text-custom-dark uppercase font-semibold">
          {t("error.payment_fail_sub_title")}
        </h4>
        <p className="text-19 text-custom-dark">
          {t("error.payment_fail_desc")}
        </p>
      </div>
      <div className="flex items-center gap-x-8">
        <Button
          theme="light"
          classes="w-1/2 flex justify-center gap-x-3 uppercase"
          icon={<TbArrowBackUp className="w-5 h-5" />}
          title={t("button.back_to_cart_title")}
        />
        <Button classes="w-1/2 uppercase" title={t("button.resubmit_title")} />
      </div>
    </div>
  );
};
