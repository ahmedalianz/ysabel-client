import { Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import Image from "next/image";
import CategoryService from "services/CategoryService";
import RequiredStar from "components/RequiredStar";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function AddCategoryModal(props) {
  const { admin } = useSelector((state) => state.admin);
  const [file, setFile] = useState(null);
  const [name, setName] = useState({
    en: "",
    ar: "",
  });

  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();
  const [image, setImage] = useState("");
  const { language } = useSelector((state) => state.theme);
  useEffect(() => {
    if (props.category) {
      setName(props.category.name);
      setImage("http://156.67.210.60:8000" + "/" + props.category.image);
    }
  }, [props.category]);
  const chooseFile = (e) => {
    setFile(e.target.files[0]);
  };
  const changeCategoryName = (e) => {
    setName({ ...name, [e.target.name]: e.target.value });
  };
  const addCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!file || !name.en) {
      setLoading(false);
      toast.error(t("fill_all_fields"));
      return;
    }
    let res = await CategoryService.addCategory(
      { name, image: "image" },
      admin.token
    );
    if (res.status === "success") {
      if (file) {
        const data = new FormData();
        data.append("img", file, file.name);
        await CategoryService.uploadImageCate(data, res.data._id, admin.token);
      }
      toast.success(t("Category_Added"));
      await props.onHide();
      await props.onAdd(res.data);
      // window.location.reload();
      setLoading(false);
    } else {
      toast.error(t("error"));
      setImage("");
      setName({ en: "", ar: "" });
      setFile(null);
      setLoading(false);
    }
  };
  const editCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    let category = {
      name,
    };
    let res = await CategoryService.editCategory(
      category,
      props.category._id,
      admin.token
    );
    if (res.status === "success") {
      if (file) {
        const data = new FormData();
        data.append("img", file, file.name);
        await CategoryService.uploadImageCate(data, res.data._id, admin.token);
      }
      toast.success(t("Category_Updated"));
      await props.onHide();
      await props.onEdit(res.data._id, name);
      window.location.reload();
      setLoading(false);
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
          {props.category ? t("Edit_Category") : t("Add_Category")}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={props.category ? editCategory : addCategory}>
        <Modal.Body>
          <Form.Group as={Row} className="mb-3">
            <Form.Label sm="3" column>
              {t("enCategory_Name")}
              <RequiredStar />
            </Form.Label>
            <Col sm="9">
              <Form.Control
                value={name.en}
                required
                name="en"
                onChange={changeCategoryName}
                type="text"
                placeholder={t("enCategory_Name")}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              {t("arCategory_Name")}
            </Form.Label>
            <Col sm="9">
              <Form.Control
                value={name.ar}
                name="ar"
                onChange={changeCategoryName}
                type="text"
                placeholder={t("arCategory_Name")}
              />
            </Col>
          </Form.Group>
          <Row>
            <Form.Label sm="3" column>
              {t("Choose_Image")}
              {!props.category && <RequiredStar />}
            </Form.Label>
            <Col sm="12" md="6">
              <Form.Control
                type="file"
                required={!props.category}
                onChange={chooseFile}
                size="md"
                className="w-50"
                accept="image/png,image/jpeg,image/jpg,image/webp"
              />
            </Col>

            <Col sm="12" md="3">
              {file ? (
                <Image
                  src={URL.createObjectURL(file)}
                  alt="preview Image"
                  width={50}
                  height={50}
                />
              ) : (
                image && (
                  <Image
                    src={image}
                    alt="preview Image"
                    width={50}
                    height={50}
                  />
                )
              )}
            </Col>
          </Row>

          <div className="hint">{t("hint")}</div>
        </Modal.Body>
        <Modal.Footer className={language}>
          <Button variant="secondary" type="button" onClick={props.onHide}>
            {t("Close")}
          </Button>
          <button disabled={loading} className="main-button" type="submit">
            {loading ? (
              <div className="mx-4">
                <Spinner animation="border" />
              </div>
            ) : props.category ? (
              t("Edit_Category")
            ) : (
              t("Add_Category")
            )}
          </button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
