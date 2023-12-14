import { BUY, SELL } from "helpers/core-constants";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";

export const P2pTab = ({ filters, setFilters, settings }: any) => {
  const [coins, setCoins] = useState(["USDT", "BTC", "BUSD", "BNB", "ETH"]);
  const { t } = useTranslation("common");

  return (
    <div className="p2pTabList_bg shadow-sm">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <ul className="d-flex p2pTabList">
              <li>
                <div className="buySellBox rounded">
                  <button
                    className={`${
                      parseInt(filters.type) === BUY && "buySellBoxActive"
                    }`}
                    onClick={() => {
                      setFilters({ ...filters, type: BUY });
                    }}
                  >
                    {t(`Buy`)}
                  </button>
                  <button
                    className={`${
                      parseInt(filters.type) === SELL && "buySellBoxActive"
                    }`}
                    onClick={() => {
                      setFilters({ ...filters, type: SELL });
                    }}
                  >
                    {t(`Sell`)}
                  </button>
                </div>
              </li>

              {/* <li>
                <a className="p2pTabListActive"></a>
              </li> */}
              {settings?.assets?.map((coinName: any, index: any) => (
                <li
                  key={index}
                  onClick={() => {
                    setFilters({ ...filters, coin: coinName?.coin_type });
                  }}
                  className={`${
                    filters.coin === coinName?.coin_type && "p2pTabListActive"
                  }`}
                >
                  <a>{coinName?.coin_type}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
