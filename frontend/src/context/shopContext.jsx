import React, { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
export const ShopContext = createContext();
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  //we will  add feature for seach bar when we click on this it will open collection page and get the searched item
  const [search, setSearch] = useState([]);
  const [showSearch, setShowSearch] = useState(false); //when true then we will display search bar and if false then we wil hide it
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    let cartData = structuredClone(cartItems); //we use this method to create a copy of object
    if (!size) {
      //if no size is selected then we wont add
      toast.error("Select size first");
      return; //we should return fron here
    }
    if (cartData[itemId]) {
      //if cartdata has any property available with this itemid
      if (cartData[itemId][size]) {
        //cheking if cartdata has any product with this id and size
        cartData[itemId][size] += 1; //so we will increase entry with 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      //if we do not have any product with this is then we will create new entry with this id
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      //first for loop will iterate to items/products
      for (const item in cartItems[items]) {
        //this loop will iterate in product size
        try {
          if (cartItems[items][item]) {
            //this if() means in cart we have product with this perticular size so we will increase the count
            totalCount += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };
  // useEffect(() => {
  //   console.log(cartItems);
  // }, [cartItems]);

  const updateQuantity = async (itemId, size, quantity) => {
    //we are adding cart item delete functionality
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const productsData = async () => {
    try {
    } catch (error) {}
  };
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount, //this function is use to show the cart items count on that cart icon in navbar
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
