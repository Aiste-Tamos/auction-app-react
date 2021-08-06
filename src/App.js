import React from "react";
import { MainContent } from "./components";
import { AuctionStateProvider } from "./AuctionStateContext";

function App() {
  return (
    <AuctionStateProvider>
      <div className="App">
        <MainContent />
      </div>
    </AuctionStateProvider>
    
  );
}

export default App;
