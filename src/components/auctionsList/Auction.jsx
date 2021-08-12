import classNames from "classnames";
import React, { useState, useContext, useEffect, useRef } from "react";
import { AuctionStateContext } from "../../AuctionStateContext";

import "./auction.scss";

export const Auction = ({
  auction,
  showBidInput,
  showForOwner,
  setShowBidInput,
}) => {
  const [globalState, setGlobalState] = useContext(AuctionStateContext);
  const [showWinningBid, setShowWinningBid] = useState(false);
  const [priceValue, setPriceValue] = useState(0);
  const [bidPrice, setBidPrice] = useState(false);

  const mainClassName = "auction";
  const titleClass = `${mainClassName}__title`;
  const descriptionClass = `${mainClassName}__description`;
  const btnClass = `${mainClassName}__btn`;
  const btnClosedClass = classNames(btnClass, `${btnClass}--closed`);
  const wrapperClass = `${mainClassName}__wrapper`;
  const priceFormClass = `${mainClassName}__price-form`;
  const priceSubmitbtn = `${mainClassName}__price-submit-btn`;
  const timerClassName = `${mainClassName}__timer`;
  const infoClass = `${mainClassName}__info`;

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

  const checkUser = () => {
    if (currentUser) {
      auction = currentOwnedAuction;
    }
    if (otherUser) {
      auction = currentUser;
    }
  };

  const prevPriceRef = useRef();

  useEffect(() => {
    prevPriceRef.current = priceValue;
  });

  const prevPrice = prevPriceRef.current;

  const handleTimer = (auct, seconds) => {
    var timeleft = seconds;
    var downloadTimer = setInterval(() => {
      timeleft--;
      auct.timer = `00:${timeleft.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
      })}`;
      auct.state = "active";

      if (timeleft <= 0) {
        auct.state = "closed";
        setShowBidInput(false);
        clearInterval(downloadTimer);
        setShowWinningBid(true);
        setGlobalState({ ...globalState });
      }

      if (bidPrice) {
        clearInterval(downloadTimer);
      }
    }, 1000);
  };

  const changeAuctionState = () => {
    if (currentOwnedAuction.state === "start") {
      currentOwnedAuction.state = "active";
      handleTimer(currentOwnedAuction, 60);
      setGlobalState({ ...globalState });
    }
  };

  const handlePriceSubmit = (e) => {
    e.preventDefault();
    if (priceValue > 0) {
      currentAuction.price = priceValue;
      currentAuction.lastBidUserId = currentUser.id;
      addSeconds();
      setGlobalState({ ...globalState });
    }

    if (priceValue === prevPrice) {
      e.preventDefault();
    }
  };

  const addSeconds = () => {
    let time = currentAuction.timer;
    let timeToAdd = 10;
    let timeArr = time.split(":");
    const newTime = timeArr[1] > 50 ? 60 : +timeArr[1] + timeToAdd;
    handleTimer(currentAuction, newTime);
    setBidPrice(true);
  };

  const handlePriceChange = (e) => {
    setPriceValue(e.target.value);
  };

  return (
    <div id={auction.name} name="auction" className="auction">
      <h3 className={titleClass}>{auction.name}</h3>
      <span className={descriptionClass}>{auction.description}</span>
      {auction.state === "active" && auction.price > 0 && (
        <span className={infoClass}>Last bid: {auction.price} &euro;</span>
      )}
      {showForOwner && (
        <button
          className={auction.state !== "closed" ? btnClass : btnClosedClass}
          onClick={changeAuctionState}
        >
          {auction.state === "active" ? auction.timer : auction.state}
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
              />
            </label>
            <button className={priceSubmitbtn} type="submit" value="Submit">
              Place Bid
            </button>
          </form>
          <span className={timerClassName}>{auction.timer}</span>
        </div>
      )}
      {showWinningBid && checkUser ? (
        <div>
          <h4>Winning bid: {auction.price}&euro;</h4>
          <p>User id: {auction.lastBidUserId}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
