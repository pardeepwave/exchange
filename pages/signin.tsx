import type { GetServerSideProps, NextPage } from "next";
import * as Yup from "yup";
import {
  GetUserInfoByTokenAction,
  SigninAction,
  useCapchaInitialize,
} from "state/actions/user";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
//@ts-ignore
import ReCAPTCHA from "react-google-recaptcha";

import Link from "next/link";
import { authPageRequireCheck } from "middlewares/ssr-authentication-check";
import useTranslation from "next-translate/useTranslation";
import { destroyCookie } from "nookies";
import { RootState } from "state/store";
import {
  CAPTCHA_TYPE_GEETESTCAPTCHA,
  CAPTCHA_TYPE_RECAPTCHA,
} from "helpers/core-constants";
const Signin: NextPage = () => {
  const { settings } = useSelector((state: RootState) => state.common);
  const { geeTest, captchaData } = useCapchaInitialize();
  const { t } = useTranslation("common");
  const [showPassword, setShowPassword] = useState(false);
  const [processing, setProcessing] = useState<any>(false);
  const dispatch = useDispatch();

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
      <div className="container-fluid">
        <div className="row flex-md-row-reverse">
          <div className="col-md-6 col-12 login_bg_new" >
            <div className="user-content-text text-center text-md-start">
              <a href="/" className="auth-logo d-md-none d-block">
                  <img
                    src={settings.logo || ""}
                    className="pt-5 img-fluid mw-50"
                    alt=""
                  />
              </a>
            </div>
            
          </div>
          <div className="col-md-6 d-flex align-items-center login_from_res">
            <div className="row w-100">
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
                      <h2>{t("Sign In")}</h2>
                      <p>{t("Enter your account details")}</p>
                    </div>
                    <Formik
                      initialValues={{
                        email: "",
                        password: "",
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
                        password: Yup.string()
                          .min(6)
                          .required(t("Password is required")),
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
                            await dispatch(
                              SigninAction(local_value, setProcessing)
                            );
                            await dispatch(GetUserInfoByTokenAction());
                          });
                        } else {
                          await dispatch(SigninAction(values, setProcessing));
                          await dispatch(GetUserInfoByTokenAction());
                        }
                      }}
                    >
                      {({ errors, touched, setFieldValue }) => (
                        //@ts-ignore
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
                              placeholder={t("Enter Your email here")}
                            />
                            <span
                              className="eye rev"
                            >
                              <img className="toggle-password" src={"/envelope.svg"} />
                            </span>
                          </div>

                          <div className="form-group my-4">
                          <label>Password</label>
                            <Field
                              type={showPassword ? "text" : "password"}
                              name="password"
                              id="password"
                              className={`form-control form-control-password look-pass ${
                                touched.password && errors.password
                                  ? "is-invalid"
                                  : ""
                              }`}
                              placeholder={t("Enter Your password here")}
                            />

                            <span
                              className="eye rev"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                               <img className="toggle-password" src={"/hide.svg"} />
                              ) : (
                                <img className="toggle-password" src={"/view.svg"} />
                              )}
                            </span>
                          </div>

                          {/* <div className="form-group">
                            <p className="invalid-feedback">{t("Message")}</p>
                          </div> */}
                          <div className="d-flex justify-content-between rememberme align-items-center mb-4">
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="exampleCheck1"
                              />
                              <label className="form-check-label" htmlFor="exampleCheck1">
                                {t("Remember me")}
                              </label>
                            </div>
                            <div className="text-end">
                              <a className=" text-dark fw-bold forgot-password" href="/forgot-password">
                                  {t("Forgot Password?")}
                              </a>
                            </div>
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
                              disabled={processing}
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
                                t("Login")
                              )}
                            </button>
                            <div className="text-center mt-2">
                              <>
                              {t("Don’t have an account?  ")}<strong><a href="/signup">
                            <span className="text-primary">Create Account</span></a> </strong>                                                                                                                                        
                            
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
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  try {
    await authPageRequireCheck(ctx);
  } catch (error) {
    destroyCookie(ctx, "token");
  }
  return {
    props: {},
  };
};

export default Signin;
