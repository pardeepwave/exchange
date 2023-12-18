import React, { useState } from "react";
const EmailSubscription = () => {
  const [email, setEmail] = useState("");
const handleSubscription = async () => {
  try {
    const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/subscribe`,
    {
      method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     Origin: "*",
    //     userapisecret: `${process.env.NEXT_PUBLIC_SECRET_KEY}`,
    //   },
    //   //   headers: {
    // //     "Content-Type": "application/json",
    // //   },
      body: JSON.stringify({ email }),
    });
    if (response.ok) {
      console.log("Email subscribed successfully!");
      // Handle success (redirect user, show a success message, etc.)
    } else {
      console.error("Error subscribing to email");
      // Handle errors
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
return (
  <>
    <div className="email-section">
      <div className="container">
          <div className="row">
              <div className="col-lg-7 col-md-6 col-12">
                  <h2>Republic Exchange <span>Newsletter!</span></h2>
                  <p>The standard Lorem Ipsum passage, used since the 1500sLorem ipsum dolor sit ame</p>
              </div>
              <div className="col-lg-5 col-md-6 col-12">
                  <div className="input-group mb-3">
                      <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your email"
                      aria-label="Recipient's email"
                      aria-describedby="button-addon2"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      />
                      <button
                      className="right-arrow"
                      type="button"
                      id="button-addon2"
                      onClick={handleSubscription}
                      >
                          <i className="fa-solid fa-arrow-right"></i>
                      </button>
                  </div>
              </div>
          </div>
      </div>
    </div>
  </>
);

};
export default EmailSubscription;