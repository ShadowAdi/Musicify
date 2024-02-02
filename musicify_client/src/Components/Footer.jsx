import React, { useContext, useEffect, useRef, useState } from "react";
import "./Styles/Footer.css";
import { allContext } from "../context/userContext";
import { FaHeart, FaPause, FaPlay, FaRegHeart } from "react-icons/fa";
import { LuVolume2 } from "react-icons/lu";
import { MdOutlineVolumeDown } from "react-icons/md";
import { GiNextButton, GiPreviousButton } from "react-icons/gi";
import { motion } from "framer-motion";
import axios from "axios";
const Footer = () => {
  const {
    FooterDetails,
    songsToPlay,
    allSongs,
    setCurrentIndex,
    currentIndex,
    GlobalTrackId,
    token,
    onMouseEnterInput,
    onMouseLeaveInput,
    errorWhen
  } = useContext(allContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const customAudio = document.getElementById("audioTag");
  const sustomSeekSlider = document.getElementById("seekSliderId");
  const playPauseButton = document.getElementById("playPauseButton");
  const VolumeHighButton = document.getElementById("volumeHigh");
  const VolumeLowButton = document.getElementById("volumeLow");
  const audioRef = useRef(null);

  useEffect(() => {
    if (
      customAudio &&
      sustomSeekSlider &&
      playPauseButton &&
      VolumeHighButton &&
      VolumeLowButton
    ) {
      VolumeHighButton.addEventListener("click", () => {

        if (customAudio.volume <= 1.0) {
          customAudio.volume = 0.99;
        }
      });
      VolumeLowButton.addEventListener("click", () => {
        if (customAudio.volume >= 0) {
          customAudio.volume = 0.01;
        } 
      });

      customAudio.addEventListener("ended", () => {
        playPauseButton.innerHTML = "Pause";
        setIsPlaying(false);
        sustomSeekSlider.value = 0;
      });
      sustomSeekSlider.addEventListener("input", function () {
        const seekTime =
          (sustomSeekSlider.value * sustomSeekSlider.duration) / 100;
        customAudio.currentTime = seekTime;
      });
      customAudio.addEventListener("timeupdate", () => {
        const progress = (customAudio.currentTime / customAudio.duration) * 100;
        sustomSeekSlider.value = progress;
      });
    }
  }, []);
  const onClickNext = () => {
    setIsPlaying(false);
    if (currentIndex + 1 < songsToPlay.length) {
      setCurrentIndex((prevValue) => prevValue + 1);
      document.getElementById("audioTag").play();
    }
  };
  const onClickPrev = () => {
    setIsPlaying(false);
    if (isPlaying) {
      audioRef.current.pause();
    }
    if (currentIndex - 1 >= 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  let currentElement = songsToPlay[currentIndex];
  if (!currentElement?.preview_url) {
    currentElement = songsToPlay[currentIndex + 1];
  }
  const handleSongEnded = () => {
    setCurrentIndex(currentIndex + 1);
  };

  useEffect(() => {
    if (GlobalTrackId) {
      axios
        .get(
          `https://api.spotify.com/v1/me/tracks/contains?ids=${GlobalTrackId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          setIsSaved(res?.data[0]);
        })
        .catch((err) => errorWhen(err));
    }
  }, [GlobalTrackId]);

  const savedNewTrack = () => {
    if (GlobalTrackId) {
      axios
        .put(
          `https://api.spotify.com/v1/me/tracks?ids=${GlobalTrackId}`,
          {
            ids: [GlobalTrackId],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
      
          setIsSaved(true);
        })
        .catch((err) => {
          errorWhen(err)
        });
    }
  };
  const deleteSavedTrack = () => {
    if (GlobalTrackId) {
      axios
        .delete(`https://api.spotify.com/v1/me/tracks`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          data: {
            ids: [GlobalTrackId],
          },
        })
        .then((res) => {
        

          setIsSaved(false);
        })
        .catch((err) => {
         errorWhen(er)
        });
    }
  };

  if (allSongs) {
    return (
      <motion.footer
       onMouseEnter={onMouseEnterInput}
    onMouseLeave={onMouseLeaveInput}
        initial={{ transform: "translateY(100%)", opacity: 0 }}
        whileInView={{ transform: "translateY(-0%)", opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeIn" }}
      >
        <div className="globalSongInfo">
          <img
            src={
              currentElement?.album?.images?.length > 0
                ? currentElement?.album?.images[0]?.url
                : "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"
            }
            alt=""
          />
          <div className="currentSongInfoDesc">
            <span>{currentElement?.name}</span>
            <span id="artist">
              {currentElement?.artists?.length > 0
                ? currentElement?.artists[0]?.name
                : null}
            </span>
          </div>
          {isSaved ? (
          <FaHeart
            style={{ cursor: "pointer" }}
            color="red"
            onClick={() => deleteSavedTrack()}
            size={20}
          />
        ) : (
          <FaHeart
            style={{ cursor: "pointer" }}
            onClick={() => savedNewTrack()}
            size={20}
          />
        )}
          
        </div>
        {currentElement?.preview_url ? (
          <div className="Icons">
            <audio
              ref={audioRef}
              onEnded={handleSongEnded}
              id="audioTag"
              src={currentElement?.preview_url}
            ></audio>
            <GiPreviousButton onClick={onClickPrev} id="prevBtn" size={20} />

            <div className="realIcon">
              {isPlaying ? (
                <FaPause
                  id="playPauseButton"
                  style={{ cursor: "pointer" }}
                  size={22}
                  onClick={() => {
                    document.getElementById("audioTag").pause();
                    setIsPlaying(false);
                  }}
                />
              ) : (
                <FaPlay
                  id="playPauseButton"
                  style={{ cursor: "pointer" }}
                  size={22}
                  onClick={() => {
                    document.getElementById("audioTag").play();
                    setIsPlaying(true);
                  }}
                />
              )}
            </div>
            <GiNextButton onClick={onClickNext} id="nextBtn" size={20} />
            <input
              type="range"
              style={{ background: "red" }}
              className="seekSlider"
              id="seekSliderId"
            />

            <LuVolume2
              size={20}
              style={{ cursor: "pointer" }}
              id="volumeHigh"
            />
            <MdOutlineVolumeDown
              style={{ cursor: "pointer" }}
              size={20}
              id="volumeLow"
            />
          </div>
        ) : (
          <h1>No Preview Url</h1>
        )}
      </motion.footer>
    );
  }
  return (
    <motion.footer
    onMouseEnter={onMouseEnterInput}
    onMouseLeave={onMouseLeaveInput}
      initial={{ transform: "translateY(100%)", opacity: 0 }}
      whileInView={{ transform: "translateY(-0%)", opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeIn" }}
    >
      <div className="globalSongInfo">
        <img
          src={
            FooterDetails?.album?.images?.length > 0
              ? FooterDetails?.album?.images[0]?.url
              : "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"
          }
          alt=""
        />
        <div className="currentSongInfoDesc">
          <span>{FooterDetails?.name}</span>
          <span id="artist">
            {FooterDetails?.artists?.length > 0
              ? FooterDetails?.artists[0]?.name
              : null}
          </span>
        </div>
        {isSaved ? (
          <FaHeart
            style={{ cursor: "pointer" }}
            color="red"
            onClick={() => deleteSavedTrack()}
            size={20}
          />
        ) : (
          <FaHeart
            style={{ cursor: "pointer" }}
            onClick={() => savedNewTrack()}
            size={20}
          />
        )}
      </div>
      {FooterDetails?.preview_url ? (
        <div className="Icons">
          <audio id="audioTag" src={FooterDetails?.preview_url}></audio>
          <GiPreviousButton
            style={{ cursor: "pointer" }}
            id="prevBtn"
            size={20}
          />

          <div className="realIcon">
            {isPlaying ? (
              <FaPause
                id="playPauseButton"
                style={{ cursor: "pointer" }}
                size={22}
                onClick={() => {
                  document.getElementById("audioTag").pause();
                  setIsPlaying(false);
                }}
              />
            ) : (
              <FaPlay
                id="playPauseButton"
                style={{ cursor: "pointer" }}
                size={22}
                onClick={() => {
                  document.getElementById("audioTag").play();
                  setIsPlaying(true);
                }}
              />
            )}
          </div>
          <GiNextButton style={{ cursor: "pointer" }} id="nextBtn" size={20} />

          <input type="range"  id="seekSliderId" />

          <LuVolume2 size={20} style={{ cursor: "pointer" }} id="volumeHigh" />
          <MdOutlineVolumeDown
            style={{ cursor: "pointer" }}
            size={20}
            id="volumeLow"
          />
        </div>
      ) : (
        <h1>No Preview Url</h1>
      )}
    </motion.footer>
  );
};

export default Footer;
