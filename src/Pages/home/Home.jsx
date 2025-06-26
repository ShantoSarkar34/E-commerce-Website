import React from "react";
import Banner from "../../components/homepage/Banner";
import Product from "./Product";

const Home = () => {
  return (
    <div className="pt-16 lg:pt-19">
      <Banner></Banner>
      <Product></Product>
    </div>
  );
};

export default Home;
