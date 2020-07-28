import React, { useState, useEffect } from "react";
import { items } from "../data";
import useInterval from "../hooks/use-interval.hook";
export const GameContext = React.createContext(null);

const GameProvider = ({ children }) => {
  const [numCookies, setNumCookies] = useState(null);
  const [purchasedItems, setPurchasedItems] = useState({
    cursor: parseInt(window.localStorage.getItem("cursor")) || 0,
    grandma: parseInt(window.localStorage.getItem("grandma")) || 0,
    farm: parseInt(window.localStorage.getItem("farm")) || 0,
  });

  const calculateCookiesPerSecond = (purchasedItems) => {
    return Object.keys(purchasedItems).reduce((acc, itemId) => {
      const numOwned = purchasedItems[itemId];
      const item = items.find((item) => item.id === itemId);
      const value = item.value;

      return value * numOwned + acc;
    }, 0);
  };

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerSecond(purchasedItems);
    window.localStorage.setItem("num-cookies", numCookies);
    setNumCookies(numCookies + numOfGeneratedCookies);
    window.localStorage.setItem("closing-time", new Date().getTime());
  }, 1000);

  useEffect(() => {
    window.localStorage.setItem("cursor", purchasedItems.cursor);
    window.localStorage.setItem("grandma", purchasedItems.grandma);
    window.localStorage.setItem("farm", purchasedItems.farm);
  }, [purchasedItems]);

  useEffect(() => {
    const previousClosingTime = parseInt(
      window.localStorage.getItem("closing-time")
    );
    const openingTime = new Date().getTime();
    const timeDiff = openingTime - previousClosingTime;
    const numOfGeneratedCookies =
      calculateCookiesPerSecond(purchasedItems) * timeDiff;
    setNumCookies(
      parseInt(window.localStorage.getItem("num-cookies")) +
        numOfGeneratedCookies
    );
  }, []);

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
