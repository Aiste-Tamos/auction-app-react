import React, { useState} from "react";

import "./auctionsList.scss";

import { Auction } from "./Auction";

export const AuctionsList = ({ auctions }) => {
    const [auctionState, setAuctionState] = useState("start");
    const mainClassName = "auction-list";

    const changeAuctionState = () => {
            var timeleft = 60;
            var downloadTimer = setInterval(() => {
            timeleft--;
            setAuctionState(`00:${(timeleft).toLocaleString('en-US', {minimumIntegerDigits: 2})}`);
            if(timeleft <= 0)
                clearInterval(downloadTimer);
            }, 1000);
        }

    return (
        <div className={mainClassName}>
            {auctions.map((auction, id) => {
                return (
                    <Auction auction={auction} key={id} auctionState={auctionState} onBtnClick={changeAuctionState}/>
                )
            })}
        </div>
    );
};