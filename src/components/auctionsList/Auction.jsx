import React from 'react';

import './auction.scss';
 
export const Auction = ({ auction }) => {
    
    return (
        <div id={auction.id} name="auction" value={auction.id} className="auction">
            {auction.name}
            <span>{auction.description}</span>
        </div> 
   );
};