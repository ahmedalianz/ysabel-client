import { Button, Modal } from "react-bootstrap";

import ProductService from "services/ProductService";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function RemoveProductModal(props) {
  const { t } = useTranslation();
  const { language } = useSelector((state) => state.theme);

  const removeProduct = async () => {
    let res = await ProductService.deleteProduct(
      props.product._id,
      props.token
    );

    if (res.status === "success") {
      toast.success(t("Product_Deleted"));
      await props.onHide();
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
          {t("Delete_Product")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{t("delete_product_confirmation")}</Modal.Body>
      <Modal.Footer className={language}>
        <Button variant="secondary" type="button" onClick={props.onHide}>
          {t("No")}
        </Button>
        <Button
          style={{ backgroundColor: "var(--buttons-color)" }}
          type="button"
          onClick={removeProduct}
        >
          {t("Yes")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
