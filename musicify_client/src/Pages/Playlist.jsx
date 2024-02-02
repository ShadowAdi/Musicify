import React, { useContext, useEffect, useState } from "react";
import PlaylistPage from "../Components/PlaylistPage";
import { useParams } from "react-router-dom";
import { allContext } from "../context/userContext";
import  Animate  from "./Animate.jsx";

const Playlist = () => {
  const { id } = useParams();
  const {
    getSinglePlaylist,
    getSinglePlaylistTracks,
    playlistDetails,
    tracks,
    setHideHeader
  } = useContext(allContext);
  setHideHeader(false)

  useEffect(() => {
    getSinglePlaylist(id);
    getSinglePlaylistTracks(id);
  }, [id]);

  return (
    <>
      <PlaylistPage tracks={tracks} playlistDetails={playlistDetails} />
    </>
  );
};

export default Animate(Playlist);
