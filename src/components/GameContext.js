import React, { useState } from "react";
import { items } from "../data";
import useInterval from "../hooks/use-interval.hook";
export const GameContext = React.createContext(null);

const GameProvider = ({ children }) => {
  const [numCookies, setNumCookies] = useState(1000);
  const [purchasedItems, setPurchasedItems] = useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
  });

  const calculateCookiesPerSecond = (purchasedItems) => {
    return Object.keys(purchasedItems).reduce((acc, itemId) => {
      const numOwned = purchasedItems[itemId];
      const item = items.find((item) => item.id === itemId);
      const value = item.value;

      return acc + value * numOwned;
    }, 0);
  };

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerSecond(purchasedItems);
    window.localStorage.setItem("num-cookies", numCookies);
    setNumCookies(numCookies + numOfGeneratedCookies);
  }, 1000);

  return (
    <GameContext.Provider
      value={{
        numCookies,
        setNumCookies,
        purchasedItems,
        setPurchasedItems,
        calculateCookiesPerSecond,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
