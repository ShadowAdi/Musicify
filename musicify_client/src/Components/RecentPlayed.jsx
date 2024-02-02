import React, { useContext, useEffect, useRef, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Loading from "react-loading-components";

import "swiper/css/navigation";

import { Tilt } from 'react-tilt'


import { Autoplay, Pagination } from "swiper/modules";
import { allContext } from "../context/userContext";
import { motion } from "framer-motion";

const RecentPlayed = ({ recents }) => {
  const { isLoading, setGlobalTrackId, globalTrackFunc, setSongsToPlay,onMouseEnterText,onMouseLeaveText } =
    useContext(allContext);

  const breakpoints = {
    100: {
      slidesPerView: 1,
      spaceBetween: 10,
    },

    440: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    868: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    1124: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    1632: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
    2000: {
      slidesPerView: 6,
      spaceBetween: 40,
    },

    2992: {
      slidesPerView: 7,
      spaceBetween: 20,
    },
  };

 
  return (
    <>
      <div className="recentPlaylist">
        <div className="names">
          <span>R</span>
          <span style={{ textTransform: "lowercase" }}>e</span>
          <span style={{ textTransform: "lowercase" }}>c</span>
          <span style={{ textTransform: "lowercase" }}>e</span>
          <span style={{ textTransform: "lowercase" }}>n</span>
          <span style={{ textTransform: "lowercase" }}>t</span>
          <span style={{ textTransform: "lowercase" }}>l</span>
          <span style={{ textTransform: "lowercase" }}>y</span>
          <span> P</span>
          <span style={{ textTransform: "lowercase" }}>l</span>
          <span style={{ textTransform: "lowercase" }}>a</span>
          <span style={{ textTransform: "lowercase" }}>y</span>
          <span style={{ textTransform: "lowercase" }}>e</span>
          <span style={{ textTransform: "lowercase" }}>d</span>
        </div>

        <motion.div
          whileInView={{ opacity: 1, transform: "translateX(0)" }}
          initial={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="sliders"
        >
          {!isLoading ? (
            <Swiper
              slidesPerView={5}
              spaceBetween={20}
              loop={true}
         
              pagination={{
                clickable: true,
              }}
              autoplay={{
                pauseOnMouseEnter: true,
                delay: 4500,
              }}
              modules={[Pagination, Autoplay]}
              grabCursor={true}
              className="mySwiper"
              breakpoints={breakpoints}
            >
              {recents?.map((album, index) => {
                return (
                  <SwiperSlide
                  onMouseEnter={onMouseEnterText}
                  onMouseLeave={onMouseLeaveText}
                    onClick={() => {
                      setGlobalTrackId(album?.track?.id);
                      setSongsToPlay([]);
                      globalTrackFunc();
                    }}
                    key={index}
                  >

                    <div className="listRecent">
                      <div className="imG">
                        <img
                          src={
                            !album?.track?.album?.images?.url
                              ? album?.track?.album?.images[0]?.url
                              : "https://w7.pngwing.com/pngs/116/765/png-transparent-clapperboard-computer-icons-film-movie-poster-angle-text-logo-thumbnail.png"
                          }
                          alt="No Image"
                        />
                      </div>
                      <div className="desc">
                        <h1>
                          {album?.track?.name.length > 10
                            ? album?.track?.name.substring(0, 16) + "..."
                            : album?.track?.name}
                        </h1>
                        <span>
                          {album?.track?.artists?.length > 0 &&
                            album?.track?.artists[0]?.name}
                        </span>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : (
            <aside className="loaderDiv">
              <Loading type="audio" width={100} height={100} fill="#f44242" />
            </aside>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default RecentPlayed;
