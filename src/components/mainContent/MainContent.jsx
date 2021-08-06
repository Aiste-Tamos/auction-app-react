import React, { useState } from "react";
import { AuctionForm } from "../auctionForm";
import { AuctionsList } from "../auctionsList/AuctionsList";
import { Sidebar } from "../sidebar/Sidebar";
import { UserBtn } from "../userBtn/UserBtn";
import data from '../../auctions-sample.json';

import "./mainContent.scss";

export const MainContent = () => {
  
  const [, setAuctions] = useState([]);
  const [isActive, setIsActive] = useState(false);

  const mainClassName = "main-content";
  const userBtnsWrapper = `${mainClassName}__user-btn-wrapper`;
  const wrapperClass = `${mainClassName}__wrapper`;
  const sideClass = `${mainClassName}__side`;
  const contentClass = `${mainClassName}__content`;

  const handleUserClick = (user) => {
    setIsActive(!isActive);
    data.activeUserId = user.id;
    console.log(data, user);
  }; 
  
  const addAuction = (auctionName, auctionDescription) => {
    let list;
      list = data.users[data.activeUserId - 1].auctionsList;
    list.push({name: auctionName, description: auctionDescription})
    setAuctions(list);
 }

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
          activeAuctions={data.activeUserId === data.users[0].id ? data.users[1].auctionsList : data.users[0].auctionsList}
        />
        <AuctionsList
          className={contentClass}
          auctions={data.activeUserId === data.users[0].id ? data.users[0].auctionsList : data.users[1].auctionsList}
          title="My auctions"
          ownedAuction={true}
        />
      </div>
    </div>
  );
};
