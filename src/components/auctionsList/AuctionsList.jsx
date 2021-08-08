import React from "react";
import classNames from "classnames";

import "./auctionsList.scss";

import { Auction } from "./Auction";

export const AuctionsList = ({ auctions, className, ownedAuction, setTimer, userId, ...other }) => {
    const mainClassName = "auction-list";
    const mainClass = classNames(mainClassName, className);

    return (
        <div className={mainClass} {...other}>
            {auctions.map((auction, id) => {
                return (
                    <Auction key={id} auction={auction} ownedAuction={ownedAuction} userId={userId} setTimer={setTimer}/>
                )
            })}
        </div>
    );
};