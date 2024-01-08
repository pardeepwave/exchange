import React, { ChangeEvent, FC, useState } from "react";
import Footer from "components/common/footer";
import Head from "next/head";
import useTranslation from "next-translate/useTranslation";
import Table from "components/common/Table";
import request from "lib/request";

type Trade = {
  maker_fee: number;
  pair_name: string;
  taker_fee: number;
};

type Withdrawl = {
  assets: string;
  fee: string;
  min: string;
  max: string;
  depmin: string;
  deposit_status: string;
  withdrawl_status: string;
};
interface props {
  trade?: Trade[];
  withdrawl?: Withdrawl[];
}

export const getServerSideProps = async () => {
  let props = {};
  try {
    const { data } = await request.get("/fees/withdrawl");
    const { withdrawl } = data;
    const trade = data.trade.map(
      ({ maker_fee, taker_fee, pair_name }: any) => ({
        maker_fee,
        taker_fee,
        pair_name,
      })
    );
    props = { withdrawl, trade };
    console.log({ withdrawl, trade });
  } catch (error:any) {
    console.log(error);
    props = {withdrawl:[],trade:[]};
  }
  return {
    props,
  };
};

const fees: FC<props> = ({ trade, withdrawl }) => {
  const { t } = useTranslation("common");

  console.log(trade);

  const withColumns = [
    "Asset",
    "Min Deposit Amount",
    "Withdraw Fee",
    "Min Withdraw Amount",
    "Max Withdraw Amount",
    "Deposit",
    "Withdraw",
  ];
  const tradColumns = ["Markets", "Maker Fee", "Taker Fee"];
  const [search, setSearch] = useState("");
  const searchData = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };

  const loadMore = () => {
    console.log("load more data...");
  };

  return (
    <>
      <Head>
        <title>
          Crypto Fees on Deposit, Withdrawal & Trading | Republic Exchange
        </title>
      </Head>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <section className="market-trend-area">
              <div className="section-title mb-3">
                <div style={{ textAlign: "center" }}></div>
                <h2 className="heading1my" style={{ textAlign: "center" }}>
                  Increase Liquidity: List Your Crypto on Rebpublic Exchange
                </h2>
              </div>
              <div
                className="exchange-tab-menu"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <ul
                  className="nav nav-tabs markerTabNav"
                  id="exchangeTab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <a
                      className="exchangeTabButton nav-link active"
                      id="withdrawal-tab"
                      data-bs-toggle="tab"
                      href="#withdrawal"
                      role="tab"
                      aria-controls="withdrawal"
                      aria-selected="true"
                    >
                      {t("Withdrawal Fees")}
                    </a>
                  </li>
                  <li className="nav-item mx-4" role="presentation">
                    <a
                      className="exchangeTabButton nav-link"
                      id="trading-tab"
                      data-bs-toggle="tab"
                      href="#trading"
                      role="tab"
                      aria-controls="trading"
                      aria-selected="false"
                    >
                      {t("Trading Fees")}
                    </a>
                  </li>
                </ul>
                <div className="table-search-wrapper">
                  <i className="fas fa-search"></i>
                  <input
                    type="text"
                    placeholder="search"
                    value={search}
                    onChange={searchData}
                  />
                </div>
              </div>
              <div className="tab-content" id="exchangeTabContent">
                <div
                  className="tab-pane fade show active"
                  id="withdrawal"
                  role="tabpanel"
                  aria-labelledby="withdrawal-tab"
                >
                  <Table columns={withColumns} body={withdrawl} />
                  <div className="d-flex justify-content-center mt-3">
                    <button className="btn btn-primary" onClick={loadMore}>
                      Load More
                    </button>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="trading"
                  role="tabpanel"
                  aria-labelledby="trading-tab"
                >
                  <Table columns={tradColumns} body={trade} />
                  <div className="d-flex justify-content-center mt-3">
                    <button className="btn btn-primary" onClick={loadMore}>
                      Load More
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default fees;
