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
const CategoriesList = ({ categories }) => {
  const { isLoading,onMouseEnterText,onMouseLeaveText } = useContext(allContext);
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
          <span>M</span>
          <span style={{textTransform:"lowercase"}}>o</span>
          <span style={{textTransform:"lowercase"}}>o</span>
          <span style={{textTransform:"lowercase"}}>d</span>
          <span > S</span>
          <span style={{textTransform:"lowercase"}}>o</span>
          <span style={{textTransform:"lowercase"}}>n</span>
          <span style={{textTransform:"lowercase"}}>g</span>
          <span style={{textTransform:"lowercase"}}>s</span>
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
              {categories?.map((album, index) => {
                // console.log(album)

                return (
                  <SwiperSlide 
                  onMouseEnter={onMouseEnterText}
                  onMouseLeave={onMouseLeaveText}
                  key={index}>
                    <Link >
                      <div className="listRecent">
                        <div className="imG">
                          <img src={album?.icons[0]?.url} alt="No Image" />
                        </div>
                        <div className="desc">
                          <h1>
                            {album?.name.length > 10
                              ? album?.name.substring(0, 16) + "..."
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

export default CategoriesList;
