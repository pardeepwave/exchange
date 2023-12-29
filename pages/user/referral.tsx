import Footer from "components/common/footer";
import Loading from "components/common/loading";
import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import type { GetServerSideProps, NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { getReferral } from "service/refer";
import EmailSubscription from "components/common/emailSubscription";

const Referral: NextPage = () => {
  const [referral, setReferral] = useState<any>();
  const [allData, setAllData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation("common");
  const selectReference: any = useRef();

  useEffect(() => {
    getReferral().then((res) => {
      const code = res.data.data.url;
      setReferral(
        process.env.NEXT_PUBLIC_HOSTED_CLIENT_URL +
          "signup?" +
          code
      );
      setAllData(res.data.data);
      setLoading(false);
    });
    return () => {
      setReferral(null);
    };
  }, []);
  return (
    <>
      <div className="referral-area container">
        <div className="section-top-wrap mb-25">
          <div className="profle-are-top">
            {loading && <Loading />}
            <div className="container">
              <div className="refferal-sec">
                <div className="row">
                  <div className="col-lg-7 col-md-6 col-12">
                    <h2 className="section-top-title">{t("Referrals")}</h2>
                    <div className="invite-friends">
                      {/* <h4>{t("Invite your friends")}</h4> */}
                      <div className="input-group rounded">
                        <input
                          ref={selectReference}
                          type="url"
                          className="form-control referel-inputfield"
                          id="url"
                          defaultValue={referral}
                          readOnly
                        />
                        <button
                          type="button"
                          className="btn copy-url-btn"
                          onClick={() => {
                            navigator.clipboard.writeText(referral);
                            toast.success(t("Copied to clipboard"));
                            selectReference.current.select();
                          }}>
                          <svg version="1.1" id="Capa_1"  fill="currentColor" x="0px" y="0px"
                              width="30px" height="30px" viewBox="0 0 699.428 699.428">
                            <g>
                              <g id="_x33__31_">
                                <g>
                                  <path d="M502.714,0.678C500.004,0.678,240.428,0,240.428,0C194.178,0,153,42.425,153,87.429l-25.267,0.59
                                    c-46.228,0-84.019,41.834-84.019,86.838V612c0,45.004,41.179,87.428,87.429,87.428H459c46.249,0,87.428-42.424,87.428-87.428
                                    h21.857c46.25,0,87.429-42.424,87.429-87.428v-349.19L502.714,0.678z M459,655.715H131.143c-22.95,0-43.714-21.441-43.714-43.715
                                    V174.857c0-32.523,26.753-43.714,65.571-43.714v393.429C153,569.576,194.178,612,240.428,612c0,0,236.975-0.24,262.482-0.24
                                    C502.91,638.295,485.513,655.715,459,655.715z M502.714,459.24H306c-12.065,0-21.857-9.77-21.857-21.836
                                    c0-12.064,9.792-21.834,21.857-21.834h196.714c12.065,0,21.857,9.77,21.857,21.834
                                    C524.571,449.471,514.779,459.24,502.714,459.24z M502.714,350.064H306c-12.065,0-21.857-9.771-21.857-21.835
                                    c0-12.065,9.792-21.835,21.857-21.835h196.714c12.065,0,21.857,9.77,21.857,21.835
                                    C524.571,340.272,514.779,350.064,502.714,350.064z M546.428,174.857c-23.277,0-43.714-21.004-43.714-43.714
                                    c0,0,0-44.283,0-86.751v-0.044L612,174.857H546.428z"/>
                                </g>
                              </g>
                            </g>
                            </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5 col-md-6 col-12 text-center">
                     <img src="/blog4.png"></img>     
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="section-wrapper rounded-sm boxShadow">
            <div className="rewards-inviter mb-25">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-12">
                  <div className="single-item">
                    <h4>{t("Total Rewards")}</h4>
                    <h2>
                      {parseFloat(allData?.total_reward).toFixed(3)} <span />
                    </h2>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                  <div className="single-item">
                    <h4>{t("Total Invited")}</h4>
                    <h2>{allData?.count_referrals}</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="referrals-table">
              <h4 className="section-title-medium">{t("My Referrals")}</h4>
              <div className="table-responsive">
                <table
                  className="table cp-user-custom-table table-borderless text-center dataTable no-footer"
                  id="DataTables_Table_0">
                  <thead>
                    <tr>
                      <th
                        className="referral-level"
                        rowSpan={1}
                        colSpan={1}
                        aria-label="Level 1">
                        {t("Level 1")}
                      </th>
                      <th
                        className="referral-level"
                        rowSpan={1}
                        colSpan={1}
                        aria-label="Level 2">
                        {t("Level 2")}
                      </th>
                      <th
                        className="referral-level"
                        rowSpan={1}
                        colSpan={1}
                        aria-label="Level 3">
                        {t("Level 3")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr id="" role="row referral" className="">
                      <td className="referral-text">
                        {allData?.referralLevel[1]}
                      </td>
                      <td className="referral-text">
                        {allData?.referralLevel[2]}
                      </td>
                      <td className="referral-text">
                        {allData?.referralLevel[3]}
                      </td>
                    </tr>
                    {allData?.referralLevel.length == 0 && (
                      <td colSpan={5} className="text-center referral-text">
                        <b>{t("No Data available")}</b>
                      </td>
                    )}

                    <tr>
                      <td colSpan={3} />
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="middel-referrals-table">
              <h4 className="section-title-medium">{t("My References")}</h4>
              <div className="table-responsive">
                <table className="table dataTable cp-user-custom-table table-borderless text-center">
                  <thead>
                    <tr>
                      <th className="">{t("Full Name")}</th>
                      <th className="">{t("Email")}</th>
                      <th className="">{t("Level")}</th>
                      <th className="">{t("Joining Date")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allData?.referrals?.map((data: any, index: number) => (
                      <tr key={index}>
                        <td className="referral-text">{data?.full_name}</td>
                        <td className="referral-text">{data?.email}</td>
                        <td className="referral-text">{data?.level}</td>
                        <td className="referral-text">{data?.joining_date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="my-earnings-table">
              <h4 className="section-title-medium">{t("My Earnings")}</h4>
              <div className="table-responsive">
                <table className="table dataTable cp-user-custom-table table-borderless text-center">
                  <thead>
                    <tr>
                      <th>{t("Coin type")}</th>
                      <th>{t("Amount")}</th>
                      <th>{t("Transaction Id")}</th>
                      <th>{t("Level")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allData?.monthlyEarningHistories?.map(
                      (data: any, index: number) => (
                        <tr key={index}>
                          <td>{data?.coin_type}</td>
                          <td>{data?.amount}</td>
                          <td>{data?.transaction_id}</td>
                          <td>{data?.level}</td>
                        </tr>
                      )
                    )}
                    {allData?.monthlyEarningHistories.length === 0 && (
                      <tr>
                        <td colSpan={6} className="text-center referral-text">
                          <b>{t("You have not invited anyone yet!")}</b>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EmailSubscription />
      <Footer />
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await SSRAuthCheck(ctx, "/user/referral");
  return {
    props: {},
  };
};

export default Referral;
