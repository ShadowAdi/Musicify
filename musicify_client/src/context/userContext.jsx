import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const allContext = createContext();

const AllContextMain = ({ children }) => {
  const [token, setToken] = useState(null);
  const [getArtists, setGetArtists] = useState([]);
  const [getUserAlbumsSaved, setGetUserAlbumsSaved] = useState([]);
  const [getUserPlaylist, setGetUserPlaylist] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [playlistTitle, setPlaylistTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [getRecentlyPlayedSongs, setRecentlyPlayedSongs] = useState([]);
  const [playlistDetails, setPlaylistDetails] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [albumDetails, setAlbumDetails] = useState([]);
  const [albumTracks, setAlbumTracks] = useState([]);
  const [GlobalTrackId, setGlobalTrackId] = useState(null);
  const [FooterDetails, setFooterFetails] = useState({});
  const [songsToPlay, setSongsToPlay] = useState([]);
  const [allSongs, setAllSongs] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playSolo, setPlaySolo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [trackModal, setTrackModal] = useState(false);
  const [savedTracksArr, setSavedTracksArr] = useState([]);
  const [mouseVariant, setMouseVariant] = useState("default");
  const [textVariant, setTextVariant] = useState("default");
  const [artistVariant, setArtistVariant] = useState("default");
  const [hideHeader, setHideHeader] = useState(false);
  const [navMotionAnim, setNavMotionAnim] = useState(false);
  const [code, setCode] = useState(null);
  const [refreshToken, setRefreshToken] = useState("");
  const [expiresIn, setExpiresIn] = useState(null);
  const [genres_30, setGenres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getCode = async () => {
      const codeParam = new URLSearchParams(window.location.search).get("code");
      if (codeParam) {
        setCode(codeParam);
        try {
          const response = await axios.post("http://localhost:8080/api/login", {
            code: codeParam,
          });

          window.history.pushState({}, null, "/Home");
          console.log(response?.data);

          setToken(response?.data?.accessToken);
          setRefreshToken(response?.data?.refreshToken);
          setExpiresIn(response?.data?.expiresIn);

          if (localStorage.getItem("token")) {
            localStorage.removeItem("token");
          }
          if (localStorage.getItem("refreshToken")) {
            localStorage.removeItem("refreshToken");
          }
          if (localStorage.getItem("expiresIn")) {
            localStorage.removeItem("expiresIn");
          }

          localStorage.setItem("token", response?.data?.accessToken);
          localStorage.setItem("refreshToken", response?.data?.refreshToken);
          localStorage.setItem("expiresIn", response?.data?.expiresIn);
        } catch (error) {
          navigate("/");
          console.error(error);
        }
      }
    };
    getCode();
  }, []);

  useEffect(() => {
    console.log(token);
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
    if (localStorage.getItem("refreshToken")) {
      setRefreshToken(localStorage.getItem("refreshToken"));
    }
    if (localStorage.getItem("expiresIn")) {
      setExpiresIn(localStorage.getItem("expiresIn"));
    }
  }, [token, refreshToken, expiresIn]);

  useEffect(() => {
    console.log(token, refreshToken, expiresIn);
  }, [token, refreshToken, expiresIn]);
  useEffect(() => {
    console.log(refreshToken);
    console.log(expiresIn);
    console.log("hii");

    if (!refreshToken || !expiresIn) {
      return;
    }
    const timeout = setInterval(() => {
      console.log(refreshToken);
      console.log(expiresIn);
      console.log(token);
      console.log("hii");

      axios
        .post("http://localhost:8080/api/refresh", {
          refreshToken,
        })
        .then((res) => {
          console.log(res);
          if (
            localStorage.getItem("token") &&
            localStorage.getItem("refreshToken") &&
            localStorage.getItem("expiresIn")
          ) {
            localStorage.removeItem("token");
            localStorage.removeItem("expiresIn");
            localStorage.removeItem("refreshToken");
          }
          setToken(res?.data?.accessToken);
          setExpiresIn(res?.data?.expiresIn);
          setRefreshToken(res?.data?.refreshToken);
        })
        .catch((err) => {
          window.location = "/";
          console.log(err);
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(timeout);
  }, [refreshToken, expiresIn]);

  const errorWhen = (err) => {
    setIsLoading(true);
    navigate("/Home");
    console.log("You got an error ", err);
    // setToken("");
    // setRefreshToken("");
    // setExpiresIn("");
    // localStorage.removeItem("token");
    // localStorage.removeItem("refreshToken");
    // localStorage.removeItem("expiresIn");
  };

  const savedTracks = () => {
    setError(false);
    setIsLoading(true);
    if (token) {
      try {
        axios
          .get(`https://api.spotify.com/v1/me/tracks`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            setSavedTracksArr(res?.data?.items);
            setIsLoading(false);
          })
          .catch((err) => {
            errorWhen(err);
          });
      } catch (error) {
        errorWhen(error);
      }
    }
  };

  useEffect(() => {
    savedTracks();
  }, [token]);

  const getSingleAlbum = (id) => {
    setError(false);
    setIsLoading(true);
    if (token) {
      try {
        setAlbumDetails(null);
        axios
          .get(`https://api.spotify.com/v1/albums/${id}`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            setAlbumDetails(res?.data);
            setIsLoading(false);
          })
          .catch((err) => {
            errorWhen(err);
          });
      } catch (error) {
        errorWhen(error);
      }
    }
  };
  const getSingleAlbumTracks = (id) => {
    setAlbumTracks(null);

    setError(false);
    setIsLoading(true);
    if (token) {
      try {
        axios
          .get(`https://api.spotify.com/v1/albums/${id}/tracks`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            setAlbumTracks(res?.data);
            setIsLoading(false);
          })
          .catch((err) => {
            errorWhen(err);
          });
      } catch (error) {
        errorWhen(error);
      }
    }
  };

  const getUserArtists = () => {
    setError(false);
    setIsLoading(true);
    if (token) {
      try {
        axios
          .get("https://api.spotify.com/v1/me/following?type=artist", {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            setGetArtists(res?.data?.artists?.items);
            setIsLoading(false);
          })
          .catch((err) => {
            errorWhen(err);
          });
      } catch (error) {
        errorWhen(error);
      }
    }
  };
  const getUserAlbums = () => {
    setError(false);
    setIsLoading(true);
    if (token) {
      try {
        setGetUserAlbumsSaved(null);
        axios
          .get("https://api.spotify.com/v1/me/albums", {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            setGetUserAlbumsSaved(res?.data?.items);
            setIsLoading(false);
          })
          .catch((err) => {
            errorWhen(err);
          });
      } catch (error) {
        errorWhen(error);
      }
    }
  };
  const getPlaylistAlbums = () => {
    setError(false);
    setIsLoading(true);
    if (token) {
      try {
        setGetUserPlaylist(null);
        axios
          .get("https://api.spotify.com/v1/me/playlists", {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            setGetUserPlaylist(res?.data?.items);
            setIsLoading(false);
          })
          .catch((err) => {
            errorWhen(err);
          });
      } catch (error) {
        errorWhen(error);
      }
    }
  };
  const getRecentlyPlayed = () => {
    setError(false);
    setIsLoading(true);
    if (token) {
      try {
        setRecentlyPlayedSongs(null);
        axios
          .get("https://api.spotify.com/v1/me/player/recently-played", {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            setRecentlyPlayedSongs(res?.data?.items);
            setIsLoading(false);
          })
          .catch((err) => {
            errorWhen(err);
          });
      } catch (error) {
        errorWhen(error);
      }
    }
  };
  const getData = () => {
    setError(false);
    setIsLoading(true);

    if (token) {
      try {
        setAlbums(null);
        axios
          .get("https://api.spotify.com/v1/browse/new-releases", {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            setAlbums(res?.data?.albums?.items);
            setIsLoading(false);
          })
          .catch((err) => {
            errorWhen(err);
          });
      } catch (error) {
        errorWhen(error);
      }
    }
  };
  const getPlaylist = () => {
    setError(false);
    setIsLoading(true);
    try {
      setPlaylistTitle(null);
      setPlaylist(null);
      if (token) {
        axios
          .get("https://api.spotify.com/v1/browse/featured-playlists", {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            setPlaylistTitle(res?.data?.message);
            setPlaylist(res.data?.playlists?.items);
            setIsLoading(false);
          })
          .catch((err) => {
            errorWhen(err);
          });
      }
    } catch (error) {
      errorWhen(error);
    }
  };
  const getCategories = () => {
    setError(false);
    setIsLoading(true);
    setCategories(null);
    if (token) {
      try {
        axios
          .get("https://api.spotify.com/v1/browse/categories", {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            setCategories(res?.data?.categories?.items);
            setIsLoading(false);
          })
          .catch((err) => {
            errorWhen(err);
          });
      } catch (error) {
        errorWhen(error);
      }
    }
  };
  const getUser = () => {
    setError(false);
    setIsLoading(true);
    setUserInfo(null);
    if (token) {
      try {
        axios
          .get("https://api.spotify.com/v1/me", {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            setUserInfo(res?.data);
            setIsLoading(false);
          })
          .catch((err) => {
            errorWhen(err);
          });
      } catch (error) {
        errorWhen(error);
      }
    }
  };

  const getSinglePlaylist = (id) => {
    setError(false);
    setIsLoading(true);
    if (token) {
      try {
        setPlaylistDetails(null);
        axios
          .get(`https://api.spotify.com/v1/playlists/${id}`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            setIsLoading(false);
            setPlaylistDetails(res?.data);
          })
          .catch((err) => {
            errorWhen(err);
          });
      } catch (error) {
        errorWhen(error);
      }
    }
  };
  const getSinglePlaylistTracks = (id) => {
    setError(false);
    setIsLoading(true);
    setTracks(null);
    if (token) {
      try {
        axios
          .get(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            setTracks(res?.data);
            setIsLoading(false);
            // setPlaylistDetails(res?.data);
          })
          .catch((err) => {
            errorWhen(err);
          });
      } catch (error) {
        errorWhen(error);
      }
    }
  };

  const getGenres = () => {
    setError(false);
    setIsLoading(true);
    setGenres(null);
    if (token) {
      try {
        axios
          .get(
            "https://api.spotify.com/v1/recommendations/available-genre-seeds",
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          )
          .then((res) => {
            setGenres(res?.data?.genres);
          })
          .catch((err) => {
            errorWhen(err);
          });
      } catch (error) {
        errorWhen(error);
      }
    }
  };

  useEffect(() => {
    getGenres();
    return () => {
      getGenres();
    };
  }, [token]);

  const globalTrackFunc = async () => {
    if (GlobalTrackId === null || GlobalTrackId === undefined) {
      return null;
    } else {
      if (token) {
        await axios
          .get(`https://api.spotify.com/v1/tracks/${GlobalTrackId}`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            setFooterFetails(res?.data);
          })
          .catch((err) => {
            errorWhen(err);
          });
      }
    }
  };

  useEffect(() => {
    globalTrackFunc();
  }, [GlobalTrackId]);

  useEffect(() => {
    getUserArtists();
    getPlaylistAlbums();
    getData();
    getPlaylist();
    getCategories();
    getUser();
    getUserAlbums();
    getRecentlyPlayed();
  }, [token]);

  const onMouseEnter = () => {
    setMouseVariant("text");
  };
  const onMouseLeave = () => {
    setMouseVariant("default");
  };
  const onMouseEnterText = () => {
    setTextVariant("text");
    setMouseVariant("ImageHover");
  };
  const onMouseLeaveText = () => {
    setTextVariant("default");
    setMouseVariant("default");
  };
  const onMouseEnterInput = () => {
    setMouseVariant("hidden");
  };
  const onMouseLeaveInput = () => {
    setMouseVariant("default");
  };

  return (
    <allContext.Provider
      value={{
        token,
        setToken,
        getArtists,
        getUserAlbumsSaved,
        getUserPlaylist,
        albums,
        playlist,
        playlistTitle,
        categories,
        userInfo,
        getRecentlyPlayedSongs,
        getSinglePlaylist,
        getSinglePlaylistTracks,
        playlistDetails,
        getSingleAlbum,
        getSingleAlbumTracks,
        albumDetails,
        albumTracks,
        tracks,
        GlobalTrackId,
        setGlobalTrackId,
        FooterDetails,
        setFooterFetails,
        globalTrackFunc,
        songsToPlay,
        setAllSongs,
        setSongsToPlay,
        allSongs,
        currentIndex,
        setCurrentIndex,
        setPlaySolo,
        playSolo,
        isLoading,
        error,
        isModal,
        setIsModal,
        trackModal,
        setTrackModal,
        savedTracksArr,
        setSavedTracksArr,
        mouseVariant,
        setMouseVariant,
        onMouseEnter,
        onMouseLeave,
        hideHeader,
        setHideHeader,
        navMotionAnim,
        setNavMotionAnim,
        code,
        setCode,
        genres_30,
        textVariant,
        setTextVariant,
        onMouseEnterText,
        onMouseLeaveText,
        onMouseEnterInput,
        onMouseLeaveInput,
        errorWhen,
      }}
    >
      {children}
    </allContext.Provider>
  );
};

export default AllContextMain;
