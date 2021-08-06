import classNames from 'classnames';
import React, { useState, useContext } from 'react';
import { AuctionStateContext } from '../../AuctionStateContext';

import './auction.scss';
 
export const Auction = ({ auction, id, ownedAuction, userId }) => {
    const [clicked, setClicked] = useState(false);
    const [auctionState, setAuctionState] = useContext(AuctionStateContext);
    const [price, setPrice] = useState(null);

    const mainClassName = "auction";
    const titleClass = `${mainClassName}__title`;
    const descriptionClass = `${mainClassName}__description`;
    const btnClass = `${mainClassName}__btn`;
    const btnClosedClass = classNames(btnClass, `${btnClass}--closed`);
    const stickerClass = `${mainClassName}__sticker`;

    const changeAuctionState = () => {
        auctionState.users.find(user => user.id === userId).auctionsList.find(auct => auct.name === auction.name).state = "active";
        setAuctionState({...auctionState});
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
        </div> 
   );
};