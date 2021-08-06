import React from "react";
import classNames from "classnames";

import "./sidebar.scss";
import { AuctionsList } from "../auctionsList/AuctionsList";

export const Sidebar = ({ activeAuctions, className, ...other }) => {
    const mainClassName = "sidebar";
    const mainClass = classNames(mainClassName, className);
    const auctionsListClass = `${mainClassName}__auctions-list`;
    const titleClass = `${mainClassName}__title`;
    
    return (
        <div className={mainClass} {...other}>
            <h4 className={titleClass}>Active auctions</h4>
            <AuctionsList auctions={activeAuctions} className={auctionsListClass}/>
        </div>
    );
}