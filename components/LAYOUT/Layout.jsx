import Cookies from "js-cookie";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { setLanguage, setMainTheme } from "redux/theme";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import ThemeService from "services/ThemeService";
import UserService from "services/UserService";
import { setAdminData } from "redux/admin";

export default function Layout({ children }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(async () => {
    let theme = await ThemeService.getTheme();
    await dispatch(setMainTheme(theme));
  }, []);
  const bakeryAdmin = Cookies.get("bakeryAdmin");
  useEffect(async () => {
    if (bakeryAdmin) {
      let res = await UserService.authorizeMe(bakeryAdmin);
      if (res?.status === "success") {
        dispatch(setAdminData(res.data));
        return;
      }
    }
    Cookies.remove("bakeryAdmin", { path: "/" });
  }, [bakeryAdmin]);
  const languages = [
    {
      code: "ar",
      name: "العربيه",
      dir: "rtl",
      country_code: "sa",
      flag: "/images/saudi-arabia.svg",
    },
    {
      code: "en",
      name: "English",
      dir: "ltr",
      country_code: "gb",
      flag: "/images/united-kingdom.svg",
    },
  ];
  const currentLanguageCode = Cookies.get("i18next") || "ar";
  const currentLanguage = languages.find(
    (lang) => lang.code === currentLanguageCode
  );
  useEffect(() => {
    dispatch(setLanguage(currentLanguageCode));
    document.body.dir = currentLanguage.dir || "rtl";
    document.title = t("title");
  }, [currentLanguage, t]);
  return (
    <>
      <NavBar {...{ languages, currentLanguageCode }} />
      {children}
      <Footer />
    </>
  );
}
