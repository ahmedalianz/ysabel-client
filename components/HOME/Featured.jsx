// import Image from "next/image";
// // import Slider from "react-slick";
// import { useSelector } from "react-redux";
// import { useTranslation } from "react-i18next";

// export default function Featured() {
//   const { t } = useTranslation();
//   const { language } = useSelector((state) => state.theme);
//   const settings = {
//     dots: false,
//     infinite: true,
//     slidesToShow: 1,
//     fade: language === "ar" ? false : true,
//     lazyLoad: true,
//     cssEase: "linear",
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     initialSlide: 0,
//     rtl: language === "en" ? false : true,
//   };
//   const slides = [
//     {
//       image: "/images/featured2.webp",
//       title: t("featured_title_1"),
//       subtitle: t("featured_subtitle_1"),
//       paragraph: t("featured_paragraph_1"),
//     },
//     {
//       image: "/images/featured1.webp",
//       title: t("featured_title_2"),
//       subtitle: t("featured_subtitle_2"),
//       paragraph: t("featured_paragraph_2"),
//     },
//     {
//       image: "/images/featured3.webp",
//       title: t("featured_title_3"),
//       subtitle: t("featured_subtitle_3"),
//       paragraph: t("featured_paragraph_3"),
//     },
//     // {
//     //   image: "/images/featured4.webp",
//     //   title: "",
//     //   subtitle: "",
//     //   paragraph: "",
//     // },
//   ];
//   return (
//     <section className={`featured ${language}`}>
//       <Slider {...settings}>
//         {slides.map((slide, i) => (
//           <div className="featured-img-container" key={i}>
//             <Image
//               src={slide.image}
//               alt="image"
//               loading="lazy"
//               layout="fill"
//               objectFit="cover"
//               quality={100}
//             />
//             <div className="text">
//               <div className="title">{slide.title}</div>
//               <div className="sub-title">{slide.subtitle}</div>
//               <p className="paragraph">{slide.paragraph}</p>
//             </div>
//           </div>
//         ))}
//       </Slider>
//     </section>
//   );
// }
