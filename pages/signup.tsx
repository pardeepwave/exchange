import type { GetServerSideProps, NextPage } from "next";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import { SignupAction, useCapchaInitialize } from "state/actions/user";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { authPageRequireCheck } from "middlewares/ssr-authentication-check";
//@ts-ignore
import ReCAPTCHA from "react-google-recaptcha";
import useTranslation from "next-translate/useTranslation";
import { RootState } from "state/store";
import { CAPTCHA_TYPE_GEETESTCAPTCHA, CAPTCHA_TYPE_RECAPTCHA } from "helpers/core-constants";
const Signup: NextPage = () => {
  const { logo } = useSelector((state: RootState) => state.user);
  const { settings } = useSelector((state: RootState) => state.common);
  const dispatch = useDispatch();
  const { geeTest, captchaData } = useCapchaInitialize();

  const { t } = useTranslation("common");
  const router = useRouter();

  const { ref_code } = router.query;
  const [processing, setProcessing] = useState(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm_password: false,
  });

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
    <div className="container-fluid">
      <div className="row login_reg_box flex-md-row-reverse">
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
              <div className="user-form border-0 my-5 my-md-0">
                <div className="user-form-inner">
                  <div className="form-top text-start">
                  <a href="/" className="auth-logo dark-logo">
                          <img
                            src={settings.logo || ""}
                            className="w-50 mb-3 img-fluid"
                            alt=""
                          />
                      </a>
                    <h2>{t("Sign Up")}</h2>
                    <p>{t("Create a new account")}.</p>
                  </div>
                  <Formik
                    initialValues={{
                      email: "",
                      first_name: "",
                      last_name: "",
                      password: "",
                      password_confirmation: "",
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
                      first_name: Yup.string()
                        .min(2)
                        .required(t("First name is required")),
                      last_name: Yup.string()
                        .min(2)
                        .required(t("Last name is required")),
                      password: Yup.string()
                        .min(8)
                        .required(t("Password is required")),
                      password_confirmation: Yup.string()
                        .oneOf(
                          [Yup.ref("password"), null],
                          t("Passwords must match")
                        )
                        .required("Confirm password is required"),
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
                          dispatch(
                            SignupAction(local_value, setProcessing, ref_code)
                          );
                        });
                      } else {
                        dispatch(SignupAction(values, setProcessing, ref_code));
                      }
                    }}
                  >
                    {({ errors, touched, setFieldValue }) => (
                      <Form>
                        <div className="form-group">
                        <label>First Name</label>
                          <Field
                            type="text"
                            name="first_name"
                            id="first_name"
                            className={`form-control ${
                              touched.first_name && errors.first_name
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder={t("Enter Your first name here")}
                          />
                          <span
                            className="eye rev"
                          >
                            <img className="toggle-password" src={"/user.svg"} />
                          </span>
                        </div>

                        <div className="form-group">
                          <label>Last Name</label>
                          <Field
                            type="text"
                            name="last_name"
                            id="last_name"
                            className={`form-control ${
                              touched.last_name && errors.last_name
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder={t("Enter Your last name here")}
                          />
                          <span
                            className="eye rev"
                          >
                            <img className="toggle-password" src={"/user.svg"} />
                          </span>
                        </div>

                        <div className="form-group col-12">
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

                        <div className="form-group">
                        <label>Password</label>
                          <Field
                            type={showPassword.password ? "text" : "password"}
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
                            onClick={() =>
                              setShowPassword({
                                ...showPassword,
                                password: !showPassword.password,
                              })
                            }
                          >
                            {showPassword ? (
                            <img className="toggle-password" src={"/hide.svg"} />
                            ) : (
                              <img className="toggle-password" src={"/view.svg"} />
                            )}
                          </span>
                        </div>

                        <div className="form-group">
                        <label>Confirm Password</label>
                          <Field
                            type={
                              showPassword.confirm_password ? "text" : "password"
                            }
                            name="password_confirmation"
                            id="password_confirmation"
                            className={`form-control form-control-password look-pass ${
                              touched.password_confirmation &&
                              errors.password_confirmation
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder={t("Enter Your password here")}
                          />

                          <span
                            className="eye rev"
                            onClick={() =>
                              setShowPassword({
                                ...showPassword,
                                confirm_password: !showPassword.confirm_password,
                              })
                            }
                          >
                            {showPassword ? (
                            <img className="toggle-password" src={"/hide.svg"} />
                            ) : (
                              <img className="toggle-password" src={"/view.svg"} />
                            )}
                          </span>
                        </div>

                        <div className="form-group">
                          <label></label>
                          <p className="invalid-feedback">{t("Message")} </p>
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
                              t("Sign Up")
                            )}
                          </button>
                        </div>
                        <div className="text-center mt-2">
                            <>
                            {t("Already have a account? ")}<a href="/signin">
                          <span className="text-primary">Log in</span></a>
                          
                          </>
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
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await authPageRequireCheck(ctx);
  return {
    props: {},
  };
};

export default Signup;
