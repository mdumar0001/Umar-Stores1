import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/shopContext";
import { assets } from "../assets/assets";
import { useLocation, useSearchParams } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const [visible, setVisible] = useState(false);

  //we will add logic so that i search bar is visible only for collection page
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
    // console.log(location.pathname);
  }, [location]);
  return visible && showSearch ? (
    <div className="border-t border-b bg-gray-50 text-center">
      {/* inline-flex matlab div ko inline bhi bana rhe aur uske andar ke items flex kar rhe kyunki upar wale div pe text-center laga rkha hai to div  hai to usko center nhi kar payega isliye inline banaya  */}
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-inherit outline-none text-sm"
          type="text"
          placeholder="Search"
        />

        <img className="w-4" src={assets.search_icon} alt="" />
      </div>

      <img
        onClick={() => setShowSearch(false)}
        className="inline w-3 cursor-pointer"
        src={assets.cross_icon}
        alt=""
      />
      {/* img tag ko bhi nhi center kar payega text center(main div wala) isliye inline banaya */}
    </div>
  ) : null; //if showsearch bar is tue then we will show oherwise not
};

export default SearchBar;
