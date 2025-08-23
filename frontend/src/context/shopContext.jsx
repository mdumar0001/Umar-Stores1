import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
// import { products } from "../assets/assets";
export const ShopContext = createContext();
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  // localStorage.removeItem("token");

  // console.log(import.meta.env.VITE_BACKEND_URL);
  //we will  add feature for seach bar when we click on this it will open collection page and get the searched item
  const [search, setSearch] = useState([]);
  const [showSearch, setShowSearch] = useState(false); //when true then we will display search bar and if false then we wil hide it
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  localStorage.removeItem("token");
  // setToken("");

  const addToCart = async (itemId, size) => {
    if (!token) {
      return toast.warn("Login to Add to Cart");
    }
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
    //now in database we are updating the cartdata to
    console.log("yaha tak chal rha sahi");
    if (token) {
      try {
        console.log("token hai already");
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
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

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {}
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    if (products.length) {
      //kyunki asynchrounsouly products pahle set ho jayega tabhi ye karo nhi to wahi refresh me problem hogi ,carttotal.jsx me
      for (const items in cartItems) {
        // console.log(backendUrl);
        let itemInfo = products.find((product) => product._id === items);
        for (const item in cartItems[items]) {
          try {
            if (cartItems[items][item] > 0) {
              totalAmount += itemInfo.price * cartItems[items][item];
            }
          } catch (error) {
            console.log(error);
            toast.error(error.message);
          }
        }
      }
    }
    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
        // console.log(products);
        // console.log(response.data.products);
        // console.log(products);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      ); //{} becoz we don not have to send anything
      if (response.data.success) {
        setCartItems(response.data.cartData);
      } else toast.error(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getProductsData(); //so that it get called and set the product if we reload or refresh the page as we set []
  }, []);

  // useEffect(() => {
  //   console.log("Products updated:", products);
  // }, [products]);

  useEffect(() => {
    //so that it get called and set the product if we reload or refresh the page
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  });
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
    setCartItems,
    getCartCount, //this function is use to show the cart items count on that cart icon in navbar
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
