import React, { useContext, useEffect } from "react";
import "./Styles/GenrePage.css";
import Header from "./Header";
import { motion } from "framer-motion";

import SongListsGenre from "./SongListsGenre";
import { allContext } from "../context/userContext";

const GenrePageShow = ({ name, tracks }) => {
  const { userInfo, setHideHeader,onMouseEnter,onMouseLeave } = useContext(allContext);
 

  useEffect(() => {
    var elem = document.getElementById("GenrePage");
    if (elem) {
      elem.addEventListener("scroll", function () {
        var scrollPosition = elem.scrollTop;
        if (scrollPosition > 40) {
          setHideHeader(true);
        } else if (scrollPosition == 0 || scrollPosition < 40) {
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

  const handleScroll = () => {
    const scrollPosition = document.getElementById("GenrePage").scrollTop;
    // Handle your logic based on scroll position
  };

  return (
    <div id="GenrePage" className="GenrePage">
      <Header userInfo={userInfo} />
      <div className="poster">
        <div className="descImage">
          <motion.h1
             onMouseEnter={() => {
              onMouseEnter();
            }}
            onMouseLeave={onMouseLeave}
            whileHover={{
              textDecoration: "underline",
              textDecorationThickness: "5px",
              textUnderlineOffset:"10px",
              transition: { duration: 1,ease:"easeInOut" },
             
            }}
          >
            {name}
          </motion.h1>
        </div>
      </div>
      <div className="main_Bidy_Genre">
        <SongListsGenre name={name} tracks={tracks} />
      </div>
    </div>
  );
};

export default GenrePageShow;
