import i18next from "i18next";
import { initReactI18next } from "react-i18next";

/* =============================
     Import all translation files
   ============================= */
import TR from "./locales/tr.json";
import EN from "./locales/en.json";

const resources = {
    tr: {
        translation: TR
    },
    en: {
        translation: EN
    }
}

i18next.use(initReactI18next).init({
  resources,
  lng: "en",
});

export default i18next;