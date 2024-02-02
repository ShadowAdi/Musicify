import React, { useContext, useEffect, useState } from "react";
import "./Styles/Profile.css";
import axios from "axios";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { allContext } from "../context/userContext";
import Header from "./Header";
const Profile = () => {
  const [userInfo, setUserInfo] = useState({});
  const [userTracks, setUserTracks] = useState([]);
  const {UserId}=useParams()
  const {token,setNavMotionAnim,onMouseEnterText,onMouseLeaveText,errorWhen}=useContext(allContext)

  const getUser = () => {
    axios
      .get(`https://api.spotify.com/v1/users/${UserId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setUserInfo(res?.data);
        // setUserInfo(res?.data?.categories?.items)
      })
      .catch((err) => errorWhen(err));
  };
  const getTracks = () => {
    axios
      .get("https://api.spotify.com/v1/me/tracks", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setUserTracks(res?.data?.items);
        // setUserInfo(res?.data?.categories?.items)
      })
      .catch((err) => errorWhen(err));
  };
  // const getCategories = () => {
  //   axios
  //     .get("https://api.spotify.com/v1/browse/categories", {
  //       headers: {
  //         Authorization: "Bearer " + token,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res?.data);
  //       // setUserInfo(res?.data?.categories?.items)
  //     })
  //     .catch((err) => errorWhen(err));
  // };
  useEffect(() => {
    setNavMotionAnim(false)
    getUser();
    getTracks();
    // getCategories()
  }, []);

  return (
    <>
    <div className="ProfilePage">
      <Header userInfo={userInfo}/>

      <div className="userDesc">
        {userInfo?.images?.length > 0 ? (
          <img src={userInfo?.images[0]?.url} alt="" />
        ) : (
          <IoPersonCircleOutline
            size={120}
            color="white"
            style={{ cursor: "pointer" }}
            id="icon"
          />
        )}

        <h1>
          {userInfo?.display_name}-<span>{userInfo?.type}</span>
        </h1>
      </div>
      <div className="userOther">
        <div className="followers">
          <span id="no">{userInfo?.followers?.total}</span>
          <span id="text">Followers</span>
        </div>
        <div className="userTracks">
          {userTracks?.map((track, index) => {
            return (
              <div 
              onMouseEnter={onMouseEnterText}
              onMouseLeave={onMouseLeaveText}
              key={index} className="userSingle">
                <div className="userTrackImage">
                  {track?.track?.album?.images?.length > 0 ? (
                    <img src={track?.track?.album?.images[0]?.url} alt="" />
                  ) : null}
                </div>
                <div className="userInfoTrack">
                    <span>{track?.track?.album?.name}</span>
                    <div className="userArtistName">
                    <p>{track?.track?.album?.artists[0]?.name}</p>
                    <p>{track?.track?.album?.artists[1]?.name}</p>

                    </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    
    </>
  );
};

export default Profile;
