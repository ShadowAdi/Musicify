import React, { useContext, useEffect, useState } from 'react'
import { allContext } from '../context/userContext';
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Tilt } from 'react-tilt';



const GenreListCard = () => {
    const { genres_30 } = useContext(allContext);

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  let colors = [];
  for (let i = 0; i < genres_30?.length; i++) {
    if (colors?.length<127) {
        colors.push(getRandomColor());
    }
  }
  let genreColorMap = {};
  genres_30?.forEach((genre, index) => {
    genreColorMap[genre] = colors[index];
  });
  const defaultOptions = {
	reverse:        false,  // reverse the tilt direction
	max:            35,     // max tilt rotation (degrees)
	perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
	scale:          1.1,    // 2 = 200%, 1.5 = 150%, etc..
	speed:          1000,   // Speed of the enter/exit transition
	transition:     true,   // Set a transition on enter/exit.
	axis:           null,   // What axis should be disabled. Can be X or Y.
	reset:          true,    // If the tilt effect has to be reset on exit.
	easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
}
  return (
    <div className="GenresList">

    {Object.entries(genreColorMap)?.map(([genre, color], i) => {

      return (
        <>
          <Link to={`/Genre/${genre}/${color}`}>
            <Tilt
            defaultOptions={defaultOptions}
           
              style={{ backgroundColor: `${color}` }}
              className="SingleGenre"
              
            >
              <span>{genre}</span>
            </Tilt>
          </Link>
        </>
      );
    })}
  </div>
  )
}

export default GenreListCard
