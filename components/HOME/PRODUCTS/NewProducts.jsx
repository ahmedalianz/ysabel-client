// import { Container } from "react-bootstrap";
// import NewProductCard from "./NewProductCard";
// import Slider from "react-slick";
// import { useSelector } from "react-redux";
// import { useTranslation } from "react-i18next";

// export default function NewProducts({ newProducts }) {
//   const { language } = useSelector((state) => state.theme);
//   const { t } = useTranslation();
//   const settings = {
//     dots: false,
//     infinite: true,
//     rtl: language === "ar" ? true : false,
//     slidesToShow: newProducts.length > 5 ? 5 : newProducts.length,
//     cssEase: "linear",
//     slidesToScroll: 1,
//     // autoplay: true,
//     autoplaySpeed: 2000,
//     nextArrow: <img src="/images/slider-arrow-right.svg" alt="" />,
//     prevArrow: <img src="/images/slider-arrow-left.svg" alt="" />,
//     initialSlide: 0,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: newProducts.length > 3 ? 3 : newProducts.length,
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: newProducts.length > 2 ? 2 : newProducts.length,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };
//   return (
//     <section className={`new-list-container ${language}`}>
//       <Container>
//         <h1 className="new-list__title">{t("Recent_Added")}</h1>
//         <div className="new-list">
//           <Slider {...settings}>
//             {newProducts.length > 0 &&
//               newProducts.map((product) => (
//                 <NewProductCard product={product} key={product._id} />
//               ))}
//           </Slider>
//         </div>
//       </Container>
//     </section>
//   );
// }
