import React, { ChangeEvent, FC, useState } from "react";
import Footer from "components/common/footer";
import { Field, Formik, Form } from "formik";
import Head from "next/head";
import Select, { InputActionMeta, SingleValue } from "react-select";

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

  const onSubmit = (formdata: any) => {
    console.log(formdata);
  };

  const countryChange = ({ value }: option) => {
    if (value !== null) setCode(value);
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
              </div>
              <div className="col-6 mb-3">
                <label htmlFor="url">Crypto White Paper URL</label>
                <Field
                  id="url"
                  name="url"
                  placeholder="Crypto White Paper URL"
                  className="form-control form-control-password look-pass"
                />
              </div>
              <div className="col-6 mb-3">
                <label htmlFor="contact_name">Contact Name</label>
                <Field
                  id="url"
                  name="contact_name"
                  placeholder="Contact Name"
                  className="form-control form-control-password look-pass"
                />
              </div>
              <div className="col-6 mb-3">
                <label htmlFor="contact_email">Contact Email</label>
                <Field
                  id="contact_email"
                  name="contact_email"
                  placeholder="Contact Email"
                  className="form-control form-control-password look-pass"
                />
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
              </div>
              <div className="col-6 mb-3">
                <label htmlFor="cms_link">CMC Link</label>
                <Field
                  id="cms_link"
                  name="cms_link"
                  placeholder="CMC Link"
                  className="form-control form-control-password look-pass"
                />
              </div>
              <div className="col-6 mb-3">
                <label htmlFor="website_url">Website URL</label>
                <Field
                  id="website_url"
                  name="website_url"
                  placeholder="Website URL"
                  className="form-control form-control-password look-pass"
                />
              </div>
              <div className="d-flex d-flex justify-content-center my-3 col-12">
                <button type="submit" className="btn btn-primary btn-lg">
                  Submit
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
