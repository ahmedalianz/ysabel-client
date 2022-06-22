import Image from "next/image";
import Zoom from "react-reveal/Zoom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function Filler() {
  const { t } = useTranslation();
  const { language } = useSelector((state) => state.theme);

  return (
    <section className={`filler ${language}`}>
      <Image
        src="/images/banner.webp"
        alt="cakes"
        layout="fill"
        quality={100}
        objectPosition="top"
        objectFit="cover"
        loading="lazy"
        placeholer="blur"
        blurDataURL="/images/blur.png"
      />
      <div className="filler__text">
        <Zoom>
          <div className="title1">Ysabel Lounge</div>
        </Zoom>
      </div>
    </section>
  );
}
