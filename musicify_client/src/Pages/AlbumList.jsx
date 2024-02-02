import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AlbumPage from "../Components/AlbumPage";
import { allContext } from "../context/userContext";
import Animate from "./Animate";

const AlbumList = () => {
  const { id } = useParams();
  const {
    getSingleAlbum,
    getSingleAlbumTracks,
    token,
    albumDetails,
    albumTracks,
    setHideHeader
  } = useContext(allContext);

  setHideHeader(false)

  useEffect(() => {
    getSingleAlbum(id);
    getSingleAlbumTracks(id);
  }, [id, token]);
  

  

  return (
    <>
      <AlbumPage albumTracks={albumTracks} albumDetails={albumDetails}  />
    </>
  );
};

export default Animate(AlbumList);
