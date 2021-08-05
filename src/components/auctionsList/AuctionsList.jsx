import React from "react";

import "./auctionsList.scss";

import { Auction } from "./Auction";

export const AuctionsList = ({ auctions, auctionState, onBtnClick }) => {
    const mainClassName = "auction-list";

    return (
        <div className={mainClassName}>
            {auctions.map((auction, id) => {
                return (
                    <Auction auction={auction} key={id} auctionState={auctionState} onBtnClick={onBtnClick}/>
                )
            })}
        </div>
    );
};