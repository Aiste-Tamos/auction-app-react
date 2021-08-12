import React, { useState } from "react";
import classNames from "classnames";

import "./auctionForm.scss";

export const AuctionForm = ({
  addAuction,
  className,
  minNameLength,
  minDescriptionLength,
}) => {
  const [auctionNameValue, setAuctionNameValue] = useState("");
  const [auctionDescriptionValue, setAuctionDescriptionValue] = useState("");

  const mainClassName = "auction-form";
  const mainClass = classNames(mainClassName, className);
  const inputClass = `${mainClassName}__input`;
  const btnClass = `${mainClassName}__btn`;
  const labelClass = `${mainClassName}__label`;
  const labelTextClass = `${labelClass}__text`;

  const handleNameChange = (e) => {
    setAuctionNameValue(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setAuctionDescriptionValue(e.target.value);
  };

  const checkInputs = () => {
    const validName = !!auctionNameValue;
    const validDescription = !!auctionDescriptionValue;

    return validName && validDescription;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validForm = checkInputs();

    if (validForm) {
      addAuction(auctionNameValue, auctionDescriptionValue);
      setAuctionDescriptionValue("");
      setAuctionNameValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={mainClass}>
      <label className={labelClass}>
        <span className={labelTextClass}>Auction Name</span>
        <input
          className={inputClass}
          id="name"
          type="text"
          minLength={minNameLength}
          required
          onChange={handleNameChange}
          value={auctionNameValue}
        ></input>
      </label>
      <label className={labelClass}>
        <span className={labelTextClass}>Description</span>
        <textarea
          className={inputClass}
          id="description"
          rows="3"
          minLength={minDescriptionLength}
          required
          onChange={handleDescriptionChange}
          value={auctionDescriptionValue}
        ></textarea>
      </label>
      <button type="submit" className={btnClass}>
        Add Auction
      </button>
    </form>
  );
};
