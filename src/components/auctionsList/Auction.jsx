import React from 'react';

import './auction.scss';
 
export const Auction = ({ auction, auctionState, onBtnClick }) => {
    
    return (
        <div id={auction.id} name="auction" value={auction.id} className="auction">
            {auction.name}
            <span>{auction.description}</span>
            <button onClick={onBtnClick}>{auctionState}</button>
        </div> 
   );
};