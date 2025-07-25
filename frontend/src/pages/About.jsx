import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";
const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={" US"} />{" "}
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-6000">
          <p>
            Forever was born out of a passion for innovation and desire to
            revolutionize the way people shop online.Our journey began with a
            simple idea : to provide a platform where customers can easily
            discover,explore,ad purchase a wide range of products from the
            comfort of thier homes.
          </p>
          <p>
            Since our inception we've worked tirelessly for to curate a diverse
            selection of high-quality products that cater to every taste and
            preference.From fashion and beauty to electronics and home
            essentials,we offer an extensive collection sourced from trusted
            bonds and suppliers.
          </p>
          <b>Our Mission</b>
          <p>
            Our mission at Forever is to empower customers with
            choice,convenience,and confident.We're dedicated to providing a
            seamless shopping experience that exceeds expectations,from browsing
            and ordering to delivery.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={" CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p>
            We meticulously select and vet each product to ensure it meets our
            stringent quality standards.
          </p>
        </div>{" "}
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional customer Service:</b>
          <p>
            Our team of dedicated professionals is here to assist you the
            way,ensuring your satisfaction is our top priority.
          </p>
        </div>{" "}
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p>
            With our user-friendly interface abd hassle-free ordering
            process,shopping has never been easier.
          </p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default About;
