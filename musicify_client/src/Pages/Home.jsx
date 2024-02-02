import React, { useContext, useEffect } from "react";
import "../Components/Styles/Expanded.css";
import SongLists from "../Components/SongLists";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import PlaylistExpanded from "../Components/PlalistExpanded";
import RecentPlayed from "../Components/RecentPlayed";
import CategoriesList from "../Components/CategoriesList";
import { allContext } from "../context/userContext";
import Loading from "react-loading-components";
import { motion } from "framer-motion";
import Animate from "./Animate.jsx";

const Home = () => {
  const {
    albums,
    playlist,
    categories,
    userInfo,
    getRecentlyPlayedSongs,
    getArtists,
    isLoading,
    savedTracksArr,
    setHideHeader,
    setNavMotionAnim,
    onMouseEnterText,
    onMouseLeaveText,
  } = useContext(allContext);
  setHideHeader(false);

  const handleScroll = () => {
    const scrollPosition = document.getElementById("scrollExpand").scrollTop;
    // Handle your logic based on scroll position
  };

  useEffect(() => {
    var elem = document.getElementById("scrollExpand");
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
    setNavMotionAnim(false);
  }, []);

  return (
    <div id="scrollExpand" className="expand">
      <Header userInfo={userInfo} />
      <div className="main_Bidy">
        <SongLists albums={savedTracksArr} check="saved" />
        <RecentPlayed recents={getRecentlyPlayedSongs} />

        <SongLists albums={albums} />

        <PlaylistExpanded albums={playlist} />

        <CategoriesList categories={categories} />

        <div className="recentPlaylistArtist">
          <div className="names">
            <span>A</span>
            <span>r</span>
            <span>t</span>
            <span>i</span>
            <span>s</span>
            <span>t</span>
            <span>s</span>
          </div>
          {getArtists?.length > 0 ? (
            <div className="sliders" id="artistSlider">
              <div className="ListAll">
                {!isLoading ? (
                  getArtists?.map((artist, index) => {
                    return (
                      <Link
                        onMouseEnter={onMouseEnterText}
                        onMouseLeave={onMouseLeaveText}
                        key={index}
                        to={`/Artist/${artist?.id}`}
                      >
                        <motion.div
                          initial={{ borderRadius: 0, opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          whileHover={{
                            borderRadius: "10px",
                            transition: { duration: 0.3, ease: "easeIn" },
                          }}
                          transition={{ duration: 1.2, ease: "easeIn" }}
                          className="ArtistRecent"
                        >
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, ease: "easeIn" }}
                            className="circleImageWrapper"
                          >
                            <img
                              src={
                                artist?.images?.length > 0 &&
                                artist?.images[0]?.url
                              }
                              alt="No Image"
                            />
                          </motion.div>
                          <motion.h1
                            whileHover={{
                              scale: 1.3,
                              transition: { duration: 0.2 },
                            }}
                          >
                            {artist?.name?.length > 12
                              ? artist?.name?.slice(0, 10)
                              : artist?.name}
                          </motion.h1>
                        </motion.div>
                      </Link>
                    );
                  })
                ) : (
                  <aside className="loaderDiv">
                    <Loading
                      type="audio"
                      width={100}
                      height={100}
                      fill="#f44242"
                    />
                  </aside>
                )}
              </div>
            </div>
          ) : (
            <h1>You Don't Follow An Artist</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Animate(Home);
