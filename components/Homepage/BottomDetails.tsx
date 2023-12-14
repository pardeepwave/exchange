import ImageComponent from "components/common/ImageComponent";
import useTranslation from "next-translate/useTranslation";
import React from "react";

const BottomDetails = ({ landing }: any) => {
  const { t } = useTranslation("common");

  return (
    <div>
    {" "}
    {parseInt(landing.landing_fifth_section_status) === 1 && (
        <div style={{ padding: "2rem 0" }}>
          <section>
            <div
              className="container-fulid"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div className="myNewCon">
                <div style={{ padding: "10rem" }}>
                  <div>
                  </div>
                  <div className="heading1my">
                    {landing?.secure_trade_title ? (
                        <div dangerouslySetInnerHTML={{ __html: landing?.secure_trade_title }} />
                      ) : (
                        <>
                          {t("Buy & Sell Instantly & Hold ")}
                          <span style={{ color: 'red' }}>Cryptocurrency</span> With Crypto
                        </>
                      )}
                  </div>
                  <div className="subheading1" style={{ padding: "5px 0" }}>
                    A Right Place To Start Your Trading Career
                  </div>
                  <div style={{ padding: "15px 0" }}>
                    <button className="button1my">Explore now</button>
                  </div>
                </div>
                <div>
                  <img className="icon mr-3" src={landing?.secure_trade_left_img} alt="ad1" />
                </div>
              </div>
            </div>
          </section>
        </div>
        )}
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
