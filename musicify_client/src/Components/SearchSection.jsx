import React, { useContext, useEffect, useState } from "react";
import "./Styles/SearchSection.css";
import Header from "./Header";
import { Link } from "react-router-dom";
import Loading from "react-loading-components";
import { allContext } from "../context/userContext";
import SearchBar from "./SearchBar";
import { motion } from "framer-motion";
import "./Styles/SongListSearch.css";
const SearchSection = ({ artists, track, albums, playlist }) => {
  const {
    userInfo,
    isLoading,
    setGlobalTrackId,
    setSongsToPlay,
    globalTrackFunc,
    setHideHeader,
    onMouseEnterText,
    onMouseLeaveText,
  } = useContext(allContext);
  const [mouseSongEnter, setMouseSongEnter] = useState(false);

  const handleScroll = () => {
    const scrollPosition = document.getElementById("searchSection").scrollTop;
    // Handle your logic based on scroll position
  };
  const handleScroll1 = () => {
    const scrollPosition = document.getElementById("searchSection1").scrollTop;
    // Handle your logic based on scroll position
  };
  const handleScroll2 = () => {
    const scrollPosition = document.getElementById("searchSection2").scrollTop;
    // Handle your logic based on scroll position
  };
  const handleScroll3 = () => {
    const scrollPosition = document.getElementById("searchSection3").scrollTop;
    // Handle your logic based on scroll position
  };

  useEffect(() => {
    var elem = document.getElementById("searchSection");
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

  useEffect(() => {
    var elem = document.getElementById("searchSection1");
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
        elem.removeEventListener("scroll", handleScroll1);
      }
    };
  }, []);

  useEffect(() => {
    var elem = document.getElementById("searchSection2");
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
        elem.removeEventListener("scroll", handleScroll2);
      }
    };
  }, []);

  useEffect(() => {
    var elem = document.getElementById("searchSection3");
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
        elem.removeEventListener("scroll", handleScroll3);
      }
    };
  }, []);
  if (albums?.length > 0) {
    return (
      <>
        <div id="searchSection" className="searchSection">
          <Header userInfo={userInfo} />
          <SearchBar />
          {!isLoading ? (
            <div className="mainSearch">
              {albums &&
                albums?.map((album, index) => {
                  return (
                    <Link
                      key={index}
                      onMouseEnter={onMouseEnterText}
                      onMouseLeave={onMouseLeaveText}
                      to={`/Albums/${album?.id}`}
                    >
                      <motion.div
                        whileInView={{ scale: 1, opacity: 1 }}
                        initial={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="col"
                      >
                        <div className="col1Ele1">
                          <img
                            src={
                              album?.images?.length > 0
                                ? album?.images[0]?.url
                                : "https://plus.unsplash.com/premium_photo-1669048780129-051d670fa2d1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXdlc29tZXxlbnwwfHwwfHx8MA%3D%3D"
                            }
                            alt=""
                          />
                          <div className="dets">
                            <h1>
                              {album?.name?.length > 15
                                ? album?.name?.slice(0, 12) + "..."
                                : album?.name}
                            </h1>
                            <div className="releaseLabel">
                              {/* <h4>{album?.artists[0]?.name}</h4> */}
                              <h4>
                                {album?.artists[0]?.name?.length > 15
                                  ? album?.artists[0]?.name?.slice(0, 13)
                                  : album?.artists[0]?.name}
                              </h4>
                              <span>{album?.release_date?.split("-")[0]}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  );
                })}

              <div className="faltu"></div>
            </div>
          ) : (
            <aside className="loaderDiv">
              <Loading type="audio" width={100} height={100} fill="#f44242" />
            </aside>
          )}
        </div>
      </>
    );
  } else if (track?.length > 0) {
    return (
      <div id="searchSection1" className="searchSection">
        <Header userInfo={userInfo} />
        <SearchBar />
        <div className="mainSearch1">
          <div className="headings">
            <span id="SN">#</span>
            <span id="Title">Title</span>
            <span id="Album">Album</span>
            <span id="Durat">Duration</span>
          </div>
          {!isLoading ? (
            <div className="listSongs">
              {track?.map((track, index) => {
                const minutes = Math.floor(track?.duration_ms / 10000);
                const seconds = track?.duration_ms % 100;
                return (
                  <>
                    <motion.div
                      onClick={() => {
                        setGlobalTrackId(track?.id);
                        setSongsToPlay([]);
                        globalTrackFunc();
                      }}
                      initial={{ opacity: 0, transform: "translateY(10px)" }}
                      whileInView={{ opacity: 1, transform: "translateY(0)" }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      onMouseLeave={() => {
                        setMouseSongEnter(false);
                      }}
                      onMouseEnter={() => {
                        setMouseSongEnter(true);
                      }}
                      key={index}
                      className="listSongRow"
                    >
                      <div className="no">
                        <span>{index + 1}</span>
                      </div>
                      <div className="titleAns">
                        <motion.img
                          style={
                            mouseSongEnter ? { opacity: 1 } : { opacity: 0 }
                          }
                          src={
                            track?.album?.images?.length > 0
                              ? track?.album?.images[0]?.url
                              : null
                          }
                          alt=""
                        />

                        <div className="nameDesc">
                          <span id="SongName">
                            {track?.name?.length > 15
                              ? track?.name?.slice(0, 14)
                              : track?.name}
                          </span>
                          <Link to={`/Artist/${track?.artists[0]?.id}`}>
                            <span id="SongArtistName">
                              {track?.artists[0]?.name}
                            </span>
                          </Link>
                        </div>
                      </div>

                      <div className="albumName">
                        <Link to={`/Albums/${track?.album?.id}`}>
                          <span>
                            {track?.album?.name?.length > 15
                              ? track?.album?.name.slice(0, 15)
                              : track?.album?.name}
                          </span>
                        </Link>
                      </div>
                      <div className="durationAns">
                        <span>{minutes + ":" + seconds}</span>
                      </div>
                    </motion.div>
                  </>
                );
              })}
            </div>
          ) : (
            <aside className="loaderDiv">
              <Loading type="audio" width={100} height={100} fill="#f44242" />
            </aside>
          )}
        </div>
      </div>
    );
  } else if (playlist?.length > 0) {
    return (
      <div id="searchSection2" className="searchSection">
        <Header userInfo={userInfo} />
        <SearchBar />
        <div className="mainSearch3">
          {!isLoading ? (
            playlist?.map((play, index) => {
              return (
                <Link
                  key={index}
                  onMouseEnter={onMouseEnterText}
                  onMouseLeave={onMouseLeaveText}
                  to={`/Playlist/${play?.id}`}
                >
                  <motion.div
                    whileInView={{ scale: 1, opacity: 1 }}
                    initial={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="colPlaylist"
                  >
                    <div className="col1Play1">
                      <img
                        src={
                          play?.images?.length > 0
                            ? play?.images[0]?.url
                            : "https://plus.unsplash.com/premium_photo-1669048780129-051d670fa2d1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXdlc29tZXxlbnwwfHwwfHx8MA%3D%3D"
                        }
                        alt=""
                      />
                      <div className="dets">
                        <h1>
                          {play?.name?.length > 15
                            ? play?.name?.slice(0, 12) + "..."
                            : play?.name}
                        </h1>
                        <span>
                          {play?.description?.length > 20
                            ? play?.description?.slice(0, 15)
                            : play?.description}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })
          ) : (
            <aside className="loaderDiv">
              <Loading type="audio" width={100} height={100} fill="#f44242" />
            </aside>
          )}
        </div>
      </div>
    );
  } else if (artists?.length > 0) {
    return (
      <div id="searchSection3" className="searchSection">
        <Header userInfo={userInfo} />
        <SearchBar />
        <div className="mainSearch4">
          {!isLoading ? (
            artists?.map((artist, index) => {
              return (
                <Link
                  key={index}
                  onMouseEnter={onMouseEnterText}
                  onMouseLeave={onMouseLeaveText}
                  to={`/Artist/${artist?.id}`}
                >
                  <motion.div
                    whileInView={{ scale: 1, opacity: 1 }}
                    initial={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    className="colArtists"
                  >
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      src={
                        artist?.images?.length > 0
                          ? artist?.images[0]?.url
                          : "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg"
                      }
                      alt=""
                    />
                    <h1>{artist?.name}</h1>
                  </motion.div>
                </Link>
              );
            })
          ) : (
            <aside className="loaderDiv">
              <Loading type="audio" width={100} height={100} fill="#f44242" />
            </aside>
          )}
        </div>
      </div>
    );
  }
};

export default SearchSection;
