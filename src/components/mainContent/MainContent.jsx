import React, { useState, useEffect } from "react";
import { AuctionForm } from "../auctionForm";
import { AuctionsList } from "../auctionsList/AuctionsList";
import { Sidebar } from "../sidebar/Sidebar";
import { UserBtn } from "../userBtn/UserBtn";
import data from '../../auctions-sample.json';

import "./mainContent.scss";



export const MainContent = () => {
  
  console.log(data);

  const [auctions, setAuctions] = useState([]);
  // const defaultUser = usersList.some(user => user.isDefault === true);
  // const [activeUserId, setActiveUserId] = useState(defaultUser ? defaultUser.id : null);

  const mainClassName = "main-content";
  const userBtnsWrapper = `${mainClassName}__user-btn-wrapper`;
  const wrapperClass = `${mainClassName}__wrapper`;
  const sideClass = `${mainClassName}__side`;
  const contentClass = `${mainClassName}__content`;

  
//   useEffect(() => {
//     const auctionsList = JSON.parse(localStorage.getItem('auctions'));
//     if (auctionsList) {
//       setAuctions(auctionsList);
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('auctions', JSON.stringify(auctions));
//   }, [auctions]);


//   const addAuction = (auctionName, auctionDescription) => {
//     let copy = [...auctions];
//     copy = [...copy, { name: auctionName, description: auctionDescription}];
//     setAuctions(copy);
//  }

  const handleUserClick = (user) => {
    // return data.activeUserId === user.id;
    console.log(user);
  };

  return (
    <div className={mainClassName}>
      <div className={userBtnsWrapper}>
          {data.users.map(user => (
            <UserBtn
              key={user.id}
              onClick={() => handleUserClick(user)}
              className={user.id === data.activeUserId ? `${mainClassName}__user-btn--active` : `${mainClassName}__user-btn` }
              userName={user.name}
            />
          ))} 
      </div>
      <AuctionForm minNameLength="4" minDescriptionLength="4" 
      // addAuction={addAuction}
      />
      <div className={wrapperClass}>
        <Sidebar className={sideClass}/>
        <AuctionsList className={contentClass} auctions={auctions}/>
      </div>
    </div>
  );
};
