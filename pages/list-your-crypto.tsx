import React, { ChangeEvent, FC, useState } from "react";
import Footer from "components/common/footer";
import { Field, Formik, Form, FormikHelpers } from "formik";
import Head from "next/head";
import Select, { InputActionMeta, SingleValue } from "react-select";
import request from "lib/request";
import { toast } from "react-toastify";

interface ListTypes {
  name: String;
  url: String;
  contact_email: String;
  contact_name: String;
  contact_number: String;
  cms_link: String;
  website_url: String;
}

type option = {
  lable: string;
  value: string | null;
};

const ListYourCrypto: FC = () => {
  const [code, setCode] = useState("+91");
  const initialValues: ListTypes = {
    name: "",
    url: "",
    contact_email: "",
    contact_name: "",
    contact_number: "",
    cms_link: "",
    website_url: "",
  };

  const options = [
    { value: "+91", label: "India" },
    { value: "+971", label: "Dubai" },
    { value: "+1", label: "Canada" },
  ];

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const onSubmit = async (
    formdata: any,
    { resetForm }: FormikHelpers<ListTypes>
  ) => {
    setLoading(true);
    setErrors({});
    try {
      const { data } = await request.post("/listcrypto", {
        ...formdata,
        code,
      });
      if (data.success) {
        toast.success(data.message);
        resetForm({});
      }
      setErrors({});
    } catch (error: any) {
      if (error.response.status === 422) setErrors(error.response.data.errors);
    }
    setLoading(false);
  };

  const countryChange = (e: any) => {
    if (e?.value !== null) setCode(e?.value);
  };

  return (
    <>
      <Head>
        <title>List Your Crypto</title>
      </Head>
      <div
        className="container list-section-wrapper"
        style={{ padding: "100px 0" }}
      >
        <Formik onSubmit={onSubmit} initialValues={initialValues}>
          <Form>
            <div className="row justify-content-center">
              <div className="col-lg-12">
                <h1 className="text-center my-5">
                  Increase Liquidity: List Your Crypto on Rebpublic Exchange.
                </h1>
              </div>

              <div className="col-6 mb-3">
                <label htmlFor="name">Crypto Name</label>
                <Field
                  id="name"
                  name="name"
                  placeholder="Crypto Name"
                  className="form-control form-control-password look-pass"
                />
                {errors.name && (
                  <span className="text-danger">{errors.name[0]}</span>
                )}
              </div>
              <div className="col-6 mb-3">
                <label htmlFor="url">Crypto White Paper URL</label>
                <Field
                  id="url"
                  name="url"
                  placeholder="Crypto White Paper URL"
                  className="form-control form-control-password look-pass"
                />
                {errors.url && (
                  <span className="text-danger">{errors.url[0]}</span>
                )}
              </div>
              <div className="col-6 mb-3">
                <label htmlFor="contact_name">Contact Name</label>
                <Field
                  id="contact_name"
                  name="contact_name"
                  placeholder="Contact Name"
                  className="form-control form-control-password look-pass"
                />
                {errors.contact_name && (
                  <span className="text-danger">{errors.contact_name[0]}</span>
                )}
              </div>
              <div className="col-6 mb-3">
                <label htmlFor="contact_email">Contact Email</label>
                <Field
                  id="contact_email"
                  name="contact_email"
                  placeholder="Contact Email"
                  className="form-control form-control-password look-pass"
                />
                {errors.contact_email && (
                  <span className="text-danger">{errors.contact_email[0]}</span>
                )}
              </div>
              <div className="col-6 mb-3">
                <label>Choose Your Country</label>
                <Select
                  className="form-control form-control-password look-pass"
                  options={options}
                  defaultInputValue="india"
                  onChange={countryChange}
                  isClearable={true}
                />
              </div>
              <div className="col-6 mb-3">
                <label htmlFor="contact_number">Contact Number</label>
                <div className="input-group">
                  <span
                    className="input-group-text bg-primary text-white"
                    id="basic-addon1"
                    style={{ borderRadius: "0px" }}
                  >
                    {code}
                  </span>
                  <Field
                    id="contact_number"
                    name="contact_number"
                    placeholder="Contact Number"
                    className="form-control form-control-password look-pass"
                  />
                </div>
                {errors.contact_number && (
                  <span className="text-danger">
                    {errors.contact_number[0]}
                  </span>
                )}
              </div>
              <div className="col-6 mb-3">
                <label htmlFor="cms_link">CMC Link</label>
                <Field
                  id="cms_link"
                  name="cms_link"
                  placeholder="CMC Link"
                  className="form-control form-control-password look-pass"
                />
                {errors.cms_link && (
                  <span className="text-danger">{errors.cms_link[0]}</span>
                )}
              </div>
              <div className="col-6 mb-3">
                <label htmlFor="website_url">Website URL</label>
                <Field
                  id="website_url"
                  name="website_url"
                  placeholder="Website URL"
                  className="form-control form-control-password look-pass"
                />
                {errors.website_url && (
                  <span className="text-danger">{errors.website_url[0]}</span>
                )}
              </div>
              <div className="d-flex d-flex justify-content-center my-3 col-12">
                <button type="submit" className="btn btn-primary btn-lg">
                  {loading ? "Saving" : "Submit"}
                </button>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
      <Footer />
    </>
  );
};

export default ListYourCrypto;
