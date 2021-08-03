import React from "react";

import "./auctionsList.scss";

import { Auction } from "./Auction";

export const AuctionsList = ({ auctions }) => {
    return (
        <div className="to-do-list">
            {auctions.map((auction, id) => {
                return (
                    <Auction auction={auction} key={id}/>
                )
            })}
        </div>
    );
};