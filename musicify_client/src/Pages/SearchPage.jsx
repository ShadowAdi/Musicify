import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Styles/Home.css";
import SearchSection from "../Components/SearchSection";
import { allContext } from "../context/userContext";
import Animate from "./Animate";

const SearchPage = () => {
  const [artists, setArtists] = useState([]);
  const [track, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [playlist, setPlaylsit] = useState([]);
  const {token,setHideHeader,errorWhen}=useContext(allContext)

  const { query, type } = useParams();
  setHideHeader(false)
  const takeQuery = (type) => {
    let b = type.split("=")[1];
    return { b };
  };
  const { b } = takeQuery(type);
  const searchArtist = () => {
    axios
      .get(`https://api.spotify.com/v1/search?q=${query}&type=${b}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        switch (b) {
          case "track":
            setTracks(res?.data?.tracks?.items);
            break;
          case "album":
            setAlbums(res?.data?.albums?.items);
            break;
          case "artist":
            setArtists(res?.data?.artists?.items);
            break;
          case "playlist":
            setPlaylsit(res?.data?.playlists?.items);
            break;

          default:
            break;
        }
        // setArtists(res?.data?.artists);
      })
      .catch((err) => errorWhen(err));
  };

  useEffect(() => {
    searchArtist();
  }, [query,token,type,b]);

  return (
    <>
      <SearchSection
        artists={artists}
        track={track}
        albums={albums}
        playlist={playlist}
      />
    </>
  );
};

export default Animate(SearchPage);
