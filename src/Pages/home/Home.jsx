import React from "react";
import Banner from "../../components/homepage/Banner";
import Product from "./Product";
import Brand from "./Brand";

const Home = () => {
  return (
    <div className="pt-16 lg:pt-19">
      <Banner></Banner>
      <Product></Product>
      <Brand></Brand>
    </div>
  );
};

export default Home;
