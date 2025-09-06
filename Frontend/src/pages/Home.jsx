import React from "react";
import MainBanner from "../Components/MainBanner";
import Categories from "../Components/Categories";
import BestSeller from "../Components/BestSeller";
import ButtomBanner from "../Components/ButtomBanner";
import Testimonials from "../Components/Testimonials";
import NewsLetter from "../Components/NewsLetter";
import Hero from "../Components/Hero";
import Hero1 from "../Components/Hero1";
import NewArrivels from "../Components/NewArrivels";
import Blogs from "../Components/Blogs";
import FollowUs from "../Components/FollowUs";

const Home = () => {
  return (
    <div className="mt-10">
     <Hero/>
     <Hero1/>
      <Categories />
      <BestSeller />
     <NewArrivels/>
      <Blogs/>
      <FollowUs/>
    </div>
  );
};

export default Home;
