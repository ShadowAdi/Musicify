import "./Styles/MainArtist.css";
import Header from "./Header";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { allContext } from "../context/userContext";
import "swiper/css";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Loading from "react-loading-components";
import { Autoplay, Pagination } from "swiper/modules";
import { FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";

const MainArtist = () => {
  const [artistInfo, setArtistInfo] = useState({});
  const [getArtistsTracks, setGetArtistsTracks] = useState([]);
  const [getArtistAlbums, setGetArtistAlbums] = useState([]);
  const [getOtherArtist, setGetOtherArtist] = useState([]);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isFollowArtist, setIsFollowArtist] = useState(false);

  const {
    userInfo,
    token,
    isLoading,
    setGlobalTrackId,
    globalTrackFunc,
    setSongsToPlay,
    setHideHeader,
    onMouseEnterText,
    onMouseLeaveText,
    errorWhen
  } = useContext(allContext);

  setHideHeader(false);

  const { ArtistId } = useParams();

  const getArtistInfo = () => {
    axios
      .get(`https://api.spotify.com/v1/artists/${ArtistId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setArtistInfo(res?.data);
        // setUserInfo(res?.data?.categories?.items)
      })
      .catch((err) => errorWhen(err));
  };
  const getArtistAlbumsUser = () => {
    axios
      .get(`https://api.spotify.com/v1/artists/${ArtistId}/albums`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setGetArtistAlbums(res?.data?.items);
        // setUserInfo(res?.data?.categories?.items)
      })
      .catch((err) => errorWhen(err));
  };
  const getOtherArtistAlbums = () => {
    axios
      .get(`https://api.spotify.com/v1/artists/${ArtistId}/related-artists`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setGetOtherArtist(res?.data?.artists);
        // setUserInfo(res?.data?.categories?.items)
      })
      .catch((err) => errorWhen(err));
  };
  const getArtistTopTracks = () => {
    axios
      .get(
        `https://api.spotify.com/v1/artists/${ArtistId}/top-tracks?market=IN`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        setGetArtistsTracks(res?.data?.tracks);
        // setUserInfo(res?.data?.categories?.items)
      })
      .catch((err) => errorWhen(err));
  };
  const CheckfollowArtist = async () => {
    await axios
      .get(
        `https://api.spotify.com/v1/me/following/contains?type=artist&ids=${ArtistId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        if (res?.data[0] === true) {
          setIsFollowArtist(true);
        } else {
          setIsFollowArtist(false);
        }
      })
      .catch((err) => errorWhen(err));
  };
  useEffect(() => {
    getArtistInfo();
    getArtistAlbumsUser();
    getOtherArtistAlbums();
    getArtistTopTracks();
  }, [ArtistId, token]);

  useEffect(() => {
    CheckfollowArtist();
  }, [ArtistId, isFollowArtist]);

  const UnfollowArtist = async () => {
    axios
      .delete(
        `https://api.spotify.com/v1/me/following?type=artist&ids=${ArtistId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log("Unfollowed Playlist" + res?.data);
        setIsFollowArtist(false);
      })
      .catch((err) =>errorWhen(err));
  };
  const FollowArtist = async () => {
    await axios
      .put(
        `https://api.spotify.com/v1/me/following?type=artist&ids=${ArtistId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          // data: {
          //   ids: [ArtistId],
          // },
        }
      )
      .then((res) => {
        setIsFollowArtist(true);
      })
      .catch((err) => errorWhen(err));
  };

  useEffect(() => {
    var elem = document.getElementById("mainArtist");
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
    const scrollPosition = document.getElementById("mainArtist").scrollTop;
    // Handle your logic based on scroll position
  };

  const breakpoints = {
    160: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    376: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    960: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1120: {
      slidesPerView: 3,
      spaceBetween: 10,
    },

    1420: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  };

  return (
    <div id="mainArtist" className="mainArtist">
      <Header userInfo={userInfo} />
      {!isLoading ? (
        <>
          <div className="profileArtist">
            <div className="artistImage">
              <motion.img
                initial={{ opacity: 0.8 }}
                whileHover={{
                  opacity: 1.0,
                  transition: {
                    duration: 0.7,
                    ease: "easeIn",
                  },
                }}
                src={
                  artistInfo?.images?.length > 0
                    ? artistInfo?.images[0]?.url
                    : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fdefault-user&psig=AOvVaw2bRC0YelOkcUqq6r2Wnzc9&ust=1705318082684000&source=images&cd=vfe&ved=0CBMQjRxqFwoTCPCztYXj3IMDFQAAAAAdAAAAABAE"
                }
                alt=""
              />
            </div>
            <div className="MusicsAlbums">
              <div className="followName">
                <h1>
                  {artistInfo?.name?.length > 10
                    ? artistInfo?.name?.slice(0, 10)
                    : artistInfo?.name}
                </h1>
                {isFollowArtist ? (
                  <button
                    style={{ cursor: "pointer" }}
                    onClick={UnfollowArtist}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button style={{ cursor: "pointer" }} onClick={FollowArtist}>
                    Follow
                  </button>
                )}
              </div>
              <div className="ArtistsAlbums">
                <h1>Artist Albums</h1>
                <Swiper
                  spaceBetween={30}
                  slidesPerView={3}
                  loop={true}
                  pagination={{
                    clickable: true,
                  }}
                  autoplay={{
                    pauseOnMouseEnter: true,
                    delay: 2500,
                  }}
                  breakpoints={breakpoints}
                  modules={[Pagination, Autoplay]}
                  grabCursor={true}
                  className="mySwiper"
                >
                  {getArtistAlbums &&
                    getArtistAlbums?.map((album, index) => {
                      return (
                        <>
                          <SwiperSlide
                            key={index}
                            onMouseEnter={onMouseEnterText}
                            onMouseLeave={onMouseLeaveText}
                          >
                            <Link to={`/Albums/${album?.id}`}>
                              <motion.div
                                initial={{ opacity: 0.5, scale: 1 }}
                                whileHover={{
                                  opacity: 1,
                                  scale: 1.04,
                                  transition: {
                                    duration: 0.7,
                                    ease: "easeInOut",
                                  },
                                }}
                                className="ArtistAlbum"
                              >
                                <motion.div className="ArtistImgContainer">
                                  {album?.images?.length > 0 ? (
                                    <img src={album?.images[0]?.url} alt="" />
                                  ) : (
                                    <img
                                      src="https://images.unsplash.com/photo-1536782376847-5c9d14d97cc0?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZnJlZXxlbnwwfHwwfHx8MA%3D%3D"
                                      alt=""
                                    />
                                  )}
                                </motion.div>
                                <div className="detailsArtist">
                                  <span>
                                    {album?.name?.length > 10
                                      ? album?.name?.slice(0, 10) + "..."
                                      : album?.name}
                                  </span>
                                  <span id="AlbumCate">
                                    {album?.release_date}
                                  </span>
                                </div>
                              </motion.div>
                            </Link>
                          </SwiperSlide>
                        </>
                      );
                    })}
                </Swiper>
              </div>
            </div>
          </div>

          <div className="OtherAtist">
            <div className="alsoLikedArtists">
              <h4>Artist You May Also Likes</h4>
              <Swiper
                slidesPerView={3}
                spaceBetween={20}
                loop={true}
                pagination={{
                  clickable: true,
                }}
                autoplay={{
                  pauseOnMouseEnter: true,
                  delay: 2500,
                }}
                modules={[Pagination, Autoplay]}
                grabCursor={true}
                className="mySwiper"
              >
                {getOtherArtist?.length > 0 ? (
                  getOtherArtist.map((artist, index) => {
                    return (
                      <>
                        <Link
                          key={index}
                          onMouseEnter={onMouseEnterText}
                          onMouseLeave={onMouseLeaveText}
                          to={`/Artist/${artist?.id}`}
                        >
                          <motion.div
                            whileHover={{
                              scale: 1.06,
                              transition: { duration: 0.6, ease: "easeIn" },
                            }}
                            initial={{ scale: 1 }}
                            className="singleArtist"
                          >
                            {artist?.images?.length ? (
                              <motion.img
                                whileHover={{
                                  scale: 1.06,
                                  transition: { duration: 0.6, ease: "easeIn" },
                                }}
                                initial={{ scale: 1 }}
                                src={artist?.images[0]?.url}
                                alt=""
                              />
                            ) : (
                              <img
                                src="https://images.unsplash.com/photo-1536782376847-5c9d14d97cc0?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZnJlZXxlbnwwfHwwfHx8MA%3D%3D"
                                alt=""
                              />
                            )}

                            <h1>{artist?.name}</h1>
                          </motion.div>
                        </Link>
                      </>
                    );
                  })
                ) : (
                  <h1>Bo Artist To Saw</h1>
                )}
              </Swiper>
            </div>
            <div className="alsoLikedTracks">
              <h4>Artists Tracks</h4>
              <div className="TrackSlider">
                {getArtistsTracks &&
                  getArtistsTracks?.map((track) => {
                    return (
                      <>
                        <motion.div
                          whileHover={{ opacity: 0.7 }}
                          className="singleTrack"
                          onMouseEnter={() => setIsButtonVisible(true)}
                          onMouseLeave={() => setIsButtonVisible(false)}
                        >
                          <img
                            src={
                              track?.album?.images?.length > 0
                                ? track?.album?.images[0]?.url
                                : null
                            }
                            alt=""
                          />
                          <h1>{track?.name.split(" ")[0]}</h1>
                          <button
                            onClick={() => {
                              setGlobalTrackId(track?.id);
                              setSongsToPlay([]);
                              globalTrackFunc();
                            }}
                            style={
                              isButtonVisible
                                ? { opacity: "1", transform: "translateX(0%)" }
                                : {
                                    opacity: "0",
                                    transform: "translateX(200%)",
                                  }
                            }
                          >
                            Play
                          </button>
                        </motion.div>
                      </>
                    );
                  })}
              </div>
            </div>
          </div>

          <div className="artistDetailInfo">
            <div className="followers flexes">
              <span>{artistInfo?.followers?.total} 🎧</span>
              <span>Listeners</span>{" "}
            </div>
            <div className="genresArtist flexes">
              <span>
                {artistInfo?.genres?.map((genre, index) => (
                  <span key={index}>{genre}</span>
                ))}
              </span>
              <span>Genres</span>
            </div>
            <div className="popular flexes">
              <span id="heart">
                <FaHeart
                  opacity={artistInfo?.popularity / 100}
                  size={24}
                  color="Red"
                />
              </span>
              <span>{artistInfo?.popularity}% Popular </span>
            </div>
          </div>
        </>
      ) : (
        <aside className="loaderDiv">
          <Loading type="audio" width={100} height={100} fill="#f44242" />
        </aside>
      )}
    </div>
  );
};

export default MainArtist;
