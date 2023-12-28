import ImageComponent from "components/common/ImageComponent";
import useTranslation from "next-translate/useTranslation";
import React from "react";

const BottomDetails = ({ landing }: any) => {
  const { t } = useTranslation("common");

  return (
    <div>
    {" "}
    <section className="main-sub-sec">
      <div className="inner-sub-mob-sec">
        <div className ="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-lg-6 col-12">
              <div className="mobile-images">
              <img className="iphone" src={landing?.secure_trade_left_img} alt="ad1" />
              </div>
            </div>
            <div className="col-lg-6 col-xl-5 col-12">
              <div className="content-sec-mobile">
                                  {landing?.secure_trade_title ? (
                      <h2
                        dangerouslySetInnerHTML={{ __html: landing?.secure_trade_title }} >
                        </h2>
                    ) : (
                      <h2>
                        {t("Create your Cryptocurrency profile today! ")}
                      </h2>
                    )}
                
                <p className="mb-4">Our trading app has a variety of features that make it the best place to start trading</p>
                <div className="iconDetailsWrap">
                  <div className="detailIcon">
                      <img src="./online-resume.svg" alt="" />
                  </div>
                  <div className="detailDescription">
                      <h4>Manage your portfolio</h4>
                      <p>Buy and sell popular digital currencies, keep track of them at once place.</p>
                  </div>
                </div>
                <div className="iconDetailsWrap">
                  <div className="detailIcon">
                      <img src="./cycle.svg" alt="" />
                  </div>
                  <div className="detailDescription">
                      <h4>Recurrign Buys</h4>
                      <p>Invest in Cryptocurrency slowly over time by scheduling buys daily, weekly or monthly.</p>
                  </div>
                </div>
                <div className="iconDetailsWrap">
                  <div className="detailIcon">
                      <img src="./devices.svg" alt="" />
                  </div>
                  <div className="detailDescription">
                      <h4>Available everywhere</h4>
                      <p>Stay on top of market with our platform Available on every device.</p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
    </div>
  );

  // return (
  //   <div>
  //     {" "}
  //     {parseInt(landing.landing_fifth_section_status) === 1 && (
  //       <section className="trade-anywhere-area">
  //         <div className="container">
  //           <div className="section-title">
  //             <h2 className="title"> {landing?.secure_trade_title} </h2>
  //           </div>
  //           <div className="row align-items-center">
  //             <div className="col-lg-6">
  //               <div className="trade-anywhere-left">
  //                 {/* <ImageComponent
  //                   src={landing?.secure_trade_left_img}
  //                   alt="integration"
  //                   height={300}
  //                 /> */}
  //                 <img
  //                   className="trend-image"
  //                   src={landing?.secure_trade_left_img}
  //                   alt="trade-imge"
  //                 />
  //               </div>
  //             </div>
  //             <div className="col-lg-6">
  //               <div className="trade-anywhere-right">
  //                 <h2 className="subtitle"> {landing?.customization_title} </h2>
  //                 <p>{landing?.customization_details}</p>
  //                 <div style={{ padding: "15px 0" }}>
  //                   <button className="button1my">Explore now</button>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </section>
  //     )}
  //   </div>
  // );


};

export default BottomDetails;
