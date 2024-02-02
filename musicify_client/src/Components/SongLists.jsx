import React, { useContext, useRef } from "react";
import "./Styles/Expanded.css";
import { Link } from "react-router-dom";
import "swiper/css";

import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Loading from "react-loading-components";

import { Autoplay, Pagination } from "swiper/modules";
import { allContext } from "../context/userContext";
import { motion } from "framer-motion";

const SongLists = ({ albums, check }) => {
  const { isLoading, onMouseEnterText, onMouseLeaveText } =
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
          {check === "saved" ? (
            <>
              <span>S</span>
              <span>a</span>
              <span>v</span>
              <span>e</span>
              <span>d </span>
              <span>s</span>
              <span>o</span>
              <span>n</span>
              <span>g</span>
              <span>s</span>
            </>
          ) : (
            <>
              <span>F</span>
              <span>a</span>
              <span>m</span>
              <span>o</span>
              <span>u</span>
              <span style={{ textTransform: "lowercase" }}>s</span>
              <span> A</span>
              <span>l</span>
              <span>b</span>
              <span>u</span>
              <span>m</span>
              <span>s</span>
            </>
          )}
        </div>
        <motion.div
          whileInView={{ opacity: 1, transform: "translateX(0)" }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="sliders"
        >
          {check === "saved" ? (
            !isLoading ? (
              <Swiper
                slidesPerView={5}
                spaceBetween={20}
                loop={true}
                pagination={{
                  clickable: true,
                }}
                autoplay={{
                  pauseOnMouseEnter: true,
                  delay: 1500,
                }}
                modules={[Pagination, Autoplay]}
                grabCursor={true}
                className="mySwiper"
                breakpoints={breakpoints}
              >
                {albums?.map((album, index) => {
                  return (
                    <SwiperSlide
                    onMouseEnter={onMouseEnterText}
                    onMouseLeave={onMouseLeaveText}
                    key={index}>
                      <Link to={`/Albums/${album?.track?.album?.id}`}>
                        <div className="listRecent">
                          <div className="imG">
                            <img
                              src={
                                album?.track?.album?.images?.length > 0
                                  ? album?.track?.album?.images[0]?.url
                                  : "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"
                              }
                              alt="No Image"
                            />
                            <button>Play</button>
                          </div>
                          <div className="desc">
                            <h1>
                              {album?.track?.name.length > 10
                                ? album?.track?.name.substring(0, 16) + "..."
                                : album?.track?.name}
                            </h1>
                            {/* <span>{album?.artists[0]?.name}</span> */}
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            ) : (
              <aside className="loaderDiv">
                <Loading type="audio" width={100} height={100} fill="#f44242" />
              </aside>
            )
          ) : !isLoading ? (
            <Swiper
              slidesPerView={5}
              spaceBetween={50}
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
              {albums?.map((album, index) => {
                // console.log(album)
                return (
                  <SwiperSlide
                  onMouseEnter={onMouseEnterText}
              onMouseLeave={onMouseLeaveText}
                  
                  key={index}>
                    <Link to={`/Albums/${album?.id}`}>
                      <div className="listRecent">
                        <div className="imG">
                          <img src={album?.images[0]?.url} alt="No Image" />
                          <button>Play</button>
                        </div>
                        <div className="desc">
                          <h1>
                            {album?.name.length > 10
                              ? album?.name.substring(0, 13) + "..."
                              : album?.name}
                          </h1>
                          {/* <span>{album?.artists[0]?.name}</span> */}
                        </div>
                      </div>
                    </Link>
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

export default SongLists;
