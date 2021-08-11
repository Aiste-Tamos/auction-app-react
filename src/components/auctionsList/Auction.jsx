import classNames from 'classnames';
import React, { useState, useContext } from 'react';
import { AuctionStateContext } from '../../AuctionStateContext';

import './auction.scss';
 
export const Auction = ({ auction, showForOwner }) => {
    // const [clicked, setClicked] = useState(false);
    const [globalState, setGlobalState] = useContext(AuctionStateContext);
    const [showPlaceBid, setShowPlaceBid] = useState(false);
    const [showWinningBid, setShowWinningBid] = useState(false);
    const [priceValue, setPriceValue] = useState(0);

    const mainClassName = "auction";
    const titleClass = `${mainClassName}__title`;
    const descriptionClass = `${mainClassName}__description`;
    const btnClass = `${mainClassName}__btn`;
    const btnClosedClass = classNames(btnClass, `${btnClass}--closed`);
    // const stickerClass = `${mainClassName}__sticker`;
    const priceFormClass = `${mainClassName}__price-form`;
    const priceSubmitbtn = `${mainClassName}__price-submit-btn`;

    // let isOwner = auctionOwnerId === globalState.activeUserId;
    let currentUser = globalState.users.find(user => user.id === globalState.activeUserId);
    let currentAuction = currentUser.auctionsList.find(auct => auct === auction);
    
    const handleTimer = (seconds) => {
        var timeleft = seconds;
        var downloadTimer = setInterval(() => {
        timeleft--;
        auction.timer = (`00:${(timeleft).toLocaleString('en-US', {minimumIntegerDigits: 2})}`);
        auction.state = "active";

        if(timeleft <= 0){
            setShowPlaceBid(false);
            auction.state = ('closed');
            clearInterval(downloadTimer);
            setShowWinningBid(true);
            console.log(globalState);
            console.log({ ...globalState, currentAuction });
            setGlobalState({ ...globalState, currentAuction });
        };
        }, 1000);
    }

    const changeAuctionState = () => {
    
            if (currentAuction.state === "start") {
                currentAuction.state = "active";
                handleTimer(60);
                setShowPlaceBid(false);
                setGlobalState({ ...globalState });
        };
    };

    const handlePriceSubmit = (e) => {
        e.preventDefault();
        setPriceValue(auction.price)
        setGlobalState({ ...globalState, currentAuction });
        console.log(priceValue)
    }

    const handlePriceChange = (e) => {
        setPriceValue(e.target.value);
    }
    
    return (
        <div id={auction.name} name="auction" className="auction">
            {/* {ownedAuction &&
                <span className={stickerClass}>My auction</span>
            } */}
            <h3 className={titleClass}>{auction.name}</h3>
            <span className={descriptionClass}>{auction.description}</span>
            {showForOwner ? (
                <button className={auction.state !== "closed" ? btnClass : btnClosedClass} onClick={changeAuctionState}>
            {auction.state === "active" ? auction.timer : auction.state}
            </button>
            ) : <>
               {auction.timer}
            
            <form onSubmit={handlePriceSubmit} className={priceFormClass}>
                <h4>Bid:</h4>
                <label>
                <input type="number" pattern="[0–9]*" onChange={handlePriceChange} />
                </label>
                <button className={priceSubmitbtn} type="submit" value="Submit">Place Bid</button>
                    </form>
                    </>
            }
            
            
                
            
            {showWinningBid && auction.price > 0 ? (
                <div>
                    <h4>Winning bid: {auction.price}&euro;</h4>
                    <p>User id: {auction.lastBidUserId}</p>
                </div>
            ) : ""
            }
        </div> 
   );
};