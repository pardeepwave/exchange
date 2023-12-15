import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { RiLuggageDepositLine } from "react-icons/ri";
import {
  MdOutlineSwapHorizontalCircle,
  MdOutlineTransferWithinAStation,
} from "react-icons/md";
import { TbCashBanknoteOff } from "react-icons/tb";
import { GiBuyCard } from "react-icons/gi";
import { GrTransaction } from "react-icons/gr";
import { SiFiat } from "react-icons/si";
import { MdSell } from "react-icons/md";
import useTranslation from "next-translate/useTranslation";
import { RootState } from "state/store";
import { useSelector } from "react-redux";
import { BsFillStopCircleFill } from "react-icons/bs";
import {
  REFERRAL_TYPE_DEPOSIT,
  REFERRAL_TYPE_TRADE,
} from "helpers/core-constants";
const ReportSidebar = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { settings } = useSelector((state: RootState) => state.common);
  return (
    <div className="page-left-sidebar">
      <div className="sidebar-top">
        <ul className="left-menu">
          <Link href="/user/wallet-history?type=deposit">
            <li className={router.query.type == "deposit" ? "active" : ""}>
              {/* <RiLuggageDepositLine /> */}
              <img src="/deposit.svg" alt="Left-top" className="sidebar-img"></img>
              <a href="coinSwapHistory">{t("Deposit History")}</a>
            </li>
          </Link>
          <Link href="/user/wallet-history?type=withdrawal">
            <li className={router.query.type == "withdrawal" ? "active" : ""}>
              {/* <TbCashBanknoteOff /> */}
              <img src="/widrol.svg" alt="Left-top" className="sidebar-img"></img>
              <a href="coinSwapHistory">{t("Withdrawal History")}</a>
            </li>
          </Link>
          <Link href="/user/stop-limit-order-history">
            <li
              className={
                router.pathname == "/user/stop-limit-order-history"
                  ? "active"
                  : ""
              }
            >
              {/* <BsFillStopCircleFill /> */}
              <img src="/stop.svg" alt="Left-top" className="sidebar-img"></img>
              <a href="coinSwapHistory">{t("Stop Limit History")}</a>
            </li>
          </Link>
          <Link href="/user/swap-history">
            <li
              className={
                router.pathname == "/user/swap-history" ? "active" : ""
              }
            >
              {/* <MdOutlineSwapHorizontalCircle /> */}
              <img src="/swap.svg" alt="Left-top" className="sidebar-img"></img>
              <a href="coinSwapHistory">{t("Swap History")}</a>
            </li>
          </Link>
          <Link href="/user/buy-order-history">
            <li
              className={
                router.pathname == "/user/buy-order-history" ? "active" : ""
              }
            >
              {/* <GiBuyCard /> */}
              <img src="/buy-order.svg" alt="Left-top" className="sidebar-img"></img>
              <a href="getAllOrdersHistoryBuy">{t("Buy Order History")}</a>
            </li>
          </Link>
          <Link href="/user/sell-order-history">
            <li
              className={
                router.pathname == "/user/sell-order-history" ? "active" : ""
              }
            >
              {/* <MdSell /> */}
              <img src="/sell.svg" alt="Left-top" className="sidebar-img"></img>
              <a href="getAllOrdersHistorySell">{t("Sell Order History")}</a>
            </li>
          </Link>
          <Link href="/user/transaction-history">
            <li
              className={
                router.pathname == "/user/transaction-history" ? "active" : ""
              }
            >
              {/* <MdOutlineTransferWithinAStation /> */}
              <img src="/transat.svg" alt="Left-top" className="sidebar-img"></img>
              <a href="getAllTransactionHistory">{t("Transaction History")}</a>
            </li>
          </Link>
          {parseInt(settings.currency_deposit_status) === 1 && (
            <Link href="/user/currency-deposit-history">
              <li
                className={
                  router.pathname == "/user/currency-deposit-history"
                    ? "active"
                    : ""
                }
              >
                {/* <SiFiat /> */}
                <img src="/crypto-deposit.svg" alt="Left-top" className="sidebar-img"></img>
                <a href="getAllTransactionHistory">
                  {t("Fiat To Crypto deposit History")}
                </a>
              </li>
            </Link>
          )}
          {parseInt(settings.currency_deposit_status) === 1 && (
            <Link href="/user/currency-withdraw-history">
              <li
                className={
                  router.pathname == "/user/currency-withdraw-history"
                    ? "active"
                    : ""
                }
              >
                {/* <SiFiat /> */}
                <img src="/history.svg" alt="Left-top" className="sidebar-img"></img>
                <a href="getAllTransactionHistory">
                  {t("Crypto To Fiat withdrawal History")}
                </a>
              </li>
            </Link>
          )}
          <Link
            href={"/user/referral-earning-withdrawal/" + REFERRAL_TYPE_DEPOSIT}
          >
            <li
              className={
                router.asPath ==
                `/user/referral-earning-withdrawal/${REFERRAL_TYPE_DEPOSIT}`
                  ? "active"
                  : ""
              }
            >
              {/* <SiFiat /> */}
              <img src="/withdrawal.svg" alt="Left-top" className="sidebar-img"></img>
              <a href="getAllTransactionHistory">
                {t("Referral earning from withdrawal")}
              </a>
            </li>
          </Link>
          <Link href={"/user/referral-earning-trade/" + REFERRAL_TYPE_TRADE}>
            <li
              className={
                router.asPath ==
                "/user/referral-earning-trade/" + REFERRAL_TYPE_TRADE
                  ? "active"
                  : ""
              }
            >
              {/* <SiFiat /> */}
              <img src="/trade.svg" alt="Left-top" className="sidebar-img"></img>
              <a href="getAllTransactionHistory">
                {t("Referral earning from trade")}
              </a>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default ReportSidebar;
