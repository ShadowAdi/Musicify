import React, { useContext, useState } from "react";
import "./Styles/InfoModel.css";
import { Link, useNavigate } from "react-router-dom";
import { allContext } from "../context/userContext";
import { IoIosArrowForward } from "react-icons/io";

const InfoModel = ({
  albumDetails,
  isSavedAlbum,
  saveAlbums,
  removeSaved,
  setIsInfoModal,
  isInfoModal,
  savePlaylist,
  setSavePlaylist,
  UnfollowPlaylist,
  FollowPlaylist,
  type,
  userPlaylist,
  token,
  getUserPlaylist,
}) => {
  const navigate = useNavigate();
  const { setIsModal } = useContext(allContext);

  if (type === "Playlist") {
    const EditUserPlaylist = () => {
      setIsModal(true);
      // setIsInfoModal(!isInfoModal);
    };
    return (
      <>
        <div className="infoModel">
          {savePlaylist ? (
            <span
              onClick={() => {
                UnfollowPlaylist();
              }}
            >
              Remove from Your Library
            </span>
          ) : (
            <span
              onClick={() => {
                FollowPlaylist();
              }}
            >
              Save To Your Library
            </span>
          )}
          <span
            onClick={async () => {
              await navigator.clipboard
                .writeText(albumDetails?.external_urls?.spotify)
                .then(() => alert("Link Copied"))
                .catch((err) => alert("Theres an error", err));
            }}
          >
            Copy Real Spotify Link
          </span>
          {userPlaylist && (
            <span onClick={EditUserPlaylist}>Edit Playlist</span>
          )}
          <span onClick={() => setIsInfoModal(!isInfoModal)}>Close</span>
        </div>
      </>
    );
  }

  return (
    <div
      style={
        window.innerWidth < 520
          ? { top: "2rem", left: "11rem",gap:"0.4rem",fontSize:"8px" }
          : { top: "2rem", left: "17rem" }
      }
      className="infoModel"
    >
      {isSavedAlbum ? (
        <span
          onClick={() => {
            removeSaved();
          }}
        >
          Remove from library
        </span>
      ) : (
        <span
          onClick={() => {
            saveAlbums();
          }}
        >
          Save To Library
        </span>
      )}
      <span onClick={() => navigate(`/Artist/${albumDetails?.artists[0]?.id}`)}>
        Go To Artist
      </span>
      <span
        onClick={async () => {
          await navigator.clipboard
            .writeText(albumDetails?.external_urls?.spotify)
            .then(() => alert("Link Copied"))
            .catch((err) => alert("Theres an error", err));
        }}
      >
        Copy Real Spotify Link
      </span>
      <span onClick={() => setIsInfoModal(!isInfoModal)}>Close</span>
    </div>
  );
};

export default InfoModel;
