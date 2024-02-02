import React, { useContext } from "react";
import "./Styles/BrowserSection.css";
import Pages from "./Pages";
import Albums from "./Albums";
import { allContext } from "../context/userContext";
const BrowserSection = () => {
  const { getArtists, getUserAlbumsSaved, getUserPlaylist, code } =
    useContext(allContext);



  return (
    <div className="bS">
      <Pages />
      <Albums
        artists={getArtists}
        userAlbums={getUserAlbumsSaved}
        userPlayList={getUserPlaylist}
      />
    </div>
  );
};

export default BrowserSection;
