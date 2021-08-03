import React, { useState } from "react";

import "./auctionForm.scss";

export const AuctionForm = ({
  addAuction,
  minNameLength,
  minDescriptionLength,
 }) => {
  const [auctionNameValue, setAuctionNameValue] = useState("");
  const [auctionDescriptionValue, setAuctionDescriptionValue] = useState("");
  
  const mainClassName = "auction-form";

  const handleNameChange = (e) => {
    setAuctionNameValue(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setAuctionDescriptionValue(e.target.value);
  };

  const checkInputs = () => {
    const validName = !!auctionNameValue;
    const validDescription = !!auctionDescriptionValue;

    return (
      validName &&
      validDescription
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validForm = checkInputs();
    
    if (validForm) {
      addAuction(auctionNameValue, auctionDescriptionValue);
    }
  }

//   const addAuction = (auctionNameValue, auctionDescriptionValue) => {
//     let copy = [...auctions];
//     copy = [...copy, { name: auctionNameValue, description: auctionDescriptionValue}];
//     setAuctions(copy);
// }

  // useEffect(() => {
  //   localStorage.setItem('auctions', JSON.stringify(auctions));
  // }, [auctions]);

  // useEffect(() => {
  //   const auctionsList = JSON.parse(localStorage.getItem('auctions'));
  //   if (auctionsList) {
  //     setAuctions(auctionsList);
  //   }
  // }, []);

  return (
    <div className={mainClassName}>
        <form onSubmit={handleSubmit}>
          <label>
            Auction Name
            <input 
              id="name"
              type="text"
              minLength={minNameLength}
              required
              onChange={handleNameChange}
              value={auctionNameValue}>
            </input>
          </label>
          <label>
            Description
            <input
              id="description"
              type="text"
              minLength={minDescriptionLength}
              required
              onChange={handleDescriptionChange}
              value={auctionDescriptionValue}>
            </input>
          </label>
          <button type="submit">Add Auction</button>
        </form>
    </div>
  );
};