import React, { useState } from 'react';

import './auction.scss';
 
export const Auction = ({ auction, id }) => {
    const [auctionState, setAuctionState] = useState("start");
    const [clicked, setClicked] = useState(false);

    const mainClassName = "auction";
    const titleClass = `${mainClassName}__title`;
    const descriptionClass = `${mainClassName}__description`;
    const btnClass = `${mainClassName}__btn`;

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
    };
    
    return (
        <div id={auction.id} name="auction" value={auction.id} className="auction">
            <h3 className={titleClass}>{auction.name}</h3>
            <span className={descriptionClass}>{auction.description}</span>
            <button id={id} className={btnClass} onClick={changeAuctionState}>{auctionState}</button>
        </div> 
   );
};