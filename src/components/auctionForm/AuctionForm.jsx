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
  const inputClass = `${mainClassName}__input`;
  const btnClass = `${mainClassName}__btn`;
  const labelClass = `${mainClassName}__label`;

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
      setAuctionDescriptionValue("");
      setAuctionNameValue("");
    }
  }

  return (
        <form onSubmit={handleSubmit} className={mainClassName}>
            <label className={labelClass}>
            Auction Name
              <input
                className={inputClass}
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
          <button type="submit" className={btnClass}>Add Auction</button>
        </form>
  );
};