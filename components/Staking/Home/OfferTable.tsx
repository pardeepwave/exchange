import React, { useEffect, useState } from "react";
import { getOfferListAction } from "state/actions/staking";
import OfferRow from "./OfferRow";
import SectionLoading from "components/common/SectionLoading";
import { NoItemFound } from "components/NoItemFound/NoItemFound";
import useTranslation from "next-translate/useTranslation";

const OfferTable = ({ isLoggedIn }: any) => {
  const { t } = useTranslation("common");

  const [offers, setOffers] = useState<any>([]);
  const [loading, setloading] = useState<any>(false);
  useEffect(() => {
    getOfferListAction(setOffers, setloading);
  }, []);
  return (
    <div>
      <div className="container mt-4">
        <div className="row">
          <div className="table-responsive">
            {loading ? (
              <SectionLoading />
            ) : (
              <>
                {offers?.coin_type?.length > 0 ? (
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">{t(`Token`)}</th>
                        <th scope="col">{t(`Minimum Amount`)}</th>
                        <th scope="col">{t(`Est. APR`)}</th>
                        <th scope="col">{t(`Duration Days`)}</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {offers?.coin_type?.map((item: any, index: any) => (
                        <OfferRow
                          key={index}
                          offers={offers}
                          item={item}
                          isLoggedIn={isLoggedIn}
                        />
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <NoItemFound />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferTable;
