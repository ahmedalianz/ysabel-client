import Image from "next/image";
import ViewProductModal from "./PRODUCT/ViewProductModal";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ProductListCard({
  product,
  editProduct,
  removeProduct,
  admin,
}) {
  const [viewProductModal, setViewProductModal] = useState(false);
  const showProductModal = () => setViewProductModal(true);
  const { t } = useTranslation();
  const { language, theme } = useSelector((state) => state.theme);

  return (
    <>
      <div
        className={`product-card ${
          product.bestSeller ? "best-seller-product" : ""
        }`}
        onClick={showProductModal}
      >
        <div className="product-card__text">
          <h4 className="product-card__title">
            {language === "ar"
              ? product.name_ar
                ? product.name_ar
                : product.name_en
              : product.name_en}
          </h4>
          <span className="product-card__price">
            {product.price}{" "}
            {language === "ar"
              ? theme.currency.ar
                ? theme.currency.ar
                : theme.currency.en
              : theme.currency.en}
          </span>
          <p className="product-card__desc">
            {language === "ar"
              ? product.desc_ar
                ? product.desc_ar
                : product.desc_en
              : product.desc_en}
          </p>
        </div>
        <span className="best-seller">{t("Best_Seller")}</span>
        <div className="product-card__image">
          <Image
            src={
              process.env.NEXT_PUBLIC_API_URL + "/" + product.image ||
              "/images/product.png"
            }
            width={100}
            height={100}
            placeholder="blur"
            blurDataURL="images/blur.png"
            loading="lazy"
            objectFit="contain"
            quality={100}
            alt={product.name_en}
          />
        </div>
        {admin && (
          <div className={`product-card__controls ${language}`}>
            <span
              onClick={(e) => editProduct(e, product)}
              className="edit-icon"
            >
              <Image
                src="/images/edit.webp"
                alt="remove"
                width={25}
                height={20}
                quality={50}
              />
            </span>
            <span
              onClick={(e) => removeProduct(e, product)}
              className="remove-icon"
            >
              <Image
                src="/images/remove.png"
                alt="remove"
                width={20}
                height={20}
                quality={50}
              />
            </span>
          </div>
        )}
      </div>
      <ViewProductModal
        show={viewProductModal}
        product={product}
        onHide={() => setViewProductModal(false)}
      />
    </>
  );
}
