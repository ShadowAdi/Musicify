import React, { useContext, useEffect, useState } from "react";
import "./Styles/SearchCss.css";
import SongListSearch from "../Components/SongListSearch";
import Header from "../Components/Header";
import axios from "axios";
import "../Components/Styles/Expanded.css";
import { allContext } from "../context/userContext";
import Animate from "./Animate.jsx";

const Search = () => {

  const { userInfo, token, setHideHeader, setNavMotionAnim } =
    useContext(allContext);

    setHideHeader(false)

  useEffect(() => {
    setNavMotionAnim(false);
  }, []);

 
 


  const handleScroll = () => {
    var scrollPosition = document.getElementById("input").scrollTop;
  };

  useEffect(() => {
    var elem = document.getElementById("input");
    if (elem) {
      elem.addEventListener("scroll", function () {
        var scrollPosition = elem.scrollTop;
        if (scrollPosition > 20) {
          setHideHeader(true);
        } else if (scrollPosition == 0 || scrollPosition < 20) {
          setHideHeader(false);
        }
      });
    }
    return () => {
      if (elem) {
        elem.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <>
      {/* <BrowserSection /> */}
      <div id="input" className="input">
        <Header userInfo={userInfo} />
        <SongListSearch  type={"Recent Searches"} />
      </div>
    </>
  );
};

export default Animate(Search);
