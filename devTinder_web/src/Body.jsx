import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";


const Body = () => {
  return (
    <div>
      <NavBar />
      <main className="pt-16">
    <Outlet />
  </main>
      <Footer/>
    </div>
  );
};

export default Body;
