import { Button, Form, Modal } from "react-bootstrap";

import ThemeService from "services/ThemeService";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChromePicker } from "react-color";
import { setThemeColor } from "redux/theme";
import { useEffect } from "react";
export default function ChangeThemeModal(props) {
  const { language, theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [background_color, setBackground_color] = useState(
    theme.colors.background_color
  );
  const [buttons_color, setButtons_color] = useState(
    theme.colors.buttons_color
  );
  const [font_color, setFont_color] = useState(theme.colors.font_color);
  useEffect(() => {
    setBackground_color(theme.colors.background_color);
    setButtons_color(theme.colors.buttons_color);
    setFont_color(theme.colors.font_color);
  }, [props]);
  const changeThemeHandler = async (e) => {
    e.preventDefault();
    let colors = {
      background_color: background_color.hex,
      buttons_color: buttons_color.hex,
      font_color: font_color.hex,
    };
    let res = await ThemeService.changeTheme({ colors }, props.token);
    if (res.status === "success") {
      toast.success(t("theme_changed"));
      dispatch(setThemeColor(colors));
      props.onHide();
      window.location.reload();
    } else {
      toast.error(t("error"));
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
          {t("change_theme")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={changeThemeHandler}>
          <div
            className="d-flex my-3"
            style={{ justifyContent: "space-evenly" }}
          >
            <div>
              <Form.Label>{t("background_color")}</Form.Label>
              <ChromePicker
                color={background_color}
                onChangeComplete={setBackground_color}
              />
            </div>
            <div>
              <Form.Label>{t("buttons_color")}</Form.Label>

              <ChromePicker
                color={buttons_color}
                onChangeComplete={setButtons_color}
              />
            </div>
          </div>
          <div className="d-grid my-3" style={{ placeItems: "center" }}>
            <Form.Label>{t("text_color")}</Form.Label>

            <ChromePicker color={font_color} onChangeComplete={setFont_color} />
          </div>
          <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit" className="w-50">
              {t("change_theme")}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
