import classNames from "classnames";
import React, { useState, useContext, useEffect, useRef } from "react";
import { AuctionStateContext } from "../../AuctionStateContext";

import "./auction.scss";

export const Auction = ({ auction, className, showBidInput, showForOwner }) => {
  const [globalState, setGlobalState] = useContext(AuctionStateContext);
  const [priceValue, setPriceValue] = useState(0);
  const prevPriceRef = useRef();

  const calculateTimeleft = () => {
    if (auction.auctionEndTime === null) {
      return 60;
    }
    let diff = Math.abs(
      Math.round((auction.auctionEndTime - new Date()) / 1000)
    );
    let seconds = diff.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
    });
    return seconds;
  };

  const [timeleft, setTimeleft] = useState(calculateTimeleft());

  const mainClassName = "auction";
  const mainClass = classNames(mainClassName, className);
  const titleClass = `${mainClassName}__title`;
  const descriptionClass = `${mainClassName}__description`;
  const btnClass = `${mainClassName}__btn`;
  const btnClosedClass = classNames(btnClass, `${btnClass}--closed`);
  const wrapperClass = `${mainClassName}__wrapper`;
  const priceFormClass = `${mainClassName}__price-form`;
  const priceSubmitbtn = `${mainClassName}__price-submit-btn`;
  const timerClassName = `${mainClassName}__timer`;
  const infoClass = `${mainClassName}__info`;
  const winnerInfoClass = `${mainClassName}__winner-info`;

  let currentUser = globalState.users.find(
    (user) => user.id === globalState.activeUserId
  );

  let otherUser = globalState.users.find(
    (user) => user.id !== globalState.activeUserId
  );

  let currentOwnedAuction = currentUser.auctionsList.find(
    (auct) => auct === auction
  );

  let currentAuction = otherUser.auctionsList.find((auct) => auct === auction);

  useEffect(() => {
    var downloadTimer = setInterval(() => {
      if (auction.state === "active") {
        let dateNow = new Date();
        if (auction.auctionEndTime === null) {
          dateNow.setSeconds(dateNow.getSeconds() + 60);
          auction.auctionEndTime = dateNow;
        } else {
          // auction.auctionEndTime = new Date(auction.auctionEndTime) - dateNow;
        }
        let seconds = calculateTimeleft();
        setTimeleft(seconds);
        if (seconds === "00") {
          auction.state = "closed";
          clearInterval(downloadTimer);
        }
        setGlobalState({ ...globalState });
      }
    }, 1000);
    return () => {
      clearInterval(downloadTimer);
    };
  }, []);

  const changeAuctionState = () => {
    if (currentOwnedAuction.state === "start") {
      currentOwnedAuction.state = "active";
      let dateNow = new Date();

      currentOwnedAuction.auctionEndTime = new Date(
        dateNow.setSeconds(dateNow.getSeconds() + 60)
      );

      setGlobalState({ ...globalState });
    }
  };

  const handlePriceSubmit = (e) => {
    e.preventDefault();
    prevPriceRef.current = priceValue;
    const prevPrice = currentAuction.price;

    if (priceValue <= prevPrice) {
      return;
    }
    if (priceValue > 0) {
      currentAuction.price = priceValue;
      currentAuction.lastBidUserId = currentUser.id;
      addSeconds();
      setGlobalState({ ...globalState });
    }
  };

  const addSeconds = () => {
    currentAuction.auctionEndTime = new Date(
      currentAuction.auctionEndTime.setSeconds(
        currentAuction.auctionEndTime.getSeconds() + 10
      )
    );
  };

  const handlePriceChange = (e) => {
    setPriceValue(e.target.value);
  };

  return (
    <div id={auction.name} name="auction" className={mainClass}>
      <h3 className={titleClass}>{auction.name}</h3>
      <span className={descriptionClass}>{auction.description}</span>
      {auction.state === "active" && auction.price > 0 && (
        <span className={infoClass}>Last bid: {auction.price} &euro;</span>
      )}
      {auction.lastBidUserId && auction.state === "closed" ? (
        <div className={winnerInfoClass}>
          <h4>Winning bid: {auction.price}&euro;</h4>
          <p>Winner user id: {auction.lastBidUserId}</p>
        </div>
      ) : (
        ""
      )}
      {showForOwner && (
        <button
          className={auction.state !== "closed" ? btnClass : btnClosedClass}
          onClick={changeAuctionState}
        >
          {auction.state === "active" ? `00:${timeleft}` : auction.state}
        </button>
      )}
      {showBidInput && (
        <div className={wrapperClass}>
          <form onSubmit={handlePriceSubmit} className={priceFormClass}>
            <h4>Bid:</h4>
            <label>
              <input
                type="number"
                pattern="[0–9]*"
                onChange={handlePriceChange}
                min={priceValue}
                value={priceValue}
              />
            </label>
            <button className={priceSubmitbtn} type="submit" value="Submit">
              Place Bid
            </button>
          </form>
          <span className={timerClassName}>00:{timeleft}</span>
        </div>
      )}
    </div>
  );
};
