import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { HiOutlineCash } from "react-icons/hi";
import { RiLuggageDepositFill } from "react-icons/ri";

const FiatSidebar = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  return (
    <div className="page-left-sidebar">
      <div className="sidebar-top">
        <ul className="left-menu">
          <Link href="/fiat-deposit">
            <li className={router.pathname == "/fiat-deposit" ? "active" : ""}>
              {/* <RiLuggageDepositFill /> */}
              <img src="/dpst-money.svg" alt="left-fiat" className="left-fiat-img"></img>
              <a href="/fiat-deposit">{t("Fiat To Crypto Deposit")}</a>
            </li>
          </Link>
          <Link href="/fiat-withdrawal">
            <li
              className={router.pathname == "/fiat-withdrawal" ? "active" : ""}
            >
              {/* <HiOutlineCash /> */}
              <img src="/widral-money.svg" alt="left-fiat" className="left-fiat-img"></img>
              <a href="/fiat-withdrawal">{t("Crypto To Fiat Withdrawal")}</a>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default FiatSidebar;
