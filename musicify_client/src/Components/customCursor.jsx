import React, { useContext, useEffect, useState } from "react";
import { allContext } from "../context/userContext";
import { motion } from "framer-motion";
import "../App.css";

const CustomCursor = () => {
  const [mouseMove, setMouseMove] = useState({
    x: 0,
    y: 0,
  });

  const { mouseVariant, textVariant,  } =
    useContext(allContext);

  useEffect(() => {
    const mouseMove = (e) => {
      setMouseMove({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);
  const variants = {
    default: {
      x: mouseMove.x - 15,
      y: mouseMove.y - 15,
    },
    text: {
      height: 60,
      width: 60,
      x: mouseMove.x - 30,
      y: mouseMove.y - 30,
      backgroundColor: "white",
      mixBlendMode: "difference",
    },
    ImageHover: {
        height: 60,
        width: 60,
        x: mouseMove.x - 30,
        y: mouseMove.y - 30,
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
      },
      hidden: {
        x: mouseMove.x - 15,
        y: mouseMove.y - 15,
        height: 0,
        width: 0,
      },
  };
  const textVariants = {
    default: {
      display: "none",
    },
    text: {
      display: "block",
      fontSize: "20px",
    },
  };
  return (
    <motion.div className="cursor" variants={variants} animate={mouseVariant}>
      <motion.span variants={textVariants}  animate={textVariant}>
        Play
      </motion.span>
    </motion.div>
  );
};

export default CustomCursor;
