import ImageComponent from "components/common/ImageComponent";
import React from "react";

const GetInTouch = ({ landing, featureListdata }: any) => {
  return (
    <div>
      <section className="get-touch-area">
        <div className="section-title">
          <div style={{ textAlign: "center" }}>
            {/* <img
              className="icon mr-3"
              src={"/lorem.svg"}
              alt="ad1"
              height={"18px"}
            /> */}
          </div>
          <h2 className="heading1my" style={{ textAlign: "center" }}>
            Get In <span className="heading1mySub"> Touch </span>
          </h2>
          <div style={{ textAlign: "center" }}>
            {/* <h5 className="subheading1">
              Lorem ipsum dolor sit amet quis nostrud
            </h5> */}
          </div>
        </div>
        <div className="container">
          <div className="section-title mb-3">
            <h2 className="title">{landing?.landing_feature_title}</h2>
          </div>

          <div className="row">
            <div className="col-lg-4 col-md-6 mt-4">
              <div
                style={{
                  borderRadius: "20px",
                  border: "1px solid #000",
                  background: "#13171C",
                  padding: "40px",
                }}
              >
                <a href={"#"} target={"_blank"} rel="noreferrer">
                  <img
                    className="card-icon"
                    src={"goal 1.png"}
                    alt="icon"
                    style={{
                      marginBottom: "40px",
                    }}
                  />
                  <h3 className="card-title">Careers</h3>
                  <p className="card-content">
                    Help build the future of technology. Start your new career
                    at Tradexpro
                  </p>
                </a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mt-4 ">
              <div
                style={{
                  borderRadius: "20px",
                  border: "1px solid #000",
                  background: "#13171C",
                  padding: "40px",
                }}
              >
                <a href={"#"} target={"_blank"} rel="noreferrer">
                  <img
                    className="card-icon"
                    src={"community 1.png"}
                    alt="icon"
                    style={{
                      marginBottom: "40px",
                    }}
                  />
                  <h3 className="card-title">Community</h3>
                  <p className="card-content">
                    Help build the future of technology. Start your new career
                    at Tradexpro
                  </p>
                </a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mt-4">
              <div
                style={{
                  borderRadius: "20px",
                  border: "1px solid #000",
                  background: "#13171C",
                  padding: "40px",
                }}
              >
                <a href={"#"} target={"_blank"} rel="noreferrer">
                  <img
                    className="card-icon"
                    src={"24-hour-service 1.png"}
                    alt="icon"
                    style={{
                      marginBottom: "40px",
                    }}
                  />
                  <h3 className="card-title">24 / 7 Support</h3>
                  <p className="card-content">
                    Help build the future of technology. Start your new career
                    at Tradexpro
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetInTouch;
