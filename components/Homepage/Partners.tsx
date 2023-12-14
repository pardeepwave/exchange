import ImageComponent from "components/common/ImageComponent";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const Partners = ({
  landing,
  asset_coin_pairs,
  hourly_coin_pairs,
  latest_coin_pairs,
  announcementListdata
}: any) => {
  const { t } = useTranslation("common");
  const router = useRouter();

  console.log(asset_coin_pairs);

  return (
    <div style={{ padding: "2rem 0", background: "#000" }}>
      {parseInt(landing.landing_third_section_status) === 1 && (
        <section>
          <div className="container" style={{ padding: "1.5rem 0 1px" }}>
            <div className="section-title">
              <div style={{ textAlign: "center" }}>
                {/* <img
                  className="icon mr-3"
                  src={"
                  "}
                  alt="ad1"
                  height={"18px"}
                /> */}
              </div>
              <h2 className="heading1my" style={{ textAlign: "center" }}>
                We Featured on
                <span className="heading1mySub"> Popular Partners </span> Like
              </h2>
              <div style={{ textAlign: "center" }}>
              </div>
            </div>
            <div className="exchange-tab-menu">
              <div className="row">
              {announcementListdata?.map(
              (item: any, index: number) => (
                <div className="col-3 my-4" style={{ textAlign: "center" }} key={index}>
                  <img
                    className="icon mr-3"
                    src={item.image}
                    alt={item.slug}
                    height={"25px"}
                    style={{ cursor: "pointer" }}
                    onClick={() => window.open(item.description, '_blank')}
                  />
                </div>
              ))};

                <div className="col-3 my-4" style={{ textAlign: "center" }}>
                  <img
                    className="icon mr-3"
                    src={"/brand.png"}
                    alt="ad1"
                    height={"25px"}
                  />
                </div>
                <div className="col-3 my-4" style={{ textAlign: "center" }}>
                  <img
                    className="icon mr-3"
                    src={"/wave.png"}
                    alt="ad1"
                    height={"25px"}
                  />
                </div>
                <div className="col-3 my-4" style={{ textAlign: "center" }}>
                  <img
                    className="icon mr-3"
                    src={"/vs.png"}
                    alt="ad1"
                    height={"25px"}
                  />
                </div>
                <div className="col-3 my-4" style={{ textAlign: "center" }}>
                  <img
                    className="icon mr-3"
                    src={"/vs.png"}
                    alt="ad1"
                    height={"25px"}
                  />
                </div>
                <div className="col-3 my-4" style={{ textAlign: "center" }}>
                  <img
                    className="icon mr-3"
                    src={"/brand.png"}
                    alt="ad1"
                    height={"25px"}
                  />
                </div>
                <div className="col-3 my-4" style={{ textAlign: "center" }}>
                  <img
                    className="icon mr-3"
                    src={"/wave.png"}
                    alt="ad1"
                    height={"25px"}
                  />
                </div>
                <div className="col-3 my-4" style={{ textAlign: "center" }}>
                  <img
                    className="icon mr-3"
                    src={"/vs.png"}
                    alt="ad1"
                    height={"25px"}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Partners;
