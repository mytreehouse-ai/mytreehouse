import Image from "next/image";

const HeroImageBanner = () => {
  return (
    <Image
      className="brightness-50 lg:rounded-2xl"
      src="/main-homepage-banner.jpg"
      alt="home_page_main_banner"
      sizes="(max-width: 768px) 100vw, 700px"
      priority={true}
      fill={true}
    />
  );
};

export default HeroImageBanner;
