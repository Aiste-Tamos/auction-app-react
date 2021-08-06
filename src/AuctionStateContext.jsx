import React, { useState, createContext } from 'react';

export const AuctionStateContext = createContext();

export const AuctionStateProvider = props => {
    const [auctionState, setAuctionState] = useState(["start", "timer", "bid", "closed"]);

    return (
        <AuctionStateContext.Provider value={[auctionState, setAuctionState]}>
            {props.children}
        </AuctionStateContext.Provider>
    );
}