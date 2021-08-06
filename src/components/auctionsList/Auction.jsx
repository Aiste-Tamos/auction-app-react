import classNames from 'classnames';
import React, { useState, useContext } from 'react';
import { AuctionStateContext } from '../../AuctionStateContext';

import './auction.scss';
 
export const Auction = ({ auction, id, ownedAuction }) => {
    const [clicked, setClicked] = useState(false);
    const [auctionState, setAuctionState] = useContext(AuctionStateContext);

    const mainClassName = "auction";
    const titleClass = `${mainClassName}__title`;
    const descriptionClass = `${mainClassName}__description`;
    const btnClass = `${mainClassName}__btn`;
    const btnClosedClass = classNames(btnClass, `${btnClass}--closed`);
    const stickerClass = `${mainClassName}__sticker`;

    console.log(auctionState[0]);

    const changeAuctionState = () => {
        if (auctionState === "start" && !clicked) {
          var timeleft = 60;
          var downloadTimer = setInterval(() => {
          timeleft--;
          setAuctionState(`00:${(timeleft).toLocaleString('en-US', {minimumIntegerDigits: 2})}`);
          
          if(timeleft <= 0){
          setAuctionState('closed');
              clearInterval(downloadTimer);
          }
          }, 1000);
          setClicked(true);
       }
    };
    
    return (
        <div id={auction.id} name="auction" value={auction.id} className="auction">
            {ownedAuction &&
                <span className={stickerClass}>My auction</span>
            }
            <h3 className={titleClass}>{auction.name}</h3>
            <span className={descriptionClass}>{auction.description}</span>
            <button id={id} className={auctionState !== "closed" ? btnClass : btnClosedClass} onClick={changeAuctionState}>{auctionState}</button>
        </div> 
   );
};