import React from 'react';

import './auction.scss';
 
export const Auction = ({ auction, auctionState, id, onBtnClick }) => {
    const mainClassName = "auction";
    const titleClass = `${mainClassName}__title`;
    const descriptionClass = `${mainClassName}__description`;
    const btnClass = `${mainClassName}__btn`;
    
    return (
        <div id={auction.id} name="auction" value={auction.id} className="auction">
            <h3 className={titleClass}>{auction.name}</h3>
            <span className={descriptionClass}>{auction.description}</span>
            <button id={id} className={btnClass} onClick={onBtnClick}>{auctionState}</button>
        </div> 
   );
};