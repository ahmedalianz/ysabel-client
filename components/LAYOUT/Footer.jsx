import { Container } from "react-bootstrap";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Link from "next/link";
export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <Image
        src="/images/slider.jpg"
        alt="logo"
        layout="fill"
        objectFit="cover"
      />
      <Container>
        <p>
          Copyright © {new Date().getFullYear()} YSABEL LOUNGE | Powered by Air
          Menu
        </p>
        <div className="social">
          <Link href="https://www.instagram.com/ysabel.lounge" passHref>
            <Image
              src="/images/instagram.webp"
              alt="facebook"
              width={25}
              height={25}
              quality={100}
              objectFit="cover"
            />
          </Link>
        </div>
        <div className="link-page">
          <Link href="/">Home</Link>
          <Link href="/about">About Us</Link>
        </div>
      </Container>
    </footer>
  );
}
