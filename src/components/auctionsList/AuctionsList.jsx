import React from "react";
import classNames from "classnames";

import "./auctionsList.scss";

import { Auction } from "./Auction";

export const AuctionsList = ({
  auctions,
  className,
  showForOwner,
  showBidInput,
  setShowBidInput,
  userId,
  ...other
}) => {
  const mainClassName = "auction-list";
  const mainClass = classNames(mainClassName, className);

  return (
    <div className={mainClass} {...other}>
      {auctions.map((auction) => {
        return (
          <Auction
            key={auction.name}
            auction={auction}
            showForOwner={showForOwner}
            showBidInput={showBidInput}
            setShowBidInput={setShowBidInput}
            userId={userId}
          />
        );
      })}
    </div>
  );
};
