import React, { useState } from "react";
import PropTypes from "prop-types";

import "./auctionForm.scss";

export const AuctionForm = ({ addAuction, minNameLength, minDescriptionLength }) => {
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


  return (
    <div className={mainClassName}>
        <form onSubmit={handleSubmit}>
          <label for="name">Auction Name </label>
          <input id="name" type="text" minLength={minNameLength} required onChange={handleNameChange} value={auctionNameValue}></input>
          <label for="description">Description</label>
          <input id="description" type="text" minLength={minDescriptionLength} required onChange={handleDescriptionChange} value={auctionDescriptionValue}></input>
          <button type="submit">Add Auction</button>
        </form>
    </div>
  );
};

AuctionForm.propTypes = {
  addAuction: PropTypes.func,
  minNameLength: PropTypes.string,
  minDescriptionLength: PropTypes.string,
}