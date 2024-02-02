import React, { useContext, useEffect, useState } from "react";
import "./Styles/PlaylistPage.css";
import { FaGooglePlay, FaHeart } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import Header from "./Header";
import axios from "axios";
import Loading from "react-loading-components";
import { Link, useParams } from "react-router-dom";
import { allContext } from "../context/userContext";
import { BsThreeDotsVertical } from "react-icons/bs";
import InfoModel from "./infoModel";
import CreateModal from "./CreateModal";
import { IoIosMusicalNotes } from "react-icons/io";
import { motion } from "framer-motion";

const PlaylistPage = ({ playlistDetails, tracks }) => {
  const { id } = useParams();
  const [getUserPlaylist, setGetUserPlaylist] = useState([]);
  const [isUserPlaylist, setIsUserPlaylist] = useState(false);
  const [isInfoModal, setIsInfoModal] = useState(false);
  const [mouseEnter, setMouseEnter] = useState(false);
  const [songListsEnter, setSongListsEnter] = useState(false);
  const [isPlaylistFollowed, setIsPlaylistFollowed] = useState(false);

  const {
    userInfo,
    setGlobalTrackId,
    globalTrackFunc,
    setSongsToPlay,
    setAllSongs,
    currentIndex,
    songsToPlay,
    token,
    isLoading,
    isModal,
    setHideHeader,
    onMouseEnterText,
    onMouseLeaveText,
    errorWhen,
  } = useContext(allContext);
  const checkFollowPlaylist = () => {
    axios
      .get(
        `https://api.spotify.com/v1/playlists/${id}/followers/contains?ids=${userInfo?.id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        if (res?.data[0] === true) {
          setIsPlaylistFollowed(true);
        } else {
          setIsPlaylistFollowed(false);
        }
      })
      .catch((err) => {
        errorWhen(err);
      });
  };

  const UnfollowPlaylist = () => {
    axios
      .delete(`https://api.spotify.com/v1/playlists/${id}/followers`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log("Unfollowed Playlist" + res?.data);
        setIsPlaylistFollowed(false);
      })
      .catch((err) => errorWhen(err));
  };
  const FollowPlaylist = async () => {
    await axios
      .put(
        `https://api.spotify.com/v1/playlists/${id}/followers`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setIsPlaylistFollowed(true);
      })
      .catch((err) => errorWhen(err));
  };
  const storeSongs = () => {
    if (tracks) {
      setSongsToPlay([]);
      setAllSongs(true);
      setSongsToPlay(tracks?.items?.map((track) => track?.track));

      if (songsToPlay.length > 0) {
        setGlobalTrackId(songsToPlay[currentIndex]?.id);
        globalTrackFunc();
      }
      // console.log(songsToPlay[currentIndex]);
    }
  };
  const checkUserPlaylist = () => {
    axios
      .get(`https://api.spotify.com/v1/me/playlists`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => setGetUserPlaylist(res?.data?.items))
      .catch((err) => errorWhen(err));
  };

  useEffect(() => {
    checkFollowPlaylist();
  }, [isPlaylistFollowed, id]);
  const checkIsUser = () => {
    getUserPlaylist?.map((item) => {
      item?.id === id && setIsUserPlaylist(true);
    });
  };
  useEffect(() => {
    checkUserPlaylist();
    checkIsUser();
  }, [token, id]);

  useEffect(() => {
    var elem = document.getElementById("PlaylistPage");
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
    const scrollPosition = document.getElementById("PlaylistPage").scrollTop;
    // Handle your logic based on scroll position
  };

  return (
    <>
      {isModal && <CreateModal id={id} />}

      <div id="PlaylistPage" className="PlaylistPage">
        <Header userInfo={userInfo} />
        <div className="poster">
          <div className="imgContainer">
            {!mouseEnter ? (
              <img
                src={
                  playlistDetails?.images?.length > 0
                    ? playlistDetails?.images[0]?.url
                    : "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"
                }
                alt=""
              />
            ) : (
              <>
                <div className="chaneImage">
                  <IoIosMusicalNotes size={102} />
                  <span>Change Cover </span>
                </div>
              </>
            )}
          </div>
          <div className="descImage">
            <span>{playlistDetails?.type}</span>
            <h1>{playlistDetails?.name}</h1>
            <div className="artistNamesAutor">
              <span>{playlistDetails?.owner?.display_name}</span>
            </div>

            <span>
              {playlistDetails?.description?.length > 150
                ? playlistDetails?.description.slice(0, 151) + "..."
                : playlistDetails?.description}
            </span>
          </div>
        </div>
        <div className="songLists">
          {!isLoading ? (
            <>
              <div className="plays">
                <div className="lovers">
                  <FaGooglePlay
                    onClick={() => {
                      storeSongs();
                    }}
                    size={50}
                    id="playIcon"
                  />
                  <span>{playlistDetails?.followers?.total}</span>
                  {isPlaylistFollowed ? (
                    <FaHeart
                      onClick={UnfollowPlaylist}
                      size={35}
                      color="red"
                      id="heartIcon"
                    />
                  ) : (
                    <FaHeart
                      onClick={() => FollowPlaylist()}
                      size={35}
                      id="heartIcon"
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
                      albumDetails={playlistDetails}
                      isInfoModal={isInfoModal}
                      setIsInfoModal={setIsInfoModal}
                      userPlaylist={isUserPlaylist}
                      savePlaylist={isPlaylistFollowed}
                      setSavePlaylist={setIsPlaylistFollowed}
                      UnfollowPlaylist={UnfollowPlaylist}
                      getUserPlaylist={getUserPlaylist}
                      FollowPlaylist={FollowPlaylist}
                      type="Playlist"
                      token={token}
                    />
                  )}
                </div>
                <div className="follow">
                  {isPlaylistFollowed ? (
                    <motion.button
                      whileHover={{
                        opacity: 0.7,
                        transition: { duration: 0.3, ease: "easeInOut" },
                      }}
                      onClick={UnfollowPlaylist}
                    >
                      UnFollow
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{
                        opacity: 0.7,
                        transition: { duration: 0.3, ease: "easeInOut" },
                      }}
                      onClick={() => FollowPlaylist()}
                    >
                      Follow
                    </motion.button>
                  )}
                </div>
              </div>
              <div className="tracks">
                <div className="headings">
                  <div className="nos">#</div>
                  <div className="names">Title</div>
                  <div className="times">
                    <FaClock />
                  </div>
                </div>
                {tracks?.items?.map((track, index) => {
                  var seconds = Math.round(
                    Math.floor(track?.track?.duration_ms / 1000).toFixed(0),
                    2
                  );
                  seconds = Math.round(seconds * 100) / 100;
                  var minutes = Math.floor(seconds / 60);
                  return (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      onMouseEnter={() => {
                        setSongListsEnter(true);
                        onMouseEnterText();
                      }}
                      onMouseLeave={() => {
                        setSongListsEnter(false);
                        onMouseLeaveText();
                      }}
                      onClick={() => {
                        setAllSongs(false)
                        setSongsToPlay([]);
                        setGlobalTrackId(track?.track?.id);
                        globalTrackFunc();
                      }}
                      key={index}
                      className="songNames"
                    >
                      <div className="songCount">{index + 1}</div>
                      <div className="songName">
                        <div className="showing">
                          {track?.track?.album?.images?.length > 0 ? (
                            <img
                              src={track?.track?.album?.images[0]?.url}
                              alt=""
                            />
                          ) : null}
                          <div className="artist_Song">
                            <h4>{track?.track?.name}</h4>
                            <div className="artistName">
                              {" "}
                              {track?.track?.artists?.map((artist, index) => {
                                return (
                                  <Link
                                    key={index}
                                    to={`/artist/${artist?.id}`}
                                  >
                                    <span>{artist?.name}, </span>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                        <div className="hidden">
                          <FaHeart
                            opacity={songListsEnter ? 1 : 0}
                            style={{
                              cursor: "pointer",
                              fontSize: "18px",
                              transition: "all",
                              transitionDuration: "600ms",
                            }}
                            id="HideenHeart"
                          />
                        </div>
                      </div>
                      <div className="songDuration">
                        <span>{minutes + ":" + seconds}</span>
                      </div>
                    </motion.div>
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
    </>
  );
};

export default PlaylistPage;
