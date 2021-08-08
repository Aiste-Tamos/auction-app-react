import classNames from 'classnames';
import React, { useEffect, useState, useContext } from 'react';
import { AuctionStateContext } from '../../AuctionStateContext';

import './auction.scss';
 
export const Auction = ({ auction, id, ownedAuction, setTimer, userId }) => {
    const [clicked, setClicked] = useState(false);
    const [auctionState, setAuctionState] = useContext(AuctionStateContext);

    const mainClassName = "auction";
    const titleClass = `${mainClassName}__title`;
    const descriptionClass = `${mainClassName}__description`;
    const btnClass = `${mainClassName}__btn`;
    const btnClosedClass = classNames(btnClass, `${btnClass}--closed`);
    const stickerClass = `${mainClassName}__sticker`;

    useEffect(() => {
        setAuctionState(auctionState);
      }, [setAuctionState, auctionState]);

    const changeAuctionState = () => {
        if (auction.state === "start" && !clicked) {
          auction.state = "active";
          handleTimer(60);
          setClicked(true);
       }
    };

    const handleTimer = (seconds) => {
        var timeleft = seconds;
          var downloadTimer = setInterval(() => {
            timeleft--;
            auction.timer = (`00:${(timeleft).toLocaleString('en-US', {minimumIntegerDigits: 2})}`);
            auction.state = "active";
            if(timeleft <= 0){
              auction.state = ('closed');
              clearInterval(downloadTimer);
            }
          }, 1000);
       }
    
    return (
        <div id={id} name="auction" className="auction">
            {ownedAuction &&
                <span className={stickerClass}>My auction</span>
            }
            <h3 className={titleClass}>{auction.name}</h3>
            <span className={descriptionClass}>{auction.description}</span>
            <button className={auction.state !== "closed" ? btnClass : btnClosedClass} onClick={changeAuctionState}>
            {auction.state === "active" ? auction.timer : auction.state}
            </button>
        </div> 
   );
};