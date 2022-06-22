import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";

import UserService from "services/UserService";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ThemeService from "services/ThemeService";
import { setThemeCurrency } from "../redux/theme";

export default function ChangePasswordModal(props) {
  const dispatch = useDispatch();
  const { language, theme } = useSelector((state) => state.theme);
  const { t } = useTranslation();
  const [error, setError] = useState({ password: "" });
  const [passwordFields, setPasswordFields] = useState({
    password: "",
    new_password: "",
  });
  const [currencyFields, setCurrencyFields] = useState({
    en: theme.currency.en,
    ar: theme.currency.ar,
  });
  useEffect(() => {
    setCurrencyFields({
      en: theme.currency.en,
      ar: theme.currency.ar,
    });
  }, [theme]);
  const changePassword = (e) => {
    setPasswordFields({
      ...passwordFields,
      [e.target.name]: e.target.value,
    });
  };
  const changeCurrency = (e) => {
    setCurrencyFields({
      ...currencyFields,
      [e.target.name]: e.target.value,
    });
  };

  const changePasswordHandler = async (e) => {
    e.preventDefault();
    let res = await UserService.changePassword(passwordFields, props.token);
    if (res.status === "success") {
      toast.success(t("password_changed"));
      props.onHide();
    } else {
      toast.error(t("error"));
      setError(res.data);
    }
  };
  const changeCurrencyHandler = async (e) => {
    e.preventDefault();
    let res = await ThemeService.changeTheme(
      { currency: currencyFields },
      props.token
    );
    if (res.status === "success") {
      toast.success(t("currency_changed"));
      dispatch(setThemeCurrency(currencyFields));
      props.onHide();
    } else {
      toast.error(t("error"));
      setError(res.data);
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={language}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.modalType === "changePassword"
            ? t("change_password")
            : t("change_currency")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={
            props.modalType === "changePassword"
              ? changePasswordHandler
              : changeCurrencyHandler
          }
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <FloatingLabel
              controlId="floatingInput1"
              label={
                props.modalType === "changePassword"
                  ? t("Password_old")
                  : t("Currency_en")
              }
              className="mb-3"
            >
              <Form.Control
                required
                value={
                  props.modalType === "changePassword"
                    ? passwordFields.password
                    : currencyFields.en
                }
                onChange={
                  props.modalType === "changePassword"
                    ? changePassword
                    : changeCurrency
                }
                type={
                  props.modalType === "changePassword" ? "password" : "text"
                }
                name={props.modalType === "changePassword" ? "password" : "en"}
                placeholder={t("Password_input")}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group
            controlId="formBasicPassword"
            className="password-box mb-3"
          >
            <FloatingLabel
              controlId="floatingInput2"
              label={
                props.modalType === "changePassword"
                  ? t("Password_new")
                  : t("Currency_ar")
              }
              className="mb-3"
            >
              <Form.Control
                required
                value={
                  props.modalType === "changePassword"
                    ? passwordFields.new_password
                    : currencyFields.ar
                }
                onChange={
                  props.modalType === "changePassword"
                    ? changePassword
                    : changeCurrency
                }
                type={
                  props.modalType === "changePassword" ? "password" : "text"
                }
                name={
                  props.modalType === "changePassword" ? "new_password" : "ar"
                }
                placeholder={t("Password_input")}
              />
            </FloatingLabel>
          </Form.Group>
          <div className="my-2 text-danger">{error.password}</div>

          <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit" className="w-50">
              {props.modalType === "changePassword"
                ? t("change_password")
                : t("change_currency")}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
