import { useDispatch, useSelector } from "react-redux";

import CategoryController from "./CATEGORY/CategoryController";
import { Container, Spinner } from "react-bootstrap";
import Image from "next/image";
import ProductController from "./PRODUCT/ProductController";
import ProductListCard from "./ProductListCard";
import ProductService from "services/ProductService";
import { setProducts } from "redux/products";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { getProduct } from "redux/products";

export default function ProductsList() {
  const { t } = useTranslation();
  const { language } = useSelector((state) => state.theme);
  const [swiper, setSwiper] = useState(null);
  const { admin } = useSelector((state) => state.admin);
  const { categories } = useSelector((state) => state.categories);
  const { viewdProducts } = useSelector((state) => state.products);
  let dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const [removeCategoryModal, setRemoveCategoryModal] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [categoryToBeEdited, setCategoryToBeEdited] = useState(null);
  const [addProductModal, setAddProductModal] = useState(false);
  const [removeProductModal, setRemoveProductModal] = useState(false);
  const [productToBeEdited, setProductToBeEdited] = useState(null);
  useEffect(() => {
    if (categories) {
      let category = categories[selectedCategoryIndex];
      if (category) {
        dispatch(getProduct(category._id));
      }
    }
  }, [selectedCategoryIndex, categories]);
  const changeProducts = async (index) => {
    if (index === selectedCategoryIndex) return;
    setLoading(true);
    slideTo(index);
    // swiper.activeIndex = swiper.clickedIndex;
    setSelectedCategoryIndex(index);
    // let category = categories[index]._id;
    // let productsByCategory = await ProductService.getProductsByPageAndCategory(
    //   1,
    //   category
    // );
    // dispatch(setProducts(productsByCategory));
    setLoading(false);
    setPage(1);
  };
  const changePage = async (pageNum) => {
    if (page === pageNum) return;
    setLoading(true);
    setPage(pageNum);
    let category = categories[selectedCategoryIndex];
    if (category) {
      dispatch(getProduct(category._id));
    }
    setLoading(false);
  };

  const addCategory = () => {
    setAddCategoryModal(true);
  };

  const removeCategory = (e, categoryId) => {
    e.stopPropagation();
    setCategoryId(categoryId);
    setRemoveCategoryModal(true);
  };
  const editCategory = (e, category) => {
    e.stopPropagation();
    setCategoryId(category._id);
    setCategoryToBeEdited(category);
    setAddCategoryModal(true);
  };

  const addProduct = () => {
    setAddProductModal(true);
  };
  const removeProduct = (e, product) => {
    e.stopPropagation();
    setProductToBeEdited(product);
    setRemoveProductModal(true);
  };
  const editProduct = (e, product) => {
    e.stopPropagation();
    setProductToBeEdited(product);
    setAddProductModal(true);
  };
  const slideTo = (index) => swiper.slideTo(index);
  return (
    <section className={`list-container ${language}`}>
      <Container>
        <div className="list__title-container">
          <h1 className="list__title">{t("What_we_offer")}</h1>
          {admin && (
            <>
              <div className="plus-category">
                <button className="main-button" onClick={addCategory}>
                  {t("Add_Category")}
                  <Image
                    src="/images/plus.png"
                    alt="plus"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
              <div className="plus-product">
                <button className="main-button" onClick={addProduct}>
                  {t("Add_Product")}
                  <Image
                    src="/images/plus.png"
                    alt="plus"
                    width={20}
                    quality={50}
                    height={20}
                  />
                </button>
              </div>
            </>
          )}
        </div>
        <div className="list__menu-container">
          <div className="list__menu">
            <ul className="menu-bar">
              <Swiper
                initialSlide={0}
                onSwiper={setSwiper}
                // loop={true}
                spaceBetween={30}
                dir="rtl"
                modules={[Navigation]}
                slidesPerView={5}
                onSlideChange={(swiper) => changeProducts(swiper.activeIndex)}
                navigation={true}
                breakpoints={{
                  360: {
                    slidesPerView: 1,
                  },
                  480: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },

                  768: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 30,
                  },
                }}
              >
                {categories &&
                  categories.map((category, i) => (
                    <SwiperSlide key={i}>
                      {({ isActive }) => (
                        <div
                          className="category-slide"
                          onClick={() => changeProducts(i)}
                        >
                          <div className="category-image">
                            <Image
                              width={70}
                              height={70}
                              objectFit="cover"
                              src={
                                process.env.NEXT_PUBLIC_API_URL +
                                  "/" +
                                  category.image || "/images/product.png"
                              }
                              alt="category"
                            />
                          </div>
                          <li className={isActive ? "selected-category" : ""}>
                            {language === "ar"
                              ? category.name.ar
                                ? category.name.ar
                                : category.name.en
                              : category.name.en}
                            {admin && (
                              <>
                                <span
                                  onClick={(e) =>
                                    removeCategory(e, category._id)
                                  }
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
                                <span
                                  onClick={(e) => editCategory(e, category)}
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
                              </>
                            )}
                          </li>
                        </div>
                      )}
                    </SwiperSlide>
                  ))}
              </Swiper>
            </ul>
          </div>
        </div>
        <div>
          <div className="list">
            {!loading ? (
              viewdProducts.length > 0 &&
              viewdProducts
                .slice((page - 1) * 12, 12 * page)
                .map((product) => (
                  <ProductListCard
                    {...{ product, removeProduct, editProduct, admin }}
                    key={product._id}
                  />
                ))
            ) : (
              <div className="products-spinner">
                <Spinner animation="border" />
              </div>
            )}
          </div>
          <div className="pagination">
            {[...Array(Math.ceil(viewdProducts.length / 12)).keys()].map(
              (page) => (
                <button
                  className="main-button"
                  key={page}
                  onClick={() => changePage(page + 1)}
                >
                  {page + 1}
                </button>
              )
            )}
          </div>
        </div>
      </Container>

      <CategoryController
        {...{
          admin,
          addCategoryModal,
          setAddCategoryModal,
          removeCategoryModal,
          setRemoveCategoryModal,
          categoryId,
          setCategoryId,
          categoryToBeEdited,
          setCategoryToBeEdited,
        }}
      />
      <ProductController
        {...{
          admin,
          addProductModal,
          setAddProductModal,
          removeProductModal,
          setRemoveProductModal,
          productToBeEdited,
          setProductToBeEdited,
        }}
      />
    </section>
  );
}
