import React from "react";
import classNames from "classnames";

import "./auctionsList.scss";

import { Auction } from "./Auction";

export const AuctionsList = ({ auctions, auctionState, className, onBtnClick, ...other }) => {
    const mainClassName = "auction-list";
    const mainClass = classNames(mainClassName, className);

    return (
        <div className={mainClass} {...other}>
            {auctions.map((auction, id) => {
                return (
                    <Auction auction={auction} key={id} auctionState={auctionState} onBtnClick={onBtnClick}/>
                )
            })}
        </div>
    );
};