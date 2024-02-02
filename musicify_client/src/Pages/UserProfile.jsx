import React, { useContext, useState } from "react";
import "./Styles/Home.css";
import Profile from "../Components/Profile";
import  Animate  from "./Animate.jsx";
import { allContext } from "../context/userContext.jsx";
const UserProfile = () => {
  const {setHideHeader}=useContext(allContext)
  setHideHeader(false)

  return (
    <>
      <Profile />
    </>
  );
};

export default Animate(UserProfile);
