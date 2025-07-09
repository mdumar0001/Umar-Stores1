import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/shopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice(); // wil crreate a copy of this array
      productsCopy = productsCopy.filter((item) => category === item.category);
      productsCopy = productsCopy.filter(
        (item) => subCategory === item.subCategory
      );

      //   console.log(productsCopy.slice(0, 5));
      setRelated(productsCopy.slice(0, 5));
    }
  }, [products]); //dependency array khali [] hone pe har bar jab bhi mount hoga component tab hi useEffect run hoga re-render pe nhi
  //yaha [category, subCategory], [producs],[] teeno se same funtonality aa rhi hai
  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={"RELATED"} text2={" PRODUCTS"} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y6">
        {related.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};
//now we will add the functionality on add to cart button so that when we click ,then the productdata will be
//added in context file in one variable //and we can also send it to database and save and fetch that in context in a state after fetcing it
//from database for a perticular autheticated user and can use it anywere

export default RelatedProducts;
