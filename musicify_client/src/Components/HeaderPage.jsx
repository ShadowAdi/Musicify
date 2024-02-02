import React, { useContext } from "react";
import "./Styles/Expanded.css";
import { allContext } from "../context/userContext";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
const HeaderPage = ({ userInfo }) => {
  const { navMotionAnim, setNavMotionAnim, setToken } = useContext(allContext);
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  const menuVars = {
    initial: {
      scaleY: 0,
    },
    final: {
      scaleY: 1,
      transition: {
        duration: 0.5,
        ease: [0.12, 0, 0.39, 0],
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        duration: 0.4,
        ease: [0.12, 0, 0.39, 1],
      },
    },
  };

  const containerVars = {
    initial: {
      transition: {
        staggerChildren: 0.9,
      },
    },
    open: {
      transition: {
        staggerChildren: 0.0,
      },
    },
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={"headerPage"}
          variants={menuVars}
          initial="initial"
          animate="final"
          exit="exit"
          className="headerPage"
        >
          <div className="heads">
            <motion.span
              initial={{ transform: "translateY(20px)", opacity: 0 }}
              animate={{ transform: "translateY(0px)", opacity: 1 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
            >
              Musicify
            </motion.span>
            <motion.span
              onClick={() => {
                setNavMotionAnim(false);
              }}
            >
              Close
            </motion.span>
          </div>
          <motion.div
            variants={containerVars}
            initial="initial"
            animate="open"
            className="navLinks"
          >
            <MobileNavLink userInfo={userInfo} />
            <div style={{ overflow: "hidden" }}>
              <motion.span
                initial={{ transform: "translateY(20px)", opacity: 0 }}
                animate={{ transform: "translateY(0px)", opacity: 1 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
                style={{ fontWeight: 400 }}
                onClick={logOut}
              >
                Logout
              </motion.span>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default HeaderPage;

const MobileNavLink = ({ userInfo }) => {
  const mobileLinkVars = {
    initial: {
      y: "30vh",
      opacity: 0,
      transition: {
        duration: 3,
      },
    },
    open: {
      y: "0vh",
      opacity: 1,
      transition: {
        duration: 0.7,
      },
    },
  };
  return (
    <>
      <motion.div
        variants={mobileLinkVars}
        initial="initial"
        whileInView="open"
        style={{ overflow: "hidden" }}
      >
        <Link to={"/Home"}>Home</Link>
      </motion.div>
      <motion.div
        variants={mobileLinkVars}
        initial="initial"
        whileInView="open"
        style={{ overflow: "hidden" }}
      >
        <Link to={"/Search"}>Search</Link>
      </motion.div>
      <motion.div
        variants={mobileLinkVars}
        initial="initial"
        whileInView="open"
        style={{ overflow: "hidden" }}
      >
        <Link to={`/UserProfile/${userInfo?.id}`}>Profile</Link>
      </motion.div>
    </>
  );
};
