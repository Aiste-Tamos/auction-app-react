import React, { useState, useContext } from "react";
import { AuctionForm } from "../auctionForm";
import { AuctionsList } from "../auctionsList/AuctionsList";
import { Sidebar } from "../sidebar/Sidebar";
import { UserBtn } from "../userBtn/UserBtn";
import { AuctionStateContext } from "../../AuctionStateContext";

import "./mainContent.scss";

export const MainContent = () => {
  const [, setAuctions] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [data, setData] = useContext(AuctionStateContext);
  const [errorMessage, setErrorMessage] = useState("");

  const mainClassName = "main-content";
  const userBtnsWrapper = `${mainClassName}__user-btn-wrapper`;
  const wrapperClass = `${mainClassName}__wrapper`;
  const sideClass = `${mainClassName}__side`;
  const contentClass = `${mainClassName}__content`;
  const errorMessageClass = `${mainClassName}__error-message`;

  const userIsActive = data.users.find((user) => user.id === data.activeUserId);
  const otherUser = data.users.find((user) => user.id !== data.activeUserId);
  const allAuctions = data.users.map((x) => x.auctionsList).flat();
  const userBiddedAuctions = allAuctions.filter((auct) =>
    auct.lastBidUserId === data.activeUserId ? auct : ""
  );
  const activeAuctions = otherUser.auctionsList.filter(
    (auction) => auction.state === "active"
  );

  const handleUserClick = (user) => {
    setIsActive(!isActive);
    data.activeUserId = user.id;
  };

  const addAuction = (auctionName, auctionDescription) => {
    if (userIsActive.auctionsList.find((auc) => auc.name === auctionName)) {
      setErrorMessage("Auction with this name already exists");
      return;
    } else {
      const newAuction = {
        name: auctionName,
        description: auctionDescription,
        state: "start",
        auctionEndTime: null,
        lastBidUserId: null,
        price: "0",
      };
      const list = [...userIsActive.auctionsList, newAuction];
      userIsActive.auctionsList = list;
      setErrorMessage("");
      setData({ ...data });
      setAuctions(list);
    }
  };

  return (
    <div className={mainClassName}>
      <div className={userBtnsWrapper}>
        {data.users.map((user) => (
          <UserBtn
            key={user.id}
            onClick={() => handleUserClick(user)}
            isActive={user.id === data.activeUserId}
            userName={user.name}
          />
        ))}
      </div>
      <AuctionForm
        minNameLength="4"
        minDescriptionLength="4"
        addAuction={addAuction}
      />
      <p className={errorMessageClass}>{errorMessage}</p>
      <div className={wrapperClass}>
        <Sidebar
          className={sideClass}
          activeAuctions={activeAuctions}
          bidAuctions={userBiddedAuctions}
        />
        <AuctionsList
          className={contentClass}
          auctions={userIsActive.auctionsList}
          showForOwner={true}
          userId={data.activeUserId}
        />
      </div>
    </div>
  );
};
