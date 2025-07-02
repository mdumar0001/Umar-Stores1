import React, { createContext, useState } from "react";
import { products } from "../assets/assets";
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  //we will  add feature for seach bar when we click on this it will open collection page and get the searched item
  const [search, setSearch] = useState([]);
  const [showSearch, setShowSearch] = useState(false); //when true then we will display search bar and if false then we wil hide it
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
