import { Container, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import ChangePasswordModal from "components/ChangePasswordModal";
import ChangeThemeModal from "components/ChangeThemeModal";
import Image from "next/image";
import Link from "next/link";
import UserService from "services/UserService";
import i18n from "i18next";
import { setLanguage } from "redux/theme";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function NavBar({ languages }) {
  const { language } = useSelector((state) => state.theme);
  const { admin } = useSelector((state) => state.admin);
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [changeThemeModal, setChangeThemeModal] = useState(false);
  const [modalType, setModalType] = useState("changePassword");
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const changePasswordModalOpen = () => {
    setChangePasswordModal(true);
    setModalType("changePassword");
  };
  const changeCurrencyModalOpen = () => {
    setChangePasswordModal(true);
    setModalType("changeCurrency");
  };
  const changeThemeModalOpen = () => {
    setChangeThemeModal(true);
  };
  const logout = async () => await UserService.logout(admin.token);
  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    dispatch(setLanguage(code));
  };
  return (
    <nav className="navbar">
      <Container className="navbar__wrapper">
        <div className="logo">
          <Link href="/">
            <a>
              <Image
                src="/images/logo.png"
                alt=""
                width="200"
                height="80"
                objectFit="contain"
              />
            </a>
          </Link>
        </div>
        {admin && (
          <div className={`item menu ${language}`}>
            <Dropdown>
              <Dropdown.Toggle
                style={{
                  border: "none",
                  backgroundColor: "var(--nav-color)",
                  color: "black",
                }}
                id="dropdown-basic"
              >
                <Image src="/images/menu.png" width={25} height={25} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  key="menu-item-1"
                  onClick={changePasswordModalOpen}
                  className="d-flex justify-content-between align-items-center"
                >
                  {t("change_password")}
                </Dropdown.Item>
                <Dropdown.Item
                  key="menu-item-2"
                  onClick={changeCurrencyModalOpen}
                  className="d-flex justify-content-between align-items-center"
                >
                  {t("change_currency")}
                </Dropdown.Item>
                <Dropdown.Item
                  key="menu-item-3"
                  onClick={changeThemeModalOpen}
                  className="d-flex justify-content-between align-items-center"
                >
                  {t("change_theme")}
                </Dropdown.Item>
                <Dropdown.Item
                  key="menu-item-4"
                  onClick={logout}
                  className="d-flex justify-content-between align-items-center"
                >
                  {t("Logout")}
                  <Image
                    src="/images/logout.png"
                    width="20"
                    height="20"
                    objectFit="contain"
                  />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}

        <div className={`item language ${language}`}>
          <Dropdown>
            <Dropdown.Toggle
              style={{
                border: "none",
                backgroundColor: "var(--nav-color)",
                color: "black",
              }}
              id="dropdown-basic"
            >
              <Image src="/images/lang.png" width={25} height={25} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {languages.map((language) => (
                <Dropdown.Item
                  key={language.code}
                  onClick={() => changeLanguage(language.code)}
                  className="d-flex justify-content-between align-items-center"
                >
                  {language.name}
                  <Image
                    width="20"
                    height="20"
                    objectFit="contain"
                    src={language.flag}
                    alt={language.name}
                  />
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
      <ChangePasswordModal
        token={admin ? admin.token : null}
        show={changePasswordModal}
        modalType={modalType}
        onHide={() => {
          setChangePasswordModal(false);
        }}
      />
      <ChangeThemeModal
        token={admin ? admin.token : null}
        show={changeThemeModal}
        onHide={() => {
          setChangeThemeModal(false);
        }}
      />
    </nav>
  );
}
