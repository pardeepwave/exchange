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
            <div className="row flex-md-row-reverse align-items-center">
              <div className="col-md-6 main_banner_img">
                <img
                  src={landing_banner_image || "/homepage_graphic2.jpg"}
                />
              </div>
              <div className="col-md-6 conver-col1">
                <h1 className="banner-title">
                  {landing?.landing_title ? (
                    <div dangerouslySetInnerHTML={{ __html: landing?.landing_title }} />
                  ) : (
                    <>
                      {t("Trade with a new way in a new World")}
                    </>
                  )}
                </h1>
                <p className="banner-content">
                  {landing?.landing_description ||
                    t(
                      "Republic Exchange is such a marketplace where people can trade directly with each other"
                    )}
                </p>
                {!loggedin && (
              
                  <a
                    href={
                      router.locale !== "en"
                        ? `/${router.locale}/signup`
                        : "/signup"
                    }
                    className="btn btn-primary banner-btn"
                  >
                    {t("Let’s Get Started")}
                    <img src="/Group.png" alt="" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Cover;
