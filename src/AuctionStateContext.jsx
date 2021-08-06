import React, { useState, createContext } from 'react';
import data from "./auctions-sample.json";

export const AuctionStateContext = createContext();

export const AuctionStateProvider = props => {
    
    let initState = data;

    const [auctionState, setAuctionState] = useState(initState);

    return (
        <AuctionStateContext.Provider value={[auctionState, setAuctionState]}>
            {props.children}
        </AuctionStateContext.Provider>
    );
}