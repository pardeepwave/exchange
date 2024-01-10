import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { ImListNumbered } from "react-icons/im";
import { copyTextById, formateZert } from "common";
import WalletGoogleAuth from "components/wallet/wallet-google-auth";
import { UserSettingsApi } from "service/settings";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { RootState } from "state/store";
import { useSelector } from "react-redux";
import { WalletWithdrawProcessApiAction } from "state/actions/wallet";
import {
  WITHDRAW_FESS_FIXED,
  WITHDRAW_FESS_PERCENT,
} from "helpers/core-constants";
import { getFeeAmountApi } from "service/wallet";

export const WithdrawComponent = ({
  responseData,
  baseType,
  fullPage,
}: any) => {
  const { t } = useTranslation("common");
  const { settings } = useSelector((state: RootState) => state.common);

  const [selectedNetwork, setSelectedNetwork] = useState<any>({});

  const [withdrawalCredentials, setWithdrawalCredentials] = useState({
    wallet_id: responseData?.wallet?.id,
    code: "",
    address: "",
    amount: "",
    note: "withdrawal",
    memo: "",
    network_type: selectedNetwork?.network_type ?? "",
    network_id: "",
    base_type:""
  });

  const [feesData, setFeesData] = React.useState<any>({});
  const [errorMessage, setErrorMessage] = React.useState({
    status: false,
    message: "",
  });
  const [processing, setProcessing] = React.useState(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    let credentials = {
      ...withdrawalCredentials,
      wallet_id: responseData?.wallet?.id,
      base_type: responseData?.data?.base_type,
      network_id: selectedNetwork?.id,
    };
    if (
      responseData?.data?.base_type == 8 ||
      responseData?.data?.base_type == 6
    ) {
      console.log('bb', selectedNetwork?.base_type);
      credentials = {
        ...credentials,
        base_type: selectedNetwork?.base_type,
      };
    }
    
    WalletWithdrawProcessApiAction(credentials, setProcessing);
  };
  const CheckG2faEnabled = async () => {
    const { data } = await UserSettingsApi();
    const { user } = data;
    if (
      !user.google2fa_secret &&
      parseInt(settings.two_factor_withdraw) === 1
    ) {
      setErrorMessage({
        status: true,
        message: "Google 2FA is not enabled, Please enable Google 2FA fist",
      });
    }
  };

  React.useEffect(() => {
    if (
      responseData?.data?.base_type == 8 ||
      responseData?.data?.base_type == 6
    ) {
      setWithdrawalCredentials((prev) => ({
        ...prev,
        base_type: selectedNetwork?.base_type,
      }));
    }
  }, [responseData?.wallet?.id,selectedNetwork]);

  React.useEffect(() => {
    setWithdrawalCredentials((prev) => ({
      ...prev,
      wallet_id: responseData?.wallet?.id,
    }));

    CheckG2faEnabled();
  }, [responseData?.wallet?.id]);

  React.useEffect(() => {
    if (
      parseInt(responseData?.data?.base_type) === 1 &&
      responseData?.wallet.coin_type == "USDT"
    ) {
      setWithdrawalCredentials((prev) => ({
        ...prev,
        network_type: selectedNetwork?.network_type,
        
      }));
      return;
    }
    if (
      parseInt(responseData?.data?.base_type) === 8 ||
      parseInt(responseData?.data?.base_type) === 6
    ) {
      setWithdrawalCredentials((prev) => ({
        ...prev,
        network_type: "",
      }));
    }
  }, [selectedNetwork?.network_type]);

  useEffect(() => {
    if (
      parseInt(responseData?.data?.base_type) === 1 &&
      responseData?.wallet.coin_type == "USDT"
    ) {
      setSelectedNetwork(responseData?.data?.coin_payment_networks[0]);

      setWithdrawalCredentials((prev) => ({
        ...prev,
        network_id: responseData?.data?.coin_payment_networks[0]?.id,
      }));
    }
  }, [responseData?.wallet.coin_type]);

  const checkNetworkFunc = (networkId: any) => {
    if (networkId == 4) {
      return `(ERC20 Token)`;
    }
    if (networkId == 5) {
      return `(BEP20 Token)`;
    }
    if (networkId == 6) {
      return `(TRC20 Token)`;
    }
    return "";
  };

  useEffect(() => {
    if (withdrawalCredentials?.address && withdrawalCredentials?.amount) {
      getFeeAmount();
    }
  }, [withdrawalCredentials]);

  const getFeeAmount = async () => {
    const response = await getFeeAmountApi(withdrawalCredentials);
    if (!response.success) {
      return;
    }
    setFeesData(response.data);
  };

  console.log("withdrawalCredentials", withdrawalCredentials);

  return (
    <div className="my-wallet-new px-0">
      <h5>{t("Total Balance")}</h5>
      <div className="coin-list-item mt-3">
        <div className="coint-flex">
          <img
            className="icon"
            src={responseData?.wallet?.coin_icon || "/bitcoin.png"}
            alt="coin"
            width="25px"
            height="25px"
          />
          <h6>{responseData?.wallet?.coin_type}</h6>
        </div>

        <p className="coin-price">
          {responseData?.wallet?.balance
            ? formateZert(responseData?.wallet?.balance) +
              " " +
              responseData?.wallet?.coin_type
            : "Loading"}
        </p>
      </div>

      <form action="">
        {/* for base type 8  */}
        {(parseInt(responseData?.data?.base_type) === 8 ||
          parseInt(responseData?.data?.base_type) === 6) && (
          <div className="wallet-addres">
            <div className="">
              <div className="total-balance ">
                <h5>{t("Select Network")}</h5>
                <select
                  name="currency"
                  className="form-control coin-list-item mt-3"
                  style={{ height: "44px" }}
                  onChange={(e) => {
                    const findObje = responseData?.network.find(
                      (x: any) => x.id === parseInt(e.target.value)
                    );
                    setSelectedNetwork(findObje);
                    setWithdrawalCredentials((prev) => ({
                      ...prev,
                      network_id: findObje?.id,
                    }));
                  }}
                >
                  {responseData?.network.map((item: any, index: number) => (
                    <option value={item.id} key={index}>
                      {item?.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* for base type not 8  */}
        {parseInt(responseData?.data?.base_type) !== 8 &&
          parseInt(responseData?.data?.base_type) !== 6 && (
            <div className="wallet-addres">
              <div className="">
                {responseData?.wallet.coin_type == "USDT" &&
                  parseInt(responseData?.data?.base_type) === 1 && (
                    <div className="total-balance ">
                      <h5>{t("Select Network")}</h5>
                      <select
                        name="currency"
                        className="form-control coin-list-item mt-3"
                        style={{ height: "44px" }}
                        onChange={(e) => {
                          const findObje =
                            responseData?.data?.coin_payment_networks.find(
                              (x: any) => x.id === parseInt(e.target.value)
                            );
                          setSelectedNetwork(findObje);
                          setWithdrawalCredentials((prev) => ({
                            ...prev,
                            network_id: findObje?.id,
                          }));
                        }}
                      >
                        {responseData?.data?.coin_payment_networks.map(
                          (item: any, index: number) => (
                            <option value={item.id} key={index}>
                              {item?.network_name}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  )}
              </div>
            </div>
          )}

        <div className="wallet-addres">
          <h5>{t("Address")}</h5>
          <div className="">
            <div className="input-group input-address-bar mt-3">
              <input
                type="text"
                className="form-control border-0 h-50"
                id="address"
                name="address"
                placeholder={t("Address")}
                value={withdrawalCredentials.address}
                onChange={(e) => {
                  setWithdrawalCredentials((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }));
                }}
              />
              <span className="input-address-bar-btn">
                <FaHome />
              </span>
            </div>
            <div className="mt-1 text-danger">
              <small>
                {t(
                  `Only enter a ${
                    responseData?.wallet?.coin_type ?? ""
                  } ${checkNetworkFunc(
                    responseData?.data?.base_type
                  )} address in this field. Otherwise the asset you withdraw, may be lost.`
                )}
              </small>
            </div>
          </div>
        </div>

        <div className="wallet-addres">
          <h5>{t("Amount")}</h5>
          <div className="">
            <div className="">
              <div className="input-group input-address-bar mt-3">
                <input
                  type="number"
                  className="form-control border-0 h-50"
                  id="amountWithdrawal"
                  name="amount"
                  placeholder={t("AMOUNT To Withdraw")}
                  value={withdrawalCredentials.amount}
                  onChange={(e) => {
                    setWithdrawalCredentials((prev) => ({
                      ...prev,
                      amount: e.target.value,
                    }));
                  }}
                />
                <span className="input-address-bar-btn">
                  <ImListNumbered />
                </span>
              </div>
              {Object.keys(feesData).length > 0 && (
                <div>
                  <small>
                    {t(
                      `You will be charged ${feesData?.fees} ${feesData?.coin_type} as Withdrawal Fee for this withdrawal.`
                    )}
                  </small>
                </div>
              )}
              {responseData?.wallet?.withdrawal_fees_type ==
                WITHDRAW_FESS_PERCENT && (
                <small>
                  <span className="mr-2">
                    {t("Fees ")}
                    {parseFloat(responseData?.wallet?.withdrawal_fees).toFixed(
                      8
                    )}{" "}
                    %
                  </span>
                  <span className="mr-2">
                    {t("Min withdraw ")}{" "}
                    {parseFloat(
                      responseData?.wallet?.minimum_withdrawal
                    ).toFixed(5)}
                    {responseData?.wallet?.coin_type}
                  </span>
                  <span className="mr-2">
                    {t("Max withdraw")}{" "}
                    {parseFloat(responseData?.wallet?.maximum_withdrawal)}{" "}
                    {responseData?.wallet?.coin_type}
                  </span>
                </small>
              )}
            </div>
          </div>
        </div>
        <div className="wallet-addres">
          <h5>{t("Memo")} ({t("optional")})</h5>
          <div className="">
            <div className="">
              <div className="input-group input-address-bar mt-3">
                <input
                  type="text"
                  className="form-control border-0 h-50"
                  id="memo"
                  name="memo"
                  placeholder={t("Memo if needed")}
                  value={withdrawalCredentials.memo}
                  onChange={(e) => {
                    setWithdrawalCredentials({
                      ...withdrawalCredentials,
                      memo: e.target.value,
                    });
                  }}
                />
                
              </div>
              
                <div>
                  <small>
                    {t(
                      `Add your memo if needed but please ensure it that's correct, otherwise you lost coin.`
                    )}
                  </small>
                </div>
              
              
            </div>
          </div>
        </div>

        <WalletGoogleAuth
          withdrawalCredentials={withdrawalCredentials}
          setWithdrawalCredentials={setWithdrawalCredentials}
        />
        <input type="hidden" name="wallet_id" value="19" />
        {errorMessage.status && (
          <div className="alert alert-danger">{errorMessage.message}</div>
        )}
        {parseInt(settings.two_factor_withdraw) === 1 ? (
          <button
            type="button"
            className="withdraw-btn mt-4"
            data-target="#exampleModal"
            disabled={
              withdrawalCredentials.address === "" ||
              withdrawalCredentials.amount === "" ||
              errorMessage.status === true
            }
            data-toggle="modal"
            onClick={() => {
              setErrorMessage({
                status: false,
                message: "",
              });
            }}
          >
            {t("Withdraw")}
          </button>
        ) : (
          <button
            className="primary-btn-outline w-100 mt-4"
            type="button"
            style={{ height: "44px" }}
            disabled={processing}
            onClick={handleSubmit}
          >
            {processing ? t("Processing..") : t("Withdraw")}
          </button>
        )}
      </form>
    </div>
  );
};
