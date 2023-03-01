import React, { createContext, useContext, useState } from "react";
const favContext = createContext();
const shoppingContext = createContext();

export function useFavorite() {
  return useContext(favContext);
}
export function useShopp() {
  return useContext(shoppingContext);
}

export function FivProvider({ children }) {
  const [Favorites, setFavorites] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);

  return (
    <favContext.Provider value={{ Favorites, setFavorites }}>
      <shoppingContext.Provider value={{ shoppingList, setShoppingList }}>
        {children}
      </shoppingContext.Provider>
    </favContext.Provider>
  );
}
