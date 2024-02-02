import React, { useContext, useEffect, useState } from "react";
import "./Styles/AlbumPage.css";
import { FaGooglePlay } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import Header from "./Header";
import { Link, useParams } from "react-router-dom";
import { allContext } from "../context/userContext";
import Loading from "react-loading-components";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import InfoModel from "./infoModel";
import { motion, transform } from "framer-motion";

const AlbumPage = ({ albumTracks, albumDetails }) => {
  const { id } = useParams();
  const [isSavedAlbum, setIsSavedAlbum] = useState(false);
  const [isInfoModal, setIsInfoModal] = useState(false);
  const {
    userInfo,
    setGlobalTrackId,
    globalTrackFunc,
    isLoading,
    setSongsToPlay,
    setAllSongs,
    songsToPlay,
    currentIndex,
    token,
    setHideHeader,
    onMouseEnterText,
    onMouseLeaveText,
    errorWhen,
  } = useContext(allContext);



  const storeSongs = () => {
    if (albumTracks !== null) {
      setSongsToPlay(null);
      setAllSongs(true);
      console.log(albumTracks);
      albumTracks?.items?.map((track) => {
        setSongsToPlay([track]);
      });

      if (songsToPlay?.length > 0) {
        setGlobalTrackId(songsToPlay[currentIndex]?.id);
        globalTrackFunc();
      }
      // console.log(songsToPlay[currentIndex]);
    }
  };
  const saveAlbums = () => {
    axios
      .put(
        `https://api.spotify.com/v1/me/albums?ids=${id}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res?.data);
        setIsSavedAlbum(true);
      })
      .catch((err) => {
        errorWhen(err);
      });
  };

  useEffect(() => {
    setHideHeader(false);
  }, []);

  const removeSaved = async () => {
    await axios
      .delete(`https://api.spotify.com/v1/me/albums?ids=${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res?.data);
        setIsSavedAlbum(false);
      })
      .catch((err) => {
        errorWhen(err);
      });
  };

  useEffect(() => {
    axios
      .get(`https://api.spotify.com/v1/me/albums/contains?ids=${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setIsSavedAlbum(res?.data[0]);
      })
      .catch((err) => {
        errorWhen(err);
      });
  }, [id]);
  return (
    <div id="albumPage" className="AlbumPage">
      <Header userInfo={userInfo} />
      <div className="poster">
        <img
          style={{ objectFit: "cover", cursor: "pointer" }}
          src={
            albumDetails?.images?.length > 0 && albumDetails?.images[0]?.url
              ? albumDetails?.images?.length && albumDetails?.images[0]?.url
              : "https://w7.pngwing.com/pngs/116/765/png-transparent-clapperboard-computer-icons-film-movie-poster-angle-text-logo-thumbnail.png"
          }
          alt=""
        />
        <div className="descImage">
          <motion.span
            initial={{ transform: "translateY(-15px)", opacity: 0 }}
            whileInView={{ transform: "translateY(0)", opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            {albumDetails?.type}
          </motion.span>
          <motion.h1
            initial={{ transform: "translateY(-15px)", opacity: 0 }}
            whileInView={{ transform: "translateY(0)", opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            {albumDetails?.name?.length > 12
              ? albumDetails?.name?.slice(0, 55)
              : albumDetails?.name}
          </motion.h1>
          <div className="artistNamesAutor">
            <Link
              to={`/Artist/${
                albumDetails?.artists?.length > 0 &&
                albumDetails?.artists[0]?.id
              }`}
            >
              <motion.span
                initial={{ transform: "translateY(-15px)", opacity: 0 }}
                whileInView={{ transform: "translateY(0)", opacity: 1 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
              >
                {albumDetails?.artists?.length > 0 &&
                  albumDetails?.artists[0]?.name}
              </motion.span>{" "}
              •
            </Link>
            <motion.span
              initial={{ transform: "translateY(-15px)", opacity: 0 }}
              whileInView={{ transform: "translateY(0)", opacity: 1 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
            >
              {albumDetails?.total_tracks} tracks
            </motion.span>
          </div>

          <motion.h4
            initial={{ transform: "translateY(-15px)", opacity: 0 }}
            whileInView={{ transform: "translateY(0)", opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            {albumDetails?.label}
          </motion.h4>
        </div>
      </div>
      <div className="songLists">
        {!isLoading ? (
          <>
            <div className="plays">
              <FaGooglePlay
                onClick={() => {
                  storeSongs();
                }}
                size={50}
                id="playIcon"
              />
              {isSavedAlbum ? (
                <FaHeart
                  onClick={removeSaved}
                  style={{ cursor: "pointer" }}
                  size={42}
                  color="red"
                />
              ) : (
                <FaHeart
                  style={{ cursor: "pointer" }}
                  size={42}
                  color="white"
                  onClick={saveAlbums}
                />
              )}
              <BsThreeDotsVertical
                style={{ cursor: "pointer" }}
                color="white"
                onClick={() => setIsInfoModal(!isInfoModal)}
                size={40}
              />
              {isInfoModal && (
                <InfoModel
                  albumDetails={albumDetails}
                  saveAlbums={saveAlbums}
                  removeSaved={removeSaved}
                  isSavedAlbum={isSavedAlbum}
                  setIsSavedAlbum={setIsSavedAlbum}
                  isInfoModal={isInfoModal}
                  setIsInfoModal={setIsInfoModal}
                />
              )}
            </div>
            <div className="tracks">
              <div className="headings">
                <div className="nos">#</div>
                <div className="names">Title</div>
                <div className="times">
                  <FaClock />
                </div>
              </div>

              {albumTracks?.items?.map((track, index) => {
                var seconds = Math.round(
                  Math.floor(track?.duration_ms / 1000).toFixed(0),
                  2
                );
                seconds = Math.round(seconds * 100) / 100;
                var minutes = Math.floor(seconds / 60);
                return (
                  <div
                    onMouseEnter={onMouseEnterText}
                    onMouseLeave={onMouseLeaveText}
                    onClick={() => {
                      setGlobalTrackId(track?.id);
                      globalTrackFunc();
                    }}
                    key={index}
                    className="songNames"
                  >
                    <div className="songCount">{index + 1}</div>
                    <div className="songName">
                      <div className="artist_Song">
                        <h4 style={{ fontSize: "20px", color: "white" }}>
                          {track?.name}
                        </h4>
                        <div className="artistName">
                          {" "}
                          {track?.artists?.map((artist, index) => {
                            return (
                              <Link key={index} to={`/artist/${artist?.id}`}>
                                <span
                                  style={{
                                    fontSize: "16px",
                                    color: "#dadada",
                                    fontWeight: 400,
                                  }}
                                >
                                  {artist?.name},{" "}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>

                      <div className="hidden">
                        <FaRegHeart id="HideenHeart" />
                      </div>
                    </div>
                    <div className="songDuration">
                      {minutes + ":" + seconds}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <aside className="loaderDiv">
            <Loading type="audio" width={100} height={100} fill="#f44242" />
          </aside>
        )}
      </div>
    </div>
  );
};

export default AlbumPage;
