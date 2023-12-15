import ImageComponent from "components/common/ImageComponent";
import Link from "next/link";
import React from "react";
import Slider from "react-slick";
import { TfiAnnouncement } from "react-icons/tfi";
import { useSelector } from "react-redux";
import { RootState } from "state/store";
const SliderSection = ({
  bannerListdata,
  landing,
  announcementListdata,
}: any) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    className: "center",
    slidesToShow: bannerListdata.length < 4 ? 1 : 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div style={{ padding: "2rem 0" }}>
      <section>
        <div
          className="container-fulid"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div className="myNewCon">
            <div style={{ padding: "5rem 14rem" }}>
              <div>
                {/* <img
                  className="icon mr-3"
                  src={"/lorem.svg"}
                  alt="ad1"
                  height={"18px"}
                /> */}
              </div>
              <div className="heading1my">
                Build Your{" "}
                <span className="heading1mySub">Career In Trading</span>
              </div>
              <div className="subheading1" style={{ padding: "5px 0" }}>
                A Right Place To Start Your Trading Career
              </div>
              {/* <p className="subheading2" style={{ padding: "5px 0" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p> */}
              <div style={{ padding: "15px 0" }}>
                <button className="button1my">Explore now</button>
              </div>
            </div>
            <div>
              <img className="icon-mobile mr-3" src={"/605ac437304c53b21642dd0f_hero_iphone 1.png"} alt="ad1" />
            </div>
          </div>

          {/* {bannerListdata.length > 0 &&
            parseInt(landing?.landing_second_section_status) === 1 && (
              <Slider {...settings}>
                {bannerListdata?.map((item: any, index: number) => (
                  <Link href={`/banner/${item.slug}`} key={index}>
                    <div className="single-banner">
                      <img
                        src={item.image}
                        alt="about-image-phone"
                        className="slider-image-class"
                      />
                    </div>
                  </Link>
                ))}
              </Slider>
            )} */}
          {/* <div className="about-info">
            {announcementListdata?.map((item: any, index: number) => (
              <div className="single-info" key={index}>
                <Link href={`/announcement/${item.slug}`}>
                  <a>
                    <TfiAnnouncement />
                    {item.title}
                  </a>
                </Link>
              </div>
            ))}
          </div>
          {Number(landing?.landing_advertisement_section_status) === 1 && (
            <Link href={`${landing?.landing_advertisement_url ?? "#"}`}>
              <img
                src={
                  landing?.landing_advertisement_image
                    ? landing?.landing_advertisement_image
                    : "/tradex-cover.png"
                }
                className="cover-img cursor-pointer"
              />
            </Link>
          )} */}
        </div>
      </section>
    </div>
  );
};

export default SliderSection;
