import type { GetServerSideProps, NextPage } from "next";
import React, { useEffect, useState } from "react";
import { ForgotPasswordAction, useCapchaInitialize } from "state/actions/user";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { authPageRequireCheck } from "middlewares/ssr-authentication-check";
import Link from "next/link";

//@ts-ignore
import ReCAPTCHA from "react-google-recaptcha";
import useTranslation from "next-translate/useTranslation";
import { useSelector } from "react-redux";
import { RootState } from "state/store";
import {
  CAPTCHA_TYPE_GEETESTCAPTCHA,
  CAPTCHA_TYPE_RECAPTCHA,
} from "helpers/core-constants";
const ForgotPassword: NextPage = () => {
  const { settings } = useSelector((state: RootState) => state.common);
  const { geeTest, captchaData } = useCapchaInitialize();
  const { t } = useTranslation("common");
  const [processing, setProcessing] = useState(false);
  let captcha: any;
  const setCaptchaRef = (ref: any) => {
    if (ref) {
      return (captcha = ref);
    }
  };
  const resetCaptcha = () => {
    captcha?.reset();
  };

  return (
    <>
      <div className="row flex-md-row-reverse">
        <div className="col-md-6 col-12 login_bg_new" >
          <div className="user-content-text text-center text-md-start">
            {/* <a href="/" className="auth-logo d-md-none d-block">
                <img
                  src={settings.logo || ""}
                  className="pt-5 img-fluid mw-50"
                  alt=""
                />
            </a> */}
          </div>
          
        </div>
        <div className="col-md-6 d-flex align-items-center login_from_res">
          <div className="row w-100 mx-auto">
            <div className="col-lg-8 col-md-12 mx-md-auto">
              
              <div className="user-form border-0 my-4 my-md-0">
                <div className="user-form-inner">
                  <div className="form-top text-start">
                      <a href="/" className="auth-logo dark-logo">
                          <img
                            src={settings.logo || ""}
                            className="w-50 mb-3 img-fluid"
                            alt=""
                          />
                      </a>
                    <h2>{t("Forgot Password ?")}</h2>
                    <p>
                      {t(
                        "Please enter the email address to request a password reset"
                      )}
                    </p>
                  </div>
                  <Formik
                    initialValues={{
                      email: "",
                      recapcha:
                        parseInt(captchaData?.select_captcha_type) !==
                        CAPTCHA_TYPE_RECAPTCHA
                          ? "ksmaldkmalksmdlkamsdlk"
                          : "",
                    }}
                    validationSchema={Yup.object({
                      email: Yup.string()
                        .email(t("Invalid email address"))
                        .required(t("Email is required")),
                      recapcha: Yup.string()
                        .min(6)
                        .required(t("Recapcha is required")),
                    })}
                    onSubmit={async (values) => {
                      if (
                        parseInt(captchaData?.select_captcha_type) ===
                        CAPTCHA_TYPE_GEETESTCAPTCHA
                      ) {
                        geeTest.showCaptcha();
                        geeTest.onSuccess(async () => {
                          var result = geeTest.getValidate();
                          let local_value: any = values;
                          local_value.lot_number = result.lot_number;
                          local_value.captcha_output = result.captcha_output;
                          local_value.pass_token = result.pass_token;
                          local_value.gen_time = result.gen_time;
                          await ForgotPasswordAction(
                            local_value,
                            setProcessing
                          );
                        });
                      } else {
                        await ForgotPasswordAction(values, setProcessing);
                      }
                    }}
                  >
                    {({ errors, touched, setFieldValue }) => (
                      <Form>
                        <div className="form-group">
                          <label>Email</label>
                          <Field
                            type="email"
                            name="email"
                            id="email"
                            className={`form-control ${
                              touched.email && errors.email ? "is-invalid" : ""
                            }`}
                            placeholder={t("Your email here")}
                          />
                          <span
                              className="eye rev"
                            >
                            <img className="toggle-password" src={"/envelope.svg"} />
                          </span>
                        </div>

                        {captchaData?.NOCAPTCHA_SITEKEY &&
                          parseInt(captchaData?.select_captcha_type) ===
                            CAPTCHA_TYPE_RECAPTCHA && (
                            <ReCAPTCHA
                              ref={(r: any) => setCaptchaRef(r)}
                              sitekey={captchaData?.NOCAPTCHA_SITEKEY}
                              render="explicit"
                              onChange={(response: any) => {
                                setFieldValue("recapcha", response);
                              }}
                            />
                          )}
                      <div className="d-grid gap-2">
                        <button
                          onClick={() => resetCaptcha()}
                          type="submit"
                          className="btn btn-primary btn-lg"
                        >
                          {processing ? (
                            <>
                              <span
                                className="spinner-border spinner-border-md"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              <span>{t("Please wait")}</span>
                            </>
                          ) : (
                            t("Send")
                          )}
                        </button>
                          <div className="text-center mt-2">
                              <>
                              {t("Want to log in? Return to  ")}<strong><a href="/signin">
                            <span className="text-primary">Sign In</span></a> </strong>                                                                                                                                        
                            
                            </>
                          </div>
                      </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await authPageRequireCheck(ctx);
  return { props: {} };
};
export default ForgotPassword;
