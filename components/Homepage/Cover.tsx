import ImageComponent from "components/common/ImageComponent";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Slider from "react-slick";

const Cover = ({ landing, loggedin, landing_banner_image }: any) => {
  const router = useRouter();
  const { t } = useTranslation("common");

  return (
    <div>
      {parseInt(landing?.landing_first_section_status) === 1 && (
        <section className="hero-banner-area">
          <div className="container">
            <div className="row" style={{ height: "500px" }}>
              <div className="col-md-6 ">
                <ImageComponent
                  src={landing_banner_image || "/pngwing 2.png"}
                />
                {/* <ImageComponent src={"/pngwing 2.png"} /> */}

                <div className="graph-img">
                  <img src="/graph.png"></img>
                </div>
              </div>
              <div className="col-md-6 conver-col1">
                <h1 className="banner-title" style={{ marginBottom: "45px" }}>
                  {landing?.landing_title ? (
                    <div dangerouslySetInnerHTML={{ __html: landing?.landing_title }} />
                  ) : (
                    <>
                      {t("Buy & Sell Instantly & Hold ")}
                      <span style={{ color: 'red' }}>Cryptocurrency</span> With Crypto
                    </>
                  )}
                </h1>
                {/* <p className="banner-content">
                  {landing?.landing_description ||
                    t(
                      "Tradexpro exchange is such a marketplace where people can trade directly with each other"
                    )}
                </p> */}
                {!loggedin && (
              
                  <a
                    href={
                      router.locale !== "en"
                        ? `/${router.locale}/signup`
                        : "/signup"
                    }
                    className="primary-btn"
                  >
                    {t("Let’s Get Started")}
                    <span>
                    <img src="/Group.png" alt="" />
                    </span>
                  </a>
                )}
                <div className="coin-img">
                  <img src="/coin.png"></img>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Cover;
