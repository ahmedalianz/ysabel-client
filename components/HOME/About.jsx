import { Container } from "react-bootstrap";
import Fade from "react-reveal/Fade";
import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
export default function About() {
  const { t } = useTranslation();
  const { language } = useSelector((state) => state.theme);

  return (
    <section className={`${language} about`}>
      <Container>
        <h1 className="about__title">{t("About_US")}</h1>
        <div className="about__box">
          <Fade left>
            <div className="left">
              <Image
                src="/images/about1.jpg"
                alt="about"
                loading="lazy"
                layout="fill"
                quality={100}
                placeholder="blur"
                blurDataURL="/images/blur.png"
                objectFit="cover"
              />
            </div>
          </Fade>
          <Fade right>
            <div className="right">
              <div className="right-top">
                <div>
                  <Image
                    src="/images/logo.png"
                    alt="logo"
                    loading="lazy"
                    width={500}
                    height={250}
                  />
                </div>
                <p>{t("about_paragraph1")}</p>
              </div>
            </div>
          </Fade>
        </div>
        {/* <div className="about__box">
          <Fade left>
            <div className="right">
              <div className="right-top">
                <h3>{t("about_title2")}</h3>
                <p>{t("about_paragraph2")}</p>
              </div>
            </div>
          </Fade>
          <Fade right>
            <div className="left">
              <Image
                src="/images/about2.webp"
                alt="about"
                loading="lazy"
                objectFit="cover"
                layout="fill"
                quality={100}
                placeholder="blur"
                blurDataURL="/images/blur.png"
              />
            </div>
          </Fade>
        </div> */}
      </Container>
    </section>
  );
}
