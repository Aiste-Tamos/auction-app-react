import React, { useState, useContext, useEffect } from "react";
import { AuctionForm } from "../auctionForm";
import { AuctionsList } from "../auctionsList/AuctionsList";
import { Sidebar } from "../sidebar/Sidebar";
import { UserBtn } from "../userBtn/UserBtn";
import { AuctionStateContext } from '../../AuctionStateContext';

import "./mainContent.scss";

export const MainContent = () => {
  
  const [, setAuctions] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [data, setData] = useContext(AuctionStateContext);

  const mainClassName = "main-content";
  const userBtnsWrapper = `${mainClassName}__user-btn-wrapper`;
  const wrapperClass = `${mainClassName}__wrapper`;
  const sideClass = `${mainClassName}__side`;
  const contentClass = `${mainClassName}__content`;
  
  const userIsActive = data.users.find(user => user.id === data.activeUserId);
  const allAuctions = data.users.map(x => x.auctionsList).flat();
  const activeAuctions = allAuctions.filter(auction => auction.state === "active");
 
  const handleUserClick = (user) => {
    setIsActive(!isActive);
    data.activeUserId = user.id;
  }; 
  
  const addAuction = (auctionName, auctionDescription) => {
    let list;
    list = data.users[data.activeUserId - 1].auctionsList;
    list.push({name: auctionName, description: auctionDescription, state: "start"})
    setAuctions(list);
 }

  useEffect(() => {
    setData(data);
  }, [setData, data]);

  return (
    <div className={mainClassName}>
      <div className={userBtnsWrapper}>
          {data.users.map(user => (
            <UserBtn
              key={user.id}
              onClick={() => handleUserClick(user)}
              isActive={user.id === data.activeUserId}
              userName={user.name}
            />
          ))} 
      </div>
      <AuctionForm minNameLength="4" minDescriptionLength="4" addAuction={addAuction}
      />
      <div className={wrapperClass}>
        <Sidebar
          className={sideClass}
          activeAuctions={activeAuctions}
          bidAuctions={userIsActive.auctionsList}
        />
        <AuctionsList
          className={contentClass}
          auctions={userIsActive.auctionsList}
          title="My auctions"
          ownedAuction={true}
          userId={data.activeUserId}
        />
      </div>
    </div>
  );
};
