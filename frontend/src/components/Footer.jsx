import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col  sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt40 text-sm">
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
            odio sit debitis porro, cupiditate inventore, facilis ipsum
            sapiente, accusantium harum vitae aut voluptas accusamus nesciunt!
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-700">
            <li>Home</li>
            <li>About</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl mb-5 font-medium">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-400">
            <li>+1-212-456-789</li>
            <li>contact@forever.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="text-center text-sm py-5">
          {" "}
          Copyright 2025@umarCompany.com - All right Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
