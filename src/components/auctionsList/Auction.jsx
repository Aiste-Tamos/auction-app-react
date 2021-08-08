import classNames from 'classnames';
import React, { useState, useContext, useEffect } from 'react';
import { AuctionStateContext } from '../../AuctionStateContext';

import './auction.scss';
 
export const Auction = ({ auction, id, ownedAuction, userId }) => {
    const [clicked, setClicked] = useState(false);
    const [seconds, setSeconds] = useState(60);
    const [auctionState, setAuctionState] = useContext(AuctionStateContext);
    const [price, setPrice] = useState(null);

    const mainClassName = "auction";
    const titleClass = `${mainClassName}__title`;
    const descriptionClass = `${mainClassName}__description`;
    const btnClass = `${mainClassName}__btn`;
    const btnClosedClass = classNames(btnClass, `${btnClass}--closed`);
    const stickerClass = `${mainClassName}__sticker`;

    useEffect(() => {
        const interval = setInterval(() => {
          setAuctionState(auctionState);
          setSeconds(seconds => seconds - 1)
        }, 1000);
        return () => clearInterval(interval);
      }, [auctionState, setAuctionState]);

    const changeAuctionState = () => {
        auctionState.users.find(user => user.id === userId).auctionsList.find(auct => auct.name === auction.name).state = "active";
        setAuctionState({...auctionState});
        setPrice(price);
    //       var timeleft = 60;
    //       var downloadTimer = setInterval(() => {
    //         timeleft--;
    //         setAuctionState(`00:${(timeleft).toLocaleString('en-US', {minimumIntegerDigits: 2})}`);
            
    //         if(timeleft <= 0){
    //             setAuctionState('closed');
    //             clearInterval(downloadTimer);
    //         }
    //       }, 1000);
    //       setClicked(true);
    //    }
        
    };
    
    return (
        <div id={id} name="auction" className="auction">
            {ownedAuction &&
                <span className={stickerClass}>My auction</span>
            }
            <h3 className={titleClass}>{auction.name}</h3>
            <span className={descriptionClass}>{auction.description}</span>
            <button className={auction.state !== "closed" ? btnClass : btnClosedClass} onClick={changeAuctionState}>
            {auction.state}
            </button>
            {price &&
               <input id="totalPrice" type="text" name="totalprice" readonly="readonly" />
            }
        </div> 
   );
};