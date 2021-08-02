import React from "react";
import { AuctionForm } from "../auctionForm";

import "./mainContent.scss";

export const MainContent = () => {
  const mainClassName = "main-content";

  const addAuction = () => {
      sessionStorage.setItem("auction");
  }

  return (
    <div className={mainClassName}>
      <AuctionForm minNameLength="4" minDescriptionLength="4" addAuction={addAuction}/>
    </div>
  );
};
