import React, { useState, useEffect } from "react";
import { AuctionForm } from "../auctionForm";
import { AuctionsList } from "../auctionsList/AuctionsList";

import "./mainContent.scss";

export const MainContent = () => {

  const [auctions, setAuctions] = useState([]);

  const mainClassName = "main-content";

  useEffect(() => {
    localStorage.setItem('auctions', JSON.stringify(auctions));
  }, [auctions]);

  useEffect(() => {
    const auctionsList = JSON.parse(localStorage.getItem('auctions'));
    if (auctionsList) {
      setAuctions(auctionsList);
    }
  }, []);

  const addAuction = (auctionName, auctionDescription) => {
    let copy = [...auctions];
    copy = [...copy, { name: auctionName, description: auctionDescription}];
    setAuctions(copy);

}

  return (
    <div className={mainClassName}>
        <AuctionForm minNameLength="4" minDescriptionLength="4" addAuction={addAuction}/>
        <AuctionsList auctions={auctions}/>
    </div>
  );
};
