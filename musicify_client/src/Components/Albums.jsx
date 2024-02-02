import React, { useContext, useState } from "react";
import "./Styles/Albums.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { allContext } from "../context/userContext";
import { motion } from "framer-motion";

const Albums = ({ artists, userAlbums, userPlayList }) => {
  const [isArtists, setIsArtists] = useState(false);
  const { userInfo, token } = useContext(allContext);
  const addPlaylist = () => {
    axios
      .post(
        `https://api.spotify.com/v1/users/${userInfo?.id}/playlists`,
        {
          name: "New Playlist",
          description: "",
          public: false,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res?.data);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="library">
      <div className="header1">
        <h1>Your Library</h1>
        <span onClick={() => setIsArtists(!isArtists)}>&#10148;</span>
      </div>
      {isArtists ? (
        <>
          <div className={"Artists"}>
            <div className="row1">
              {artists?.map((artist, index) => {
                return (
                  <Link key={index} to={`/Artist/${artist?.id}`}>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 2 }}
                      whileHover={{ scale: 1.04 }}
                      className="single1"
                    >
                      <img
                        src={
                          artist?.images?.length > 0 &&
                          artist?.images[0]?.url === ""
                            ? "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"
                            : artist?.images[0]?.url
                        }
                        alt=""
                      />
                      <span>{artist?.name}</span>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            whileHover={{ scale: 1.04 }}
            className="Albums"
          >
            {userAlbums?.length > 0 ? (
              <>
                {userAlbums?.map((userA, index) => {
                  return (
                    <Link key={index} to={`/Albums/${userA?.album?.id}`}>
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 3 }}
                        whileHover={{ scale: 1.04 }}
                        className="counts"
                      >
                        <img
                          src={
                            userA?.album?.images?.length > 0
                              ? userA?.album?.images[0]?.url
                              : "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-260nw-1037719192.jpg"
                          }
                          alt=""
                        />
                        <div className="det">
                          <h4>
                            {userA?.album?.name?.length > 15
                              ? userA?.album?.name?.slice(0, 15)
                              : userA?.album?.name}
                          </h4>
                          <span>
                            {userA?.album?.label?.length > 15
                              ? userA?.album?.label?.slice(0, 15)
                              : userA?.album?.label}
                          </span>
                        </div>
                      </motion.div>
                    </Link>
                  );
                })}
              </>
            ) : (
              <h1 style={{ color: "white" }}>You Don't Have Any Library Yet</h1>
            )}
          </motion.div>
          <div style={{ borderBottom: "1px solid white" }} className="row">
            <motion.h1
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 3 }}
              whileHover={{ scale: 1.04 }}
            >
              Playlists
            </motion.h1>
            {userPlayList?.map((playlist, index) => {
              return (
                <Link key={index} to={`/Playlist/${playlist?.id}`}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 3 }}
                    whileHover={{ scale: 1.04 }}
                    className="single"
                  >
                    <img
                      src={
                        playlist?.images?.length > 0 && playlist?.images[0]?.url
                      }
                      alt=""
                    />
                    <span>
                      {playlist?.name?.length > 20
                        ? playlist?.name?.slice(0, 19)
                        : playlist?.name}
                    </span>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          <button
          id="create"
            style={{
              width: "100%",
              padding: "0.4rem",
              borderRadius: "3px",
              border: "0px",
              outline: "0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.4rem",
              backgroundColor: "#5d5d5d",
              color: "white",
            }}
          >
            <span
              onClick={() => addPlaylist()}
              style={{ cursor: "pointer", fontWeight: 500 }}
            >
              Create a Playlist
            </span>
          </button>
        </>
      )}
    </div>
  );
};

export default Albums;
