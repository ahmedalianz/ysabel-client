import Image from "next/image";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function ViewProductModal(props) {
  const { language, theme } = useSelector((state) => state.theme);
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
          {language === "ar"
            ? props.product.name_ar
              ? props.product.name_ar
              : props.product.name_en
            : props.product.name_en}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="view-product">
          <div className="view-product__image">
            <Image
              src={
                process.env.NEXT_PUBLIC_API_URL + "/" + props.product.image ||
                "/images/product.png"
              }
              width={200}
              height={200}
              placeholder="blur"
              blurDataURL="images/blur.png"
              loading="lazy"
              objectFit="cover"
              quality={100}
              alt={props.product.name_en}
            />
          </div>
          <h3 className="view-product__title">
            {language === "ar"
              ? props.product.name_ar
                ? props.product.name_ar
                : props.product.name_en
              : props.product.name_en}
          </h3>
          <span className="view-product__price">
            <span>{props.product.price}</span>
            <span>
              {language === "ar"
                ? theme.currency.ar
                  ? theme.currency.ar
                  : theme.currency.en
                : theme.currency.en}
            </span>
          </span>
          <p className="view-product__desc">
            {language === "ar"
              ? props.product.desc_ar
                ? props.product.desc_ar
                : props.product.desc_en
              : props.product.desc_en}
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
}
