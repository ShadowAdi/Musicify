import React, { useContext } from "react";
import "./Styles/Expanded.css";
import { IoPersonCircleOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { allContext } from "../context/userContext";
import { motion } from "framer-motion";
import { IoReorderThree } from "react-icons/io5";
import HeaderPage from "./HeaderPage";

const Header = ({ userInfo }) => {
  const {
    setToken,
    onMouseEnter,
    onMouseLeave,
    hideHeader,
    navMotionAnim,
    setNavMotionAnim,
    setExpiresIn,
    setRefreshToken,
  } = useContext(allContext);
  // const [hidden,setHidden]=useState(false)

  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("expiresIn");
    setToken(null);
    setRefreshToken(null);
    setExpiresIn(null);
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      {navMotionAnim && <HeaderPage userInfo={userInfo} />}
      <motion.nav
        variants={{
          visible: {
            y: "0%",
          },
          hidden: {
            y: "-100%",
          },
        }}
        initial="visible"
        animate={hideHeader ? "hidden" : "visible"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`header`}
      >
        <Link to={"/Home"}>
          <h1
            style={{ zIndex: 700 }}
            onMouseEnter={() => {
              onMouseEnter();
            }}
            onMouseLeave={onMouseLeave}
          >
            Musicify
          </h1>
        </Link>
        <motion.div className="userInfo">
          <div className="userInfoHeader">
            <Link to={`/UserProfile/${userInfo?.id}`}>
              <span
                onMouseEnter={() => {
                  onMouseEnter();
                }}
                onMouseLeave={onMouseLeave}
              >
                {userInfo?.display_name}
              </span>
              {userInfo?.images?.length > 0 ? (
                <img
                  style={{
                    height: "40px",
                    width: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  onMouseEnter={() => {
                    onMouseEnter();
                  }}
                  onMouseLeave={onMouseLeave}
                  src={userInfo?.images[0]}
                />
              ) : (
                <IoPersonCircleOutline
                  size={42}
                  color="white"
                  style={{ cursor: "pointer" }}
                  id="icon"
                  onMouseEnter={() => {
                    onMouseEnter();
                  }}
                  onMouseLeave={onMouseLeave}
                />
              )}
            </Link>
            <div className="userFill"></div>
          </div>
          <div className="logOut">
            <button
              onMouseEnter={() => {
                onMouseEnter();
              }}
              onMouseLeave={onMouseLeave}
              onClick={logOut}
            >
              Logout
            </button>

            <IoReorderThree
              onClick={() => setNavMotionAnim((prev) => !prev)}
              id="threeLines"
              color="white"
              size={28}
            />
          </div>
        </motion.div>
      </motion.nav>
    </>
  );
};

export default Header;
