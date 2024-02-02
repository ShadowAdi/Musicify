import React, { useContext, useEffect, useState } from "react";
import "./Styles/Home.css";

import axios from "axios";
import { useParams } from "react-router-dom";
import GenrePageShow from "../Components/GenrePageShow";
import Animate from "./Animate.jsx";
import { allContext } from "../context/userContext.jsx";

const GenrePage = () => {
  const [GenreItem, setGenreItem] = useState({});
  const { token, setHideHeader, errorWhen } = useContext(allContext);
  setHideHeader(false);

  const { name } = useParams();

  const getGenre = () => {
    axios
      .get(`https://api.spotify.com/v1/recommendations?seed_genres=${name}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setGenreItem(res?.data?.tracks);
        // setUserInfo(res?.data?.categories?.items)
      })
      .catch((err) => errorWhen(err));
  };
  useEffect(() => {
    getGenre();
  }, [name]);

  return (
    <>
      <GenrePageShow name={name} tracks={GenreItem} />
    </>
  );
};

export default Animate(GenrePage);
