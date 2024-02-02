import React from "react";
import "./Styles/Pages.css";
import {  NavLink } from "react-router-dom";
const Pages = () => {
   
    
  return (
    <div className="page">
      <NavLink to={"/Home"} >
        <h1>Home</h1>
      </NavLink>
      <NavLink to={"/Search"} >
        <h1>Search</h1>
      </NavLink>
    </div>
  );
};

export default Pages;
