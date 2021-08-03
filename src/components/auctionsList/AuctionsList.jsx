import React from "react";

import "./auctionsList.scss";

import { Auction } from "./Auction";

export const AuctionsList = ({ auctions, auctionState, onBtnClick }) => {
    return (
        <div className="to-do-list">
            {auctions.map((auction, id) => {
                return (
                    <Auction auction={auction} key={id} auctionState={auctionState} onBtnClick={onBtnClick}/>
                )
            })}
        </div>
    );
};