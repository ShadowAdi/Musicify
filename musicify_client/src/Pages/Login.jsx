import React from "react";
import "./Styles/Login.css";
import "./Styles/Home.css";
import { motion } from "framer-motion";
import CustomCursor from "../Components/customCursor";
import { client_id, redirectUri, scope } from "./ignore";
const Login = () => {
  const handleLogin = () => {
    
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&show_dialog=true`;

    window.location = authUrl;
  };

  const vars = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
  };

  const buttonVars = {
    initial: {
      scale: 0,
    },
    animate: {
      scale: 1,
    },
  };

  return (
    <>
      <CustomCursor />
      <div className="LoginPage">
        <section id="page1">
          <motion.h1
            variants={vars}
            initial="initial"
            animate="animate"
            transition={{
              duration: 0.7,
              ease: "easeInOut",
            }}
          >
            Musicify
          </motion.h1>
          <motion.button
            variants={buttonVars}
            initial="initial"
            animate="animate"
            transition={{
              duration: 0.7,
              ease: "easeInOut",
            }}
            onClick={handleLogin}
          >
            Login
          </motion.button>
          <span style={{ color: "white", fontSize: "14px" }}>
            Create With ❣️ by{" "}
            <span style={{ borderBottom: "1px solid white" }}>
              Aditya Shukla
            </span>
            <br />
            <span style={{ textAlign: "center",margin:"10px",paddingTop:"20px" }}>
              It Only Shows Preview Url Of The Song
            </span>
          </span>
        </section>
      </div>
    </>
  );
};

export default Login;
