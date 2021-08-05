import React, { useState, useEffect } from "react";
import { AuctionForm } from "../auctionForm";
import { AuctionsList } from "../auctionsList/AuctionsList";
import { UserBtn } from "../userBtn/UserBtn";

import "./mainContent.scss";

const usersList = [
    {
        id: 1,
        title: 'User 1',
        isDefault: true,
    },
    {
        id: 2,
        title: 'User 2',
        isDefault: false,
    }
];

export const MainContent = () => {

  const [auctions, setAuctions] = useState([]);
  const [auctionState, setAuctionState] = useState("start");
  const [clicked, setClicked] = useState(false);
  const defaultUser = usersList.some(user => user.isDefault === true);
  const [activeUserId, setActiveUserId] = useState(defaultUser ? defaultUser.id : null);

  const mainClassName = "main-content";
  const userBtnsWrapper = `${mainClassName}__user-btn-wrapper`;

  
  useEffect(() => {
    const auctionsList = JSON.parse(localStorage.getItem('auctions'));
    if (auctionsList) {
      setAuctions(auctionsList);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('auctions', JSON.stringify(auctions));
  }, [auctions]);


  const addAuction = (auctionName, auctionDescription) => {
    let copy = [...auctions];
    copy = [...copy, { name: auctionName, description: auctionDescription}];
    setAuctions(copy);
 }

 const changeAuctionState = () => {
   if (!clicked) {
    var timeleft = 60;
    var downloadTimer = setInterval(() => {
    timeleft--;
    setAuctionState(`00:${(timeleft).toLocaleString('en-US', {minimumIntegerDigits: 2})}`);
    if(timeleft <= 0)
        clearInterval(downloadTimer);
    }, 1000);
    setClicked(true);
   }
}

const handleUserClick = (e) => {
  setActiveUserId(Number(e.target.value));
  console.log(activeUserId);
  // if (defaultUser.id === 1) {
  //   console.log('clicked 1');
  // } else console.log('clicked 2');
};

  return (
    <div className={mainClassName}>
      <div className={userBtnsWrapper}>
          {usersList.map(user => (
            <UserBtn
              key={user.id}
              onClick={handleUserClick}
              value={user.id}
              className={user.id === activeUserId ? `${mainClassName}__user-btn--active` : `${mainClassName}__user-btn` }
              userName={user.title}
            />
          ))} 
      </div>
      
      <AuctionForm minNameLength="4" minDescriptionLength="4" addAuction={addAuction}/>
      <AuctionsList auctions={auctions} auctionState={auctionState} onBtnClick={changeAuctionState}/>
    </div>
  );
};
