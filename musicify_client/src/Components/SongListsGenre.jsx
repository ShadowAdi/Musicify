import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Styles/GenrePage.css";
// import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Loading from "react-loading-components";
import { Autoplay, Pagination } from "swiper/modules";
import { allContext } from "../context/userContext";
import { AnimatePresence, motion } from "framer-motion";

const SongListsGenre = ({ tracks }) => {
  const { isLoading,onMouseEnterText,onMouseLeaveText } = useContext(allContext);
  const breakpoints = {
    240: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    520: {
      slidesPerView: 2,
      spaceBetween: 10,
    },

    860: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1124: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    1424: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
    1632: {
      slidesPerView: 6,
      spaceBetween: 20,
    },
   
  };

  return (
    <>
      <div className="recentPlaylistGenre">
        <div className="slidersGenre">
          <Swiper
            slidesPerView={5}
            spaceBetween={10}
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
            breakpoints={breakpoints}
          >
            {!isLoading ? (
              tracks.length > 0 &&
              tracks?.map((track, index) => {
                // console.log(album)
                return (
                  <SwiperSlide 
                  onMouseEnter={onMouseEnterText}
                  onMouseLeave={onMouseLeaveText}
                  key={index}>
                    <Link to={`/Albums/${track?.album?.id}`}>
                      <AnimatePresence>
                        <motion.div
                          exit={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          whileHover={{
                            borderRadius: "5px",
                            opacity: 0.5,
                            scale: 1.07,
                          }}
                          initial={{ borderRadius: "0px", opacity: 0 }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          style={{
                            width: "200px",
                            padding: "0.6rem 0.3rem",
                            gap: "0.6rem",
                          }}
                          className="listRecent"
                        >
                          <motion.div
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 0.97 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className="imG"
                          >
                            {track?.album?.images?.length > 0 ? (
                              <motion.img
                                initial={{ opacity: 1 }}
                                whileHover={{ opacity: 0.7 }}
                                src={track?.album?.images[0]?.url}
                                alt="No Image"
                              />
                            ) : (
                              <motion.img
                                src={
                                  "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-260nw-1037719192.jpg"
                                }
                                alt="No Image"
                              />
                            )}
                          </motion.div>
                          <div className="desc">
                            <h1>
                              {track?.name?.length > 15
                                ? track?.name?.substring(0, 16) + "..."
                                : track?.name}
                            </h1>
                            <span>
                              {track?.album?.total_tracks > 1
                                ? track?.album?.total_tracks + " tracks"
                                : track?.album?.total_tracks + " track"}
                            </span>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </Link>
                  </SwiperSlide>
                );
              })
            ) : (
              <aside style={{ height: "300px" }} className="loaderDiv">
                <Loading type="audio" width={100} height={100} fill="#f44242" />
              </aside>
            )}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default SongListsGenre;
