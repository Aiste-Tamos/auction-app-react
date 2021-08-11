import React from "react";
import classNames from "classnames";

import "./sidebar.scss";
import { AuctionsList } from "../auctionsList/AuctionsList";

export const Sidebar = ({ activeAuctions, bidAuctions, className, ...other }) => {
    const mainClassName = "sidebar";
    const mainClass = classNames(mainClassName, className);
    const auctionsListClass = `${mainClassName}__auctions-list`;
    const titleClass = `${mainClassName}__title`;
    
    return (
        <div className={mainClass} {...other}>
            <h4 className={titleClass}>Active auctions:</h4>
            <AuctionsList auctions={activeAuctions} showForOwner={false} className={auctionsListClass}/>
            <h4 className={titleClass}>Auctions I have bid in:</h4>
            <AuctionsList auctions={bidAuctions} showForOwner={false} className={auctionsListClass} />
        </div>
    );
}