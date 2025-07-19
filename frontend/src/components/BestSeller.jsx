import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/shopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";
const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  useEffect(() => {
    const productsArray = products.filter((item) => item.bestseller == true);

    setBestSellerProducts(productsArray.slice(0, 5));
  }, [products]);

  return (
    <div className="my-10s">
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={" SELLERS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda
        </p>
        {/* we will show those data which has bestseller property is true */}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {" "}
        {bestSellerProducts &&
          bestSellerProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
      </div>
    </div>
  );
};

export default BestSeller;
