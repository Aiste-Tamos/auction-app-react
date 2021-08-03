import React, { useState, useEffect } from "react";
import { AuctionForm } from "../auctionForm";
import { AuctionsList } from "../auctionsList/AuctionsList";

import "./mainContent.scss";

export const MainContent = () => {

  const [auctions, setAuctions] = useState([]);
  const [auctionState, setAuctionState] = useState("start");

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

 const changeAuctionState = () => {
     
     if (auctionState === ""){
         setAuctionState("start");
     } else {
         var timeleft = 60;
         var downloadTimer = setInterval(() => {
           timeleft--;
         setAuctionState(`00:${(timeleft).toLocaleString('en-US', {minimumIntegerDigits: 2})}`);
         if(timeleft <= 0)
             clearInterval(downloadTimer);
         }, 1000);
     }
 }

  return (
    <div className={mainClassName}>
        <AuctionForm minNameLength="4" minDescriptionLength="4" addAuction={addAuction}/>
        <AuctionsList auctions={auctions} auctionState={auctionState} onBtnClick={changeAuctionState}/>
    </div>
  );
};
