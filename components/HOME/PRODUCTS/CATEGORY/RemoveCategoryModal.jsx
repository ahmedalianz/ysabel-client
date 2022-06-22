import { Button, Modal } from "react-bootstrap";

import CategoryService from "services/CategoryService";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function RemoveCategoryModal(props) {
  const { language } = useSelector((state) => state.theme);
  const { t } = useTranslation();
  const removeCategory = async () => {
    let res = await CategoryService.deleteCategory(
      props.categoryid,
      props.token
    );
    if (res.status === "success") {
      toast.success(t("Category_Deleted"));
      await props.onHide();
      await props.onRemove(props.categoryid);
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
          {t("Remove_Category")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{t("delete_category_confirmation")}</Modal.Body>
      <Modal.Footer className={language}>
        <Button variant="secondary" type="button" onClick={props.onHide}>
          {t("No")}
        </Button>
        <Button
          style={{ backgroundColor: "var(--buttons-color)" }}
          type="button"
          onClick={removeCategory}
        >
          {t("Yes")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
