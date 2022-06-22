import {
  Button,
  Col,
  Form,
  Modal,
  ProgressBar,
  Row,
  Spinner,
} from "react-bootstrap";

import { useEffect, useState } from "react";

import Image from "next/image";
import ProductService from "services/ProductService";
import RequiredStar from "components/RequiredStar";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function AddCategoryModal(props) {
  const { t } = useTranslation();
  const { language } = useSelector((state) => state.theme);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const { categories } = useSelector((state) => state.categories);
  const { admin } = useSelector((state) => state.admin);
  const [image, setImage] = useState("");
  const [productFields, setProductFields] = useState({
    name_ar: "",
    name_en: "",
    desc_ar: "",
    desc_en: "",
    price: "",
    category: "",
  });
  const [isBestSeller, setIsBestSeller] = useState(false);
  useEffect(() => {
    if (props.product) {
      console.log("props.product", props.product);
      setProductFields({
        ...props.product,
        category: props.product.category._id,
      });
      setImage(process.env.NEXT_PUBLIC_API_URL + "/" + props.product.image);
      setIsBestSeller(props.product.bestSeller);
    }
  }, [props.product]);

  const changeInputValue = (e) => {
    setProductFields({ ...productFields, [e.target.name]: e.target.value });
  };
  const toggleBestSeller = () => {
    setIsBestSeller(!isBestSeller);
  };
  const chooseFile = (e) => {
    setFile(e.target.files[0]);
  };
  const editProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    let product = {
      ...productFields,
      bestSeller: isBestSeller,
    };
    let res = await ProductService.editProduct(product, admin.token);
    if (res.status === "success") {
      if (file) {
        const data = new FormData();
        data.append("img", file, file.name);
        await ProductService.uploadImage(data, res.data._id, admin.token);
      }
      toast.success(t("Product_Updated"));
      await props.onHide();
      window.location.reload();
      setLoading(false);
    } else {
      setLoading(false);
      toast.error(t("error"));
    }
  };
  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      !productFields.name_en ||
      !productFields.price ||
      !productFields.category
    ) {
      setLoading(false);
      toast.error(t("fill_all_fields"));
      return;
    }
    let product = {
      ...productFields,
      bestSeller: isBestSeller,
    };
    let res = await ProductService.addProduct(product, admin.token);
    if (res.status === "success") {
      if (file) {
        const data = new FormData();
        data.append("img", file, file.name);
        await ProductService.uploadImage(data, res.data._id, admin.token);
      }
      toast.success(t("Product_Added"));
      await props.onHide();
      window.location.reload();
      setLoading(false);
    } else {
      setLoading(false);
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
          {props.product ? t("Edit_Product") : t("Add_Product")}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={props.product ? editProduct : addProduct}>
        <Modal.Body>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2">
              {t("enName")}
              <RequiredStar />
            </Form.Label>
            <Col sm="10">
              <Form.Control
                value={productFields.name_en}
                required
                name="name_en"
                onChange={changeInputValue}
                type="text"
                placeholder={t("enProduct_Name")}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2">
              {t("arName")}
            </Form.Label>
            <Col sm="10">
              <Form.Control
                value={productFields.name_ar}
                required
                name="name_ar"
                onChange={changeInputValue}
                type="text"
                placeholder={t("arProduct_Name")}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2">
              {t("Price")}
              <RequiredStar />
            </Form.Label>
            <Col sm="10">
              <Form.Control
                value={productFields.price}
                required
                name="price"
                onChange={changeInputValue}
                type="number"
                placeholder={t("Product_Price")}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2">
              {t("enDescription")}
            </Form.Label>
            <Col sm="10">
              <Form.Control
                value={productFields.desc_en}
                name="desc_en"
                onChange={changeInputValue}
                as="textarea"
                type="text"
                placeholder={t("enProduct_Description")}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2">
              {t("arDescription")}
            </Form.Label>
            <Col sm="10">
              <Form.Control
                value={productFields.desc_ar}
                name="desc_ar"
                onChange={changeInputValue}
                as="textarea"
                type="text"
                placeholder={t("arProduct_Description")}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formFileLg" className="mb-3">
            <Form.Label column sm="2">
              {t("Choose_Image")}
            </Form.Label>
            <Col sm="10">
              <Row>
                <Col sm="12" md="9">
                  <Form.Control
                    type="file"
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
                    image?.url && (
                      <Image
                        src={image.url}
                        alt="preview Image"
                        width={50}
                        height={50}
                      />
                    )
                  )}
                </Col>
              </Row>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Group as={Col}>
              <Row>
                <Col sm={5}>
                  <Form.Label>{t("Best_Seller")}</Form.Label>
                </Col>
                <Col>
                  <Form.Check
                    type="switch"
                    value={isBestSeller}
                    checked={isBestSeller}
                    onChange={toggleBestSeller}
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group as={Col}>
              <Row>
                <Col sm={5}>
                  <Form.Label>
                    {t("category")}
                    <RequiredStar />
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Select
                    name="category"
                    aria-label={t("Choose_category")}
                    onChange={changeInputValue}
                  >
                    <option disabled selected>
                      {t("Choose_category")}
                    </option>
                    {categories.map((category) => (
                      <option
                        key={category._id}
                        value={category._id}
                        selected={category._id === productFields.category}
                      >
                        {language === "ar"
                          ? category.name.ar
                            ? category.name.ar
                            : category.name.en
                          : category.name.en}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>
          </Form.Group>
          <div className="d-flex justify-content-center">
            {file && progress !== 0 && progress !== 100 && (
              <ProgressBar
                className="w-50"
                animated
                label={`${progress}%`}
                now={progress}
              />
            )}
          </div>
          <div className="hint">{t("hint")}</div>
        </Modal.Body>
        <Modal.Footer className={language}>
          <Button variant="secondary" type="button" onClick={props.onHide}>
            {t("Close")}
          </Button>
          <button className="main-button" type="submit" disabled={loading}>
            {loading ? (
              <div className="mx-4">
                <Spinner animation="border" />
              </div>
            ) : props.product ? (
              t("Edit_Product")
            ) : (
              t("Add_Product")
            )}
          </button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
