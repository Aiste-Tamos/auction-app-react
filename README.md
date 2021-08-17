An auction app where app user can place an item for sale, price of the item will always start at 0 and when the auction starts a timer starts countdown from 1 minute.
Bidding user can place a bid on the item by entering a price that exceeds the last bid and this will increase timer with 10 seconds.
When the timer reaches 0 and no bids have been placed in the last 10 seconds the auction will close and a winner will be announced.

- Users are hardcoded to show functionality of switching between them and test the app;
- User can create an auction, start it and keep track of it;

- Auction can be started, end time is calculated by the time now plus 60 seconds and seconds can be increased by 10 if the bid was placed;
- If auction is started, it is placed on the active auctions list on the sidebar and other user can see the auction with the input for bid placement.
- If the bid is placed, auction shows last bid, increase timer by 10 seconds and shows auction on the "auctions user have bid in" list;
- If auction ends and last bid was placed, auction is closed and shows winning bid and winning user;
- If auction ends and no bid was placed, auction is closed;

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

