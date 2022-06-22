import Image from "next/image";
import ViewProductModal from "./PRODUCT/ViewProductModal";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function NewProductCard({ product }) {
  const { language, theme } = useSelector((state) => state.theme);

  const [viewProductModal, setViewProductModal] = useState(false);
  const showProductModal = () => setViewProductModal(true);
  return (
    <div
      className={`${language} product ${
        product.bestSeller ? "best-seller-product" : ""
      }`}
    >
      <span className="best-seller">Best Seller</span>
      <div className="product__image" onClick={showProductModal}>
        <Image
          src={product.image.url}
          layout="fill"
          placeholder="blur"
          blurDataURL="images/blur.png"
          loading="lazy"
          objectFit="contain"
          quality={100}
          alt={product.name}
        />
      </div>
      <h4 className="product__title">
        {language === "ar"
          ? product.name_ar
            ? product.name_ar
            : product.name_en
          : product.name_en}
      </h4>
      <span className="product__price">
        <span>{product.price}</span>
        <span>
          {language === "ar"
            ? theme.currency.ar
              ? theme.currency.ar
              : theme.currency.en
            : theme.currency.en}
        </span>
      </span>
      <p className="product__desc">
        {language === "ar"
          ? product.desc_ar
            ? product.desc_ar
            : product.desc_en
          : product.desc_en}
      </p>
      <ViewProductModal
        show={viewProductModal}
        product={product}
        onHide={() => setViewProductModal(false)}
      />
    </div>
  );
}
